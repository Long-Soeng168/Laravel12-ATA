<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\Province;
use Illuminate\Http\Request;

class GarageController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $province_code = $request->input('province_code');
        $query = Garage::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        $query->with('province');
        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('id', 'desc');

        if ($province_code) {
            $query->where('province_code', $province_code);
        }

        $garages = $query->paginate(20);

        // Transform the collection inside the paginator
        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/thumb/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/thumb/' . $item->banner) : null;

            return $item;
        });

        return response()->json($garages);
    }

    public function garages_for_map(Request $request)
    {
        $search   = $request->input('search');
        $province_code = $request->input('province_code');

        // New parameters for spatial filtering
        $lat    = $request->input('lat');
        $lng    = $request->input('lng');
        $radius = $request->input('radius', 50); // Default 50km

        $query = Garage::with('province')->where('status', 'approved');

        // Optimization: Spatial Filter (Haversine Formula)
        if ($lat && $lng) {
            $query->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance", [$lat, $lng, $lat])
                ->having('distance', '<=', $radius);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%");
            });
        }

        if ($province_code) {
            $query->where('province_code', $province_code);
        }

        $query->orderBy('order_index');

        // limit results to 100 for map performance
        $garages = $query->paginate(100);

        $garages->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/garages/thumb/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/garages/thumb/' . $item->banner) : null;

            return $item;
        });

        return response()->json($garages);
    }

    public function provinces()
    {
        $provinces = Province::orderBy('order_index')->orderBy('name_kh')->get();
        return response()->json($provinces);
    }
}
