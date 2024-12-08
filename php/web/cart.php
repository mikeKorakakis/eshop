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
	$products = $_SESSION['cart'];
	$productCounts = [];

	// Calculate product counts
	foreach ($products as $product) {
		$productId = $product['id'];
		if (!isset($productCounts[$productId])) {
			$productCounts[$productId] = 0;
		}
		$productCounts[$productId] += $product["quantity"];
	}

	// Generate HTML for each cart product
	foreach ($productCounts as $productId => $productCount) {
		$filteredItems = array_filter($products, fn($product) => $product['id'] === $productId);
		$productData = array_values($filteredItems)[0]; // Re-index the filtered array
		$cartItemsHtml .= dynamicCartSection($productData, $productCount, $upload);
		$totalAmount += $productData['price'] * $productCount;
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