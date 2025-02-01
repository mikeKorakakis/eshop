<?php
ob_start(); // Έναρξη buffering εξόδου

session_start();
$pageTitle = 'Session'; // Τίτλος Σελίδας
include 'init.php';

// header('Content-Type: application/json');

// Έλεγχος αν η session περιέχει δεδομένα
if (!empty($_SESSION)) {
    // Εκτύπωση όλων των δεδομένων της session σε ευανάγνωστη μορφή
    echo json_encode($_SESSION, JSON_PRETTY_PRINT);
} else {
    echo json_encode(['message' => 'Δεν υπάρχουν δεδομένα session διαθέσιμα.'], JSON_PRETTY_PRINT);
}

?>
<?php include $tpl . 'footer.php'; ?>
