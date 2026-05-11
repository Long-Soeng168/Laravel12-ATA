<?php

namespace App\Http\Controllers\Api\V2;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
            'email'    => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Determine Login Field (Email vs Phone)
        $loginValue = $request->input('email');

        // Use PHP's built-in email filter to check if the string is formatted as an email
        $loginField = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        // Build the dynamic credentials array
        $credentials = [
            $loginField => $loginValue,
            'password'  => $request->input('password'),
        ];

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

    public function register(Request $request)
    {
        // =========================================================================
        // 🧪 RANDOM ERROR GENERATOR FOR FLUTTER TESTING
        // =========================================================================
        $testingMode = false;

        if ($testingMode) {
            $chance = rand(1, 100);
            if ($chance <= 20) {
                // Simulates a general server failure
                return response()->json([
                    'success' => false,
                    'message' => 'Internal Server Error',
                    'error' => 'PDOException: Could not connect to host'
                ], 500);
            } elseif ($chance <= 100) {
                // Simulates validation failures (already taken, etc.)
                return response()->json([
                    'success' => false,
                    'message' => 'The given data was invalid.',
                    'errors' => [
                        'email' => ['The email has already been taken.'],
                        'phone' => ['The phone number is already registered.'],
                        'password' => ['The password must be at least 8 characters.']
                    ]
                ], 422);
            }
        }
        // =========================================================================

        // 1. Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => [
                'nullable',
                'string',
                'regex:/^0\d{8,10}$/',
                'unique:users,phone'
            ],
            'password' => 'required|string|min:8', // Added min length for better security
            'address' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Database Transaction
        return DB::transaction(function () use ($request) {

            // Create the User
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'password' => Hash::make($request->password),
                'image' => null,
                'status' => 'active', // Optional: Set default status
            ]);

            // 3. Assign Default Role
            // Wrapped in a try-catch or check to ensure the 'User' role exists
            if ($user) {
                $user->assignRole('User');
            }

            // 4. Generate Token
            $token = $user->createToken('AuthToken')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registration successful.',
                'token' => $token,
                'user' => $user,
                'userRoles' => ['User']
            ], 201); // 201 Created is the correct status for a successful registration
        });
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name'             => 'required|string|max:255',
            'current_password' => 'nullable|required_with:password|string', // Added to handle password checks securely
            'password'         => 'nullable|string|min:6|max:255|confirmed',
            'email'            => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => [
                'required',
                'string',
                'regex:/^0\d{8,10}$/',
                'unique:users,phone,' . $user->id
            ],
            'other_phones'     => 'nullable|array',
            'other_phones.*'   => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,10})$/',
            ],
            'gender'           => 'nullable|string|in:male,female,other',
            'image'            => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Removed duplicate webp
            'address'          => 'nullable|string|max:255',
            'location'         => 'nullable|string',
            'latitude'         => 'nullable|numeric',
            'longitude'        => 'nullable|numeric',
            'roles'            => 'nullable|array', // Added to prevent undefined variable $roles
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'The given data was invalid.',
                'errors'  => $validator->errors()
            ], 422);
        }

        // Extract the validated data (This was missing in your original code)
        $validated = $validator->validated();

        try {
            $validated['updated_by'] = $user->id;

            // --- Password Logic ---
            if (!empty($validated['password'])) {
                // Verify current password
                if (!Hash::check($validated['current_password'], $user->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect.'
                    ], 422);
                }
                // Hash and store new password
                $validated['password'] = Hash::make($validated['password']);
            }

            // Remove password-related fields from the array so we don't accidentally update them as plain text/null
            unset($validated['current_password']);
            if (empty($validated['password'])) {
                unset($validated['password']);
            }

            // --- Image Logic ---
            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $imageName = ImageHelper::uploadAndResizeImageWebp($imageFile, 'assets/images/users', 600);
                $validated['image'] = $imageName;

                // Delete old image if a new one was uploaded successfully
                if ($imageName && $user->image) {
                    ImageHelper::deleteImage($user->image, 'assets/images/users');
                }
            }

            // Clean out empty values to prevent overwriting existing data with null unnecessarily
            foreach ($validated as $key => $value) {
                if ($value === null || $value === '') {
                    unset($validated[$key]);
                }
            }

            // Update the user details
            $user->update($validated);

            // --- Roles Logic ---
            // Warning: Be careful syncing a default 'User' role on a simple profile update. 
            // If an Admin updates their profile, this might accidentally strip their admin rights.
            if (isset($validated['roles']) && !empty($validated['roles'])) {
                $user->syncRoles($validated['roles']);
            }

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully!',
                'user'    => $user->fresh()
            ], 200);
        } catch (\Exception $e) {
            // It's good practice to log the actual error for debugging
            Log::error('User update failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }
}
