<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\CreditCard;

class CreditCardApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function test_create_credit_card()
    {
        $creditCard = CreditCard::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/credit_cards', $creditCard
        );

        $this->assertApiResponse($creditCard);
    }

    /**
     * @test
     */
    public function test_read_credit_card()
    {
        $creditCard = CreditCard::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/credit_cards/'.$creditCard->id
        );

        $this->assertApiResponse($creditCard->toArray());
    }

    /**
     * @test
     */
    public function test_update_credit_card()
    {
        $creditCard = CreditCard::factory()->create();
        $editedCreditCard = CreditCard::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/credit_cards/'.$creditCard->id,
            $editedCreditCard
        );

        $this->assertApiResponse($editedCreditCard);
    }

    /**
     * @test
     */
    public function test_delete_credit_card()
    {
        $creditCard = CreditCard::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/credit_cards/'.$creditCard->id
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/credit_cards/'.$creditCard->id
        );

        $this->response->assertStatus(404);
    }
}
