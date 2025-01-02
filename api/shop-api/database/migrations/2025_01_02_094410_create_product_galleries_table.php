<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('product_gallery', function (Blueprint $table) {
            $table->bigIncrements('gallery_id');
            $table->unsignedBigInteger('media_id');
            $table->string('name')->nullable();
            $table->unsignedBigInteger('product_id');
            $table->integer('size')->nullable();

            // Foreign key constraints
            $table->foreign('media_id')->references('media_id')->on('media')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('items')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_gallery');
    }
};
