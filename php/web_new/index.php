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
		$allCats = getAllFrom("*", "categories", "where parent = 0", "", "ID", "ASC");
		foreach ($allCats as $cat) {
			echo '<h1>' . $cat['Name'] . '</h1>';
			echo '<div id="categoryContainer">';
			$allItems = getAllFrom('*', 'items', 'where Approve = 1 and Cat_ID=' . $cat['ID'], '', 'Item_ID');
			foreach ($allItems as $item) {
				echo '<div id="box">';
				echo '<a href="items.php?itemid=' . $item['Item_ID'] . '">';
				echo '<img src="' . $upload . $item["picture"] . '" alt="Clothing Item Preview">';
				echo '<div id="details">';
				echo '<h3>' . $item["Name"] . '</h3>';
				echo '<h4>' . $item['Description'] . '</h4>';
				echo '<h2>' . $item['Price'] . ' €</h2>';
				echo '</div>';
				echo '</a>';
				echo '</div>';
			}
			echo '</div>';
		}
		?>
	</div>
</body>
<!-- <div style="padding-top:50px;" class="container">
	<div class="row">
		<?php
		$allItems = getAllFrom('*', 'items', 'where Approve = 1', '', 'Item_ID');
		foreach ($allItems as $item) {
			echo '<div class="col-sm-6 col-md-3">';
			echo '<div class="thumbnail item-box">';
			echo '<span class="price-tag">$' . $item['Price'] . '</span>';
			if (empty($item['picture'])) {
				echo "<img style='width:250px;height:300px' src='admin/uploads/default.png' alt='' />";
			} else {
				echo "<img style='width:250px;height:300px' src='admin/uploads/items/" . $item['picture'] . "' alt='' />";
			}
			echo '<div class="caption">';
			echo '<h3><a href="items.php?itemid=' . $item['Item_ID'] . '">' . $item['Name'] . '</a></h3>';
			echo "<p style='overflow-wrap: normal;overflow: hidden;'>" . $item['Description'] . '</p>';
			echo '<div class="date">' . $item['Add_Date'] . '</div>';
			echo '</div>';
			echo '</div>';
			echo '</div>';
		}
		?>
	</div>
</div> -->
<?php
include $tpl . 'footer.php';
ob_end_flush();
?>