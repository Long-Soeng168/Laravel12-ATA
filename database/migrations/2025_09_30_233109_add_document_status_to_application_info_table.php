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
        Schema::table('application_infos', function (Blueprint $table) {
            $table->string('document_status')->default('need_purchase')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('application_infos', function (Blueprint $table) {
            $table->dropColumn('document_status');
        });
    }
};
