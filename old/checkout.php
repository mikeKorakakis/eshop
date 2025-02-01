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
        $cartItemsHtml .= dynamicCartSection($itemData, $itemCount, $upload);
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

$cardHtml = '
        <form action="" method="POST">
            <div id="creditCardForm">
                <h3>Στοιχεία Πιστωτικής Κάρτας</h3>
                <div class="form-group">
                    <label for="credit_card_number">Αριθμός Κάρτας</label>
                    <input type="text" name="credit_card_number" class="form-control" placeholder="1234 5678 9012 3456" required maxlength="16" value="4242424242424242">
                </div>
                <div class="form-group">
                    <label for="card_holder_name">Όνομα Κατόχου Κάρτας</label>
                    <input type="text" name="card_holder_name" class="form-control" placeholder="John Doe" required value="mike kor">
                </div>
                <div class="form-group">
                    <label for="expiration_date">Ημερομηνία Λήξης</label>
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
        <h2>Συνολικό Ποσό</h2>
        <h4>Ποσό: ' . htmlspecialchars($totalAmount) . ' €</h4>'
    . $cardHtml .
    '</div>
</div>
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
    <h1>Ολοκλήρωση Παραγγελίας</h1>
    <div id="cartContainer">
        <div id="boxContainer">' . $cartItemsHtml . '</div>
        ' . $totalHtml . '
    </div>
</div>';
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
