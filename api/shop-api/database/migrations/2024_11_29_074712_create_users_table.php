<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            $table->string('username', 255);
            $table->string('password', 255);
            $table->string('email', 255)->unique();
            $table->string('full_name', 255);
            $table->unsignedBigInteger('group_id');
            $table->boolean('trust_status');
            $table->boolean('registration_status');
            $table->timestamp('registration_date');
            $table->string('avatar_url', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
