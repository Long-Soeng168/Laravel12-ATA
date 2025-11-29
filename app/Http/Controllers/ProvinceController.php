<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ProvinceController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:garage view', only: ['index', 'show']),
            new Middleware('permission:garage create', only: ['create', 'store']),
            new Middleware('permission:garage update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:garage delete', only: ['destroy', 'destroy_image']),
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

        $query = Province::query();


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
        // return $filteredProvince;
        return Inertia::render('admin/Province/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/Province/Create', []);
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
                    'assets/images/item_provinces',
                    600
                );
                $validated['image'] = $imageName;
            }

            // Create the Item Province
            Province::create($validated);

            return redirect()->back()->with('success', 'Item Province created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create Item Province: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Province $province)
    {
        return Inertia::render('admin/Province/Create', [
            'editData' => $province,
            'readOnly' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Province $province)
    {
        return Inertia::render('admin/Province/Create', [
            'editData' => $province,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Province $province)
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
                    'assets/images/item_provinces',
                    600
                );

                $validated['image'] = $imageName;

                // delete old if replaced
                if ($imageName && $province->image) {
                    ImageHelper::deleteImage($province->image, 'assets/images/item_provinces');
                }
            }

            // Update
            $province->update($validated);

            return redirect()->back()->with('success', 'Item Province updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update Item Province: ' . $e->getMessage());
        }
    }


    public function recover($id)
    {
        $province = Province::withTrashed()->findOrFail($id); // 👈 include soft-deleted Item Province
        $province->restore(); // restores deleted_at to null
        return redirect()->back()->with('success', 'Item Province recovered successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Province $province)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $province->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Item Province deleted successfully.');
    }
}
