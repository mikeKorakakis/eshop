<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['credit_card_number'])) {
    // Συλλογή των εισόδων της φόρμας
    $creditCardNumber = trim($_POST['credit_card_number']);
    $cardHolderName = trim($_POST['card_holder_name']);
    $expirationDate = trim($_POST['expiration_date']);
    $cvv = trim($_POST['cvv']);
    $address = trim($_POST['address']);
    $city = trim($_POST['city']);
    $postalCode = trim($_POST['postal_code']);
    $shippingMethodId = isset($_POST['shipping_method']) ? (int)$_POST['shipping_method'] : 1;

    // Επαλήθευση των πεδίων εισόδου
    $errors = [];

    // Πιστωτική κάρτα
    if (empty($creditCardNumber) || !preg_match('/^\d{16}$/', $creditCardNumber)) {
        $errors[] = 'Μη έγκυρος αριθμός πιστωτικής κάρτας. Πρέπει να είναι 16 ψηφία.';
    }
    if (empty($cardHolderName)) {
        $errors[] = 'Το όνομα κατόχου κάρτας είναι υποχρεωτικό.';
    }
    if (empty($expirationDate) || !preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $expirationDate)) {
        $errors[] = 'Μη έγκυρη ημερομηνία λήξης. Χρησιμοποιήστε τη μορφή MM/YY.';
    }
    if (empty($cvv) || !preg_match('/^\d{3}$/', $cvv)) {
        $errors[] = 'Μη έγκυρο CVV. Πρέπει να είναι 3 ψηφία.';
    }

    // Διεύθυνση αποστολής
    if (empty($address)) {
        $errors[] = 'Η διεύθυνση είναι υποχρεωτική.';
    }
    if (empty($city)) {
        $errors[] = 'Η πόλη είναι υποχρεωτική.';
    }
    if (empty($postalCode) || !preg_match('/^\d{5}$/', $postalCode)) {
        $errors[] = 'Ο ταχυδρομικός κώδικας πρέπει να είναι 5 ψηφία.';
    }

    // Υπολογισμός συνολικού ποσού
    $totalAmount = 0;
    if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $product) {
            $totalAmount += $product['price'] * $product['quantity'];
        }
    }

    // Ανάκτηση κόστους αποστολής από τη βάση
    $stmt = $con->prepare("SELECT cost FROM shipping_methods WHERE shipping_method_id = ?");
    $stmt->execute([$shippingMethodId]);
    $shippingCost = $stmt->fetchColumn();
    if ($shippingCost === false) {
        $errors[] = 'Μη έγκυρη επιλογή τρόπου αποστολής.';
    } else {
        $totalAmount += $shippingCost;
    }

    // Έλεγχος αν ο χρήστης είναι συνδεδεμένος
    if (!isset($_SESSION['user_id'])) {
        $errors[] = 'Παρακαλώ συνδεθείτε για να ολοκληρώσετε την παραγγελία.';
    } else {
        $userId = $_SESSION['user_id'];

        // Ανάκτηση του υπολοίπου της κάρτας
        $stmt = $con->prepare("SELECT balance FROM credit_cards WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userBalance = $stmt->fetchColumn();

        if ($userBalance === false) {
            $errors[] = 'Δεν ήταν δυνατή η ανάκτηση του υπολοίπου της κάρτας σας.';
        } elseif ($userBalance < $totalAmount) {
            $errors[] = 'Ανεπαρκές υπόλοιπο. Παρακαλώ προσθέστε χρήματα στην κάρτα σας.';
        }
    }

    // Αν υπάρχουν σφάλματα, εμφάνιση τους και επιστροφή στο checkout
    if (!empty($errors)) {
        $_SESSION['feedback_errors'] = implode('<br>', array_map('htmlspecialchars', $errors));
        header('Location: checkout.php');
        exit();
    }

    // Αφαίρεση του συνολικού ποσού από το υπόλοιπο του χρήστη
    $newBalance = $userBalance - $totalAmount;
    $stmt = $con->prepare("UPDATE credit_cards SET balance = ? WHERE user_id = ?");
    $stmt->execute([$newBalance, $userId]);

    // Εισαγωγή διεύθυνσης αποστολής στον πίνακα `shipping`
    $stmt = $con->prepare("INSERT INTO shipping (shipping_method_id, address, city, postal_code) VALUES (?, ?, ?, ?)");
    $stmt->execute([$shippingMethodId, $address, $city, $postalCode]);
	$shippingId = $con->lastInsertId();

    // Εισαγωγή παραγγελίας στον πίνακα `orders`
    $stmt = $con->prepare("INSERT INTO orders (user_id, order_date, total_amount, order_status, shipping_id) VALUES (?, NOW(), ?, 'Pending', ?)");
    $stmt->execute([$userId, $totalAmount, $shippingId]);
    $orderId = $con->lastInsertId();

    // Εισαγωγή των προϊόντων της παραγγελίας στον πίνακα `order_items`
    foreach ($_SESSION['cart'] as $product) {
        $stmt = $con->prepare("INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)");
        $stmt->execute([$orderId, $product['id'], $product['quantity'], $product['price']]);
    }

    // Ολοκλήρωση παραγγελίας
    $_SESSION["order_placed"] = true;

    // Εκκαθάριση του καλαθιού
    unset($_SESSION['cart']);
    header('Location: checkout.php');
    exit();
}
?>
