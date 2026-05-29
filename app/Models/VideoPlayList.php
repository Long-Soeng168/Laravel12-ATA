<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VideoPlayList extends Model
{
    /** @use HasFactory<\Database\Factories\VideoPlayListFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function videos()
    {
        return $this->hasMany(Video::class, 'playlist_code', 'code');
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
