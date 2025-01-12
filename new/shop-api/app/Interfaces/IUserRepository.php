<?php

namespace App\Interfaces;

interface IUserRepository
{
    public function index();
    public function getById($user_id);
    public function store(array $data);
    public function update(array $data, $user_id);
    public function delete($user_id);
}
