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
        Schema::create('item_brand_item_category', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('item_brand_id');
            $table->unsignedBigInteger('item_category_id');

            // Foreign key constraints
            $table->foreign('item_brand_id')
                ->references('id')
                ->on('item_brands')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE'); // If a brand is deleted, remove its category links

            $table->foreign('item_category_id')
                ->references('id')
                ->on('item_categories')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE'); // If a category is deleted, remove its brand links

            // Prevent duplicate entries of the same brand in the same category
            $table->unique(['item_brand_id', 'item_category_id'], 'brand_category_unique');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_brand_item_category');
    }
};
