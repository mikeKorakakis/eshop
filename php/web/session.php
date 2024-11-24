<?php
ob_start();
session_start();
$pageTitle = 'Session';
include 'init.php';

// header('Content-Type: application/json');

// Check if the session contains any data
if (!empty($_SESSION)) {
    // Print all session data in a readable format
    echo json_encode($_SESSION, JSON_PRETTY_PRINT);
} else {
    echo json_encode(['message' => 'No session data available.'], JSON_PRETTY_PRINT);
}

?>

<?php include $tpl . 'footer.php'; ?>