<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request)
    {
        // return $request->all();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users')->ignore($request->user()->id)
            ],
            'phone' => [
                'required',
                'string',
                'regex:/^0\d{7,14}$/',
                Rule::unique('users')->ignore($request->user()->id)
            ],
            'other_phones' => ['nullable', 'array'],
            'other_phones.*' => [
                'nullable',
                'string',
                'regex:/^(0|\+855)(\d{8,9})$/', // Validates Khmer format for each entry
            ],
            'gender' => ['nullable', 'string', 'in:male,female,other'],
            'address' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp,svg', 'max:4096'],
        ], [
            'phone.regex' => 'The phone number must start with 0 and contain 8 to 15 digits without spaces.',
            'other_phones.*.regex' => 'The additional phone number format is invalid.',
        ]);

        try {
            // Add updater
            $validated['updated_by'] = $request->user()->id;

            $imageFile = $request->file('image');

            // Unset the image from validated array so we only add it back if a file is uploaded
            unset($validated['image']);

            // Handle image upload if present
            if ($imageFile) {
                $imageName = ImageHelper::uploadAndResizeImageWebp($imageFile, 'assets/images/users', 600);

                if ($imageName) {
                    $validated['image'] = $imageName;

                    // Delete old image if a new one is successfully uploaded
                    if ($request->user()->image) {
                        ImageHelper::deleteImage($request->user()->image, 'assets/images/users');
                    }
                }
            }

            // Update the user
            $request->user()->update($validated);

            return redirect()->back()->with('success', 'Profile updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors('Failed to update profile: ' . $e->getMessage());
        }
    }
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
