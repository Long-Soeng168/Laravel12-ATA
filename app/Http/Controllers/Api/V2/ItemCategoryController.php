<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\ItemCategoryField;
use Illuminate\Http\JsonResponse;

class ItemCategoryController extends Controller
{
    /**
     * Get the fields and options blueprint for a specific category.
     */
    public function getFieldsByCategory($cate_id): JsonResponse
    {
        $fields = ItemCategoryField::with(['options' => function ($query) {
            $query->orderBy('order_index', 'asc');
        }])
            ->where('category_id', $cate_id)
            ->orderBy('order_index', 'asc')
            ->get();

        if ($fields->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No fields found for this category.',
                'data' => []
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Fields retrieved successfully.',
            'data' => $fields
        ]);
    }
}
