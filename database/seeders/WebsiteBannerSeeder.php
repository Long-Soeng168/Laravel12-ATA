<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebsiteBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $heroSlides = [
            [
                'type' => 'hero_slide',
                'title_1' => 'The Ultimate',
                'title_1_kh' => 'ផ្សារទិញនិងលក់',
                'title_2' => 'Car Parts Marketplace',
                'title_2_kh' => 'គ្រឿងបន្លាស់គ្រប់ប្រភេទ',
                'description' => 'Discover everything you need in our dedicated parts marketplace. Buy high-quality spare parts from trusted sellers or easily list your own products for sale.',
                'description_kh' => 'ស្វែងរកអ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការនៅក្នុងទីផ្សារគ្រឿងបន្លាស់របស់យើង។ ទិញគ្រឿងបន្លាស់មានគុណភាពពីអ្នកលក់ដែលគួរឱ្យទុកចិត្ត ឬដាក់លក់ផលិតផលរបស់អ្នកយ៉ាងងាយស្រួល។',
                'btn_text' => 'All Products',
                'btn_text_kh' => 'ផលិតផលទាំងអស់',
                'btn_link' => '/products',
                'background_color' => '#75BEEA',
                'foreground_color' => '#293A4A',
                'image' => '/assets/images/sample/spare_parts_banner4.png',
                'sort_order' => 1,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'hero_slide',
                'title_1' => 'Discover',
                'title_1_kh' => 'ស្វែងរក',
                'title_2' => 'Spare Parts Shops',
                'title_2_kh' => 'ហាងលក់គ្រឿងបន្លាស់យានយន្ត',
                'description' => 'Explore our comprehensive directory of shops, and local sellers for all your automotive needs.',
                'description_kh' => 'ស្វែងរកបញ្ជីឈ្មោះដ៏ទូលំទូលាយរបស់យើងដែលមានភ្នាក់ងារលក់ ឃ្លាំងឯកទេស និងអ្នកលក់ក្នុងស្រុកដែលគួរឱ្យទុកចិត្តសម្រាប់គ្រប់តម្រូវការយានយន្តរបស់អ្នក។',
                'btn_text' => 'All Shops',
                'btn_text_kh' => 'ហាងទាំងអស់',
                'btn_link' => '/shops',
                'background_color' => '#67cef6',
                'foreground_color' => '#1b3358',
                'image' => '/assets/images/sample/spare_parts_banner2.png',
                'sort_order' => 2,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'hero_slide',
                'title_1' => 'Find',
                'title_1_kh' => 'ស្វែងរក',
                'title_2' => 'Nearby Garages',
                'title_2_kh' => 'យានដ្ឋាននៅក្បែរអ្នក',
                'description' => 'Use our live integrated map to instantly find garages, professional mechanics, and EV charging stations near your current location.',
                'description_kh' => 'ប្រើប្រាស់ផែនទីផ្ទាល់របស់យើងដើម្បីស្វែងរកទីតាំងយានដ្ឋានជួសជុលដែលបានបញ្ជាក់ ជាងជំនាញអាជីព និងស្ថានីយសាក EV នៅជិតអ្នកបានយ៉ាងរហ័ស។',
                'btn_text' => 'All Garages',
                'btn_text_kh' => 'ស្វែងរកយានដ្ឋាន',
                'btn_link' => '/garages',
                'background_color' => '#438ba9',
                'foreground_color' => '#ffffff', // Fixed from #fff to standard hex for consistency
                'image' => '/assets/images/sample/garage_banner1.png',
                'sort_order' => 3,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $miniBanners = [
            [
                'type' => 'mini_banner',
                'title_1' => 'Video Training Online',
                'title_1_kh' => 'វគ្គបណ្តុះបណ្តាលតាមវីដេអូអនឡាញ',
                'title_2' => null,
                'title_2_kh' => null,
                'description' => 'Master auto mechanics with our comprehensive library of expert video tutorials and step-by-step practical guides.',
                'description_kh' => 'សិក្សាពីការថែទាំរថយន្តតាមរយៈបណ្ណាល័យវីដេអូបង្រៀនដោយអ្នកជំនាញ និងការណែនាំអនុវត្តជាជំហានៗរបស់យើង។',
                'btn_text' => 'Watch in App',
                'btn_text_kh' => 'ទស្សនាក្នុងកម្មវិធី',
                'btn_link' => '/download-app',
                'background_color' => '#0f172a',
                'foreground_color' => '#ffffff',
                'image' => '/assets/images/sample/training_online_banner1.webp',
                'sort_order' => 4,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'mini_banner',
                'title_1' => 'Engineering Documents',
                'title_1_kh' => 'ឯកសារវិស្វកម្ម',
                'title_2' => null,
                'title_2_kh' => null,
                'description' => 'Access thousands of car manuals and schematics.',
                'description_kh' => 'ចូលមើលសៀវភៅណែនាំរថយន្ត និងគំនូសតាងរាប់ពាន់។',
                'btn_text' => 'Read in App',
                'btn_text_kh' => 'អានក្នុងកម្មវិធី',
                'btn_link' => '/download-app',
                'background_color' => '#0f172a',
                'foreground_color' => '#ffffff',
                'image' => '/assets/images/sample/documents_banner1.webp',
                'sort_order' => 5,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('website_banners')->insert(array_merge($heroSlides, $miniBanners));
    }
}
