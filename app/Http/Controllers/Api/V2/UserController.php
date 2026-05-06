<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request, string $id)
    {
        // 1. Find the specific shop by ID and ensure it is approved
        $user = User::find($id);

        // 2. Handle 404 if the user doesn't exist or isn't approved
        if (!$user) {
            return response()->json(['message' => 'user not found'], 404);
        }

        // 3. Transform the single object (No need for transform() on a collection)
        $user->logo_url = $user->image ? asset('assets/images/users/' . $user->image) : null;
        $user->banner_url = $user->banner ? asset('assets/images/users/' . $user->banner) : null;

        return response()->json($user);
    }
}
