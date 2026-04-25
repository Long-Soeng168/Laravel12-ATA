<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemBrand extends Model
{
    /** @use HasFactory<\Database\Factories\ItemBrandFactory> */
    use HasFactory;
    protected $guarded = [];

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'brand_code', 'code');
    }
    public function brand_models()
    {
        return $this->hasMany(ItemModel::class, 'brand_code', 'code');
    }

    public function categories()
    {
        return $this->belongsToMany(ItemCategory::class, 'item_brand_item_category');
    }
}
