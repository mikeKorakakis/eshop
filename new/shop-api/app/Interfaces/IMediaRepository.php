<?php

namespace App\Interfaces;

interface IMediaRepository
{
    public function index();
    public function getById($id);
    public function store(array $data);
    public function update(array $data, $id);
    public function delete($id);
    public function assignToProduct($id, $productId);
}
