<?php

function getSingleValue($con, $sql, $parameters)
{
	$q = $con->prepare($sql);
	$q->execute($parameters);
	return $q->fetchColumn();
}

	function getAllFrom($field, $table, $where = NULL, $and = NULL, $orderfield = NULL, $ordering = "DESC") {

		global $con;

		$getAll = $con->prepare("SELECT $field FROM $table $where $and ORDER BY $orderfield $ordering");

		$getAll->execute();

		$all = $getAll->fetchAll();

		return $all;

	}
	
	function checkUserStatus($user) {

		global $con;

		$stmtx = $con->prepare("SELECT 
									username, registration_status 
								FROM 
									users 
								WHERE 
									username = ? 
								AND 
									registration_status = 0");

		$stmtx->execute(array($user));

		$status = $stmtx->rowCount();

		return $status;

	}


	function checkItem($select, $from, $value) {

		global $con;

		$statement = $con->prepare("SELECT $select FROM $from WHERE $select = ?");

		$statement->execute(array($value));

		$count = $statement->rowCount();

		return $count;

	}



	function getTitle() {

		global $pageTitle;

		if (isset($pageTitle)) {

			echo $pageTitle;

		} else {

			echo 'Default';

		}
	}

	function getCssFile() {

		global $cssFile;

		if (isset($cssFile)) {

			echo $cssFile;

		} else {

			echo 'index.css';

		}
	}


	function redirectHome($theMsg, $url = null, $seconds = 3) {

		if ($url === null) {

			$url = 'index.php';

			$link = 'Homepage';

		} else {

			if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] !== '') {

				$url = $_SERVER['HTTP_REFERER'];

				$link = 'Previous Page';

			} else {

				$url = 'index.php';

				$link = 'Homepage';

			}

		}

		echo $theMsg;

		echo "<div class='alert alert-info'>You Will Be Redirected to $link After $seconds Seconds.</div>";

		header("refresh:$seconds;url=$url");

		exit();

	}

	function countItems($item, $table) {

		global $con;

		$stmt2 = $con->prepare("SELECT COUNT($item) FROM $table");

		$stmt2->execute();

		return $stmt2->fetchColumn();

	}

	function getLatest($select, $table, $order, $limit = 5) {

		global $con;

		$getStmt = $con->prepare("SELECT $select FROM $table ORDER BY $order DESC LIMIT $limit");

		$getStmt->execute();

		$rows = $getStmt->fetchAll();

		return $rows;

	}

	function printProductCard($item, $upload) {
		echo '<div id="box">';
		echo '<a href="items.php?itemid=' . $item['item_id'] . '">';
		echo '<img src="' . $upload . $item["image_url"] . '" alt="Clothing Item Preview">';
		echo '<div id="details">';
		echo '<h3>' . $item["name"] . '</h3>';
		echo '<h4>' . $item['description'] . '</h4>';
		echo '<h2>' . $item['price'] . ' €</h2>';
		echo '</div>';
		echo '</a>';
		echo '</div>';
	}

	function dynamicCartSection($item, $itemCounter, $upload)
{
	// Generate the cart item HTML
	return '
   <div id="box">
        <img style="height: 220px; object-fit: contain;" src="' . $upload . htmlspecialchars($item['image_url']) . '" alt="' . htmlspecialchars($item['name']) . '">
        <div>
            <h3>' . htmlspecialchars($item['name']) . ' × ' . $itemCounter . '</h3>
            <h4>Amount: ' . htmlspecialchars($item['price']) . ' €</h4>
            <h4>Total Amount: ' . htmlspecialchars($item['price'] * $itemCounter) . ' €</h4>
            <form action="" method="POST" style="display: flex; gap: 10px; margin-top: 10px;">
                <input type="hidden" name="item_id" value="' . htmlspecialchars($item['id']) . '">
                <input type="number" class="form-control-small" name="quantity" value="' . htmlspecialchars($itemCounter) . '" min="1" style="width: 60px;">
                <button type="submit" name="update_quantity" class="btn btn-sm btn-success">Update</button>
                <button type="submit" name="remove_item" class="btn btn-sm btn-danger">Remove</button>
            </form>
        </div>
    </div>';
}