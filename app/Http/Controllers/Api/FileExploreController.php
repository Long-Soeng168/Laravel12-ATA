<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApplicationInfo;
use Carbon\Carbon;
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


        $appInfo = ApplicationInfo::first(); // document_status = need_purchase | free_all_with_login | free_all_no_login
        $status = 'need_purchase'; // default

        if (!$user) {
            // guest
            if ($appInfo->document_status === 'free_all_no_login') {
                $status = 'can_read';
            } else {
                $status = 'need_login';
            }
        } else {
            // logged in
            switch ($appInfo->document_status) {
                case 'free_all_no_login':
                case 'free_all_with_login':
                    $status = 'can_read';
                    break;

                case 'need_purchase':
                    if (
                        $user->document_access_end_at &&
                        now()->lessThan(Carbon::parse($user->document_access_end_at)->addDay())
                    ) {
                        $status = 'can_read';
                    } else {
                        $status = 'need_purchase';
                    }
                    break;
            }
        }


        return response()->json([
            'status' => $status, //can_read, need_login, need_purchase,
            'files' => $files,
            'folders' => $folders,
            'path' => $path,
            'user' => $user ? $user : null
        ]);
    }
}
