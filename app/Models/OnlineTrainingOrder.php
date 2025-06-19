<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineTrainingOrder extends Model
{
    /** @use HasFactory<\Database\Factories\OnlineTrainingOrderFactory> */
    use HasFactory;
    protected $guarded = [];
    public function order_items()
    {
        return $this->hasMany(OnlineTrainingOrderItem::class, 'order_id', 'id');
    }
}
