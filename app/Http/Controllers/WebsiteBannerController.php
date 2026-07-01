<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Models\WebsiteBanner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class WebsiteBannerController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:banner view', only: ['index', 'show']),
            new Middleware('permission:banner create', only: ['create', 'store']),
            new Middleware('permission:banner update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:banner delete', only: ['destroy', 'remove_image']),
        ];
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');
        $type = $request->input('type');

        $query = WebsiteBanner::query();

        $query->with('created_by_user', 'updated_by_user');

        if ($status) {
            $query->where('status', $status);
        }
        
        if ($type) {
            $query->where('type', $type);
        }

        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('title_1', 'LIKE', "%{$search}%")
                    ->orWhere('title_1_kh', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/website_banners/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/website_banners/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:hero_slide,mini_banner',
            'title_1' => 'required|string|max:255',
            'title_1_kh' => 'required|string|max:255',
            'title_2' => 'nullable|string|max:255',
            'title_2_kh' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_kh' => 'nullable|string',
            'btn_text' => 'nullable|string|max:100',
            'btn_text_kh' => 'nullable|string|max:100',
            'btn_link' => 'nullable|string|max:255',
            'background_color' => 'required|string|max:20',
            'foreground_color' => 'required|string|max:20',
            'sort_order' => 'nullable|integer',
            'status' => 'nullable|string|in:active,inactive',
            'image_file' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;
        $validated['status'] = $validated['status'] ?? 'active';
        
        $image_file = $request->file('image_file');
        unset($validated['image_file']);

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $created_banner = WebsiteBanner::create($validated);

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/website_banners', 1200);
                $created_banner->update([
                    'image' => $created_image_name,
                ]);
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        return redirect()->route('website_banners.index')->with('success', 'Website Banner Created Successfully!');
    }

    public function show(WebsiteBanner $websiteBanner)
    {
        return Inertia::render('admin/website_banners/Create', [
            'editData' => $websiteBanner,
            'readOnly' => true,
        ]);
    }

    public function edit(WebsiteBanner $websiteBanner)
    {
        return Inertia::render('admin/website_banners/Create', [
            'editData' => $websiteBanner,
        ]);
    }

    public function update(Request $request, WebsiteBanner $websiteBanner)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:hero_slide,mini_banner',
            'title_1' => 'required|string|max:255',
            'title_1_kh' => 'required|string|max:255',
            'title_2' => 'nullable|string|max:255',
            'title_2_kh' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_kh' => 'nullable|string',
            'btn_text' => 'nullable|string|max:100',
            'btn_text_kh' => 'nullable|string|max:100',
            'btn_link' => 'nullable|string|max:255',
            'background_color' => 'required|string|max:20',
            'foreground_color' => 'required|string|max:20',
            'sort_order' => 'nullable|integer',
            'status' => 'nullable|string|in:active,inactive',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ]);

        $validated['updated_by'] = $request->user()->id;
        $validated['status'] = $validated['status'] ?? 'active';

        $image_file = $request->file('image_file');
        unset($validated['image_file']);

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $websiteBanner->update($validated);

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/website_banners', 1200);
                $websiteBanner->update([
                    'image' => $created_image_name,
                ]);
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        return redirect()->back()->with('success', 'Website Banner Updated Successfully!');
    }

    public function update_status(Request $request, WebsiteBanner $websiteBanner)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $websiteBanner->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    public function destroy(WebsiteBanner $websiteBanner)
    {
        $websiteBanner->delete();
        return redirect()->back()->with('success', 'Website Banner deleted successfully.');
    }

    public function remove_image(WebsiteBanner $websiteBanner)
    {
        $websiteBanner->update([
            'image' => null,
        ]);
        return redirect()->back()->with('success', 'Banner image removed successfully.');
    }
}
