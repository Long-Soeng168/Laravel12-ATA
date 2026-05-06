<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Shop::query();

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

        $shops = $query->paginate(20);

        // Transform the collection inside the paginator
        $shops->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->logo_url = $item->logo ? asset('assets/images/shops/' . $item->logo) : null;
            $item->banner_url = $item->banner ? asset('assets/images/shops/' . $item->banner) : null;

            return $item;
        });

        return response()->json($shops);
    }
    public function show(Request $request, string $id)
    {
        // 1. Find the specific shop by ID and ensure it is approved
        $shop = Shop::where('status', 'approved')->find($id);

        // 2. Handle 404 if the shop doesn't exist or isn't approved
        if (!$shop) {
            return response()->json(['message' => 'Shop not found'], 404);
        }

        // 3. Transform the single object (No need for transform() on a collection)
        $shop->logo_url = $shop->logo ? asset('assets/images/shops/' . $shop->logo) : null;
        $shop->banner_url = $shop->banner ? asset('assets/images/shops/' . $shop->banner) : null;

        return response()->json($shop);
    }
}
