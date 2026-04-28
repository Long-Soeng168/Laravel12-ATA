<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $position = $request->position;

        // Fetch data based on position presence
        $slides = Banner::when($position, function ($query, $position) {
            return $query->where('position_code', $position);
        })->get();


        $data = $slides->map(function ($item) {
            $item->image_url = $item->image ? asset('assets/images/banners/' . $item->image) : null;
            return $item;
        });

        return response()->json($data);
    }
}
