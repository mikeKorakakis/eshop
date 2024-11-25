<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
        'description' => $this->faker->text,
        'price' => $this->faker->word,
        'added_date' => $this->faker->word,
        'country_of_origin' => $this->faker->word,
        'status' => $this->faker->word,
        'rating' => $this->faker->word,
        'is_approved' => $this->faker->word,
        'category_id' => $this->faker->randomDigitNotNull,
        'owner_id' => $this->faker->randomDigitNotNull,
        'image_url' => $this->faker->word,
        'contact_info' => $this->faker->word
        ];
    }
}
