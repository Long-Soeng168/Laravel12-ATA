<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemCategoryField extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $table = 'item_category_fields';

    public function options()
    {
        return $this->hasMany(ItemCategoryFieldOption::class, 'item_category_field_id');
    }
    public function category()
    {
        return $this->belongsTo(ItemCategory::class, 'category_id');
    }
}
