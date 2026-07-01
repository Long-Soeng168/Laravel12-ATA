<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;
    use SoftDeletes;
    
    protected $guarded = [];

    public function playlist()
    {
        return $this->belongsTo(VideoPlayList::class, 'playlist_code', 'code');
    }
    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function dailyViews()
    {
        return $this->hasMany(VideoDailyView::class, 'video_id', 'id');
    }
}
