<?php
// cart-handler.php

// Initialize cart if not already done
if (!isset($_SESSION['cart'])) {
	$_SESSION['cart'] = [];
}

// Handle "Add to Cart" functionality
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_to_cart'])) {
	$product_id = intval($_POST['product_id']);
	$product_name = $_POST['product_name'];
	$product_price = floatval($_POST['product_price']);
	$product_picture = $_POST['product_picture'];

	// Check if product already exists in the cart
	$found = false;
	foreach ($_SESSION['cart'] as &$cart_product) {
		if ($cart_product['id'] === $product_id) {
			$cart_product['quantity']++; // Increment quantity
			$found = true;
			break;
		}
	}

	// If product does not exist, add it to the cart
	if (!$found) {
		$_SESSION['cart'][] = [
			'id' => $product_id,
			'name' => $product_name,
			'price' => $product_price,
			'image_url' => $product_picture,
			'quantity' => 1
		];
	}

	// Feedback message
	$_SESSION['feedback'] = 'Item added to cart successfully!';
	header('Location: products.php?product_id='.$product_id);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' &&  (isset($_POST['update_quantity']) ||  isset($_POST['remove_product']))) {
	$action =  isset($_POST['update_quantity']) ?  'update' : 'remove';
	$productId = intval($_POST['product_id'] ?? 0);
	$quantity = intval($_POST['quantity'] ?? 1);

	if ($productId && isset($_SESSION['cart'])) {
		switch ($action) {
			case 'update':
				// Update the quantity
				foreach ($_SESSION['cart'] as &$cartItem) {
					if ($cartItem['id'] === $productId) {
						$cartItem['quantity'] = $quantity;
						break;
					}
				}
				break;

			case 'remove':
				// Remove the product from the cart
				$_SESSION['cart'] = array_filter($_SESSION['cart'], fn($product) => $product['id'] !== $productId);
				break;
		}
	}

	// Redirect to avoid resubmission
	header('Location: cart.php');
	exit;
}

?>