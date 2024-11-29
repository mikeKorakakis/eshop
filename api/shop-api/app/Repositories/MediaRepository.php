<?php

namespace App\Repositories;

use App\Models\Media;
use App\Interfaces\IMediaRepository;

class MediaRepository implements IMediaRepository
{
    public function index()
    {
        return Media::all();
    }
    public function getById($id)
    {
        return Media::findOrFail($id);
    }
    public function store(array $data)
    {
        return Media::create($data);
    }
    public function update(array $data, $id)
    {
        return Media::where("media_id", $id)->update($data);
    }
    public function delete($id)
    {
        return Media::destroy($id);
    }
}