<?php
ob_start();
session_start();
$pageTitle = 'Καλάθι';
$cssFile = 'cart.css';
include 'init.php';
include 'cart-handler.php';
include 'checkout-handler.php';

// Ανάκτηση των δεδομένων του καλαθιού από το session ή το cookie
$totalAmount = 0;
$counter = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0;
$cartItemsHtml = '';

if ($counter > 0) {
	$items = $_SESSION['cart'];
	$itemCounts = [];

	// Υπολογισμός των ποσοτήτων των αντικειμένων
	foreach ($items as $item) {
		$itemId = $item['id'];
		if (!isset($itemCounts[$itemId])) {
			$itemCounts[$itemId] = 0;
		}
		$itemCounts[$itemId] += $item["quantity"];
	}

	// Δημιουργία HTML για κάθε αντικείμενο στο καλάθι
	foreach ($itemCounts as $itemId => $itemCount) {
		$filteredItems = array_filter($items, fn($item) => $item['id'] === $itemId);
		$itemData = array_values($filteredItems)[0]; // Επαναδείκνωση του φιλτραρισμένου πίνακα
		$cartItemsHtml .= '<div class="h-20"></div>' . dynamicCartSection($itemData, $itemCount, $upload);
		$totalAmount += $itemData['price'] * $itemCount;
	}
}

// Δημιουργία της ενότητας συνολικού ποσού

if (isset($_SESSION['user'])) {
	$buttonText = '<button type="submit" name="place_order" class="btn btn-primary">Τοποθέτηση Παραγγελίας</button>';
} else {
	$buttonText = '<a href="/login.php" class="btn btn-primary">Παρακαλώ συνδεθείτε για να κάνετε παραγγελία</a>';
}

$errors = "";
if (isset($_SESSION['feedback_errors'])) {
	$errors = $_SESSION['feedback_errors'];
	unset($_SESSION['feedback_errors']); // Καθαρισμός του μηνύματος μετά την εμφάνιση
}


// Ανάκτηση διαθέσιμων τρόπων αποστολής από τη βάση δεδομένων
$shippingMethods = getAll("SELECT * FROM shipping_methods");

$shippingOptions = '';
foreach ($shippingMethods as $method) {
    $checked = $method['shipping_method_id'] == 1 ? 'checked' : ''; // Προεπιλεγμένη επιλογή
    $shippingOptions .= '
    <div class="form-check">
        <input class="form-check-input shipping-option" type="radio" name="shipping_method" 
            id="shipping' . $method['shipping_method_id'] . '" 
            value="' . $method['shipping_method_id'] . '" 
            data-cost="' . $method['cost'] . '" ' . $checked . '>
        <label class="form-check-label" for="shipping' . $method['shipping_method_id'] . '">
            ' . htmlspecialchars($method['method_name']) . ' - <span class="shipping-cost">' . htmlspecialchars(number_format($method['cost'], 2)) . '</span> €
        </label>
    </div>';
}


$defaultShippingCost = $shippingMethods[0]['cost'] ?? 0;
$finalTotalAmount = $totalAmount + $defaultShippingCost;

$totalHtml = '
        <form action="" method="POST">
            <div id="creditCardForm">
			 <div id="total">
                <h3>Στοιχεία Πιστωτικής Κάρτας</h3>
                <div class="form-group">
                    <label for="credit_card_number">Αριθμός Κάρτας</label>
                    <input type="text" name="credit_card_number" class="form-control" placeholder="1234 5678 9012 3456" required maxlength="16" >
                </div>
                <div class="form-group">
                    <label for="card_holder_name">Όνομα Κατόχου Κάρτας</label>
                    <input type="text" name="card_holder_name" class="form-control" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="expiration_date">Ημερομηνία Λήξης</label>
                    <input type="text" name="expiration_date" class="form-control" placeholder="MM/YY" required maxlength="5" >
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" name="cvv" class="form-control" placeholder="123" required maxlength="3">
                </div>
              </div>
				<div id="total">
				<h3>Διεύθυνση Αποστολής/Τιμολόγησης</h3>

				<div class="form-group">
					<label for="address">Διεύθυνση:</label>
					<input type="text" name="address" id="address" class="form-control" required>
				</div>
						<div class="form-group">
					<label for="city">Πόλη:</label>
					<input type="text" name="city" id="city" class="form-control" required>
					</div>
				<div class="form-group">
					<label for="postal_code">Τ.Κ.:</label>
					<input type="text" name="postal_code" id="postal_code" class="form-control" required>
				</div> 
				</div>
				<div id="total"> 
				
				<h3>Τρόπος Αποστολής</h3>'
					. $shippingOptions . '
				</div>
				<div id="total">
			<h2>Συνολικό Ποσό</h2>
			<h4>Προϊόντα: <span id="product-total">' . number_format($totalAmount, 2) . '</span> €</h4>
			<h4>Αποστολή: <span id="shipping-total">' . number_format($defaultShippingCost, 2) . '</span> €</h4>
			<h4><strong>Τελικό Σύνολο: <span id="final-total">' . number_format($finalTotalAmount, 2) . '</span> €</strong></h4>
			<div id="button">' . $buttonText . '</div>
			</div>
				
				</div>
				<div class="h-10"></div>
				
			</div>
				</form>
				';


// Εμφάνιση του καλαθιού και του συνολικού ποσού

if (isset($_SESSION['order_placed'])) {
	echo '
<div id="cartMainContainer">
    <h1>Ολοκλήρωση Παραγγελίας</h1>
    <h2>Η παραγγελία σας έχει τοποθετηθεί με επιτυχία</h2>
</div>';
	unset($_SESSION['order_placed']);
} else if ($counter > 0) {
	echo '
		<div id="cartMainContainer">
		<h1>Ολοκλήρωση Παραγγελίας</h1>';
		
		if (!empty($errors)) {
			echo '<div class="alert alert-danger">'
				. $errors .
				'</div>';
		}
		echo '<div id="cartContainer">
				<div id="">'
				. $cartItemsHtml .
				'</div>
				' . $totalHtml . '
			</div>
			';
} else {
	echo '
<div id="cartMainContainer">
    <h1>Ολοκλήρωση Παραγγελίας</h1>
    <h2>Το καλάθι σας είναι άδειο</h2>
</div>
';
}
?>

<?php include $tpl . 'footer.php'; ?>
