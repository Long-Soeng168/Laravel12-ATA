<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\Garage;
use Illuminate\Http\Request;

class GarageController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Garage::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('id', 'desc');

        $garages = $query->paginate(20);

        // Transform the collection inside the paginator
        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/' . $item->banner) : null;

            return $item;
        });

        return response()->json($garages);
    }
}
