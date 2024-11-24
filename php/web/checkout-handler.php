<?php
// cart-handler.php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['credit_card_number'])) {
	// Capture the form input
	$creditCardNumber = trim($_POST['credit_card_number']);
	$cardHolderName = trim($_POST['card_holder_name']);
	$expirationDate = trim($_POST['expiration_date']);
	$cvv = trim($_POST['cvv']);

	// Validate the input fields
	$errors = [];
	if (empty($creditCardNumber) || !preg_match('/^\d{16}$/', $creditCardNumber)) {
		$errors[] = 'Invalid credit card number. Please enter a valid 16-digit number.';
	}
	if (empty($cardHolderName)) {
		$errors[] = 'Card holder name is required.';
	}
	if (empty($expirationDate) || !preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $expirationDate)) {
		$errors[] = 'Invalid expiration date. Use MM/YY format.';
	}
	if (empty($cvv) || !preg_match('/^\d{3}$/', $cvv)) {
		$errors[] = 'Invalid CVV. It must be a 3-digit number.';
	}

	// Calculate total amount
	$totalAmount = 0;
	if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
		foreach ($_SESSION['cart'] as $item) {
			$totalAmount += $item['price'] * $item['quantity'];
		}
	}

	// Check if user is logged in and fetch their balance
	if (!isset($_SESSION['user_id'])) {
		$errors[] = 'Please log in to proceed with the checkout.';
	} else {
		$userId = $_SESSION['user_id'];
		$stmt = $con->prepare("SELECT balance FROM credit_cards WHERE user_id = ?");
		$stmt->execute([$userId]);
		$userBalance = $stmt->fetchColumn();

		if ($userBalance === false) {
			$errors[] = 'Unable to retrieve your account balance.';
		} elseif ($userBalance < $totalAmount) {
			$errors[] = 'Insufficient balance. Please check your account.';
		}
	}

	// If there are errors, display them
	$feedbackErrors = "";
	if (!empty($errors)) {
		foreach ($errors as $error) {
			$feedbackErrors = $feedbackErrors . '<div class="alert alert-danger">' . htmlspecialchars($error) . '</div>';
		}
		$_SESSION['feedback_errors'] = $feedbackErrors;
		header('Location: checkout.php'); // Replace with your checkout page URL
		exit();
	} else {
		// Deduct the total amount from the user's balance
		$newBalance = $userBalance - $totalAmount;
		$stmt = $con->prepare("UPDATE credit_cards SET balance = ? WHERE user_id = ?");
		$stmt->execute([$newBalance, $userId]);

		// Insert order into `orders` table
		$stmt = $con->prepare("INSERT INTO orders (user_id, order_date, total_amount, order_status) VALUES (?, NOW(), ?, 'Pending')");
		$stmt->execute([$userId, $totalAmount]);
		$orderId = $con->lastInsertId();

		// Insert order items into `order_items` table
		foreach ($_SESSION['cart'] as $item) {
			$stmt = $con->prepare("INSERT INTO order_items (order_id, item_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)");
			$stmt->execute([$orderId, $item['id'], $item['quantity'], $item['price']]);
		}

		// Simulate payment processing and order placement
		// echo '<div class="alert alert-success">Payment successful! Your order has been placed.</div>';
		$_SESSION["order_placed"] = true;

		// Clear the cart
		unset($_SESSION['cart']);
		header('Location: checkout.php'); // Replace with your checkout page URL
		exit();
	}
}

?>