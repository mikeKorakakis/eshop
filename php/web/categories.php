<?php
session_start();
$cssFile = "content.css";
include 'init.php';
?>

<div id="mainContainer">
	<?php
	if (isset($_GET['pageid']) && is_numeric($_GET['pageid'])) {
		$category = intval($_GET['pageid']);
		$allItems = getAllFrom("*", "items", "where category_id = {$category}", "AND is_approved = 1", "item_id");
		$myCategory = getSingleValue($con, "SELECT name FROM categories WHERE category_id=?", [$category]);
		$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id", "ASC");
		echo '<h1>' . $myCategory . '</h1>';
		echo '<div id="categoryContainer">';
		$allItems = getAllFrom('*', 'items', 'where is_approved = 1 and category_id=' . $category , '', 'item_id');
		foreach ($allItems as $item) {
			printProductCard($item, $upload);			
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