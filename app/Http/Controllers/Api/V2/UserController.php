<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
    public function login(Request $request)
    {
        // =========================================================================
        // 🧪 RANDOM ERROR GENERATOR FOR FLUTTER TESTING
        // =========================================================================
        $testingMode = false;

        if ($testingMode) {
            $chance = rand(1, 100);
            if ($chance <= 20) {
                // Simulates incorrect password or user not found
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.',
                    'error' => 'Unauthorized'
                ], 401);
            } elseif ($chance <= 40) {
                // Simulates a suspended account
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been suspended. Please contact support.',
                ], 403);
            } elseif ($chance <= 100) {
                // Simulates validation failures
                return response()->json([
                    'success' => false,
                    'message' => 'The given data was invalid.',
                    'errors' => [
                        'email' => ['The email field is required.'],
                        'password' => ['The password must be at least 8 characters.']
                    ]
                ], 422);
            }
        }
        // =========================================================================

        // 1. Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required', // Keeping it 'email' as the key, but it can be a phone string
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Determine if logging in via Phone or Email
        $loginValue = $request->input('email');
        $credentials = ['password' => $request->password];

        if (is_numeric($loginValue)) {
            // Attempt to find user by phone
            $user = User::where('phone', $loginValue)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No account found with that phone number.'
                ], 401);
            }
            $credentials['email'] = $user->email;
        } else {
            $credentials['email'] = $loginValue;
        }

        // 3. Attempt Authentication
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Prepare roles and clean up the object
            $userRoles = $user->getRoleNames();

            // Remove internal attributes if necessary
            unset($user['roles']);

            // Generate Sanctum Token
            $token = $user->createToken('AuthToken')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'token' => $token,
                'user' => $user,
                'userRoles' => $userRoles,
            ], 200);
        }

        // 4. Final Fallback for Failed Login
        return response()->json([
            'success' => false,
            'message' => 'Invalid email/phone or password.',
            'error' => 'Unauthorized'
        ], 401);
    }
}
