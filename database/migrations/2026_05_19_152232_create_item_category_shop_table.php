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
        Schema::create('item_category_shop', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->cascadeOnDelete();

            // Custom string code for the category
            $table->string('item_category_code');
            $table->timestamps();

            // Foreign Key Constraint to the code column
            $table->foreign('item_category_code')
                ->references('code')
                ->on('item_categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Prevent duplicate entries
            $table->unique(['shop_id', 'item_category_code'], 'shop_cat_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_category_shop');
    }
};
