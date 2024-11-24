-- Improved SQL File with Better Naming Conventions

SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;

SET SESSION time_zone = '+00:00';
SET NAMES utf8mb4;

-- Database: `shop`

-- --------------------------------------------------------

-- Table: `users`
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for user',
  `username` VARCHAR(255) NOT NULL COMMENT 'Username for login',
  `password` VARCHAR(255) NOT NULL COMMENT 'Hashed password',
  `email` VARCHAR(255) NOT NULL COMMENT 'User email',
  `full_name` VARCHAR(255) NOT NULL COMMENT 'Full name of user',
  `group_id` INT(11) NOT NULL DEFAULT 0 COMMENT 'Group or role identifier',
  `trust_status` INT(11) NOT NULL DEFAULT 0 COMMENT 'Trust level or rank',
  `registration_status` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Registration approval status',
  `registration_date` DATE NOT NULL COMMENT 'Date of registration',
  `avatar_url` VARCHAR(255) NOT NULL COMMENT 'URL to avatar image',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `categories`
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for category',
  `name` VARCHAR(255) NOT NULL COMMENT 'Category name',
  `description` TEXT NOT NULL COMMENT 'Category description',
  `parent_id` INT(11) DEFAULT 0 COMMENT 'Parent category ID',
  `ordering` INT(11) DEFAULT NULL COMMENT 'Category display order',
  `is_visible` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Visibility status',
  `allow_comments` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Allow comments in category',
  `allow_ads` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Allow ads in category',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `items`
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for item',
  `name` VARCHAR(255) NOT NULL COMMENT 'Name of the item',
  `description` TEXT NOT NULL COMMENT 'Description of the item',
  `price` DECIMAL(10,2) NOT NULL COMMENT 'Price of the item',
  `added_date` DATE NOT NULL COMMENT 'Date item was added',
  `country_of_origin` VARCHAR(255) NOT NULL COMMENT 'Country where item was made',
  `status` VARCHAR(50) NOT NULL COMMENT 'Status (e.g., Available, Sold)',
  `rating` SMALLINT(6) NOT NULL DEFAULT 0 COMMENT 'Rating of the item',
  `is_approved` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Approval status',
  `category_id` INT(11) NOT NULL COMMENT 'Category ID',
  `owner_id` INT(11) NOT NULL COMMENT 'Owner/User ID',
  `image_url` VARCHAR(255) NOT NULL COMMENT 'URL to item image',
  `contact_info` VARCHAR(255) NOT NULL COMMENT 'Contact information',
  PRIMARY KEY (`item_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `comments`
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for comment',
  `content` TEXT NOT NULL COMMENT 'Comment text',
  `status` TINYINT(1) NOT NULL COMMENT 'Approval status of comment',
  `created_date` DATE NOT NULL COMMENT 'Date comment was created',
  `item_id` INT(11) NOT NULL COMMENT 'ID of associated item',
  `user_id` INT(11) NOT NULL COMMENT 'ID of the user who made the comment',
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `credit_cards`
CREATE TABLE IF NOT EXISTS `credit_cards` (
  `credit_card_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for credit card',
  `user_id` INT(11) NOT NULL COMMENT 'Associated user ID',
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
  `order_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for each order',
  `user_id` INT(11) NOT NULL COMMENT 'User who placed the order',
  `order_date` DATETIME NOT NULL COMMENT 'Date and time the order was placed',
  `total_amount` DECIMAL(10,2) NOT NULL COMMENT 'Total amount for the order',
  `order_status` VARCHAR(50) NOT NULL DEFAULT 'Pending' COMMENT 'Order status',
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: `order_items`
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for order item',
  `order_id` INT(11) NOT NULL COMMENT 'Associated order ID',
  `item_id` INT(11) NOT NULL COMMENT 'ID of purchased item',
  `quantity` INT(11) NOT NULL COMMENT 'Quantity purchased',
  `price_at_purchase` DECIMAL(10,2) NOT NULL COMMENT 'Price at the time of purchase',
  PRIMARY KEY (`order_item_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Insert data into `users`
INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `group_id`, `trust_status`, `registration_status`, `registration_date`, `avatar_url`) VALUES
(1, 'admin', 'f865b53623b121fd34ee5426c792e5c33af8c227', 'admin@example.com', 'Admin User', 1, 1, 1, '2023-01-01', 'admin.png'),
(2, 'user', '95c946bf622ef93b0a211cd0fd028dfdfcf7e39e', 'jsmith@example.com', 'John Smith', 0, 0, 1, '2023-01-02', 'user.png');

-- Insert data into `categories`
INSERT INTO `categories` (`category_id`, `name`, `description`, `parent_id`, `ordering`, `is_visible`, `allow_comments`, `allow_ads`) VALUES
(1, 'Accessories', 'Various accessories for devices', 0, 1, 1, 1, 1),
(2, 'Laptops', 'Different types of laptops', 0, 2, 1, 1, 1),
(3, 'Desktops', 'All-in-one and tower desktops', 0, 3, 1, 1, 1);

-- Insert data into `items`
INSERT INTO `items` (`item_id`, `name`, `description`, `price`, `added_date`, `country_of_origin`, `status`, `rating`, `is_approved`, `category_id`, `owner_id`, `image_url`, `contact_info`) VALUES
(1, 'Ergonomic Chair', 'Comfortable ergonomic chair', '200.00', '2023-01-10', 'USA', 'Available', 5, 1, 1, 1, 'chair.jpg', 'contact@example.com'),
(2, 'Wireless Mouse', 'Smooth and precise wireless mouse', '25.99', '2023-01-12', 'Germany', 'Available', 4, 1, 1, 1, 'mouse.jpg', 'contact@example.com'),
(3, 'Gaming Laptop', 'High-performance gaming laptop', '1500.00', '2023-01-14', 'Japan', 'Available', 5, 1, 2, 1, 'laptop.jpg', 'contact@example.com'),
(4, 'Personal Computer', 'High-performance Personal Computer', '999.00', '2023-01-16', 'South Korea', 'Available', 4, 1, 3, 1, 'pc.jpg', 'contact@example.com');

-- Insert data into `comments`
INSERT INTO `comments` (`comment_id`, `content`, `status`, `created_date`, `item_id`, `user_id`) VALUES
(1, 'Great quality!', 1, '2023-01-15', 1, 1),
(2, 'Fast shipping, highly recommend!', 1, '2023-01-18', 2, 2);

-- Insert data into `credit_cards`
INSERT INTO `credit_cards` (`credit_card_id`, `user_id`, `card_number`, `cardholder_name`, `expiration_date`, `cvv`, `balance`) VALUES
(1, 1, '4242424242424242', 'Admin User', '2025-12-31', '123', 5000.00),
(2, 2, '4242424242424242', 'John Smith', '2024-06-30', '456', 1000.00);

-- Insert data into `orders`
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`, `order_status`) VALUES
(1, 1, '2023-01-20 14:30:00', 225.99, 'Completed'),
(2, 2, '2023-01-25 16:45:00', 1525.00, 'Pending');

-- Insert data into `order_items`
INSERT INTO `order_items` (`order_item_id`, `order_id`, `item_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 1, 1, 200.00),
(2, 1, 2, 1, 25.99),
(3, 2, 3, 1, 1500.00),
(4, 2, 4, 1, 25.00);
