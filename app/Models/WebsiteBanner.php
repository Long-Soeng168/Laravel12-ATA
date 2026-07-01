<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WebsiteBanner extends Model
{
    /** @use HasFactory<\Database\Factories\WebsiteBannerFactory> */
    use HasFactory, SoftDeletes;
    
    protected $guarded = [];
    
    public function created_by_user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by_user()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}
