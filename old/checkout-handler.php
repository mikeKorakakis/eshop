<?php
// cart-handler.php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['credit_card_number'])) {
    // Συλλογή των εισόδων της φόρμας
    $creditCardNumber = trim($_POST['credit_card_number']);
    $cardHolderName = trim($_POST['card_holder_name']);
    $expirationDate = trim($_POST['expiration_date']);
    $cvv = trim($_POST['cvv']);

    // Επαλήθευση των πεδίων εισόδου
    $errors = [];
    if (empty($creditCardNumber) || !preg_match('/^\d{16}$/', $creditCardNumber)) {
        $errors[] = 'Μη έγκυρος αριθμός πιστωτικής κάρτας. Παρακαλώ εισάγετε έναν έγκυρο 16ψήφιο αριθμό.';
    }
    if (empty($cardHolderName)) {
        $errors[] = 'Το όνομα κατόχου κάρτας είναι υποχρεωτικό.';
    }
    if (empty($expirationDate) || !preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $expirationDate)) {
        $errors[] = 'Μη έγκυρη ημερομηνία λήξης. Χρησιμοποιήστε τη μορφή MM/YY.';
    }
    if (empty($cvv) || !preg_match('/^\d{3}$/', $cvv)) {
        $errors[] = 'Μη έγκυρο CVV. Πρέπει να είναι ένας 3ψήφιος αριθμός.';
    }

    // Υπολογισμός συνολικού ποσού
    $totalAmount = 0;
    if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $product) {
            $totalAmount += $product['price'] * $product['quantity'];
        }
    }

    // Έλεγχος αν ο χρήστης είναι συνδεδεμένος και ανάκτηση του υπολοίπου του
    if (!isset($_SESSION['user_id'])) {
        $errors[] = 'Παρακαλώ συνδεθείτε για να προχωρήσετε στην ολοκλήρωση της παραγγελίας.';
    } else {
        $userId = $_SESSION['user_id'];
        $stmt = $con->prepare("SELECT balance FROM credit_cards WHERE user_id = ?");
        $stmt->execute([$userId]);
        $userBalance = $stmt->fetchColumn();

        if ($userBalance === false) {
            $errors[] = 'Δεν ήταν δυνατή η ανάκτηση του υπολοίπου του λογαριασμού σας.';
        } elseif ($userBalance < $totalAmount) {
            $errors[] = 'Ανεπαρκές υπόλοιπο. Παρακαλώ ελέγξτε τον λογαριασμό σας.';
        }
    }

    // Αν υπάρχουν σφάλματα, εμφάνιση τους
    $feedbackErrors = "";
    if (!empty($errors)) {
        foreach ($errors as $error) {
            $feedbackErrors .= '<div class="alert alert-danger">' . htmlspecialchars($error) . '</div>';
        }
        $_SESSION['feedback_errors'] = $feedbackErrors;
        header('Location: checkout.php'); // Αντικατάστησε με το URL της σελίδας ολοκλήρωσης παραγγελίας σου
        exit();
    } else {
        // Αφαίρεση του συνολικού ποσού από το υπόλοιπο του χρήστη
        $newBalance = $userBalance - $totalAmount;
        $stmt = $con->prepare("UPDATE credit_cards SET balance = ? WHERE user_id = ?");
        $stmt->execute([$newBalance, $userId]);

        // Εισαγωγή της παραγγελίας στον πίνακα `orders`
        $stmt = $con->prepare("INSERT INTO orders (user_id, order_date, total_amount, order_status) VALUES (?, NOW(), ?, 'Pending')");
        $stmt->execute([$userId, $totalAmount]);
        $orderId = $con->lastInsertId();

        // Εισαγωγή των προϊόντων της παραγγελίας στον πίνακα `order_items`
        foreach ($_SESSION['cart'] as $product) {
            $stmt = $con->prepare("INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)");
            $stmt->execute([$orderId, $product['id'], $product['quantity'], $product['price']]);
        }

        // Προσομοίωση επεξεργασίας πληρωμής και τοποθέτησης παραγγελίας
        // echo '<div class="alert alert-success">Η πληρωμή ήταν επιτυχής! Η παραγγελία σας έχει τοποθετηθεί.</div>';
        $_SESSION["order_placed"] = true;

        // Εκκαθάριση του καλαθιού
        unset($_SESSION['cart']);
        header('Location: checkout.php'); // Αντικατάστησε με το URL της σελίδας ολοκλήρωσης παραγγελίας σου
        exit();
    }
}
?>
