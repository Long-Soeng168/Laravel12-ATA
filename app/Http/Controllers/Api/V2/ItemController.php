<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Item; // Assuming your model for products/items is Item
use App\Models\ItemBodyType;
use App\Models\ItemBrand;
use App\Models\ItemCategory;
use App\Models\ItemCategoryField;
use App\Models\ItemImage;
use App\Models\ItemModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    /**
     * GET /api/v2/items
     * Get paginated items with full translated attributes and dynamic filtering
     */
    public function index(Request $request)
    {
        // 1. Start the Query with relationships. 
        // Optimization: We still eager load 'images' to get the count and the first one.
        $query = Item::with(['category', 'images']);

        // Filter by Category Code
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

        // Standard Filters (Brand, Search)
        if ($request->filled('brand_code')) {
            $query->where('brand_code', $request->brand_code);
        }

        if ($request->filled('q')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                    ->orWhere('name_kh', 'like', '%' . $request->q . '%');
            });
        }

        // 2. Paginate
        $items = $query->latest()->paginate(15);

        // 3. Pre-fetch mappings for attributes (Optimization for transformation)
        $categoryCodes = $items->pluck('category_code')->unique();
        $categoryIds = ItemCategory::whereIn('code', $categoryCodes)->pluck('id');

        $categoryMaps = ItemCategoryField::whereIn('category_id', $categoryIds)
            ->with('options')
            ->get()
            ->groupBy('category_id');

        // 4. Transform Collection
        $items->getCollection()->transform(function ($item) use ($categoryMaps) {
            // --- Image Optimization for Flutter List ---
            $firstImage = $item->images->first();

            $item->thumbnail_url = $firstImage
                ? asset('assets/images/items/' . $firstImage->image)
                : asset('assets/images/placeholder.webp'); // Fallback if no image

            $item->total_images = $item->images->count();

            // Optional: If you still want the image object structure but just 1 item:
            $item->thumbnail_image = $firstImage ? [
                'id' => $firstImage->id,
                'image' => $firstImage->image,
                'url' => asset('assets/images/items/' . $firstImage->image),
            ] : null;

            // --- Attribute Display Logic ---
            $categoryId = $item->category ? $item->category->id : null;
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

            // Remove the full images collection to keep the JSON small
            unset($item->images);
            unset($item->category); // Usually not needed in index if category_code is there

            return $item;
        });

        return response()->json($items);
    }

    /**
     * GET FORM DATA (For Flutter Dropdowns)
     */
    public function form_data()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'itemCategories' => ItemCategory::where('status', 'active')
                    ->with(['fields.options'])
                    ->orderBy('order_index')
                    ->orderBy('name')
                    ->get(),

                'itemBrands' => ItemBrand::where('status', 'active')->orderBy('name')->get(),
                'itemModels' => ItemModel::where('status', 'active')->orderBy('name')->get(),
                'itemBodyTypes' => ItemBodyType::where('status', 'active')->orderBy('name')->get(),
            ]
        ]);
    }

    /**
     * SHOW ITEM (Formatted for Mobile)
     */
    public function show($id)
    {
        // Eager load everything needed, but we will selectively return data
        $item = Item::with(['images', 'category.fields.options'])->findOrFail($id);

        // 1. Convert the basic item to an array
        $formattedItem = $item->toArray();

        // 2. Cast numerical values for Flutter/Dart type safety
        $formattedItem['price'] = (float) $item->price;
        $formattedItem['cost'] = (float) $item->cost;
        $formattedItem['discount'] = (float) $item->discount;

        // 3. Generate display_attributes logic
        $displayAttributes = [];
        $attributes = $item->attributes ?? [];

        if ($item->category && $item->category->fields) {
            foreach ($item->category->fields as $field) {
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

        // 4. CLEANUP: Remove the heavy 'fields' from the category object
        // This reduces the JSON size significantly.
        if (isset($formattedItem['category'])) {
            unset($formattedItem['category']['fields']);
        }

        $formattedItem['display_attributes'] = $displayAttributes;

        // 5. Format images with absolute URLs
        $formattedItem['images'] = $item->images->map(function ($img) {
            return [
                'id' => $img->id,
                'image' => $img->image,
                'url' => asset('assets/images/items/' . $img->image),
                'item_id' => $img->item_id,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $formattedItem
        ]);
    }

    /**
     * STORE ITEM
     */
    public function store(Request $request)
    {
        // 1. Dynamic Validation for Category Attributes
        $dynamicRules = [];
        if ($request->category_code) {
            $category = ItemCategory::where('code', $request->category_code)->first();
            if ($category) {
                $requiredFields = ItemCategoryField::where('category_id', $category->id)
                    ->where('is_required', true)
                    ->get();

                foreach ($requiredFields as $field) {
                    $dynamicRules["attributes.{$field->field_key}"] = 'required';
                }
            }
        }

        $validator = Validator::make($request->all(), array_merge([
            'name' => 'required|string|max:255',
            'name_kh' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'category_code' => 'required|string|exists:item_categories,code',
            'brand_code' => 'nullable|string|exists:item_brands,code',
            'model_code' => 'nullable|string|exists:item_models,code',
            'body_type_code' => 'nullable|string|exists:item_body_types,code',
            'attributes' => 'nullable|array',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB limit
        ], $dynamicRules));

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        return DB::transaction(function () use ($request) {
            $data = $request->all();

            // Clean empty strings to null
            foreach ($data as $key => $value) {
                if (is_string($value) && $value === '') $data[$key] = null;
            }

            $data['created_by'] = $request->user()->id;
            $data['shop_id'] = $request->user()->shop_id;

            $item = Item::create($data);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                    ItemImage::create([
                        'item_id' => $item->id,
                        'image' => $filename,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Item created.',
                'data' => $item->load('images')
            ], 201);
        });
    }

    /**
     * UPDATE ITEM
     */
    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        // Flutter often sends PUT requests as POST with _method=PUT
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_code' => 'required|string|exists:item_categories,code',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        return DB::transaction(function () use ($request, $item) {
            $data = $request->all();
            foreach ($data as $key => $value) {
                if (is_string($value) && $value === '') $data[$key] = null;
            }

            $item->update($data);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/items', 800);
                    ItemImage::create(['item_id' => $item->id, 'image' => $filename]);
                }
            }

            return response()->json(['success' => true, 'message' => 'Item updated.', 'data' => $item->load('images')]);
        });
    }

    /**
     * DELETE IMAGE (Specific for Flutter Edit screen)
     */
    public function destroyImage($imageId)
    {
        $image = ItemImage::find($imageId);
        if (!$image) return response()->json(['success' => false, 'message' => 'Not found'], 404);

        ImageHelper::deleteImage($image->image, 'assets/images/items');
        $image->delete();

        return response()->json(['success' => true, 'message' => 'Image removed']);
    }

    /**
     * DELETE ITEM
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);

        foreach ($item->images as $image) {
            ImageHelper::deleteImage($image->image, 'assets/images/items');
        }

        $item->delete();
        return response()->json(['success' => true, 'message' => 'Item deleted']);
    }
}
