<?php

namespace App\Http\Controllers\FrontPage;

use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\GaragePost;
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

class GarageController extends Controller
{
    public function index(Request $request)
    {
        $query = Garage::query();

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

        $garages = $query->with('province')->paginate(20);

        // Transform the collection inside the paginator
        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/' . $item->banner) : null;

            return $item;
        });

        $provinces = Province::orderBy('order_index')->orderBy('name_kh')->get();

        // return [
        //     'garages' => $garages,
        // ];

        return Inertia::render('frontpage/GarageListingPage', [
            'tableData' => $garages,
            'provinces' => $provinces,
        ]);
    }

    public function show($id, Request $request)
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

        // Transform collection
        $tableData->getCollection()->transform(function ($item) {
            $firstImage = $item->images->first();

            // Setup primary image url
            $item->image_url = $firstImage
                ? asset('assets/images/garage_posts/' . $firstImage->image)
                : asset('assets/images/placeholder.webp');

            $item->total_images = $item->images->count();

            // Transform each individual image to include a ready-to-use URL
            $item->images->transform(function ($img) {
                $img->url = asset('assets/images/garage_posts/' . $img->image);
                return $img;
            });

            // WE REMOVED: $item->makeHidden(['images']); 
            // So now the 'images' array will be included in the JSON response!

            return $item;
        });

        // return [
        //     'garage' => Garage::findOrFail($id)->load('province'),
        //     'tableData' => $tableData,
        // ];

        return Inertia::render('frontpage/garages/Show', [
            'garage' => Garage::findOrFail($id)->load('province'),
            'tableData' => $tableData,
        ]);
    }
}
