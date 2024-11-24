<?php
// cart-handler.php

// Initialize cart if not already done
if (!isset($_SESSION['cart'])) {
	$_SESSION['cart'] = [];
}

// Handle "Add to Cart" functionality
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_to_cart'])) {
	$item_id = intval($_POST['item_id']);
	$item_name = $_POST['item_name'];
	$item_price = floatval($_POST['item_price']);
	$item_picture = $_POST['item_picture'];

	// Check if item already exists in the cart
	$found = false;
	foreach ($_SESSION['cart'] as &$cart_item) {
		if ($cart_item['id'] === $item_id) {
			$cart_item['quantity']++; // Increment quantity
			$found = true;
			break;
		}
	}

	// If item does not exist, add it to the cart
	if (!$found) {
		$_SESSION['cart'][] = [
			'id' => $item_id,
			'name' => $item_name,
			'price' => $item_price,
			'image_url' => $item_picture,
			'quantity' => 1
		];
	}

	// Feedback message
	$_SESSION['feedback'] = 'Item added to cart successfully!';
	header('Location: items.php?itemid='.$item_id);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' &&  (isset($_POST['update_quantity']) ||  isset($_POST['remove_item']))) {
	$action =  isset($_POST['update_quantity']) ?  'update' : 'remove';
	$itemId = intval($_POST['item_id'] ?? 0);
	$quantity = intval($_POST['quantity'] ?? 1);

	if ($itemId && isset($_SESSION['cart'])) {
		switch ($action) {
			case 'update':
				// Update the quantity
				foreach ($_SESSION['cart'] as &$cartItem) {
					if ($cartItem['id'] === $itemId) {
						$cartItem['quantity'] = $quantity;
						break;
					}
				}
				break;

			case 'remove':
				// Remove the item from the cart
				$_SESSION['cart'] = array_filter($_SESSION['cart'], fn($item) => $item['id'] !== $itemId);
				break;
		}
	}

	// Redirect to avoid resubmission
	header('Location: cart.php');
	exit;
}

?>