<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemCategory extends Model
{
    use SoftDeletes;
    /** @use HasFactory<\Database\Factories\ItemCategoryFactory> */
    use HasFactory;
    protected $guarded = [];

    // Old way declare name
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
    // New way declare name
    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updated_user()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function fields()
    {
        return $this->hasMany(ItemCategoryField::class, 'category_id', 'id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'category_code', 'code');
    }
    public function children()
    {
        return $this->hasMany(ItemCategory::class, 'parent_code', 'code');
    }
    public function parent()
    {
        return $this->belongsTo(ItemCategory::class, 'parent_code', 'code');
    }

    public function children_items()
    {
        return $this->hasManyThrough(Item::class, ItemCategory::class, 'parent_code', 'category_code', 'code', 'code');
    }
}
