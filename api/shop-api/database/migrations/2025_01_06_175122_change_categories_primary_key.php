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
		Schema::dropIfExists('categories');
        // Schema::table('categories', function (Blueprint $table) {
        //     //
		// 	$table->dropPrimary('id');
		// 	$table->primary('category_id');
        // });
		Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id'); // Primary key
            $table->string('name'); // Name field
            $table->text('description')->nullable(); // Description field
            $table->unsignedBigInteger('parent_id')->nullable(); // Parent ID for nested categories
            $table->integer('ordering')->nullable(); // Ordering for sorting
            $table->boolean('is_visible')->default(true); // Visibility flag
            $table->boolean('allow_comments')->default(true); // Allow comments flag
            $table->boolean('allow_ads')->default(true); // Allow ads flag
            $table->integer('media_id')->nullable();
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
		Schema::dropIfExists('categories');
        // Schema::table('categories', function (Blueprint $table) {
        //     //
		// 	$table->dropPrimary('category_id');
		// 	$table->primary('id');
        // });
    }
};
