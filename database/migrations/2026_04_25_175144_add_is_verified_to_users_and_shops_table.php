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
        Schema::table('users_and_shops', function (Blueprint $table) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_verified')->default(false)->after('email');
            });

            Schema::table('shops', function (Blueprint $table) {
                $table->boolean('is_verified')->default(false)->after('name');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users_and_shops', function (Blueprint $table) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_verified');
            });

            Schema::table('shops', function (Blueprint $table) {
                $table->dropColumn('is_verified');
            });
        });
    }
};
