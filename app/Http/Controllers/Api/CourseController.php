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
        return response()->json($items);
    }

    public function show(string $id)
    {
        $item = Course::findOrFail($id); // Retrieve the item with the given ID
        return response()->json($item);
    }
}
