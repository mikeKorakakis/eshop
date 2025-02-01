<?php
ob_start();
session_start();
$noNavbar = '';
$pageTitle = 'Login';


include 'init.php';

if (isset($_SESSION['admin'])) {
	header('Location: dashboard.php');
}

header('Location: /login.php');
exit();