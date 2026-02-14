<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApplicationInfo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;

class FileExploreR2FileController extends Controller
{
    public function folder(Request $request, $path)
    {
        $user = null;
        $header = $request->header('Authorization');

        if ($header && str_starts_with($header, 'Bearer ')) {
            $token = substr($header, 7);
            $accessToken = PersonalAccessToken::findToken($token);
            if ($accessToken) {
                $user = $accessToken->tokenable;
            }
        }

        // Standardize the path
        $path = str_replace('~', '/', $path);

        // --- UPDATED TO S3 ---
        // Listing files and directories from Cloudflare R2
        $files = Storage::disk('s3')->files($path);
        $folders = Storage::disk('s3')->directories($path);
        // ---------------------

        $appInfo = ApplicationInfo::first();
        $status = 'need_purchase';

        if (!$user) {
            if ($appInfo->document_status === 'free_all_no_login') {
                $status = 'can_read';
            } else {
                $status = 'need_login';
            }
        } else {
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
            'status' => $status,
            'files' => $files,
            'folders' => $folders,
            'path' => $path,
            'user' => $user // Simplified null check
        ]);
    }
}
