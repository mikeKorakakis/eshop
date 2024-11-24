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
		$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id", "ASC");
		foreach ($allCats as $cat) {
			echo '<h1>' . $cat['name'] . '</h1>';
			echo '<div id="categoryContainer">';
			$allItems = getAllFrom('*', 'items', 'where is_approved = 1 and category_id=' . $cat['category_id'], '', 'item_id');
			foreach ($allItems as $item) {
				printProductCard($item, $upload);
			}
			echo '</div>';
		}
		?>
	</div>

</body>
<?php

include $tpl . 'footer.php';
ob_end_flush();
?>