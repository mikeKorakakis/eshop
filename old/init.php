<?php

// Error Reporting

ini_set('display_errors', 'On');
error_reporting(E_ALL);
require_once __DIR__ . '/vendor/autoload.php'; // Βεβαιώσου ότι το path είναι σωστό


include 'admin/connect.php';

$sessionUser = '';
$sessionAvatar = '';

if (isset($_SESSION['user'])) {
	$sessionUser = $_SESSION['user'];
	$sessionAvatar = $_SESSION['avatar'];
}

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

// Routes

$tpl 	= 'includes/templates/'; // Template Directory
$upload = 'uploads/items/'; // Upload Directory
$func	= 'includes/functions/'; // Functions Directory
$css 	= 'layout/css/'; // Css Directory
$js 	= 'layout/js/'; // Js Directory

// Include The Important Files

include $func . 'functions.php';
include $tpl . 'header.php';
