<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ItemBrandController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:item view', only: ['index', 'show']),
            new Middleware('permission:item create', only: ['create', 'store']),
            new Middleware('permission:item update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:item delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $trashed = $request->input('trashed'); // '', 'with', 'only'

        $query = ItemBrand::query();


        // Filter by trashed (soft deletes)
        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        $query->orderBy($sortBy, $sortDirection);
        $query->with('categories');

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy('id', 'desc');

        $query->with('updated_user', 'created_user');

        $tableData = $query->paginate($perPage)->onEachSide(1);

        // return $tableData;
        // return $filteredBrand;
        return Inertia::render('admin/ItemBrand/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/ItemBrand/Create', [
            'categories' => ItemCategory::orderByDesc('order_index')->orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:item_brands,code', // Added unique validation
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'order_index' => 'required|numeric',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'category_ids' => 'nullable|array', // Validate incoming categories
            'category_ids.*' => 'exists:item_categories,id', // Ensure categories actually exist
        ]);

        try {
            DB::beginTransaction();

            // Extract category_ids and remove from validated array so it doesn't break the create() method
            $categoryIds = $request->input('category_ids', []);
            unset($validated['category_ids']);

            // Add creator and updater
            $validated['created_by'] = $request->user()->id;
            $validated['updated_by'] = $request->user()->id;

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('image'),
                    'assets/images/item_brands',
                    600
                );
                $validated['image'] = $imageName;
            }

            // Create the Item Brand
            $itemBrand = ItemBrand::create($validated);

            // Attach the many-to-many categories
            if (!empty($categoryIds)) {
                $itemBrand->categories()->attach($categoryIds);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Item Brand created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('Failed to create Item Brand: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(ItemBrand $item_brand)
    {
        // Load the associated categories so your frontend can display them
        $item_brand->load('categories');

        return Inertia::render('admin/ItemBrand/Create', [
            'categories' => ItemCategory::orderByDesc('order_index')->orderBy('name')->get(),
            'editData' => $item_brand,
            'readOnly' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemBrand $item_brand)
    {
        // Load the associated categories so your frontend knows which ones are selected
        $item_brand->load('categories');

        return Inertia::render('admin/ItemBrand/Create', [
            'categories' => ItemCategory::orderByDesc('order_index')->orderBy('name')->get(),
            'editData' => $item_brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemBrand $item_brand)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:item_brands,code,' . $item_brand->id, // Ignore current brand ID for unique check
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'order_index' => 'required|numeric',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
            'category_ids' => 'nullable|array', // Validate incoming categories
            'category_ids.*' => 'exists:item_categories,id',
        ]);

        try {
            DB::beginTransaction();

            // Extract category_ids and remove from validated array
            $categoryIds = $request->input('category_ids', []);
            unset($validated['category_ids']);

            // track updater
            $validated['updated_by'] = $request->user()->id;

            $imageFile = $request->file('image');
            unset($validated['image']);

            // Handle image upload if present
            if ($imageFile) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $imageFile,
                    'assets/images/item_brands',
                    600
                );

                $validated['image'] = $imageName;

                // delete old if replaced
                if ($imageName && $item_brand->image) {
                    ImageHelper::deleteImage($item_brand->image, 'assets/images/item_brands');
                }
            }

            // Update the brand details
            $item_brand->update($validated);

            // Sync the many-to-many categories (this automatically adds new ones and removes unselected ones)
            $item_brand->categories()->sync($categoryIds);

            DB::commit();

            return redirect()->back()->with('success', 'Item Brand updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('Failed to update Item Brand: ' . $e->getMessage());
        }
    }


    public function recover($id)
    {
        $item_brand = ItemBrand::withTrashed()->findOrFail($id); // 👈 include soft-deleted Item Brand
        $item_brand->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Item Brand recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemBrand $item_brand)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $item_brand->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Item Brand deleted successfully.');
    }
}
