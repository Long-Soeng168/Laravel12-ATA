<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\ItemCategory;
use App\Models\ItemCategoryField;
use App\Models\Type;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ItemCategoryFieldController extends Controller implements HasMiddleware
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
    private function getFieldTypes()
    {
        return [
            ['value' => 'text', 'label' => 'Text Input'],
            ['value' => 'number', 'label' => 'Number Input'],
            ['value' => 'select', 'label' => 'Dropdown (Select)'],
            ['value' => 'radio', 'label' => 'Radio Buttons'],
            ['value' => 'checkbox', 'label' => 'Checkbox'],
            ['value' => 'textarea', 'label' => 'Long Text (Area)'],
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id'); // Default to order_index for fields
        $sortDirection = $request->input('sortDirection', 'desc');
        $trashed = $request->input('trashed');
        $category_id = $request->input('category_id'); // Using ID is more reliable for fields

        $query = ItemCategoryField::query();

        // 1. Filter by Category
        // We assume you want to see fields for a specific category
        $filteredCategory = null;
        if ($category_id) {
            $filteredCategory = ItemCategory::find($category_id);
            $query->where('category_id', $category_id);
        }

        // 2. Filter by trashed (Note: Only if ItemCategoryField uses SoftDeletes trait)
        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        // 3. Search Logic (Updated for your new columns)
        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('label', 'LIKE', "%{$search}%")
                    ->orWhere('label_kh', 'LIKE', "%{$search}%")
                    ->orWhere('field_key', 'LIKE', "%{$search}%")
                    ->orWhere('field_type', 'LIKE', "%{$search}%")
                    ->orWhere('id', $search);
            });
        }

        // 4. Sorting
        $query->orderBy($sortBy, $sortDirection);

        // 5. Eager Loading (Includes options count for the table view)
        $query->with(['category', 'options' => function ($q) {
            $q->orderBy('order_index', 'asc');
        }])->withCount('options');

        $tableData = $query->paginate($perPage)->onEachSide(1);

        return Inertia::render('admin/ItemCategoryField/Index', [
            'tableData' => $tableData,
            // Categories list for the filter dropdown
            'categories' => ItemCategory::orderBy('name')->get(),
            'filteredCategory' => $filteredCategory,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // We fetch all categories so the admin can choose which category 
        // this field belongs to, even if one isn't pre-selected.
        $categories = ItemCategory::orderBy('name')->get();

        return Inertia::render('admin/ItemCategoryField/Create', [
            'categories' => $categories,
            'fieldTypes' => $this->getFieldTypes(),
            // Pre-select the category if coming from the category fields index
            'selected_category_id' => $request->query('category_id'),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:item_categories,id',
            'label'       => 'required|string|max:255',
            'label_kh'    => 'required|string|max:255',
            'field_type'  => 'required|string|in:text,number,select,radio,checkbox,textarea',
            'order_index' => 'required|integer',
            'is_required' => 'nullable|boolean',
            // Ensure the field_key is unique for THIS category only
            'field_key'   => [
                'required',
                'string',
                'max:255',
                \Illuminate\Validation\Rule::unique('item_category_fields')
                    ->where('category_id', $request->category_id)
            ],
        ]);

        try {
            // Create the Field Blueprint
            ItemCategoryField::create($validated);

            return redirect()->back()->with('success', 'Category field created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create field: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    /**
     * Display the specified resource.
     */
    public function show(ItemCategoryField $item_category_field)
    {
        return Inertia::render('admin/ItemCategoryField/Create', [
            'editData' => $item_category_field,
            'readOnly' => true,
            'categories' => ItemCategory::orderBy('name')->get(),
            'fieldTypes' => $this->getFieldTypes(), // Shared helper or static array
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemCategoryField $item_category_field)
    {
        return Inertia::render('admin/ItemCategoryField/Create', [
            'editData' => $item_category_field,
            'categories' => ItemCategory::orderBy('name')->get(),
            'fieldTypes' => $this->getFieldTypes(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemCategoryField $item_category_field)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:item_categories,id',
            'label'       => 'required|string|max:255',
            'label_kh'    => 'required|string|max:255',
            'field_type'  => 'required|string|in:text,number,select,radio,checkbox,textarea',
            'order_index' => 'required|integer',
            'is_required' => 'nullable|boolean',
            'field_key'   => [
                'required',
                'string',
                'max:255',
                \Illuminate\Validation\Rule::unique('item_category_fields')
                    ->where('category_id', $request->category_id)
                    ->ignore($item_category_field->id) // Allow the current record to keep its key
            ],
        ]);

        try {
            $item_category_field->update($validated);

            return redirect()->back()->with('success', 'Category field updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update field: ' . $e->getMessage());
        }
    }

    /**
     * Helper to keep field types consistent across create/edit/show
     */


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemCategoryField $item_category_field)
    {
        // if ($user->image) {
        //     ImageHelper::deleteImage($user->image, 'assets/images/users');
        // }

        $item_category_field->delete(); // this will now just set deleted_at timestamp
        return redirect()->back()->with('success', 'Item Category Field deleted successfully.');
    }
}
