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
        Schema::table('product_gallery', function (Blueprint $table) {
            //
			$table->dropPrimary('gallery_id');

			$table->id('gallery_id')->change();
	
			$table->dropForeign(['product_id']);
			
			// Add a newforeign key for 'product_id' to reference 'product_id' on 'products'
			$table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_gallery', function (Blueprint $table) {
            //
			$table->dropForeign(['product_id']);

			$table->foreign('product_id')->references('id')->on('items')->onDelete('cascade');
	
			$table->dropPrimary('gallery_id');
	
			$table->bigIncrements('gallery_id')->change();
        });
    }
};
