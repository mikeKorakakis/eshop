<?php

namespace App\Repositories;

use App\Models\CreditCard;
use App\Interfaces\ICreditCardRepository;

class CreditCardRepository implements ICreditCardRepository
{

    public function index()
    {
        return CreditCard::all();
    }

    public function getById($id)
    {
        return CreditCard::findOrFail($id);
    }

    public function store(array $data)
    {
        return CreditCard::create($data);
    }

    public function update(array $data, $id): bool
    {
        return CreditCard::where("credit_card_id", $id)->update($data);
    }
    public function delete($id)
    {
        return CreditCard::destroy($id);
    }
}