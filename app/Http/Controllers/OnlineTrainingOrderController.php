<?php

namespace App\Http\Controllers;

use App\Helpers\TelegramHelper;
use App\Models\OnlineTrainingOrder;
use App\Models\OnlineTrainingOrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OnlineTrainingOrderController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:order view', only: ['index', 'show']),
            new Middleware('permission:order delete', only: ['destroy']),
        ];
    }
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = OnlineTrainingOrder::query();

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('name_kh', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->withCount('order_items')->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/online_training_orders/Index', [
            'tableData' => $tableData,
        ]);
    }
    public function show(OnlineTrainingOrder $online_training_order)
    {
        $orderItems = OnlineTrainingOrderItem::with('item')->where('order_id', $online_training_order->id)->get();
        // return $orderItems;
        return Inertia::render('admin/online_training_orders/Show', [
            'order' => $online_training_order,
            'orderItems' => $orderItems
        ]);
    }
    public function destroy(OnlineTrainingOrder $online_training_order)
    {
        $online_training_order->delete();
        return redirect()->back()->with('success', 'Message deleted successfully.');
    }

    public function store_online_training_order(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'name'       => 'nullable|string|max:255',
            'phone'      => 'nullable|string|max:20',
            'email'      => 'nullable|email|max:255',
            'address'    => 'nullable|string|max:255',
            'note'       => 'nullable|string',
            'total'      => 'required|numeric',
            'items'      => 'required|array',
            'items.*.item_id'   => 'required|exists:video_play_lists,id',
            'items.*.price'     => 'required|numeric',
            'items.*.discount'  => 'nullable|numeric',
            'items.*.quantity'  => 'required|integer|min:1',
            'items.*.total'     => 'required|numeric',
            // Remove validation for 'items.*.discount_type' to make it optional
        ]);

        try {
            DB::beginTransaction();

            // Create order
            $order = OnlineTrainingOrder::create([
                'name'    => $validated['name'] ?? null,
                'phone'   => $validated['phone'] ?? '0000',
                'email'   => $validated['email'] ?? null,
                'address' => $validated['address'] ?? null,
                'note'    => $validated['note'] ?? null,
                'total'   => $validated['total'],
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                OnlineTrainingOrderItem::create([
                    'order_id'      => $order->id,
                    'item_id'       => $item['item_id'],
                    'price'         => $item['price'],
                    'discount'      => $item['discount'] ?? 0,
                    'discount_type' => $item['discount_type'] ?? 'percentage', // safely default
                    'quantity'      => $item['quantity'],
                    'total'         => $item['total'],
                ]);
            }

            DB::commit();
            try {
                // $result = TelegramHelper::sendOrderItems($order);

                return back()->with(
                    $result['success'] ? 'success' : 'error',
                    $result['success'] ? 'Order placed successfully!' : $result['message']
                );
            } catch (\Exception $e) {
                Log::error('Failed to send order to Telegram: ' . $e->getMessage());
                return back()->with('success', 'Order placed successfully, but failed to notify via Telegram.');
            }
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'general' => 'Failed to place order. ' . $e->getMessage()
            ]);
        }
    }
}
