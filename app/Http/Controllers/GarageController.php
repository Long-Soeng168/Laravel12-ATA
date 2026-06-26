<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Models\Garage;
use App\Models\ItemBrand;
use App\Models\Province;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GarageController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:garage view', only: ['index', 'show', 'all_garages']),
            new Middleware('permission:garage create', only: ['create']),
            new Middleware('permission:garage update', only: ['edit', 'update_status']),
            new Middleware('permission:garage delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = Garage::query();

        $query->with('created_by', 'updated_by', 'owner');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('id', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('address', 'LIKE', "%{$search}%")
                    ->orWhere('short_description', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/garages/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function all_garages()
    {
        $query = Garage::query();

        $tableData = $query->where('status', 'approved')->orderBy('id', 'desc')->get();

        return response()->json($tableData);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function show(Garage $garage)
    {
        $owners = User::orderBy('id', 'desc')
            ->where('garage_id', null)
            ->get();
        $brands = ItemBrand::orderBy('name')
            ->where('status', 'active')
            ->get();

        // return ($owners);
        // return $garage->load('owner');
        return Inertia::render('admin/garages/Create', [
            'editData' => $garage->load('owner'),
            'owners' => $owners,
            'brands' => $brands,
            'readOnly' => true,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }
    public function edit(Garage $garage)
    {
        $owners = User::orderBy('id', 'desc')
            ->where('garage_id', null)
            ->orWhere('garage_id', $garage->id)
            ->get();
        $brands = ItemBrand::orderBy('name')
            ->where('status', 'active')
            ->get();
        return Inertia::render('admin/garages/Create', [
            'editData' => $garage->load('owner'),
            'owners' => $owners,
            'brands' => $brands,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }
    public function user_edit_garage()
    {
        $garage = Garage::findOrFail(Auth::user()->garage_id);
        $brands = ItemBrand::orderBy('name')
            ->where('status', 'active')
            ->get();
        // return ($owners);
        return Inertia::render('admin/garages/UserCreateGarage', [
            'is_user_create_or_edit_garage' => true,
            'editData' => $garage->load('owner'),
            'brands' => $brands,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create()
    {
        $owners = User::orderBy('id', 'desc')
            ->where('garage_id', null)
            ->get();
        $brands = ItemBrand::orderBy('name')
            ->where('status', 'active')
            ->get();
        // return ($owners);
        return Inertia::render('admin/garages/Create', [
            'owners' => $owners,
            'brands' => $brands,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }
    public function user_create_garage()
    {
        $brands = ItemBrand::orderBy('name')
            ->where('status', 'active')
            ->get();
        // return ($owners);
        return Inertia::render('admin/garages/UserCreateGarage', [
            'is_user_create_or_edit_garage' => true,
            'brands' => $brands,
            'provinces' => Province::orderBy('order_index')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/',
            ],
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'brand_code' => 'nullable|string|max:255',
            'province_code' => 'required|string|max:255',
            'order_index' => 'nullable|numeric',
            'status' => 'nullable|string|in:pending,approved,suspended,rejected',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_verified' => 'nullable|boolean',
            'expired_at' => 'nullable|date',
            'address' => 'nullable|string|max:255',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $currentUser = $request->user();

        // 1. Safely determine the Owner (No frontend boolean needed)
        $ownerUserId = $validated['owner_user_id'] ?? $currentUser->id;
        $owner = User::find($ownerUserId);

        if (!$owner) {
            return redirect()->back()->with('error', 'Owner user not found.');
        }

        if ($owner->garage_id !== null) {
            return redirect()->back()->with('error', 'User already has a garage.');
        }

        if (!$request->boolean('is_user_create_or_edit_garage') && !$currentUser->hasAnyPermission('garage create')) {
            abort(403, 'You do not have permission to assign a garage to another user.');
        }

        // 2. Format Dates and Meta
        $validated['expired_at'] = !empty($validated['expired_at'])
            ? Carbon::parse($validated['expired_at'])->setTimezone('Asia/Bangkok')->startOfDay()->format('Y-m-d')
            : null;

        $validated['created_by'] = $currentUser->id;
        $validated['updated_by'] = $currentUser->id;
        $validated['owner_user_id'] = $owner->id; // Explicitly set it so the DB insertion is accurate

        // 3. Process File Uploads FIRST
        $image_file = $request->file('logo');
        $banner_file = $request->file('banner');
        unset($validated['logo'], $validated['banner']);

        try {
            if ($image_file) {
                $validated['logo'] = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garages', 600);
            }
            if ($banner_file) {
                $validated['banner'] = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/garages', 900);
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
        }

        // 4. Execute DB writes inside ONE Transaction
        DB::transaction(function () use ($validated, $owner) {
            $garage = Garage::create($validated);

            // Update the owner directly using the model instance we already fetched
            $owner->update([
                'garage_id' => $garage->id,
            ]);
        });

        // 5. Dynamic Redirect
        // If the user created the garage for themselves, send them to the profile. Otherwise, send them back.
        if ($owner->id === $currentUser->id) {
            return redirect('/profile')->with('success', 'Garage created successfully!');
        }

        return redirect()->back()->with('success', 'Garage created successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Garage $garage)
    {
        $validated = $request->validate([
            'owner_user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string',
            'other_phones' => 'nullable|array',
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/',
            ],
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'parent_code' => 'nullable|string|max:255',
            'brand_code' => 'nullable|string|max:255',
            'province_code' => 'required|string|max:255',
            'order_index' => 'nullable|numeric',
            'status' => 'nullable|string|in:pending,approved,suspended,rejected',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // removed duplicate 'webp'
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_verified' => 'nullable|boolean',
            'expired_at' => 'nullable|date',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        // 1. Clean, secure Authorization
        $user = $request->user();
        $isOwner = $user->garage_id === $garage->id;
        $hasPermission = $user->hasAnyPermission('garage update');

        if ($request->boolean('is_user_create_or_edit_garage') && !$isOwner) {
            abort(403, 'Cannot Update Garage.');
        }
        if (!$request->boolean('is_user_create_or_edit_garage') && !$hasPermission) {
            abort(403, 'Cannot Update Garage.');
        }

        // 2. Format Dates and Meta
        if (!empty($validated['expired_at'])) {
            $validated['expired_at'] = Carbon::parse($validated['expired_at'])
                ->setTimezone('Asia/Bangkok')
                ->format('Y-m-d');
        } else {
            $validated['expired_at'] = null;
        }

        $validated['updated_by'] = $user->id;

        // 3. Process File Uploads FIRST
        $image_file = $request->file('logo');
        $banner_file = $request->file('banner');
        unset($validated['logo'], $validated['banner']);

        try {
            if ($image_file) {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/garages', 600);
                $validated['logo'] = $created_image_name;

                if ($garage->logo && $created_image_name) {
                    ImageHelper::deleteImage($garage->logo, 'assets/images/garages');
                }
            }

            if ($banner_file) {
                $created_banner_name = ImageHelper::uploadAndResizeImageWebp($banner_file, 'assets/images/garages', 900);
                $validated['banner'] = $created_banner_name;

                if ($garage->banner && $created_banner_name) {
                    ImageHelper::deleteImage($garage->banner, 'assets/images/garages');
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
        }

        // 4. Execute DB writes inside ONE Transaction
        DB::transaction(function () use ($validated, $garage) {
            $garage->update($validated);
            // Safely check if owner_user_id was actually passed in the request payload
            if (array_key_exists('owner_user_id', $validated) && !is_null($validated['owner_user_id'])) {
                User::where('id', $validated['owner_user_id'])
                    ->whereNull('garage_id')
                    ->update(['garage_id' => $garage->id]);
            }
        });

        return redirect()->back()->with('success', 'Garage updated successfully!');
    }


    public function update_status(Request $request, Garage $garage)
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,suspended,rejected',
        ]);
        $garage->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Garage $garage)
    {

        if ($garage->logo) {
            ImageHelper::deleteImage($garage->logo, 'assets/images/garages');
        }
        if ($garage->banner) {
            ImageHelper::deleteImage($garage->banner, 'assets/images/garages');
        }
        $garage->delete();
        $owner = User::where('id', $garage->owner_user_id)->first();
        if ($owner) {
            $owner->removeRole('Garage');
            $owner->update([
                'garage_id' => null,
            ]);
        }
        return redirect()->back()->with('success', 'Garage deleted successfully.');
    }
}
