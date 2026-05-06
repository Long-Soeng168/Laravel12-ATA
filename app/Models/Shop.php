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
}
