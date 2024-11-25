<?php

namespace Database\Factories;

use App\Models\CreditCard;
use Illuminate\Database\Eloquent\Factories\Factory;

class CreditCardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CreditCard::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomDigitNotNull,
        'card_number' => $this->faker->word,
        'cardholder_name' => $this->faker->word,
        'expiration_date' => $this->faker->word,
        'cvv' => $this->faker->word,
        'balance' => $this->faker->word
        ];
    }
}
