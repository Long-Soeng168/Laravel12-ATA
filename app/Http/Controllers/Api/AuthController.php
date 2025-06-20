<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Garage;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (is_numeric($request->email)) {
            $userEmail = User::where('phone', $request->email)->first();

            if (!$userEmail) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $credentials['email'] = $userEmail->email;
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $userRoles = $user->getRoleNames();
            // $userPermissions = $user->getPermissionsViaRoles()->pluck('name');

            unset($user['roles']);

            $token = $user->createToken('AuthToken')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user,
                'userRoles' => $userRoles,
                // 'userPermissions' => $userPermissions
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
    public function user(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $user = Auth::user();
            $userRoles = $user->getRoleNames();
            // $userPermissions = $user->getPermissionsViaRoles()->pluck('name');
            unset($user['roles']);
            // $shop = Shop::where('id', $user->shop_id)->first();
            // $garage = Garage::where('id', $user->garage_id)->with('expert')->first();
            return response()->json([
                'user' => $user,
                'userRoles' => $userRoles,
                // 'userPermissions' => $userPermissions
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|unique:users,phone',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'image' => null,
        ]);

        $user->assignRole('User');

        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user,  'userRoles' => ['User']], 200);
    }

    public function destroy(Request $request, User $user)
    {
        $validated = $request->validate([
            'password'  => 'required|string|max:255',
        ]);

        try {
            // Check if authenticated user is deleting their own account
            if ($request->user()->id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to delete this account.'
                ], 403);
            }

            // Verify password
            if (!Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Incorrect password.'
                ], 422);
            }

            // Delete user image if exists
            if ($user->image) {
                ImageHelper::deleteImage($user->image, 'assets/images/users');
            }

            // Finally delete the user
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete account: ' . $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'              => 'required|string|max:255',
            'email'             => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'current_password'  => 'nullable|string|min:6|max:255',
            'password'          => 'nullable|string|min:6|max:255|confirmed',
            'phone'             => 'nullable|numeric|unique:users,phone,' . $user->id,
            'gender'            => 'nullable|string|in:male,female,other',
            'image'             => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4048',
        ]);

        try {
            $validated['updated_by'] = $request->user()->id;

            // Check if new password is provided
            if (!empty($validated['password'])) {
                // Require current_password to be provided
                if (empty($validated['current_password'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is required to change your password.'
                    ], 422);
                }

                // Verify current password
                if (!Hash::check($validated['current_password'], $user->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect.'
                    ], 422);
                }

                // Hash and store new password
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']); // Don't update password if not provided
            }
            $imageFile = $request->file('image');

            if ($imageFile) {
                $imageName = ImageHelper::uploadAndResizeImageWebp($imageFile, 'assets/images/users', 600);
                $validated['image'] = $imageName;
                if ($imageName && $user->image) {
                    ImageHelper::deleteImage($user->image, 'assets/images/users');
                }
            }

            // Clean out empty values
            foreach ($validated as $key => $value) {
                if ($value === null || $value === '') {
                    unset($validated[$key]);
                }
            }

            $user->update($validated);

            if (!empty($roles)) {
                $user->syncRoles($roles);
            } else {
                $user->syncRoles('User');
            }

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully!',
                'user'    => $user->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out successfully']);
    }
}
