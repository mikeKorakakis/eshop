<?php

	include 'connect.php';

	// Routes

	$tpl 	= 'includes/templates/'; // Template Directory
	$func	= '../includes/functions/'; // Functions Directory
	$css 	= '../layout/css/'; // Css Directory
	$js 	= '../layout/js/'; // Js Directory
	$upload = '../uploads/items/'; // Upload Directory
	$upload_main = '../uploads/'; // Upload Directory

	// Include The Important Files

	include $func . 'functions.php';
	include $tpl . 'header.php';

	// Include Navbar On All Pages Expect The One With $noNavbar Vairable

	// if (!isset($noNavbar)) { include $tpl . 'navbar.php'; }
	

	