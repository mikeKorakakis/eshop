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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();  // auto-incrementing primary key
            $table->string('title');  // title column
            $table->integer('mediaId');  // mediaId column
            $table->integer('parentId')->nullable();  // parentId column (nullable, for root categories)
            $table->boolean('isParent');  // isParent column (true or false)
            $table->timestamps();  // created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
