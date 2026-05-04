<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\VideoPlayList;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function video_playlists(Request $request)
    {
        $search = $request->input('search');
        $query = VideoPlayList::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            });
        }

        $query->withCount('videos');
        $query->where('status', 'active');
        $query->orderBy('id', 'desc');

        $playlists = $query->paginate(10);

        // Transform the collection inside the paginator
        $playlists->getCollection()->transform(function ($item) {
            // Map the new URL fields
            $item->image_url = $item->image ? asset('assets/images/video_play_lists/' . $item->image) : null;

            return $item;
        });

        return response()->json($playlists);
    }
}
