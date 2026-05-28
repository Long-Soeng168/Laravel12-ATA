<?php

namespace App\Http\Controllers;

use App\Models\ApplicationInfo;
use App\Models\Banner;
use App\Models\Garage;
use App\Models\GaragePost;
use App\Models\Item;
use App\Models\ItemBodyType;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use App\Models\ItemCategoryField;
use App\Models\ItemDailyView;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Province;
use App\Models\Shop;
use App\Models\VideoPlayList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontPageController extends Controller
{
    public function index(Request $request)
    {
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

        // Clone the base query to prevent ordering clauses from overlapping
        $latest_products = (clone $query)->orderByDesc('id')->limit(10)->get();
        $highlight_products = (clone $query)->inRandomOrder()->limit(10)->get();

        // 3. Pre-fetch mappings for attributes (Optimized)
        // Merge category IDs from both collections to pre-fetch once
        $categoryIds = $latest_products->pluck('category.id')
            ->merge($highlight_products->pluck('category.id'))
            ->filter()
            ->unique();

        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // 4. Transform Collection Logic
        // Define the transformation logic as a closure so we can apply it to both collections
        $transformItem = function ($item) use ($categoryMaps) {

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
        };

        // Apply the transformation directly (get() returns a standard Eloquent Collection, so ->getCollection() is removed)
        $latest_products->transform($transformItem);
        $highlight_products->transform($transformItem);

        // return [
        //     'latest_products'   => $latest_products,
        //     'highlight_products'   => $highlight_products,
        // ];
        return Inertia::render("frontpage/HomePage", [
            'latest_products'   => $latest_products,
            'highlight_products'   => $highlight_products,
        ]);
    }
    public function shops(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 24);
        $sortBy = $request->input('sortBy', 'order_index');
        $sortDirection = $request->input('sortDirection', 'asc');
        $categoryCode = $request->input('category_code');

        $query = Shop::query();
        $query->with('created_by', 'updated_by');

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%");
            });
        }
        if ($categoryCode) {
            $query->where('category_code', $categoryCode);
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->orderBy('id', 'desc');
        $query->orderBy('name');
        $query->where('status', 'approved');

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        // return $tableData;
        return Inertia::render('frontpage/shops/Index', [
            'tableData' => $tableData,
        ]);
    }
    public function garages(Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 24);
        $sortBy = $request->input('sortBy', 'order_index');
        $sortDirection = $request->input('sortDirection', 'asc');
        $province_code = $request->input('province_code');

        $query = Garage::query();
        $query->with('created_by', 'updated_by');

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%");
            });
        }
        if ($province_code) {
            $query->where('province_code', $province_code);
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->orderBy('id', 'desc');
        $query->orderBy('name');
        $query->where('status', 'approved');

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        $provinces = Province::orderBy('order_index')->withCount('garages')->orderBy('name')->get();

        // return $provinces;
        return Inertia::render('frontpage/garages/Index', [
            'tableData' => $tableData,
            'provinces' => $provinces,
        ]);
    }

    public function garage_show($id, Request $request)
    {
        $search = $request->input('search', '');
        $perPage = $request->input('perPage', 25);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = GaragePost::query();
        $query->with('created_by', 'updated_by', 'images', 'garage');


        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('short_description', 'LIKE', "%{$search}%")
                    ->orWhere('short_description_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->where('status', 'active');
        $query->where('garage_id', $id);

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        return Inertia::render('frontpage/garages/Show', [
            'garage' => Garage::findOrFail($id)->load('province'),
            'tableData' => $tableData,
        ]);
    }



    public function blogs(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');
        $category_code = $request->input('category_code');

        $query = Post::query();

        $query->with('created_by', 'updated_by', 'images', 'category', 'source_detail');

        if ($status) {
            $query->where('status', $status);
        } else {
            $query->where('status', 'active');
        }
        if ($category_code) {
            $query->where('category_code', $category_code);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%");
            });
        }

        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();

        $tableData = $query->paginate(perPage: 9)->onEachSide(1);
        return Inertia::render('frontpage/blogs/Index', [
            'tableData' => $tableData,
            'postCategories' => $postCategories,
        ]);
    }

    public function blog_show($id)
    {
        $post = Post::find($id);
        $postCategories = PostCategory::where('status', 'active')->withCount('posts')->orderBy('order_index')->get();
        $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->where('category_code', $post->category_code)->orderBy('id', 'desc')->limit(6)->get();

        return Inertia::render("frontpage/blogs/Show", [
            "post" => $post->load('images', 'category'),
            'postCategories' => $postCategories,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function products(Request $request)
    {
        $search = $request->input('search', '');
        $brand_code = $request->input('brand_code', '');
        $perPage = $request->input('perPage', 25);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $category_code = $request->input('category_code', '');
        $body_type_code = $request->input('body_type_code', '');

        $query = Item::query();
        $query->with('created_by', 'updated_by', 'images', 'category', 'shop');

        if ($category_code) {
            // get category and its children codes
            $category = ItemCategory::with('children')->where('code', $category_code)->first();

            if ($category) {
                $categoryCodes = collect([$category->code])
                    ->merge($category->children->pluck('code'))
                    ->toArray();

                $query->whereIn('category_code', $categoryCodes);
            }
        }

        if ($brand_code) {
            $query->where('brand_code', $brand_code);
        }
        if ($body_type_code) {
            $query->where('body_type_code', $body_type_code);
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->where('status', 'active');

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        $item_brands = ItemBrand::orderBy('order_index')->orderBy('name')
            ->withCount('items')
            ->where('status', 'active') // Specify 'item_categories' table for status
            ->get();
        $item_body_types = ItemBodyType::orderBy('order_index')->orderBy('name')
            ->withCount('items')
            ->where('status', 'active') // Specify 'item_categories' table for status
            ->get();
        $productListBanners = Banner::where('position_code', 'PRODUCT_SEARCH')->orderBy('order_index')->where('status', 'active')->get();

        return Inertia::render('frontpage/products/Index', [
            'tableData' => $tableData,
            'item_brands' => $item_brands,
            'item_body_types' => $item_body_types,
            'productListBanners' => $productListBanners,
        ]);
    }

    public function shop_show($id, Request $request)
    {
        $search = $request->input('search', '');
        $brand_code = $request->input('brand_code', '');
        $perPage = $request->input('perPage', 25);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $category_code = $request->input('category_code', '');
        $body_type_code = $request->input('body_type_code', '');

        $query = Item::query();
        $query->with('created_by', 'updated_by', 'images', 'category', 'shop');

        if ($category_code) {
            // get category and its children codes
            $category = ItemCategory::with('children')->where('code', $category_code)->first();

            if ($category) {
                $categoryCodes = collect([$category->code])
                    ->merge($category->children->pluck('code'))
                    ->toArray();

                $query->whereIn('category_code', $categoryCodes);
            }
        }

        if ($brand_code) {
            $query->where('brand_code', $brand_code);
        }
        if ($body_type_code) {
            $query->where('body_type_code', $body_type_code);
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->where('status', 'active');
        $query->where('shop_id', $id);

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        // $item_brands = ItemBrand::orderBy('order_index')->orderBy('name')
        //     ->withCount('items')
        //     ->where('status', 'active') // Specify 'item_categories' table for status
        //     ->get();
        // $item_body_types = ItemBodyType::orderBy('order_index')->orderBy('name')
        //     ->withCount('items')
        //     ->where('status', 'active') // Specify 'item_categories' table for status
        //     ->get();
        // $productListBanners = Banner::where('position_code', 'PRODUCT_SEARCH')->orderBy('order_index')->where('status', 'active')->get();

        return Inertia::render('frontpage/shops/Show', [
            'shop' => Shop::find($id),
            'tableData' => $tableData,
            // 'item_brands' => $item_brands,
            // 'item_body_types' => $item_body_types,
            // 'productListBanners' => $productListBanners,
        ]);
    }


    public function online_trainings(Request $request)
    {
        $search = $request->input('search', '');
        $brand_code = $request->input('brand_code', '');
        $perPage = $request->input('perPage', 25);
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');

        $query = VideoPlayList::query();
        $query->with('created_by', 'updated_by');
        $query->withCount('videos');



        if ($brand_code) {
            $query->where('brand_code', $brand_code);
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->where('status', 'active');

        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        return Inertia::render('frontpage/online_trainings/Index', [
            'tableData' => $tableData,
        ]);
    }
    public function online_training_show($id)
    {
        $videoPlaylist = VideoPlayList::find($id);

        $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->orderBy('id', 'desc')->limit(6)->get();

        return Inertia::render("frontpage/online_trainings/Show", [
            "videoPlaylist" => $videoPlaylist,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function product_show($id)
    {
        $itemShow = Item::find($id);

        $relatedItemsQuery = Item::query();

        $relatedItemsQuery->with(['category', 'images', 'shop']);

        $relatedItemsQuery->where('id', '!=', $id);
        $relatedItemsQuery->where('status', 'active');

        if ($itemShow->category_code) {
            $relatedItemsQuery->where('category_code', $itemShow->category_code);
        }

        $relatedItems = $relatedItemsQuery
            ->orderByDesc('id')
            ->limit(12)
            ->get();

        $date = now()->toDateString();
        $view = ItemDailyView::firstOrCreate(
            ['item_id' => $id, 'view_date' => $date],
            ['view_counts' => 0],
        );
        $view->increment('view_counts');

        $itemShow->update([
            'total_view_counts' => $itemShow->total_view_counts + 1,
        ]);

        return Inertia::render("frontpage/products/Show", [
            "itemShow" => $itemShow->load('created_by', 'updated_by', 'images', 'category', 'brand', 'shop'),
            'relatedItems' => $relatedItems,
        ]);
    }

    public function shopping_cart()
    {
        return Inertia::render("frontpage/cart/ShoppingCart");
    }
    public function checkout()
    {
        return Inertia::render("frontpage/cart/Checkout");
    }
    public function success()
    {
        return Inertia::render("frontpage/cart/Success");
    }
    public function download_app()
    {
        return Inertia::render("frontpage/DownloadApp");
    }
    public function privacy()
    {
        $privacies = Page::with('children')->where('code', 'PRIVACY-POLICY-PAGE')->where('status', 'active')->orderBy('order_index')->first();
        // return $privacies;
        return Inertia::render("frontpage/Privacy", [
            'privacies' => $privacies,
        ]);
    }
    public function privacy_webview()
    {
        $privacies = Page::with('children')->where('code', 'PRIVACY-POLICY-PAGE')->where('status', 'active')->orderBy('order_index')->first();
        // return $privacies;
        return Inertia::render("frontpage/web_view/PrivacyWebView", [
            'privacies' => $privacies,
        ]);
    }
    public function about()
    {
        $about = Page::with('children')->where('code', 'ABOUT-ATA-AUTO')->where('status', 'active')->orderBy('order_index')->first();
        $whyChooseUs = Page::with('children')->where('code', 'WHY-CHOOSE-US')->where('status', 'active')->orderBy('order_index')->first();
        $buildForEveryone = Page::with('children')->where('code', 'BUILD-FOR-EVERYONE')->where('status', 'active')->orderBy('order_index')->first();
        $getInTouch = Page::with('children')->where('code', 'GET-IN-TOUCH')->where('status', 'active')->orderBy('order_index')->first();
        $privacyPolicy = Page::with('children')->where('code', 'PRIVACY-POLICY')->where('status', 'active')->orderBy('order_index')->first();
        $getStartedNow = Page::with('children')->where('code', 'GET-STARTED-NOW')->where('status', 'active')->orderBy('order_index')->first();
        // return $about;
        return Inertia::render("frontpage/About", [
            "about" => $about,
            "whyChooseUs" => $whyChooseUs,
            "buildForEveryone" => $buildForEveryone,
            "getInTouch" => $getInTouch,
            "privacyPolicy" => $privacyPolicy,
            "getStartedNow" => $getStartedNow,
        ]);
    }
    public function about_webview()
    {
        $about = Page::with('children')->where('code', 'ABOUT-ATA-AUTO')->where('status', 'active')->orderBy('order_index')->first();
        $whyChooseUs = Page::with('children')->where('code', 'WHY-CHOOSE-US')->where('status', 'active')->orderBy('order_index')->first();
        $buildForEveryone = Page::with('children')->where('code', 'BUILD-FOR-EVERYONE')->where('status', 'active')->orderBy('order_index')->first();
        $getInTouch = Page::with('children')->where('code', 'GET-IN-TOUCH')->where('status', 'active')->orderBy('order_index')->first();
        $privacyPolicy = Page::with('children')->where('code', 'PRIVACY-POLICY')->where('status', 'active')->orderBy('order_index')->first();
        $getStartedNow = Page::with('children')->where('code', 'GET-STARTED-NOW')->where('status', 'active')->orderBy('order_index')->first();
        // return $about;
        return Inertia::render("frontpage/web_view/AboutWebView", [
            "about" => $about,
            "whyChooseUs" => $whyChooseUs,
            "buildForEveryone" => $buildForEveryone,
            "getInTouch" => $getInTouch,
            "privacyPolicy" => $privacyPolicy,
            "getStartedNow" => $getStartedNow,
        ]);
    }

    public function contact()
    {
        $contactPage = Page::with('images')->where('position_code', 'CONTACT')->where('status', 'active')->orderBy('order_index')->first();

        return Inertia::render("frontpage/Contact", [
            "contactPage" => $contactPage
        ]);
    }
    public function contact_webview()
    {
        $contactPage = Page::with('images')->where('position_code', 'CONTACT')->where('status', 'active')->orderBy('order_index')->first();

        return Inertia::render("frontpage/web_view/ContactWebView", [
            "contactPage" => $contactPage
        ]);
    }
    public function documents()
    {
        return Inertia::render("frontpage/Documents");
    }
}
