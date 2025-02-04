<?php

namespace App\Http\Controllers;
use App\Classes\ApiResponseClass;
use App\Http\Resources\CommentResource;
use App\Interfaces\ICommentRepository;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    private ICommentRepository $commentRepository;

    public function __construct(ICommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function index()
    {
        $data = $this->commentRepository->index();
        return ApiResponseClass::sendResponse(CommentResource::collection($data), '', ApiResponseClass::HTTP_OK);
    }
    public function create()
    {

    }
    public function store(CommentRequest $request)
    {
        $details = [
            'content' => $request->content,
            'created_date' => $request->created_date,
            'product_id' => $request->product_id,
            'user_id' => $request->user_id
        ];

        DB::beginTransaction();

        try {
            $comment = $this->commentRepository->store($details);
            DB::commit();
            return ApiResponseClass::sendResponse(new CommentResource($comment), 'Comment added', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
    }
    public function show($comment_id)
    {
        $comment = $this->commentRepository->getById($comment_id);
        return ApiResponseClass::sendResponse(new CommentResource($comment), '', ApiResponseClass::HTTP_OK);
    }
    public function destroy($comment_id)
    {
        $this->commentRepository->delete($comment_id);
        return ApiResponseClass::sendResponse('Deleted', '', ApiResponseClass::HTTP_NO_CONTENT);
    }
    public function update(CommentRequest $request, $comment_id)
    {
        $updateDetails = [
            'content' => $request->content,
            'created_date' => $request->created_date,
            'product_id' => $request->product_id,
            'user_id' => $request->user_id
        ];
        DB::beginTransaction();
        try {
            $comment = $this->commentRepository->update($updateDetails, $comment_id);
            DB::commit();
            return ApiResponseClass::sendResponse('Comment updated', '', ApiResponseClass::HTTP_CREATED);
        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }
    public function getProductComments($productId)
    {
        $comments = $this->commentRepository->getCommentsOfProduct($productId);
        return ApiResponseClass::sendResponse(CommentResource::collection($comments), 'BOMBA', ApiResponseClass::HTTP_OK);
    }
}
