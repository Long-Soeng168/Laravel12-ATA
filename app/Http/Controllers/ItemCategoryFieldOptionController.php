<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ItemCategoryField;
use App\Models\ItemCategoryFieldOption;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ItemCategoryFieldOptionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:item view', only: ['index', 'show']),
            new Middleware('permission:item create', only: ['create', 'store']),
            new Middleware('permission:item update', only: ['edit', 'update', 'recover']),
            new Middleware('permission:item delete', only: ['destroy']),
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
        $trashed = $request->input('trashed');
        $field_id = $request->input('field_id'); // Filter options by their parent Field

        $query = ItemCategoryFieldOption::query();

        $filteredField = null;
        if ($field_id) {
            $filteredField = ItemCategoryField::find($field_id);
            $query->where('item_category_field_id', $field_id);
        }

        if ($trashed === 'with') {
            $query->withTrashed();
        } elseif ($trashed === 'only') {
            $query->onlyTrashed();
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('label_en', 'LIKE', "%{$search}%")
                    ->orWhere('label_kh', 'LIKE', "%{$search}%")
                    ->orWhere('option_value', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);

        // Load the parent Field and its Category for breadcrumbs/context
        $query->with(['field.category']);

        $tableData = $query->paginate($perPage)->onEachSide(1);

        return Inertia::render('admin/ItemCategoryFieldOption/Index', [
            'tableData' => $tableData,
            'filteredField' => $filteredField,
            'fields' => ItemCategoryField::orderBy('label')->get(), // For filter dropdowns
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/ItemCategoryFieldOption/Create', [
            'fields' => ItemCategoryField::with('category')->orderBy('label')->get(),
            'selected_field_id' => $request->query('field_id'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_category_field_id' => 'required|exists:item_category_fields,id',
            'option_value'           => [
                'required',
                'string',
                'max:255',
                // Unique machine value per field (e.g., 'auto' can only exist once for 'transmission')
                Rule::unique('item_category_field_options')->where('item_category_field_id', $request->item_category_field_id)
            ],
            'label_en'               => 'required|string|max:255',
            'label_kh'               => 'required|string|max:255',
            'order_index'            => 'required|integer',
        ]);

        try {

            ItemCategoryFieldOption::create($validated);

            return redirect()->back()->with('success', 'Field option created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to create option: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ItemCategoryFieldOption $item_category_field_option)
    {
        return Inertia::render('admin/ItemCategoryFieldOption/Create', [
            'editData' => $item_category_field_option,
            'readOnly' => true,
            'fields' => ItemCategoryField::with('category')->orderBy('label')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemCategoryFieldOption $item_category_field_option)
    {
        return Inertia::render('admin/ItemCategoryFieldOption/Create', [
            'editData' => $item_category_field_option,
            'fields' => ItemCategoryField::with('category')->orderBy('label')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ItemCategoryFieldOption $item_category_field_option)
    {
        $validated = $request->validate([
            'item_category_field_id' => 'required|exists:item_category_fields,id',
            'option_value'           => [
                'required',
                'string',
                'max:255',
                Rule::unique('item_category_field_options')
                    ->where('item_category_field_id', $request->item_category_field_id)
                    ->ignore($item_category_field_option->id)
            ],
            'label_en'               => 'required|string|max:255',
            'label_kh'               => 'required|string|max:255',
            'order_index'            => 'required|integer',
        ]);

        try {
            $item_category_field_option->update($validated);

            return redirect()->back()->with('success', 'Field option updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update option: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemCategoryFieldOption $item_category_field_option)
    {
        $item_category_field_option->delete();
        return redirect()->back()->with('success', 'Field option deleted successfully.');
    }
}
