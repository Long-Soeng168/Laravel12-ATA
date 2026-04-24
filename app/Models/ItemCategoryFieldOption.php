<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemCategoryFieldOption extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    protected $table = 'item_category_field_options';

    public function field()
    {
        return $this->belongsTo(ItemCategoryField::class, 'item_category_field_id');
    }
}
