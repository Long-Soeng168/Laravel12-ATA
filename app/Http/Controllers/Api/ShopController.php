<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;
use App\Models\Product;
use Exception;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::paginate(10);

        return response()->json($shops);
    }

    public function store(Request $request)
    {
        // Validate incoming request  
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000', // Validate logo image
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000', // Validate banner image
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        $userId = $request->user()->id;

        try {
            // Store images if they are provided 
            // Create shop in the database
            $logoName = null;
            if ($request->hasFile('logo')) {
                $image = $request->file('logo');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/shops/logo/' . $fileName);
                $thumbPath = public_path('assets/images/shops/logo/thumb/' . $fileName);

                try {
                    // Create an image instance and save the original image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);

                    $uploadedImage->resize(500, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Store the filename in the category
                    $logoName = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Fail to Save Image.',
                    ], 500);
                }
            }

            $bannerName = null;
            if ($request->hasFile('banner')) {
                $image = $request->file('banner');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/shops/banner/' . $fileName);
                $thumbPath = public_path('assets/images/shops/banner/thumb/' . $fileName);

                try {
                    // Create an image instance and save the original image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);
                    $uploadedImage->resize(800, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Store the filename in the category
                    $banner = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Fail to Save Image.',
                    ], 500);
                }
            }

            $shop = Shop::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'logo' => $logoName, // Save the relative path
                'banner' => $banner, // Save the relative path
                'owner_user_id' => $userId,
            ]);

            $user = User::find($userId);
            $user->update([
                'shop_id' => $shop->id,
            ]);
            $user->assignRole('shop');

            return response()->json([
                'success' => true,
                'message' => 'Shop created successfully',
                'shop' => $shop
            ], 200);
        } catch (\Exception $e) {
            // Handle any error that occurs during the process
            return response()->json([
                'success' => false,
                'message' => 'Error creating shop: ' . $e->getMessage()
            ], 500);
        }
    }


    public function show(string $id)
    {
        $shop = Shop::with('owner')->findOrFail($id);

        // Convert new key structure to old key structure
        $oldKeyShop = [
            'id'                 => $shop->id,
            'owner_user_id'      => $shop->owner_user_id,
            'name'               => $shop->name,
            'logo'               => $shop->logo,
            'banner'             => $shop->banner,
            'description'        => $shop->short_description,
            'description_kh'     => $shop->short_description_kh,
            'phone'              => $shop->phone,
            'cellcard'           => null,
            'smart'              => null,
            'metfone'            => null,
            'address'            => $shop->address,
            'vat_percent'        => null,
            'exchange_rate_riel' => null,
            'status'             => $shop->status === 'active' ? 1 : 0,
            'created_at'         => $shop->created_at,
            'updated_at'         => $shop->updated_at,
            'owner'              => $shop->owner ? [
                'id'               => $shop->owner->id,
                'name'             => $shop->owner->name,
                'email'            => $shop->owner->email,
                'shop_id'          => $shop->owner->shop_id,
                'garage_id'        => $shop->owner->garage_id,
                'phone'            => $shop->owner->phone,
                'gender'           => $shop->owner->gender,
                'date_of_birth'    => null,
                'address'          => null,
                'image'            => $shop->owner->image,
                'add_by_user_id'   => $shop->owner->created_by ?? null,
                'status'           => $shop->owner->status ?? 1,
                'email_verified_at' => $shop->owner->email_verified_at,
                'created_at'       => $shop->owner->created_at,
                'updated_at'       => $shop->owner->updated_at,
            ] : null,
        ];

        return response()->json($oldKeyShop);
    }


    public function edit($id)
    {
        $shop = Shop::findOrFail($id);
        return $shop;
        // return view('admin.shops.edit', compact('dtc'));
    }



    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048', // Optional logo
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048', // Optional banner
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            // Find the shop
            $shop = Shop::findOrFail($id);

            // Update images if provided
            if ($request->hasFile('logo')) {
                // Delete old logo if it exists
                if ($shop->logo && file_exists(public_path('assets/images/shops/logo/' . $shop->logo))) {
                    unlink(public_path('assets/images/shops/logo/' . $shop->logo));
                    unlink(public_path('assets/images/shops/logo/thumb/' . $shop->logo));
                }

                // Save new logo
                $logo = $request->file('logo');
                $logoFileName = time() . '_' . $logo->getClientOriginalName();
                $logoPath = public_path('assets/images/shops/logo/' . $logoFileName);
                $logoThumbPath = public_path('assets/images/shops/logo/thumb/' . $logoFileName);

                $uploadedLogo = Image::make($logo->getRealPath())->save($logoPath);
                $uploadedLogo->resize(500, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($logoThumbPath);

                $shop->logo = $logoFileName;
            }

            if ($request->hasFile('banner')) {
                // Delete old banner if it exists
                if ($shop->banner && file_exists(public_path('assets/images/shops/banner/' . $shop->banner))) {
                    unlink(public_path('assets/images/shops/banner/' . $shop->banner));
                    unlink(public_path('assets/images/shops/banner/thumb/' . $shop->banner));
                }

                // Save new banner
                $banner = $request->file('banner');
                $bannerFileName = time() . '_' . $banner->getClientOriginalName();
                $bannerPath = public_path('assets/images/shops/banner/' . $bannerFileName);
                $bannerThumbPath = public_path('assets/images/shops/banner/thumb/' . $bannerFileName);

                $uploadedBanner = Image::make($banner->getRealPath())->save($bannerPath);
                $uploadedBanner->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($bannerThumbPath);

                $shop->banner = $bannerFileName;
            }

            // Update other shop details
            $shop->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Shop updated successfully',
                'shop' => $shop
            ], 200);
        } catch (\Exception $e) {
            // Handle any error that occurs during the process
            return response()->json([
                'success' => false,
                'message' => 'Error updating shop: ' . $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        Shop::findOrFail($id)->delete();

        return redirect()->route('admin.shops.index')->with('success', 'DTC deleted successfully.');
    }

    //Products

    public function storeProduct(Request $request)
    {
        // Validate incoming request  
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required',
            'categoryId' => 'required',
            'bodyTypeId' => 'required',
            'brandId' => 'required',
            'brandModelId' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4000',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        $userId = $request->user()->id;

        try {
            // Store images if they are provided  
            $imageName;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/products/' . $fileName);
                $thumbPath = public_path('assets/images/products/thumb/' . $fileName);

                try {
                    // Create an image instance and save the original image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);

                    $uploadedImage->resize(500, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Store the filename in the category
                    $imageName = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Fail to Save Image.',
                    ], 500);
                }
            }



            $product = Product::create([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'description' => $request->input('description'),
                'category_id' => $request->input('categoryId'),
                'body_type_id' => $request->input('bodyTypeId'),
                'brand_id' => $request->input('brandId'),
                'model_id' => $request->input('brandModelId'),
                'image' => $imageName,
            ]);

            $product->update([
                'create_by_user_id' => $request->user()->id,
                'shop_id' => $request->user()->shop_id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'product' => $product
            ], 200);
        } catch (\Exception $e) {
            // Handle any error that occurs during the process
            return response()->json([
                'success' => false,
                'message' => 'Error creating Product: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        // Validate incoming request  
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required',
            'categoryId' => 'required',
            'bodyTypeId' => 'required',
            'brandId' => 'required',
            'brandModelId' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            $product = Product::findOrFail($id);
            $imageName = $product->image;

            // Store new image if provided  
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $fileName = time() . '_' . $image->getClientOriginalName();
                $imagePath = public_path('assets/images/products/' . $fileName);
                $thumbPath = public_path('assets/images/products/thumb/' . $fileName);

                try {
                    // Save the new image
                    $uploadedImage = Image::make($image->getRealPath())->save($imagePath);

                    $uploadedImage->resize(500, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($thumbPath);

                    // Update the image name
                    $imageName = $fileName;
                } catch (Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Fail to Save Image.',
                    ], 500);
                }
            }

            // Update product fields
            $product->update([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'description' => $request->input('description'),
                'category_id' => $request->input('categoryId'),
                'body_type_id' => $request->input('bodyTypeId'),
                'brand_id' => $request->input('brandId'),
                'model_id' => $request->input('brandModelId'),
                'image' => $imageName,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'product' => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating Product: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteProduct($id)
    {
        try {
            // Find the product by ID
            $product = Product::findOrFail($id);

            // Delete the associated image files if they exist
            if ($product->image) {
                $imagePath = public_path('assets/images/products/' . $product->image);
                $thumbPath = public_path('assets/images/products/thumb/' . $product->image);

                if (file_exists($imagePath)) {
                    unlink($imagePath); // Delete the original image
                }

                if (file_exists($thumbPath)) {
                    unlink($thumbPath); // Delete the thumbnail image
                }
            }

            // Delete the product
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting product: ' . $e->getMessage()
            ], 500);
        }
    }
}
