<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => $this->faker->word,
        'password' => $this->faker->word,
        'email' => $this->faker->word,
        'full_name' => $this->faker->word,
        'group_id' => $this->faker->randomDigitNotNull,
        'trust_status' => $this->faker->randomDigitNotNull,
        'registration_status' => $this->faker->word,
        'registration_date' => $this->faker->word,
        'avatar_url' => $this->faker->word
        ];
    }
}
