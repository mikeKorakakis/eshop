<?php
ob_start();
session_start();

unset($_SESSION['user']); 
unset($_SESSION['uid']);      
unset($_SESSION['avatar']);      

header('Location: index.php');

exit();