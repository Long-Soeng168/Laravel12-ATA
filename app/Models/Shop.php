<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Shop extends Model
{
    /** @use HasFactory<\Database\Factories\ShopFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    protected function casts(): array
    {
        return [
            'other_phones' => 'array',
        ];
    }

    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id', 'id');
    }

    public function province()
    {
        return $this->belongsTo(
            Province::class,
            'province_code', // Foreign key on shops table
            'code'           // Owner key on provinces table
        );
    }

    /**
     * A shop has many categories through the pivot table using custom keys.
     */
    public function categories()
    {
        return $this->belongsToMany(
            ItemCategory::class,
            'item_category_shop',   // Pivot table name
            'shop_id',              // Foreign pivot key for the shop
            'item_category_code',   // Foreign pivot key for the category
            'id',                   // Parent key (Shop's local key)
            'code'                  // Related key (ItemCategory's local key)
        )->withTimestamps();
    }
}
