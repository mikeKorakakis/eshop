<?php
session_start();
$cssFile = "content.css";
include 'init.php';
?>

<div id="mainContainer">
	<?php
	if (isset($_GET['page_id']) && is_numeric($_GET['page_id'])) {
		$category = intval($_GET['page_id']);
		$allProducts = getAll("SELECT * FROM products WHERE category_id = ?", [$category]);
		// $allProducts = getAll("*", "products", "where category_id = {$category}", "", "product_id");
		$myCategory = getSingleValue($con, "SELECT name FROM categories WHERE category_id=?", [$category]);
		$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC", []);
		// $allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id", "ASC");
		echo '<h1>' . $myCategory . '</h1>';
		echo '<div id="categoryContainer">';
		$allProducts = getAll("SELECT products.product_id, products.name, products.description, price, media.path as image_url FROM products INNER JOIN media ON products.media_id = media.media_id WHERE category_id = :category_id", [':category_id' => $category]);
		foreach ($allProducts as $product) {
			printProductCard($product, $upload);			
		}
		echo '</div>';
	} else {
		echo 'You Must Add Page ID';
	}
	?>
</div>
<!--  -->
</div>

<?php include $tpl . 'footer.php'; ?>