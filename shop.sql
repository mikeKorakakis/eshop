-- Improved SQL File with Better Naming Conventions

SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;

SET SESSION time_zone = '+00:00';
SET NAMES utf8mb4;

-- Database: `shop`

-- --------------------------------------------------------

-- Create the 'media' table if it does not already exist
CREATE TABLE IF NOT EXISTS `media` (
    `media_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `path` VARCHAR(255) NOT NULL,
    `size` INT DEFAULT NULL,
    -- `created_at` TIMESTAMP NULL DEFAULT NULL,
    -- `updated_at` TIMESTAMP NULL DEFAULT NULL
	PRIMARY KEY (`media_id`)
);

-- Table: `users`
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for user',
  `username` VARCHAR(255) NOT NULL COMMENT 'Username for login',
  `password` VARCHAR(255) NOT NULL COMMENT 'Hashed password',
  `email` VARCHAR(255) NOT NULL COMMENT 'User email',
  `full_name` VARCHAR(255) NOT NULL COMMENT 'Full name of user',
  `group_id` BIGINT NOT NULL DEFAULT 0 COMMENT 'Group or role identifier',
  `registration_date` DATETIME  NOT NULL COMMENT 'Date of registration' DEFAULT CURRENT_TIMESTAMP,
  `media_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'id of avatar image',
  FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `categories`
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for category',
  `name` VARCHAR(255) NOT NULL COMMENT 'Category name',
  `description` TEXT NOT NULL COMMENT 'Category description',
  `parent_id` BIGINT DEFAULT 0 COMMENT 'Parent category ID',
  `ordering` BIGINT DEFAULT NULL COMMENT 'Category display order',
  `media_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'id of category image',
  FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `products`
CREATE TABLE IF NOT EXISTS `products` ( 
  `product_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for product',
  `name` VARCHAR(255) NOT NULL COMMENT 'Name of the product',
  `description` TEXT NOT NULL COMMENT 'Description of the product',
  `price` DECIMAL(10,2) NOT NULL COMMENT 'Price of the product',
  `added_date` DATETIME  NOT NULL COMMENT 'Date product was added',
  `country_of_origin` VARCHAR(255) NOT NULL COMMENT 'Country where product was made',
  `category_id` BIGINT UNSIGNED NOT NULL COMMENT 'Category ID', 
  `owner_id` BIGINT UNSIGNED NOT NULL COMMENT 'Owner/User ID', 
  `media_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'id of product image',
  PRIMARY KEY (`product_id`), 
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id` ) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `comments`
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for comment',
  `content` TEXT NOT NULL COMMENT 'Comment text',
  `created_date` DATETIME  NOT NULL COMMENT 'Date comment was created' DEFAULT CURRENT_TIMESTAMP,
  `product_id` BIGINT UNSIGNED NOT NULL COMMENT 'ID of associated product',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT 'ID of the user who made the comment',
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `credit_cards`
CREATE TABLE IF NOT EXISTS `credit_cards` (
  `credit_card_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for credit card',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT 'Associated user ID',
  `card_number` VARCHAR(16) NOT NULL COMMENT '16-digit card number',
  `cardholder_name` VARCHAR(255) NOT NULL COMMENT 'Name on the card',
  `expiration_date` DATE NOT NULL COMMENT 'Expiration date of card',
  `cvv` VARCHAR(3) NOT NULL COMMENT '3-digit CVV',
  `balance` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Available balance',
  PRIMARY KEY (`credit_card_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `orders`
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for each order',
  `user_id` BIGINT UNSIGNED NOT NULL COMMENT 'User who placed the order',
  `order_date` DATETIME NOT NULL COMMENT 'Date and time the order was placed',
  `total_amount` DECIMAL(10,2) NOT NULL COMMENT 'Total amount for the order',
  `order_status` VARCHAR(50) NOT NULL DEFAULT 'Pending' COMMENT 'Order status',
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `order_items`
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT COMMENT 'Unique ID for order item',
  `order_id` BIGINT UNSIGNED NOT NULL COMMENT 'Associated order ID',
  `product_id` BIGINT UNSIGNED COMMENT 'ID of purchased item',
  `quantity` BIGINT NOT NULL COMMENT 'Quantity purchased',
  `price_at_purchase` DECIMAL(10,2) NOT NULL COMMENT 'Price at the time of purchase',
  PRIMARY KEY (`order_item_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `product_gallery`
CREATE TABLE product_gallery (
    `gallery_id` BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT,
    `media_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) DEFAULT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,	
    `size` INT DEFAULT NULL,
     PRIMARY KEY (`gallery_id`),    
     FOREIGN KEY (media_id) REFERENCES media(media_id) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create the 'cache' table if it does not already exist
CREATE TABLE IF NOT EXISTS `cache` (
    `key` VARCHAR(255) NOT NULL PRIMARY KEY,
    `value` MEDIUMTEXT NOT NULL,
    `expiration` INT NOT NULL
);

-- Create the 'cache_locks' table if it does not already exist
CREATE TABLE IF NOT EXISTS `cache_locks` (
    `key` VARCHAR(255) NOT NULL PRIMARY KEY,
    `owner` VARCHAR(255) NOT NULL,
    `expiration` INT NOT NULL
);

-- Create the 'personal_access_tokens' table if it does not already exist
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tokenable_type` VARCHAR(255) NOT NULL,
    `tokenable_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `token` CHAR(64) NOT NULL UNIQUE,
    `abilities` TEXT NULL,
    `last_used_at` TIMESTAMP NULL,
    `expires_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    INDEX `tokenable_index` (`tokenable_type`, `tokenable_id`)
);




-- Insert data into `users`_
INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `group_id`, `registration_date`) VALUES
(1, 'admin', '$2y$12$ZL5J5rnQLVulLW0gWvA5TuOLCR8mly4NsUMJO8TYpbntaWKzuy8/i', 'admin@example.com', 'Admin User', 1, '2023-01-01'),
(2, 'user', '$2y$12$0yFGiK07DvtiW2pY90x.oeMiowOdaTn8xUa7XGqfr/QSzuBySOSYK', 'jsmith@example.com', 'John Smith', 0, '2023-01-02');

-- Insert data into `categories`
INSERT INTO `categories` (`category_id`, `name`, `description`, `parent_id`, `ordering`) VALUES
(1, 'Accessories', 'Various accessories for devices', 0, 1),
(2, 'Laptops', 'Different types of laptops', 0, 2),
(3, 'Desktops', 'All-in-one and tower desktops', 0, 3);

-- Insert data into `products`
INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `added_date`, `country_of_origin`, `category_id`, `owner_id`) VALUES
(1, 'Ergonomic Chair', 'Comfortable ergonomic chair', '200.00', '2023-01-10', 'USA', 1 , 1 ),
(2, 'Wireless Mouse', 'Smooth and precise wireless mouse', '25.99', '2023-01-12', 'Germany',1, 1),
(3, 'Gaming Laptop', 'High-performance gaming laptop', '1500.00', '2023-01-14', 'Japan', 2, 1 ),
(4, 'Personal Computer', 'High-performance Personal Computer', '999.00', '2023-01-16', 'South Korea', 3, 1);

-- Insert data into `comments`
INSERT INTO `comments` (`comment_id`, `content`, `created_date`, `product_id`, `user_id`) VALUES
(1, 'Great quality!', '2023-01-15', 1, 2),
(2, 'Fast shipping, highly recommend!', '2023-01-18', 2, 2);

-- Insert data into `credit_cards`
INSERT INTO `credit_cards` (`credit_card_id`, `user_id`, `card_number`, `cardholder_name`, `expiration_date`, `cvv`, `balance`) VALUES
(1, 1, '4242424242424242', 'Admin User', '2025-12-31', '123', 5000.00),
(2, 2, '4242424242424242', 'John Smith', '2024-06-30', '456', 1000.00);

-- Insert data into `orders`
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`, `order_status`) VALUES
(1, 1, '2023-01-20 14:30:00', 225.99, 'Completed'),
(2, 2, '2023-01-25 16:45:00', 1525.00, 'Pending');

-- Insert data into `order_items`
INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 1, 1, 200.00),
(2, 1, 2, 1, 25.99),
(3, 2, 3, 1, 1500.00),
(4, 2, 4, 1, 25.00);
