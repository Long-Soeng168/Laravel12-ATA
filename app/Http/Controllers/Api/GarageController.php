<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\ItemBrand;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use Image;

class GarageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search   = $request->input('search');
        $expertId = $request->input('expertId');
        $provinceId = $request->input('provinceId');

        $query = Garage::with('expert');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        if ($expertId) {
            $brand = ItemBrand::find($expertId);
            if ($brand) {
                $query->where('brand_code', $brand->code);
            }
        }
        if ($provinceId) {
            $province = Province::find($provinceId);
            if ($province) {
                $query->where('province_code', $province->code);
            }
        }

        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('id', 'desc');

        $garages = $query->paginate(1000);

        // Map to old key format
        $convertedGarages = $garages->getCollection()->map(function ($garage) {
            return [
                'id'          => $garage->id,
                'name'        => $garage->name,
                'address'     => $garage->address,
                'phone'       => $garage->phone,
                'user_id'     => $garage->owner_user_id,
                'brand_id'    => $garage->expert ? $garage->expert->id : null,
                'logo'        => $garage->logo,
                'banner'      => $garage->banner,
                'description' => $garage->short_description,
                'latitude' => $garage->latitude,
                'longitude' => $garage->longitude,
                'created_at'  => $garage->created_at,
                'updated_at'  => $garage->updated_at,

                'expert' => $garage->expert ? [
                    'id'                => $garage->expert->id,
                    'create_by_user_id' => $garage->expert->created_by,
                    'name'              => $garage->expert->name,
                    'name_kh'           => $garage->expert->name_kh,
                    'code'              => $garage->expert->code,
                    'image'             => $garage->expert->image,
                    'status'            => $garage->expert->status === 'active' ? 1 : 0,
                    'created_at'        => $garage->expert->created_at,
                    'updated_at'        => $garage->expert->updated_at,
                ] : null,
            ];
        });

        // Replace the collection in the paginator
        $garages->setCollection($convertedGarages);

        return response()->json($garages);
    }

    public function allGarages(Request $request)
    {
        $search   = $request->input('search');
        $expertId = $request->input('expertId');

        $query = Garage::with('expert');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('address', 'LIKE', "%$search%")
                    ->orWhere('short_description', 'LIKE', "%$search%");
            });
        }

        if ($expertId) {
            $brand = ItemBrand::find($expertId);
            if ($brand) {
                $query->where('brand_code', $brand->code);
            }
        }

        $query->where('status', 'approved');
        $query->orderBy('order_index');
        $query->orderBy('id', 'desc');

        $garages = $query->paginate(1000);

        // Map to old key format
        $convertedGarages = $garages->getCollection()->map(function ($garage) {
            return [
                'id'          => $garage->id,
                'name'        => $garage->name,
                'address'     => $garage->address,
                'phone'       => $garage->phone,
                'user_id'     => $garage->owner_user_id,
                'brand_id'    => $garage->expert ? $garage->expert->id : null,
                'logo'        => $garage->logo,
                'banner'      => $garage->banner,
                'description' => $garage->short_description,
                'latitude' => $garage->latitude,
                'longitude' => $garage->longitude,
                'created_at'  => $garage->created_at,
                'updated_at'  => $garage->updated_at,

                'expert' => $garage->expert ? [
                    'id'                => $garage->expert->id,
                    'create_by_user_id' => $garage->expert->created_by,
                    'name'              => $garage->expert->name,
                    'name_kh'           => $garage->expert->name_kh,
                    'code'              => $garage->expert->code,
                    'image'             => $garage->expert->image,
                    'status'            => $garage->expert->status === 'active' ? 1 : 0,
                    'created_at'        => $garage->expert->created_at,
                    'updated_at'        => $garage->expert->updated_at,
                ] : null,
            ];
        });

        // Replace the collection in the paginator
        $garages->setCollection($convertedGarages);

        return response()->json($garages);
    }


    // New for performance
    public function allGaragesV2(Request $request)
    {
        $search   = $request->input('search');
        $expertId = $request->input('expertId');

        // New parameters for spatial filtering
        $lat    = $request->input('lat');
        $lng    = $request->input('lng');
        $radius = $request->input('radius', 50); // Default 50km

        $query = Garage::with('expert')->where('status', 'approved');

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

        if ($expertId) {
            $brand = ItemBrand::find($expertId);
            if ($brand) $query->where('brand_code', $brand->code);
        }

        $query->orderBy('order_index');

        // limit results to 100 for map performance
        $garages = $query->paginate(100);

        $garages->getCollection()->transform(function ($garage) {
            return [
                'id'          => $garage->id,
                'name'        => $garage->name,
                'address'     => $garage->address,
                'latitude'    => (float)$garage->latitude,
                'longitude'   => (float)$garage->longitude,
                'logo'        => $garage->logo,
                'banner'      => $garage->banner,
                'expert'      => $garage->expert ? ['name' => $garage->expert->name, 'id' => $garage->expert->id] : null,
            ];
        });

        return response()->json($garages);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function user_garage(Request $request)
    {
        $user = Auth::user();
        $garage = Garage::where('id', $user->garage_id)->with('expert')->first();
        if (!$garage) {
            return response()->json(['message' => 'No garage found for this user'], 404);
        }
        return response()->json($garage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request  
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000', // Validate logo image
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000', // Validate banner image
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }
        if ($request->user()->garage_id !== null) {
            return response()->json([
                'success' => false,
                'message' => 'User already has a garage.'
            ], 400);
        }


        $userId = $request->user()->id;

        try {
            $logoName = null;
            $bannerName = null;

            $image_file = $request->file('logo');
            $banner_file = $request->file('banner');

            if ($image_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garages', 600);
                    $logoName = $created_image_name;
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save logo image.',
                    ], 500);
                }
            }
            if ($banner_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/garages', 900);
                    $bannerName = $created_image_name;
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save banner image.',
                    ], 500);
                }
            }

            $brand = ItemBrand::where('id', $request->brand_id)->first();
            // Create garage record in the database
            $garage = Garage::create([
                'name' => $request->input('name'),
                'short_description' => $request->input('description'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'logo' => $logoName,
                'banner' => $bannerName,
                'owner_user_id' => $request->user()->id,
                'created_by' => $request->user()->id,
                'updated_by' => $request->user()->id,
                'brand_code' => $brand->code ?? null,
                "order_index" => 10000,
                "status" => 'pending',
            ]);

            // Update user details and assign role
            $user = User::find($userId);
            $user->update(['garage_id' => $garage->id]);
            $user->assignRole('Garage');

            return response()->json([
                'success' => true,
                'message' => 'Garage created successfully',
                'garage' => $garage->load('expert'),
            ], 5);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating garage: ' . $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function provinces()
    {
        $provinces = Province::orderBy('order_index')->orderBy('name_kh')->get();
        return response()->json($provinces);
    }
    public function show(string $id)
    {
        $garage = Garage::with('expert')->find($id);
        return response()->json($garage);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request  
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            $garage = Garage::findOrFail($id);
            if ($garage->id != $request->user()->garage_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorize!'
                ], 401);
            }

            $logoName = $garage->logo;
            $bannerName = $garage->banner;

            $image_file = $request->file('logo');
            $banner_file = $request->file('banner');

            if ($image_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garages', 600);
                    $logoName = $created_image_name;

                    if ($garage->logo && $created_image_name) {
                        ImageHelper::deleteImage($garage->logo, 'assets/images/garages');
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save logo image.',
                    ], 500);
                }
            }
            if ($banner_file) {
                try {
                    $created_image_name = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/garages', 900);
                    $bannerName = $created_image_name;

                    if ($garage->banner && $created_image_name) {
                        ImageHelper::deleteImage($garage->banner, 'assets/images/garages');
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to save banner image.',
                    ], 500);
                }
            }

            $brand = ItemBrand::where('id', $request->brand_id)->first();

            $garage->update([
                'name' => $request->input('name'),
                'short_description' => $request->input('description'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'logo' => $logoName,
                'banner' => $bannerName,
                'status' => $garage->status !== 'approved' ? 'pending' : 'approved',
                'brand_code' => $brand->code ?? null,
                'updated_by' => $request->user()->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Garage updated successfully',
                'garage' => $garage->load('expert'),
            ], 5);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating garage: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
