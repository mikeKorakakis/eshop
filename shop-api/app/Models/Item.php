<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="Item",
 *      required={"name","description","price","added_date","country_of_origin","status","rating","is_approved","category_id","owner_id","image_url","contact_info"},
 *  	@OA\Property(
 *    		property="item_id",
 *    		description="ID of the item",
 *    		readOnly=true,
 *    		nullable=false,
 *    		type="integer"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          description="Name of the item",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="description",
 *          description="Description of the item",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="price",
 *          description="Price of the item",
 *          readOnly=false,
 *          nullable=false,
 *          type="number",
 *          format="number"
 *      ),
 *      @OA\Property(
 *          property="added_date",
 *          description="Date item was added",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *          format="date"
 *      ),
 *      @OA\Property(
 *          property="country_of_origin",
 *          description="Country where item was made",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="status",
 *          description="Status (e.g., Available, Sold)",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="is_approved",
 *          description="Approval status",
 *          readOnly=false,
 *          nullable=false,
 *          type="boolean",
 *      ),
 *      @OA\Property(
 *          property="image_url",
 *          description="URL to item image",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      ),
 *      @OA\Property(
 *          property="contact_info",
 *          description="Contact information",
 *          readOnly=false,
 *          nullable=false,
 *          type="string",
 *      )
 * )
 */class Item extends Model
{
    public $table = 'items';

    protected $primaryKey = 'item_id';

    public $timestamps = false;

    public $fillable = [
        'name',
        'description',
        'price',
        'added_date',
        'country_of_origin',
        'status',
        'rating',
        'is_approved',
        'category_id',
        'owner_id',
        'image_url',
        'contact_info'
    ];

    protected $casts = [
        'name' => 'string',
        'description' => 'string',
        'price' => 'decimal:2',
        'added_date' => 'date',
        'country_of_origin' => 'string',
        'status' => 'string',
        'is_approved' => 'boolean',
        'image_url' => 'string',
        'contact_info' => 'string'
    ];

    public static array $rules = [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:65535',
        'price' => 'required|numeric',
        'added_date' => 'required',
        'country_of_origin' => 'required|string|max:255',
        'status' => 'required|string|max:50',
        'rating' => 'required',
        'is_approved' => 'required|boolean',
        'category_id' => 'required',
        'owner_id' => 'required',
        'image_url' => 'required|string|max:255',
        'contact_info' => 'required|string|max:255'
    ];

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\Category::class, 'category_id');
    }

    public function owner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Order::class, 'order_items');
    }

    public function user1s(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class, 'comments');
    }
}
