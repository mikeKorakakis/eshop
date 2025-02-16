-- MySQL Workbench SQL Dump
-- Version 5.0.2
-- https://www.mysql.com/
--
-- Host: 127.0.0.1
-- Generated at: Fri, 28 Aug 2020 21:08
-- Server version: 10.4.14-MariaDB
-- PHP version: 7.4.9

SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;

SET SESSION time_zone = '+00:00';
SET NAMES utf8mb4;

-- Database: `shop`

-- --------------------------------------------------------

-- --------------------------------------------------------

-- Table structure for table `users`

CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'To Identify User',
  `Username` varchar(255) NOT NULL COMMENT 'Username To Login',
  `Password` varchar(255) NOT NULL COMMENT 'Password To Login',
  `Email` varchar(255) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `GroupID` int(11) NOT NULL DEFAULT 0 COMMENT 'Identify User Group',
  `TrustStatus` int(11) NOT NULL DEFAULT 0 COMMENT 'Seller Rank',
  `RegStatus` int(11) NOT NULL DEFAULT 0 COMMENT 'User Approval',
  `Date` date NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `users`

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `FullName`, `GroupID`, `TrustStatus`, `RegStatus`, `Date`, `avatar`) VALUES
(1, 'admin', 'f865b53623b121fd34ee5426c792e5c33af8c227', 'admin@example.com', 'Admin User', 1, 1, 1, '2023-01-01', 'admin.png'),
(2, 'user', '95c946bf622ef93b0a211cd0fd028dfdfcf7e39e', 'jsmith@example.com', 'John Smith', 0, 0, 1, '2023-01-02', 'user.png');



-- Table structure for table `categories`

CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `parent` int(11) NOT NULL,
  `Ordering` int(11) DEFAULT NULL,
  `Visibility` tinyint(4) NOT NULL DEFAULT 0,
  `Allow_Comment` tinyint(4) NOT NULL DEFAULT 0,
  `Allow_Ads` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `categories`

INSERT INTO `categories` (`ID`, `Name`, `Description`, `parent`, `Ordering`, `Visibility`, `Allow_Comment`, `Allow_Ads`) VALUES
(1, 'ACCESSORIES', 'Various accessories for devices', 0, 1, 1, 1, 1),
(2, 'LAPTOPS', 'Different types of laptops', 0, 2, 1, 1, 1),
(3, 'DESKTOPS', 'All-in-one and tower desktops', 0, 3, 1, 1, 1);

-- --------------------------------------------------------


-- Table structure for table `items`

