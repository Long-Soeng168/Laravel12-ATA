<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('multiple_tables', function (Blueprint $table) {
            Schema::table('item_body_types', function (Blueprint $table) {
                $table->softDeletes();
            });

            Schema::table('item_brands', function (Blueprint $table) {
                $table->softDeletes();
            });

            Schema::table('item_images', function (Blueprint $table) {
                $table->softDeletes();
            });

            Schema::table('item_models', function (Blueprint $table) {
                $table->softDeletes();
            });

            Schema::table('videos', function (Blueprint $table) {
                $table->softDeletes();
            });

            Schema::table('video_play_lists', function (Blueprint $table) {
                $table->softDeletes();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('multiple_tables', function (Blueprint $table) {
            Schema::table('item_body_types', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });

            Schema::table('item_brands', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });

            Schema::table('item_images', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });

            Schema::table('item_models', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });

            Schema::table('videos', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });

            Schema::table('video_play_lists', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });
        });
    }
};
