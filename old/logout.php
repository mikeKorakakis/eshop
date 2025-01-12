<?php
ob_start();
session_start(); // Start The Session

unset($_SESSION['user']); 
unset($_SESSION['uid']);      
unset($_SESSION['avatar']);      

header('Location: index.php');

exit();