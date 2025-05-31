<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Image;


class CourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        if ($search) {
            $items = Course::where('title', 'LIKE', "%$search%")->paginate(10);
        } else {
            $items = Course::paginate(10);
        }

        // Transform each item in the paginated data
        $items->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'title_kh' => $item->title_kh ?? '',
                'image' => $item->image ?? '',
                'description' => $item->short_description ?? '', // or null if you want
                'description_kh' => $item->short_description_kh ?? '', // or null if you want
                'price' => $item->price ?? '',
                'start' => $item->start_at ?? '',
                'end' => $item->end_at ?? '',
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });

        return response()->json($items);
    }


    public function show(string $id)
    {
        $item = Course::findOrFail($id); // Retrieve the item with the given ID
        $data = [
            'id' => $item->id,
            'title' => $item->title,
            'title_kh' => $item->title_kh ?? '',
            'image' => $item->image ?? '',
            'description' => $item->short_description ?? '', // or null if you want
            'description_kh' => $item->short_description_kh ?? '', // or null if you want
            'price' => $item->price ?? '',
            'start' => $item->start_at ?? '',
            'end' => $item->end_at ?? '',
            'created_at' => $item->created_at,
            'updated_at' => $item->updated_at,
        ];

        return response()->json($data);
    }
}
