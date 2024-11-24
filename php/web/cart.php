<?php
ob_start();
session_start();
$pageTitle = 'Cart';
$cssFile = 'cart.css';
include 'cart-handler.php';
include 'init.php';



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
	$buttonText = '<a href="/checkout.php" class="btn btn-primary">Checkout</a>';
} else {
	$buttonText = '<a href="/login.php" class="btn btn-primary">Please login to place order</a>';
}

$totalHtml = '
<div id="totalContainer">
    <div id="total">
        <h2>Total Amount</h2>
        <h4>Amount: ' . $totalAmount . ' €</h4>
		<div id="button">' . $buttonText . '
		</div>
    </div>
</div>
';

// Display the cart and total HTML

if ($counter > 0) {
	echo '
		<div id="cartMainContainer">
		<h1>Cart</h1>
			<div id="cartContainer">
					<div id="boxContainer">' . $cartItemsHtml . '</div>
					' . $totalHtml . '
				</div>
		</div>';
} else {
	echo '
		<div id="cartMainContainer">
			<h1>Cart</h1>
			<h2>You cart is empty</h2>
		</div>
	';
}
?>

<?php include $tpl . 'footer.php'; ?>