<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemImage extends Model
{
    /** @use HasFactory<\Database\Factories\ItemImageFactory> */
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }
}
