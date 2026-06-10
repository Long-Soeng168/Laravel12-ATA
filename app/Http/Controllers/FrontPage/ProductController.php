<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ItemBodyType;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use App\Models\ItemCategoryField;
use App\Models\ItemDailyView;
use App\Models\Province;
use App\Models\Shop;
use Carbon\Carbon;
use Inertia\Inertia;

class ProductController extends Controller
{



    public function index(Request $request)
    {
        $form_data = [
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->with(['fields.options', 'brands'])
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($item) {
                    $item->image_url = $item->image ? asset('assets/images/item_categories/thumb/' . $item->image) : null;
                    $item->brand_ids = $item->brands->pluck('id')->toArray();
                    return $item;
                }),
            'itemBrands' => ItemBrand::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->with(['brand_models' => function ($query) {
                    $query->where('status', 'active')->orderBy('name');
                }])
                ->get()
                ->map(function ($brand) {
                    // 1. Add image_url for the Brand
                    $brand->image_url = $brand->image
                        ? asset('assets/images/item_brands/thumb/' . $brand->image)
                        : null;

                    // 2. Map through the nested models to add their image_url
                    $brand->brand_models->map(function ($model) {
                        $model->image_url = $model->image
                            ? asset('assets/images/item_models/thumb/' . $model->image)
                            : null;
                        return $model;
                    });

                    return $brand;
                }),

            'itemBodyTypes' => ItemBodyType::where('status', 'active')
                ->orderBy('order_index')
                ->orderBy('name')
                ->get()
                ->map(function ($item) {
                    $item->image_url = $item->image ? asset('assets/images/item_body_types/thumb/' . $item->image) : null;
                    return $item;
                }),
        ];

        $query = Item::with(['category', 'brand', 'images']);

        $query->where('status', 'active');

        // Filter by Category Code and Dynamic Attributes
        if ($request->filled('category_code')) {
            $categoryCode = $request->category_code;
            $query->where('category_code', $categoryCode);

            // Fetch valid fields for this category to prevent SQL injection or bad queries
            $category = ItemCategory::where('code', $categoryCode)->first();

            if ($category) {
                $validFields = ItemCategoryField::where('category_id', $category->id)
                    ->pluck('field_key')
                    ->toArray();

                // Loop through request inputs to match valid JSON attributes
                foreach ($request->all() as $key => $value) {
                    if (in_array($key, $validFields) && $request->filled($key)) {
                        // Assuming 'attributes' is cast to an array/json in your Item model
                        $query->where("attributes->$key", $value);
                    }
                }
            }
        }

