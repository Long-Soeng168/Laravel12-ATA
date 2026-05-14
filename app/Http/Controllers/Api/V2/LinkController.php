<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Link;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    public function index(Request $request)
    {
        $type_code = $request->type_code;

        // Fetch data based on position presence
        $slides = Link::when($type_code, function ($query, $type_code) {
            return $query->where('type', $type_code);
        })->where('status', 'active')->orderBy('order_index')->get();

        $data = $slides->map(function ($item) {
            $item->image_url = $item->image ? asset('assets/images/links/thumb/' . $item->image) : null;
            return $item;
        });

        return response()->json($data);
    }
}
