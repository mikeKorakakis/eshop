<?php
session_start();
$cssFile = "content.css";
include 'init.php';
?>

<div id="mainContainer">
	<?php
	if (isset($_GET['page_id']) && is_numeric($_GET['page_id'])) {
		$category = intval($_GET['page_id']);
		$allProducts = getAllFrom("*", "products", "where category_id = {$category}", "", "product_id");
		$myCategory = getSingleValue($con, "SELECT name FROM categories WHERE category_id=?", [$category]);
		$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id", "ASC");
		echo '<h1>' . $myCategory . '</h1>';
		echo '<div id="categoryContainer">';
		$allProducts = getAllFrom('*', 'products', 'where category_id=' . $category , '', 'product_id');
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