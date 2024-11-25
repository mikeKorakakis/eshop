<?php namespace Tests\Repositories;

use App\Models\CreditCard;
use App\Repositories\CreditCardRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;

class CreditCardRepositoryTest extends TestCase
{
    use ApiTestTrait, DatabaseTransactions;

    /**
     * @var CreditCardRepository
     */
    protected $creditCardRepo;

    public function setUp() : void
    {
        parent::setUp();
        $this->creditCardRepo = \App::make(CreditCardRepository::class);
    }

    /**
     * @test create
     */
    public function test_create_credit_card()
    {
        $creditCard = CreditCard::factory()->make()->toArray();

        $createdCreditCard = $this->creditCardRepo->create($creditCard);

        $createdCreditCard = $createdCreditCard->toArray();
        $this->assertArrayHasKey('id', $createdCreditCard);
        $this->assertNotNull($createdCreditCard['id'], 'Created CreditCard must have id specified');
        $this->assertNotNull(CreditCard::find($createdCreditCard['id']), 'CreditCard with given id must be in DB');
        $this->assertModelData($creditCard, $createdCreditCard);
    }

    /**
     * @test read
     */
    public function test_read_credit_card()
    {
        $creditCard = CreditCard::factory()->create();

        $dbCreditCard = $this->creditCardRepo->find($creditCard->id);

        $dbCreditCard = $dbCreditCard->toArray();
        $this->assertModelData($creditCard->toArray(), $dbCreditCard);
    }

    /**
     * @test update
     */
    public function test_update_credit_card()
    {
        $creditCard = CreditCard::factory()->create();
        $fakeCreditCard = CreditCard::factory()->make()->toArray();

        $updatedCreditCard = $this->creditCardRepo->update($fakeCreditCard, $creditCard->id);

        $this->assertModelData($fakeCreditCard, $updatedCreditCard->toArray());
        $dbCreditCard = $this->creditCardRepo->find($creditCard->id);
        $this->assertModelData($fakeCreditCard, $dbCreditCard->toArray());
    }

    /**
     * @test delete
     */
    public function test_delete_credit_card()
    {
        $creditCard = CreditCard::factory()->create();

        $resp = $this->creditCardRepo->delete($creditCard->id);

        $this->assertTrue($resp);
        $this->assertNull(CreditCard::find($creditCard->id), 'CreditCard should not exist in DB');
    }
}
