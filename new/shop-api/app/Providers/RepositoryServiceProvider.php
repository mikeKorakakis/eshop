<?php

namespace App\Providers;

use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ICommentRepository;
use App\Interfaces\IMediaRepository;
use App\Interfaces\IOrderItemRepository;
use App\Interfaces\IOrderRepository;
use App\Interfaces\IProductGalleryRepository;
use App\Interfaces\IProductRepository;
use App\Interfaces\IUserRepository;
use App\Interfaces\ICreditCardRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CommentRepository;
use App\Repositories\MediaRepository;
use App\Repositories\OrderItemRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductGalleryRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use App\Repositories\CreditCardRepository;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(IProductRepository::class, ProductRepository::class);
        $this->app->bind(IUserRepository::class, UserRepository::class);
        $this->app->bind(IOrderRepository::class, OrderRepository::class);
        $this->app->bind(IMediaRepository::class, MediaRepository::class);
        $this->app->bind(IOrderItemRepository::class, OrderItemRepository::class);
        $this->app->bind(ICommentRepository::class, CommentRepository::class);
        $this->app->bind(IProductGalleryRepository::class, ProductGalleryRepository::class);
		$this->app->bind(ICreditCardRepository::class, CreditCardRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
