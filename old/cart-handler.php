<?php
// cart-handler.php

// Αρχικοποίηση του καλαθιού αν δεν έχει ήδη γίνει
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Διαχείριση της λειτουργικότητας "Προσθήκη στο Καλάθι"
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_to_cart'])) {
    $product_id = intval($_POST['product_id']);
    $product_name = $_POST['product_name'];
    $product_price = floatval($_POST['product_price']);
    $product_picture = $_POST['product_picture'];
	

    // Έλεγχος αν το προϊόν υπάρχει ήδη στο καλάθι
    $found = false;
    foreach ($_SESSION['cart'] as &$cart_product) {
        if ($cart_product['id'] === $product_id) {
            $cart_product['quantity']++; // Αύξηση της ποσότητας
            $found = true;
            break;
        }
    }

    // Αν το προϊόν δεν υπάρχει, προσθήκη του στο καλάθι
    if (!$found) {
        $_SESSION['cart'][] = [
            'id' => $product_id,
            'name' => $product_name,
            'price' => $product_price,
            'image_url' => $product_picture,
            'quantity' => 1
        ];
    }

    // Μήνυμα επιβεβαίωσης
    $_SESSION['feedback'] = 'Το αντικείμενο προστέθηκε στο καλάθι με επιτυχία!';
    header('Location: products.php?product_id=' . $product_id);
    exit;
}

// Διαχείριση της ενημέρωσης ποσότητας ή της αφαίρεσης προϊόντος
if ($_SERVER['REQUEST_METHOD'] === 'POST' && (isset($_POST['update_quantity']) || isset($_POST['remove_product']))) {
    $action = isset($_POST['update_quantity']) ? 'update' : 'remove';
    $productId = intval($_POST['product_id'] ?? 0);
    $quantity = intval($_POST['quantity'] ?? 1);

    if ($productId && isset($_SESSION['cart'])) {
        switch ($action) {
            case 'update':
                // Ενημέρωση της ποσότητας
                foreach ($_SESSION['cart'] as &$cartItem) {
                    if ($cartItem['id'] === $productId) {
                        $cartItem['quantity'] = $quantity;
                        break;
                    }
                }
                break;

            case 'remove':
                // Αφαίρεση του προϊόντος από το καλάθι
                $_SESSION['cart'] = array_filter($_SESSION['cart'], fn($product) => $product['id'] !== $productId);
                break;
        }
    }

    // Ανακατεύθυνση για αποφυγή επαναποστολής φόρμας
    header('Location: cart.php');
    exit;
}
?>
