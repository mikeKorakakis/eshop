<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('credit_cards', function (Blueprint $table) {
            $table->id('credit_card_id');
            $table->unsignedBigInteger('user_id');
            $table->string('card_number', 16);
            $table->string('cardholder_name', 255);
            $table->date('expiration_date');
            $table->string('cvv', 3);
            $table->decimal('balance', 15, 2);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_cards');
    }
};
