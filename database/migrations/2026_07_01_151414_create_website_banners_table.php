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
        Schema::create('website_banners', function (Blueprint $table) {
            $table->id();
            $table->string('type', 50)->index(); // 'hero_slide', 'mini_banner'
            
            $table->string('title_1')->nullable();
            $table->string('title_1_kh')->nullable();
            $table->string('title_2')->nullable();
            $table->string('title_2_kh')->nullable();
            
            $table->text('description')->nullable();
            $table->text('description_kh')->nullable();
            
            $table->string('btn_text', 100)->nullable();
            $table->string('btn_text_kh', 100)->nullable();
            $table->string('btn_link')->nullable();
            
            $table->string('background_color', 20)->nullable();
            $table->string('foreground_color', 20)->nullable();
            $table->string('image')->nullable();
            
            $table->integer('sort_order')->default(0)->nullable();
            $table->string('status')->default('active')->nullable();
            
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_banners');
    }
};
