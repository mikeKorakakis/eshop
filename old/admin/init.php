<?php

include 'connect.php';
require_once __DIR__ . '/../vendor/autoload.php'; // Βεβαιώσου ότι το path είναι σωστό

// Routes

$tpl 	= 'includes/templates/'; // Template Directory
$func	= '../includes/functions/'; // Functions Directory
$css 	= '../layout/css/'; // Css Directory
$js 	= '../layout/js/'; // Js Directory
$upload = '../uploads/items/'; // Upload Directory
$upload_main = '../uploads/'; // Upload Directory



use Aws\S3\S3Client;
use Aws\Exception\AwsException;

// Ρυθμίσεις MinIO
$minioConfig = [
	'version' => 'latest',
	'region'  => 'us-east-1', // Μπορείς να βάλεις οποιαδήποτε τιμή
	'endpoint' => 'http://minio:9000', // Αντικατέστησε με το endpoint σου
	'use_path_style_endpoint' => true, // Επίσης σημαντικό για MinIO
	'credentials' => [
		'key'    => 'admin',
		'secret' => 'admin123',
	],
];

// Δημιουργία S3 Client
$s3Client = new S3Client($minioConfig);

// Ορισμός του bucket όπου θα αποθηκεύονται οι εικόνες
$bucket = 'shop'; // Βεβαιώσου ότι το bucket υπάρχει


// Include The Important Files

include $func . 'functions.php';
include $tpl . 'header.php';

	// Include Navbar On All Pages Expect The One With $noNavbar Vairable

	// if (!isset($noNavbar)) { include $tpl . 'navbar.php'; }
