<?php
ob_start();
session_start();
$pageTitle = 'Καλάθι';
$cssFile = 'cart.css';
include 'cart-handler.php';
include 'init.php';

// Ανάκτηση των δεδομένων του καλαθιού από το session ή το cookie
$totalAmount = 0;
$counter = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 0;
$cartItemsHtml = '';

if ($counter > 0) {
    $products = $_SESSION['cart'];
    $productCounts = [];

    // Υπολογισμός των ποσοτήτων των προϊόντων
    foreach ($products as $product) {
        $productId = $product['id'];
        if (!isset($productCounts[$productId])) {
            $productCounts[$productId] = 0;
        }
        $productCounts[$productId] += $product["quantity"];
    }

    // Δημιουργία HTML για κάθε προϊόν στο καλάθι
    foreach ($productCounts as $productId => $productCount) {
        $filteredItems = array_filter($products, fn($product) => $product['id'] === $productId);
        $productData = array_values($filteredItems)[0]; // Επαναδείκνωση του φιλτραρισμένου πίνακα
        $cartItemsHtml .= dynamicCartSection($productData, $productCount, $upload);
        $totalAmount += $productData['price'] * $productCount;
    }
}

// Δημιουργία της ενότητας συνολικού ποσού

if (isset($_SESSION['user'])) {
    $buttonText = '<a href="/checkout.php" class="btn btn-primary">Ολοκλήρωση Παραγγελίας</a>';
} else {
    $buttonText = '<a href="/login.php" class="btn btn-primary">Παρακαλώ συνδεθείτε για να κάνετε παραγγελία</a>';
}

$totalHtml = '
<div id="totalContainer">
    <div id="total">
        <h2>Συνολικό Ποσό</h2>
        <h4>Ποσό: ' . $totalAmount . ' €</h4>
        <div id="button">' . $buttonText . '
        </div>
    </div>
</div>
';

// Εμφάνιση του καλαθιού και του συνολικού ποσού

if ($counter > 0) {
    echo '
        <div id="cartMainContainer">
            <h1>Καλάθι</h1>
            <div id="cartContainer">
                <div id="boxContainer">' . $cartItemsHtml . '</div>
                ' . $totalHtml . '
            </div>
        </div>';
} else {
    echo '
        <div id="cartMainContainer">
            <h1>Καλάθι</h1>
            <h2>Το καλάθι σας είναι άδειο</h2>
        </div>
    ';
}
?>

<?php include $tpl . 'footer.php'; ?>
