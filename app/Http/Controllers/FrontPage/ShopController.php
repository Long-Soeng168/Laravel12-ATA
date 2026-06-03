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
}
