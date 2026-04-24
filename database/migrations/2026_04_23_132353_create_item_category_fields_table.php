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
        Schema::create('item_category_fields', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->comment('Link to the category')
                ->constrained('item_categories')
                ->onDelete('cascade');

            $table->string('label')
                ->comment('The display label for the UI, e.g., "Transmission"');

            $table->string('label_kh')
                ->comment('The Khmer display label for the UI');

            $table->string('field_key')
                ->comment('The machine-readable key used for JSON or API, e.g., "gearbox"');

            $table->string('field_type')
                ->comment('The input type: select, radio, text, number, etc.');

            $table->boolean('is_required')
                ->default(false)
                ->comment('Toggle if this field must be filled in the item form');

            $table->integer('order_index');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_category_fields');
    }
};
