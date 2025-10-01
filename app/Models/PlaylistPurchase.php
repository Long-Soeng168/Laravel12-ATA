<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlaylistPurchase extends Model
{
    protected $guarded = [];
    public function buyer()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}