CREATE TABLE IF NOT EXISTS `items` (
  `Item_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Add_Date` date NOT NULL,
  `Country_Made` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `Rating` smallint(6) NOT NULL DEFAULT 0,
  `Approve` tinyint(4) NOT NULL DEFAULT 1,
  `Cat_ID` int(11) NOT NULL ,
  `Member_ID` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  PRIMARY KEY (`Item_ID`),
  KEY `member_1` (`Member_ID`),
  KEY `cat_1` (`Cat_ID`),
  CONSTRAINT `cat_1` FOREIGN KEY (`Cat_ID`) REFERENCES `categories` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_1` FOREIGN KEY (`Member_ID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `items`

INSERT INTO `items` (`Item_ID`, `Name`, `Description`, `Price`, `Add_Date`, `Country_Made`, `Status`, `Rating`, `Approve`, `Cat_ID`, `Member_ID`, `picture`, `contact`) VALUES
(1, 'Ergonomic Chair', 'Comfortable ergonomic chair', '200.00', '2023-01-10', 'USA', 'Available', 5, 1, 1, 1, 'chair.jpg', 'contact@example.com'),
(2, 'Wireless Mouse', 'Smooth and precise wireless mouse', '25.99', '2023-01-12', 'Germany', 'Available', 4, 1, 1, 1, 'mouse.jpg', 'contact@example.com'),
(3, 'Gaming Laptop', 'High-performance gaming laptop', '1500.00', '2023-01-14', 'Japan', 'Available', 5, 1, 2, 1, 'laptop.jpg', 'contact@example.com'),
(4, 'Personal Computer', 'High-performance Personal Computer', '999.00', '2023-01-16', 'South Korea', 'Available', 4, 1, 3, 1, 'pc.jpg', 'contact@example.com');


-- Table structure for table `comments`

CREATE TABLE IF NOT EXISTS `comments` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `comment_date` date NOT NULL,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `items_comment` (`item_id`),
  KEY `comment_user` (`user_id`),
  CONSTRAINT `comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `items_comment` FOREIGN KEY (`item_id`) REFERENCES `items` (`Item_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `comments`

INSERT INTO `comments` (`c_id`, `comment`, `status`, `comment_date`, `item_id`, `user_id`) VALUES
(1, 'Great quality!', 1, '2023-01-15', 1, 1),
(2, 'Fast shipping, highly recommend!', 1, '2023-01-18', 2, 2);


-- Table structure for table `credit_cards`

CREATE TABLE IF NOT EXISTS `credit_cards` (
  `CardID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `CardNumber` varchar(16) NOT NULL COMMENT '16-digit card number',
  `CardHolderName` varchar(255) NOT NULL,
  `ExpirationDate` date NOT NULL COMMENT 'Expiration date of the card',
  `CVV` varchar(3) NOT NULL COMMENT '3-digit security code',
  `Balance` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Available balance on the card',
  PRIMARY KEY (`CardID`),
  FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `credit_cards`

INSERT INTO `credit_cards` (`CardID`, `UserID`, `CardNumber`, `CardHolderName`, `ExpirationDate`, `CVV`, `Balance`) VALUES
(1, 1, '4242424242424242', 'Admin User', '2025-12-31', '123', 5000.00),
(2, 2, '4242424242424242', 'John Smith', '2024-06-30', '456', 1000.00);


-- Orders

CREATE TABLE IF NOT EXISTS `orders` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for each order',
  `UserID` int(11) NOT NULL COMMENT 'User who placed the order',
  `OrderDate` datetime NOT NULL COMMENT 'Date and time the order was placed',
  `TotalAmount` decimal(10,2) NOT NULL COMMENT 'Total amount for the order',
  `OrderStatus` varchar(50) NOT NULL DEFAULT 'Pending' COMMENT 'Current status of the order (e.g., Pending, Completed, Cancelled)',
  PRIMARY KEY (`OrderID`),
  FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `order_items`

CREATE TABLE IF NOT EXISTS `order_items` (
  `OrderItemID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID for each order item',
  `OrderID` int(11) NOT NULL COMMENT 'Associated order ID',
  `ItemID` int(11) NOT NULL COMMENT 'Item purchased',
  `Quantity` int(11) NOT NULL COMMENT 'Quantity of the item purchased',
  `Price` decimal(10,2) NOT NULL COMMENT 'Price of the item at the time of purchase',
  PRIMARY KEY (`OrderItemID`),
  FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`ItemID`) REFERENCES `items` (`Item_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `orders`

INSERT INTO `orders` (`OrderID`, `UserID`, `OrderDate`, `TotalAmount`, `OrderStatus`) VALUES
(1, 1, '2023-01-20 14:30:00', 225.99, 'Completed'),
(2, 2, '2023-01-25 16:45:00', 1525.00, 'Pending');

-- Dumping data for table `order_items`

INSERT INTO `order_items` (`OrderItemID`, `OrderID`, `ItemID`, `Quantity`, `Price`) VALUES
(1, 1, 1, 1, 200.00),
(2, 1, 2, 1, 25.99),
(3, 2, 3, 1, 1500.00),
(4, 2, 4, 1, 25.00);

-- --------------------------------------------------------

-- Set AUTO_INCREMENT values

ALTER TABLE `categories` AUTO_INCREMENT=6;
ALTER TABLE `comments` AUTO_INCREMENT=3;
ALTER TABLE `items` AUTO_INCREMENT=5;
ALTER TABLE `users` AUTO_INCREMENT=3;

COMMIT;
