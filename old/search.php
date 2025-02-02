<?php
ob_start();
session_start();
$pageTitle = 'Homepage';
$cssFile = "content.css";
include 'init.php';

?>
<div id="mainContainer">
	<?php
	if (isset($_GET['search'])) {
		$q = trim($_GET['search']);
		$searchTerm = $q;

		// $results = getAll("SELECT * FROM products WHERE name LIKE ? OR description LIKE ?", [$searchTerm, $searchTerm]);
		$searchTerm = '%' . $q . '%';
		$results = getAll("SELECT products.product_id, products.name, products.description, price, media.path as image_url FROM products LEFT JOIN media ON products.media_id = media.media_id WHERE products.name LIKE ? OR products.description LIKE ?", [$searchTerm, $searchTerm]);
		
		echo '<h1>Αποτελέσματα Αναζήτησης</h1>';
		echo '<div id="categoryContainer">';

		if (empty($results)) {
			echo "Δεν βρέθηκαν προϊόντα με τον όρο αναζήτησης: " . $q;
		} else {
			foreach ($results as $product) {
				printProductCard($product, $upload);
			}
		}

		echo '</div>';
	} else {
		echo "Δεν έχει εισαχθεί κάποιος όρος αναζήτησης.";
	}
	?>
</div>
<?php

include $tpl . 'footer.php';
ob_end_flush();
?>