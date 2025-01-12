<?php
ob_start();
session_start();
$pageTitle = 'Cart';
$cssFile = 'cart.css';
include 'init.php';
include 'cart-handler.php';
include 'checkout-handler.php';



// Fetch the cart data from session or cookie
$totalAmount = 0;
$counter = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0;
$cartItemsHtml = '';

if ($counter > 0) {
	$items = $_SESSION['cart'];
	$itemCounts = [];

	// Calculate item counts
	foreach ($items as $item) {
		$itemId = $item['id'];
		if (!isset($itemCounts[$itemId])) {
			$itemCounts[$itemId] = 0;
		}
		$itemCounts[$itemId] += $item["quantity"];
	}

	// Generate HTML for each cart item
	foreach ($itemCounts as $itemId => $itemCount) {
		$filteredItems = array_filter($items, fn($item) => $item['id'] === $itemId);
		$itemData = array_values($filteredItems)[0]; // Re-index the filtered array
		$cartItemsHtml .= dynamicCartSection($itemData, $itemCount, $upload);
		$totalAmount += $itemData['price'] * $itemCount;
	}
}

// Generate the total amount section

if (isset($_SESSION['user'])) {
	$buttonText = '<button href="/checkout.php" class="btn btn-primary">Place Order</button>';
} else {
	$buttonText = '<a href="/login.php" class="btn btn-primary">Please login to place order</a>';
}

$errors = "";
if (isset($_SESSION['feedback_errors'])) {
	$errors = $_SESSION['feedback_errors'];
	unset($_SESSION['feedback_errors']); // Clear feedback after showing
}

$cardHtml = '
			<form action="" method="POST">
					<div id="creditCardForm">
						<h3>Credit Card Details</h3>
						<div class="form-group">
							<label for="credit_card_number">Card Number</label>
							<input type="text" name="credit_card_number" class="form-control" placeholder="1234 5678 9012 3456" required maxlength="16" value="4242424242424242">
						</div>
						<div class="form-group">
							<label for="card_holder_name">Card Holder Name</label>
							<input type="text" name="card_holder_name" class="form-control" placeholder="John Doe" required value="mike kor">
						</div>
						<div class="form-group">
							<label for="expiration_date">Expiration Date</label>
							<input type="text" name="expiration_date" class="form-control" placeholder="MM/YY" required maxlength="5" value="10/26">
						</div>
						<div class="form-group">
							<label for="cvv">CVV</label>
							<input type="text" name="cvv" class="form-control" placeholder="123" required maxlength="3" value="123">
						</div>
						<div id="button">' . $buttonText . '</div>
						<div class="h-10"></div>'
					. $errors .
					'</div>
			</form>
		';

$totalHtml = '
<div id="totalContainer">
    <div id="total">
        <h2>Total Amount</h2>
        <h4>Amount: ' . $totalAmount . ' €</h4>'
	. $cardHtml .
	'</div>
    </div>
</div>
';

// Display the cart and total HTML

if (isset($_SESSION['order_placed'])) {
	echo '
<div id="cartMainContainer">
	<h1>Checkout</h1>
	<h2>You order has been placed successfully</h2>
</div>';
	unset($_SESSION['order_placed']);
} else if ($counter > 0) {
	echo '
<div id="cartMainContainer">
<h1>Checkout</h1>
	<div id="cartContainer">
		<div id="boxContainer">' . $cartItemsHtml . '</div>
		' . $totalHtml . '
		</div>
</div>';
} else {
	echo '
<div id="cartMainContainer">
	<h1>Checkout</h1>
	<h2>You cart is empty</h2>
</div>
';
}
?>

<?php include $tpl . 'footer.php'; ?>