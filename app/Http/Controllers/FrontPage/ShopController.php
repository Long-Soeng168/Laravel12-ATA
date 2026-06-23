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
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Shop::query();

        // FIELD: search (or q)
        // TYPE: Free type (Text)
        // OPTIONS: Any string typed by the user to search in name, address, or short_description
        $search = $request->input('search') ?? $request->input('q');
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        // FIELD: province_code
        // TYPE: Exact Match (Text)
        // OPTIONS: Dynamic codes from your provinces table (e.g., 'PP', 'SR')
        if ($request->filled('province_code')) {
            $query->where('province_code', $request->input('province_code'));
        }

        // FIELD: is_verified
        // TYPE: Exact Match (Number)
        // OPTIONS: '' (All Shops - ignores filter) or '1' (Verified Only)
        if ($request->input('is_verified') == '1') {
            $query->where('is_verified', 1);
        }

        // FIELD: category_code
        // TYPE: Exact Match (Text)
        // OPTIONS: Dynamic codes from your categories table
        if ($request->filled('category_code')) {
            $categoryCode = $request->input('category_code');

            // Uses your belongsToMany 'categories' relationship
            // and filters by the 'code' column on the ItemCategory model
            $query->whereHas('categories', function ($q) use ($categoryCode) {
                $q->where('code', $categoryCode);
            });
        }

        // Always only show approved shops
        $query->where('status', 'approved');

        // FIELD: sort
        // TYPE: Exact Match (Text)
        // OPTIONS: '' (Latest), 'name_asc' (Name: A-Z), 'name_desc' (Name: Z-A)
        $sort = $request->input('sort');
        if ($sort === 'name_asc') {
            $query->orderBy('name', 'asc');
        } elseif ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } else {
            // Default Sort (Latest)
            $query->orderBy('order_index', 'asc')
                ->orderBy('created_at', 'desc');
        }

        $shops = $query->with('province')->paginate(20);

        // Transform the collection inside the paginator
        $shops->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/shops/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/shops/' . $item->banner) : null;

            return $item;
        });

        $provinces = Province::orderBy('order_index')->orderBy('name_kh')->get();
        $itemCategories = ItemCategory::where('status', 'active')
            ->with(['fields.options', 'brands'])
            ->orderBy('order_index')
            ->orderBy('name')
            ->get()
            ->map(function ($item) {
                $item->image_url = $item->image ? asset('assets/images/item_categories/thumb/' . $item->image) : null;
                $item->brand_ids = $item->brands->pluck('id')->toArray();
                return $item;
            });

        // return [
        //     'shops' => $shops,
        // ];

        return Inertia::render('frontpage/ShopListingPage', [
            'tableData' => $shops,
            'itemCategories' => $itemCategories,
            'provinces' => $provinces,
        ]);
    }

    public function show($id, Request $request)
    {
        // 1. Detect which route we are on (Check for BOTH shop route patterns)
        $isShopRoute = $request->is('shops/*', 'shop-profile*');

        $query = Item::with(['category', 'brand', 'images']);
        $query->where('status', 'active');

        // 2. Set context: Are we filtering items by Shop or by User?
        if ($isShopRoute) {
            $query->where('shop_id', $id);
            $shop = Shop::with(['categories', 'province'])->findOrFail($id);
            $targetUser = null;
        } else {
            // This handles 'users/*' and 'user-profile*'
            $query->where('user_id', $id);
            $targetUser = User::findOrFail($id);
            $shop = null;
        }

        // 3. Determine if the current authenticated user is the owner
        $user = Auth::user();
        $isOwner = false;

        // Only check ownership if the route starts with the specific profile paths
        if ($user && $request->is('shop-profile*', 'user-profile*')) {
            if ($isShopRoute) {
                // User owns the shop if their shop_id matches, or if they are the shop's owner (user_id)
                $isOwner = ($user->shop_id == $shop->id) || ($user->id == $shop->user_id);
            } else {
                // User owns the profile if it's their own ID
                $isOwner = ($user->id == $targetUser->id);
            }
        }


        // --- Filter by Category Code and Dynamic Attributes ---
        if ($request->filled('category_code')) {
            $categoryCode = $request->category_code;
            $query->where('category_code', $categoryCode);

            $category = ItemCategory::where('code', $categoryCode)->first();

            if ($category) {
                $validFields = ItemCategoryField::where('category_id', $category->id)
                    ->pluck('field_key')
                    ->toArray();

                foreach ($request->all() as $key => $value) {
                    if (in_array($key, $validFields) && $request->filled($key)) {
                        $query->where("attributes->$key", $value);
                    }
                }
            }
        }

        // --- Standard Filters ---
        // Note: We removed the shop_id / user_id checks from here because they are strictly enforced in Step 2 based on the URL.
        if ($request->filled('brand_code')) {
            $query->where('brand_code', $request->brand_code);
        }
        if ($request->filled('model_code')) {
            $query->where('model_code', $request->model_code);
        }
        if ($request->filled('body_type_code')) {
            $query->where('body_type_code', $request->body_type_code);
        }
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        if ($request->filled('is_discount')) {
            if ($request->is_discount == '1') {
                $query->whereNotNull('discount')->where('discount', '>', 0);
            } elseif ($request->is_discount == '0') {
                $query->where(function ($q) {
                    $q->whereNull('discount')->orWhere('discount', 0);
                });
            }
        }
        if ($request->filled('is_free_delivery')) {
            $query->where('is_free_delivery', $request->is_free_delivery);
        }
        if ($request->filled('province_code')) {
            $query->where('province_code', $request->province_code);
        }
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

        // --- Sort & Paginate ---
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
            $query->orderByDesc('id');
        }

        $items = $query->paginate(20);

        // --- Pre-fetch mappings for attributes ---
        $categoryIds = $items->pluck('category.id')->filter()->unique();
        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // --- Transform Collection ---
        $items->getCollection()->transform(function ($item) use ($categoryMaps) {
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
            $item->makeHidden(['images']);

            return $item;
        });

        $selectedCategory = ItemCategory::where('code', $request->category_code)->first() ?? null;

        // --- Dynamic Profile / Shop Setup ---
        $shopCategoryCodes = [];

        if ($isShopRoute && $shop) {
            // Prepare Shop Data
            $shop->logo_url = $shop->logo ? asset('assets/images/shops/' . $shop->logo) : null;
            $shop->banner_url = $shop->banner ? asset('assets/images/shops/' . $shop->banner) : null;

            $shop->categories->map(function ($category) {
                $category->image_url = $category->image ? asset('assets/images/item_categories/thumb/' . $category->image) : null;
                return $category;
            });

            $shopCategoryCodes = $shop->categories->pluck('code')->toArray();
            $shop->setAttribute('category_codes', $shopCategoryCodes);

            $profileName = $shop->name ?? $shop->name_en ?? 'Shop Details';
            $profileDesc = isset($shop->description) ? \Illuminate\Support\Str::limit(strip_tags($shop->description), 150) : "Explore {$profileName} on A-Tech Auto.";
            $profileImg = $shop->logo_url ?? $shop->banner_url ?? asset('icon512_maskable.png');
        } else {
            // Prepare User Data
            $targetUser->avatar_url = $targetUser->image ? asset('assets/images/users/' . $targetUser->image) : null;

            $profileName = $targetUser->name;
            $profileDesc = "Explore items listed by {$profileName} on A-Tech Auto.";
            $profileImg = $targetUser->avatar_url ?? asset('icon512_maskable.png');
        }

        // --- Generate Form Data ---
        $form_data = [
            'provinces' => Province::orderBy('order_index')->orderBy('name_kh')->get(),
            'itemCategories' => ItemCategory::where('status', 'active')
                ->when(!empty($shopCategoryCodes), function ($query) use ($shopCategoryCodes) {
                    // Only restrict dropdown to shop categories IF we are viewing a shop.
                    $query->whereIn('code', $shopCategoryCodes);
                })
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
                    $brand->image_url = $brand->image ? asset('assets/images/item_brands/thumb/' . $brand->image) : null;
                    $brand->brand_models->map(function ($model) {
                        $model->image_url = $model->image ? asset('assets/images/item_models/thumb/' . $model->image) : null;
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

        // return [
        //     'isShop' => $isShopRoute, // <-- Useful in React to conditionally render headers
        //     'shop' => $shop,          // Will be null if it's a user profile
        //     'targetUser' => $targetUser, // Will be null if it's a shop profile
        //     'isOwner' => $isOwner,
        //     'form_data' => $form_data,
        //     'tableData' => $items,
        //     'selectedCategory' => $selectedCategory,
        // ];

        // --- Return to Inertia ---
        return Inertia::render('frontpage/products/ShowShopPage', [
            'isShop' => $isShopRoute, // <-- Useful in React to conditionally render headers
            'shop' => $shop,          // Will be null if it's a user profile
            'targetUser' => $targetUser, // Will be null if it's a shop profile
            'isOwner' => $isOwner,
            'form_data' => $form_data,
            'tableData' => $items,
            'selectedCategory' => $selectedCategory,
        ])->withViewData([
            'meta' => [
                'title' => $profileName . ' | A-Tech Auto',
                'description' => $profileDesc,
                'image' => $profileImg,
                'keywords' => '',
            ]
        ]);
    }
}
