<?php
ob_start();
session_start();
$pageTitle = 'Homepage';
$cssFile = "content.css";
include 'init.php';
include 'slider.html';

?>

<body>

	<div id="mainContainer">
		<?php
		$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC", []);
		foreach ($allCats as $cat) {
			echo '<h1>' . htmlspecialchars($cat['name']) . '</h1>';
			echo '<div id="categoryContainer">';
			$allItems = getAll(
				"SELECT products.product_id, products.name, products.description, price, media.path as image_url FROM products INNER JOIN media ON products.media_id = media.media_id WHERE category_id = :category_id",
				[':category_id' => $cat['category_id']]
			);		
						
			foreach ($allItems as $item) {
				printProductCard($item, $upload);
			}
			echo '</div>';
		}
		?>
</body>
<?php

include $tpl . 'footer.php';
ob_end_flush();
?>