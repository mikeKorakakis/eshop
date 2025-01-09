<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\IUserRepository;

class UserRepository implements IUserRepository
{
    public function index()
    {
        return User::all();
    }

    public function getById($user_id)
    {
        return User::with(['media'])->find($user_id);;
    }
    public function store(array $data): User
    {
        return User::create($data);
    }
    public function update(array $data, $user_id): bool
    {
        return User::where("user_id", $user_id)->update($data);
    }
    public function delete($user_id)
    {
        return User::destroy($user_id);
    }
}