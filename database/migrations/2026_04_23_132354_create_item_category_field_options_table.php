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
        Schema::create('item_category_field_options', function (Blueprint $table) {
            $table->id();

            $table->foreignId('item_category_field_id')
                ->comment('Link to the specific field blueprint')
                ->constrained('item_category_fields')
                ->onDelete('cascade');

            $table->string('option_value')
                ->comment('The value stored in database, e.g., "auto"');

            $table->string('label_en')
                ->comment('The English display name for this option');

            $table->string('label_kh')
                ->comment('The Khmer display name for this option');

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
        Schema::dropIfExists('item_category_field_options');
    }
};
