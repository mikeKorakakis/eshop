<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Product name
            $table->text('description')->nullable(); // Product description
            $table->decimal('price', 10, 2); // Product price (10 digits, 2 decimal places)
            $table->date('added_date'); // Date when the product was added
            $table->string('country_of_origin'); // Country where the product was made
            $table->string('status'); // Product status (e.g., active, inactive)
            $table->decimal('rating', 3, 2)->nullable(); // Product rating (3 digits, 2 decimal places)
            $table->boolean('is_approved'); // Whether the product is approved or not
            $table->unsignedBigInteger('category_id'); // Foreign key for category
            $table->unsignedBigInteger('owner_id'); // Foreign key for product owner (user)
            $table->string('image_url')->nullable(); // Image URL for the product
            $table->string('contact_info')->nullable(); // Contact information related to the product
            $table->timestamps(); // Created at & updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
