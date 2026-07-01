<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Heading;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Dtc;
use App\Models\Shop;
use App\Models\Garage;
use App\Models\Video;
use App\Models\WebsiteBanner;
use App\Models\Course;
use App\Models\Province;
use App\Models\ItemDailyView;
use App\Models\Link;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $item_counts = Item::count();
        $item_category_counts = ItemCategory::count();
        $dtc_counts = Dtc::count();
        $shop_counts = Shop::count();
        $garage_counts = Garage::count();
        $video_counts = Video::count();
        $banner_counts = Banner::count();
        $website_banner_counts = WebsiteBanner::count();
        $user_counts = User::count();
        $course_counts = Course::count();
        $link_counts = Link::count();
        $province_counts = Province::count();
        
        $heading_counts = Heading::count();
        $project_counts = Project::count();

        return Inertia::render('admin/dashboard/Index', [
            'featureDatas' => [
                'item_counts' => $item_counts,
                'item_category_counts' => $item_category_counts,
                'dtc_counts' => $dtc_counts,
                'shop_counts' => $shop_counts,
                'garage_counts' => $garage_counts,
                'video_counts' => $video_counts,
                'banner_counts' => $banner_counts,
                'website_banner_counts' => $website_banner_counts,
                'user_counts' => $user_counts,
                'course_counts' => $course_counts,
                'link_counts' => $link_counts,
                'province_counts' => $province_counts,
                
                'heading_counts' => $heading_counts,
                'project_counts' => $project_counts,
            ]
        ]);
    }
}
