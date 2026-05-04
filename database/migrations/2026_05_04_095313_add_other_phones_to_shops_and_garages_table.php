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
            $table->json('other_phones')->nullable()->after('phone');
        });
        Schema::table('garages', function (Blueprint $table) {
            $table->json('other_phones')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('other_phones');
        });
        Schema::table('garages', function (Blueprint $table) {
            $table->dropColumn('other_phones');
        });
    }
};
