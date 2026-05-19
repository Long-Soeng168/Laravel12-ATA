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
        Schema::table('shops', function (Blueprint $table) {
            // 1. Add the column (ensure the type matches provinces.code exactly)
            $table->string('province_code')->nullable()->after('name');

            // 2. Define the foreign key relationship
            $table->foreign('province_code')
                ->references('code')
                ->on('provinces')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign(['province_code']);
            $table->dropColumn('province_code');
        });
    }
};
