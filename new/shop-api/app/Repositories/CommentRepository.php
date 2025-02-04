<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Interfaces\ICommentRepository;

class CommentRepository implements ICommentRepository
{
    public function index()
    {
        return Comment::all();
    }
    public function getById($comment_id)
    {
        return Comment::findOrFail($comment_id);
    }
    public function store(array $data)
    {
        return Comment::create($data);
    }
    public function update(array $data, $id): bool
    {
        return Comment::where("comment_id", $id)->update($data);
    }
    public function delete($id)
    {
        return Comment::destroy($id);
    }
    public function getCommentsOfProduct($productId)
    {
        return Comment::where("product_id", $productId)->get();
    }
}