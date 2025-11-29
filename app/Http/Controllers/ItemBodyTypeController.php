<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\ItemBodyType;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ItemBodyTypeController extends Controller implements HasMiddleware
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

        $query = ItemBodyType::query();


        // Filter by trashed (soft deletes)
        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        $query->orderBy($sortBy, $sortDirection);

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
        return Inertia::render('admin/ItemBodyType/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/ItemBodyType/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'order_index' => 'required|numeric',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
        ]);
        // dd($request->all());


        try {
            // Add creator and updater
            $validated['created_by'] = $request->user()->id;
            $validated['updated_by'] = $request->user()->id;

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $request->file('image'),
                    'assets/images/item_body_types',
                    600
                );
                $validated['image'] = $imageName;
            }

            // Create the Item Body Type
            ItemBodyType::create($validated);

            return redirect()->back()->with('success', 'Item Body Type created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create Item Body Type: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(ItemBodyType $item_body_type)
    {
        return Inertia::render('admin/ItemBodyType/Create', [
            'editData' => $item_body_type,
            'readOnly' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemBodyType $item_body_type)
    {
        return Inertia::render('admin/ItemBodyType/Create', [
            'editData' => $item_body_type,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemBodyType $item_body_type)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'order_index' => 'required|numeric',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg|max:4096',
        ]);

        try {
            // track updater
            $validated['updated_by'] = $request->user()->id;

            $imageFile = $request->file('image');
            unset($validated['image']);

            // Handle image upload if present
            if ($imageFile) {
                $imageName = ImageHelper::uploadAndResizeImageWebp(
                    $imageFile,
                    'assets/images/item_body_types',
                    600
                );

                $validated['image'] = $imageName;

                // delete old if replaced
                if ($imageName && $item_body_type->image) {
                    ImageHelper::deleteImage($item_body_type->image, 'assets/images/item_body_types');
                }
            }

            // Update
            $item_body_type->update($validated);

            return redirect()->back()->with('success', 'Item Body Type updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update Item Body Type: ' . $e->getMessage());
        }
    }


    public function recover($id)
    {
        $item_body_type = ItemBodyType::withTrashed()->findOrFail($id); // 👈 include soft-deleted Item Body Type
        $item_body_type->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Item Body Type recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemBodyType $item_body_type)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $item_body_type->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Item Body Type deleted successfully.');
    }
}
