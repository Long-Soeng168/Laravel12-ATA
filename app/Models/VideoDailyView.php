<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoDailyView extends Model
{
    protected $guarded = [];

    public function video()
    {
        return $this->belongsTo(Video::class, 'video_id', 'id');
    }
}
