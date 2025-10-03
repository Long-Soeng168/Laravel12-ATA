<?php

namespace App\Http\Controllers;

use App\Helpers\FileHelper;
use App\Helpers\ImageHelper;
use App\Models\PlaylistPurchase;
use App\Models\User;
use App\Models\Video;
use App\Models\VideoPlayList;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class PlaylistPurchaseController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:video view', only: ['index', 'show']),
            new Middleware('permission:video create', only: ['create', 'store']),
            new Middleware('permission:video update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:video delete', only: ['destroy', 'destroy_image']),
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

        $query = PlaylistPurchase::query()->with('buyer', 'playlist', 'created_by', 'updated_by');

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('user_id', 'LIKE', "%{$search}%")
                    ->orWhere('playlist_id', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy('id', 'desc');
        $query->orderBy($sortBy, $sortDirection);

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        // return $tableData;

        return Inertia::render('admin/playlist_purchases/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $playlists = VideoPlayList::where('status', 'active')
            ->orderBy('id', 'desc')
            ->get();
        $users = User::orderBy('id', 'desc')->get();
        // dd($playlists);

        return Inertia::render('admin/playlist_purchases/Create', [
            'playlists' => $playlists,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'playlist_id' => 'required|exists:video_play_lists,id',
            'user_id' => 'required|exists:users,id',
            'status'      => 'nullable|string|in:pending,completed,cancelled',
            'expire_at'   => 'nullable|date',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        PlaylistPurchase::create($validated);

        return redirect()->back()->with('success', 'Purchase created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PlaylistPurchase $playlist_purchase)
    {
        return Inertia::render('admin/playlist_purchases/Show', [
            'video' => $playlist_purchase
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlaylistPurchase $playlist_purchase)
    {
        return Inertia::render('admin/playlist_purchases/Create', [
            'editData' => $playlist_purchase,
            'playlists' => VideoPlayList::where('status', 'active')->orderBy('id', 'desc')->get(),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PlaylistPurchase $purchase)
    {
        $validated = $request->validate([
            'playlist_id' => 'required|exists:video_play_lists,id',
            'user_id'     => 'required|exists:users,id',
            'status'      => 'nullable|string|in:pending,completed,cancelled',
            'expire_at'   => 'nullable|date',
        ]);

        $validated['updated_by'] = $request->user()->id;

        $purchase->update($validated);

        return redirect()->route('playlist_purchases.index')->with('success', 'Purchase updated successfully!');
    }

    public function update_status(Request $request, PlaylistPurchase $playlist_purchase)
    {
        $request->validate([
            'status' => 'required|string|in:pending,completed,cancelled',
        ]);
        $playlist_purchase->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    public function playlist_purchases_free_status(Request $request, PlaylistPurchase $playlist_purchase)
    {
        $request->validate([
            'status' => 'required|string|in:free,subscribe',
        ]);
        $playlist_purchase->update([
            'is_free' => $request->status == 'free',
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlaylistPurchase $playlist_purchase)
    {
        // Delete image if exists
        if ($playlist_purchase->image) {
            ImageHelper::deleteImage($playlist_purchase->image, 'assets/images/playlist_purchases');
        }
        if ($playlist_purchase->file_name) {
            FileHelper::deleteFile($playlist_purchase->file_name, 'assets/files/playlist_purchases');
        }
        $playlist_purchase->delete();

        return redirect()->route('playlist_purchases.index')->with('success', 'Video deleted successfully!');
    }
}