        // Standard Filters
        if ($request->filled('shop_id')) {
            $shop = Shop::find($request->shop_id);
            if ($shop) {
                $query->where(function ($q) use ($shop) {
                    $q->where('user_id', $shop->owner_user_id);
                });
            } else {
                $query->where('shop_id', $request->shop_id);
            }
        }
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('brand_code')) {
            $query->where('brand_code', $request->brand_code);
        }

        if ($request->filled('model_code')) {
            $query->where('model_code', $request->model_code);
        }

        if ($request->filled('body_type_code')) {
            $query->where('body_type_code', $request->body_type_code);
        }

        // Price Range Filters
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Discount Filter
        if ($request->filled('is_discount')) {
            if ($request->is_discount == '1') {
                $query->whereNotNull('discount')->where('discount', '>', 0);
            } elseif ($request->is_discount == '0') {
                $query->where(function ($q) {
                    $q->whereNull('discount')->orWhere('discount', 0);
                });
            }
        }

        // Free Delivery Filter
        if ($request->filled('is_free_delivery')) {
            $query->where('is_free_delivery', $request->is_free_delivery);
        }

        // Location / Province Filter (Assuming province_code is on the Shop relation)
        if ($request->filled('province_code')) {
            $query->where('province_code', $request->province_code);
        }

        // Date Added Filter
        if ($request->filled('created_at')) {
            $dateFilter = $request->created_at;
            if ($dateFilter === 'today') {
                $query->whereDate('created_at', Carbon::today());
            } elseif ($dateFilter === 'last_7_days') {
                $query->where('created_at', '>=', Carbon::now()->subDays(7));
            } elseif ($dateFilter === 'last_15_days') {
                $query->where('created_at', '>=', Carbon::now()->subDays(15));
            } elseif ($dateFilter === 'last_30_days') {
                $query->where('created_at', '>=', Carbon::now()->subDays(30));
            }
        }

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                    ->orWhere('name_kh', 'like', '%' . $request->q . '%');
            });
        }

        // 2. Paginate & Sort (Removed latest() to prevent conflicting with orderByDesc)
        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'price_low_to_high') {
                $query->orderBy('price', 'asc');
            } elseif ($sort === 'price_high_to_low') {
                $query->orderBy('price', 'desc');
            } else {
                $query->orderByDesc('id');
            }
        } else {
            // Default sort
            $query->orderByDesc('id');
        }

        $items = $query->paginate(20);

        // 3. Pre-fetch mappings for attributes (Optimized)
        // We get the IDs from the already eager-loaded categories instead of running a new query!
        $categoryIds = $items->pluck('category.id')->filter()->unique();

        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // 4. Transform Collection
        $items->getCollection()->transform(function ($item) use ($categoryMaps) {

            // --- Image Optimization for Flutter List ---
            $firstImage = $item->images->first();

            $item->image_url = $firstImage
                ? asset('assets/images/items/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            $item->thumbnail_image = $firstImage ? [
                'id' => $firstImage->id,
                'image' => $firstImage->image,
                'image_url' => asset('assets/images/items/' . $firstImage->image),
            ] : null;

            // --- Attribute Display Logic ---
            $categoryId = $item->category?->id;
            $fields = $categoryMaps->get($categoryId);
            $displayAttributes = [];

            if ($fields && is_array($item->attributes)) {
                foreach ($item->attributes as $key => $storedValue) {
                    $field = $fields->where('field_key', $key)->first();
                    $option = $field ? $field->options->where('option_value', $storedValue)->first() : null;

                    $displayAttributes[$key] = [
                        'label' => $field->label ?? $key,
                        'label_kh' => $field->label_kh ?? $key,
                        'value' => $storedValue,
                        'value_label_en' => $option->label_en ?? $storedValue,
                        'value_label_kh' => $option->label_kh ?? $storedValue,
                    ];
                }
            }

            $item->display_attributes = $displayAttributes;

            // Correct Laravel way to hide relationships from the final JSON payload
            $item->makeHidden(['images']);

            return $item;
        });

        $selectedCategory = ItemCategory::where('code', $request->category_code)->first() ?? null;

        // return $selectedCategory;
        return Inertia::render('frontpage/products/ProductListingPage', [
            'form_data' => $form_data,
            'tableData' => $items,
            'selectedCategory' => $selectedCategory,
        ]);
    }

    public function show($id)
    {
        // 1. Fetch Main Item
        $itemShow = Item::with([
            'images',
            'brand',
            'model',
            'body_type',
            'shop',
            'owner',
            'category.fields.options'
        ])->findOrFail($id);

        // 2. View Tracking
        $date = now()->toDateString();
        $view = ItemDailyView::firstOrCreate(
            ['item_id' => $id, 'view_date' => $date],
            ['view_counts' => 0],
        );
        $view->increment('view_counts');
        $itemShow->increment('total_view_counts');

        // 3. Format Main Item Data
        $formattedItem = $itemShow->toArray();
        $formattedItem['price'] = (float) $itemShow->price;
        $formattedItem['cost'] = (float) $itemShow->cost;
        $formattedItem['discount'] = (float) $itemShow->discount;

        $displayAttributes = [];
        $attributes = $itemShow->attributes ?? [];

        if ($itemShow->category && $itemShow->category->fields) {
            foreach ($itemShow->category->fields as $field) {
                $key = $field->field_key;
                $currentValue = $attributes[$key] ?? null;

                $displayData = [
                    'label' => $field->label,
                    'label_kh' => $field->label_kh,
                    'value' => $currentValue,
                    'value_label_en' => $currentValue,
                    'value_label_kh' => $currentValue,
                ];

                if (in_array($field->field_type, ['select', 'radio'])) {
                    $option = $field->options->where('option_value', $currentValue)->first();
                    if ($option) {
                        $displayData['value_label_en'] = $option->label_en;
                        $displayData['value_label_kh'] = $option->label_kh;
                    }
                } elseif ($field->field_type === 'checkbox') {
                    $isChecked = ($currentValue === true || $currentValue === '1' || $currentValue === 1);
                    $displayData['value_label_en'] = $isChecked ? 'Yes' : 'No';
                    $displayData['value_label_kh'] = $isChecked ? 'បាទ/ចាស' : 'ទេ';
                }

                if (is_null($currentValue) || $currentValue === '') {
                    $displayData['value_label_en'] = null;
                    $displayData['value_label_kh'] = null;
                }

                $displayAttributes[$key] = $displayData;
            }
        }

        if (isset($formattedItem['category'])) {
            unset($formattedItem['category']['fields']);
        }

        $formattedItem['display_attributes'] = $displayAttributes;

        $formattedItem['images'] = $itemShow->images->map(function ($img) {
            return [
                'id' => $img->id,
                'image' => $img->image,
                'url' => asset('assets/images/items/' . $img->image),
                'item_id' => $img->item_id,
            ];
        });

        if ($itemShow->shop) {
            $formattedItem['shop']['logo_url'] = $itemShow->shop->logo
                ? asset('assets/images/shops/thumb/' . $itemShow->shop->logo)
                : null;
            $formattedItem['shop']['banner_url'] = $itemShow->shop->banner
                ? asset('assets/images/shops/thumb/' . $itemShow->shop->banner)
                : null;
        }

        if ($itemShow->owner) {
            $formattedItem['owner']['logo_url'] = $itemShow->owner->image
                ? asset('assets/images/users/thumb/' . $itemShow->owner->image)
                : null;
        }

        // 4. Fetch Related Items
        $query = Item::with(['category', 'images'])
            ->where('id', '!=', $itemShow->id)
            ->where('status', 'active')
            ->where(function ($q) use ($itemShow) {
                if ($itemShow->category_code) {
                    $q->orWhere('category_code', $itemShow->category_code);
                }
                if ($itemShow->brand_code) {
                    $q->orWhere('brand_code', $itemShow->brand_code);
                }
                if ($itemShow->model_code) {
                    $q->orWhere('model_code', $itemShow->model_code);
                }
            });

        $relatedItems = $query->orderByDesc('id')->take(10)->get();

        $categoryIds = $relatedItems->pluck('category.id')->filter()->unique();
        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        $relatedItems->transform(function (Item $item) use ($categoryMaps) {
            $firstImage = $item->images->first();

            $item->image_url = $firstImage
                ? asset('assets/images/items/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            $item->thumbnail_image = $firstImage ? [
                'id' => $firstImage->id,
                'image' => $firstImage->image,
                'image_url' => asset('assets/images/items/' . $firstImage->image),
            ] : null;

            $categoryId = $item->category?->id;
            $fields = $categoryMaps->get($categoryId);
            $displayAttributes = [];

            if ($fields && is_array($item->attributes)) {
                foreach ($item->attributes as $key => $storedValue) {
                    $field = $fields->where('field_key', $key)->first();
                    $option = $field ? $field->options->where('option_value', $storedValue)->first() : null;

                    $displayAttributes[$key] = [
                        'label' => $field->label ?? $key,
                        'label_kh' => $field->label_kh ?? $key,
                        'value' => $storedValue,
                        'value_label_en' => $option->label_en ?? $storedValue,
                        'value_label_kh' => $option->label_kh ?? $storedValue,
                    ];
                }
            }

            $item->display_attributes = $displayAttributes;
            $item->makeHidden(['images', 'category']);

            return $item;
        });

        // 5. Generate Dynamic Meta Data
        // Adjust 'name' or 'title' based on your actual database column for the item
        $itemTitle = $itemShow->name ?? $itemShow->title ?? 'Item Details';

        // Strip HTML if your description uses a WYSIWYG editor, and limit to SEO standard 160 chars
        $itemDescription = isset($itemShow->description)
            ? \Illuminate\Support\Str::limit(strip_tags($itemShow->description), 150)
            : 'View this product on A-Tech Auto. Buy & sell cars, spare parts, and more.';

        // Grab the first image if available, otherwise fallback
        $itemImage = !empty($formattedItem['images'])
            ? $formattedItem['images'][0]['url']
            : asset('icon512_maskable.png');


        // return [
        //     "itemShow" => $formattedItem,
        //     'relatedItems' => $relatedItems,
        // ];
        // 5. Return to Inertia
        return Inertia::render("frontpage/products/Show", [
            "itemShow" => $formattedItem,
            'relatedItems' => $relatedItems,
        ])->withViewData([
            'meta' => [
                'title' => $itemTitle . ' - A-Tech Auto',
                'description' => $itemDescription,
                'image' => $itemImage,
                'keywords' => '',
            ]
        ]);
    }
}
