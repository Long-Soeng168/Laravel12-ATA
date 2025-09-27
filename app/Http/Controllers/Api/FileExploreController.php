<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;

class FileExploreController extends Controller
{
    public function folder(Request $request, $path)
    {
        $user = null;
        $header = $request->header('Authorization');

        if ($header && str_starts_with($header, 'Bearer ')) {
            $token = substr($header, 7); // remove 'Bearer '

            $accessToken = PersonalAccessToken::findToken($token);
            if ($accessToken) {
                $user = $accessToken->tokenable; // This is your authenticated user
            }
        }

        // Now $user is either the logged-in user or null
        // You can use it if you want, or just continue for guest access

        $path = str_replace('~', '/', $path);
        $files = Storage::disk('real_storage')->files($path);
        $folders = Storage::disk('real_storage')->directories($path);

        return response()->json([
            'user' => $user ? $user : null,
            'status' => 'need_login', //can_read, need_login, need_purchase,
            'files' => $files,
            'folders' => $folders,
            'path' => $path
        ]);
    }
}
