<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

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
        'parent_id' => $this->faker->randomDigitNotNull,
        'ordering' => $this->faker->randomDigitNotNull,
        'is_visible' => $this->faker->word,
        'allow_comments' => $this->faker->word,
        'allow_ads' => $this->faker->word
        ];
    }
}
