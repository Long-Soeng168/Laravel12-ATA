<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $guarded = [];

    public function created_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function garages()
    {
        return $this->hasMany(Garage::class, 'province_code', 'code');
    }
}
