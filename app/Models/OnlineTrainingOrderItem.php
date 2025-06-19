<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineTrainingOrderItem extends Model
{
    /** @use HasFactory<\Database\Factories\OnlineTrainingOrderItemFactory> */
    use HasFactory;
    protected $guarded = [];

    public function order()
    {
        return $this->belongsTo(OnlineTrainingOrder::class, 'order_id', 'id');
    }
    public function item()
    {
        return $this->belongsTo(VideoPlayList::class, 'item_id', 'id');
    }
}
