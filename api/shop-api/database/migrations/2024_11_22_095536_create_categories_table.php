<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Name field
            $table->text('description')->nullable(); // Description field
            $table->unsignedBigInteger('parent_id')->nullable(); // Parent ID for nested categories
            $table->integer('ordering')->nullable(); // Ordering for sorting
            $table->boolean('is_visible')->default(true); // Visibility flag
            $table->boolean('allow_comments')->default(true); // Allow comments flag
            $table->boolean('allow_ads')->default(true); // Allow ads flag
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
