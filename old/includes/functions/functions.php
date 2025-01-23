<?php

function getSingleValue($con, $sql, $parameters)
{
	$q = $con->prepare($sql);
	$q->execute($parameters);
	return $q->fetchColumn();
}

function getAll($sql, $parameters = []){
	global $con;
	$q = $con->prepare($sql);
	$q->execute($parameters);
	return $q->fetchAll();
}

// function getAllFrom($field, $table, $join = '', $where = '', $and = '', $orderfield = '', $ordering = 'DESC', $params = [])
// {
//     global $con;

//     // Validate ordering input
//     $validOrderings = ['ASC', 'DESC'];
//     $ordering = in_array(strtoupper($ordering), $validOrderings) ? strtoupper($ordering) : 'DESC';

//     // Build the query
//     $query = "SELECT $field FROM $table $join";
//     if (!empty($where)) {
//         $query .= " $where";
//     }
//     if (!empty($and)) {
//         $query .= " $and";
//     }
//     if (!empty($orderfield)) {
//         $query .= " ORDER BY $orderfield $ordering";
//     }

//     // Prepare and execute the query
//     $stmt = $con->prepare($query);
//     $stmt->execute($params); // Bind parameters
//     return $stmt->fetchAll();
// }

function formatImage($path)
{
	$env = getenv('PHP_ENV');
	if ($env === 'production') {
		return 'http://localhost:9000/shop/' . $path;
	}else {
		$minio = getenv('MINIO_URL');
		if ($minio) {
			return $minio . $path;
		}
	}
	return 'http://localhost:9000/shop/' . $path;
}
	
	function checkUserStatus($user) {

		global $con;

		$stmtx = $con->prepare("SELECT 
									username
								FROM 
									users 
								WHERE 
									username = ? 
								");

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

	function printProductCard($product) {
		echo '<div id="box">';
		echo '<a href="products.php?product_id=' . $product['product_id'] . '">';
		echo '<img src="' . formatImage($product["image_url"]) . '" alt="Clothing Item Preview">';
		echo '<div id="details">';
		echo '<h3>' . $product["name"] . '</h3>';
		echo '<h4>' . $product['description'] . '</h4>';
		echo '<h2>' . $product['price'] . ' €</h2>';
		echo '</div>';
		echo '</a>';
		echo '</div>';
	}

	function dynamicCartSection($product, $productCounter, $upload)
{
	// Generate the cart product HTML
	return '
   <div id="box">
        <img style="height: 220px; object-fit: contain;" src="' . formatImage($product['image_url']) . '" alt="' . htmlspecialchars($product['name']) . '">
        <div>
            <h3>' . htmlspecialchars($product['name']) . ' × ' . $productCounter . '</h3>
            <h4>Amount: ' . htmlspecialchars($product['price']) . ' €</h4>
            <h4>Total Amount: ' . htmlspecialchars($product['price'] * $productCounter) . ' €</h4>
            <form action="" method="POST" style="display: flex; gap: 10px; margin-top: 10px;">
                <input type="hidden" name="product_id" value="' . htmlspecialchars($product['id']) . '">
                <input type="number" class="form-control-small" name="quantity" value="' . htmlspecialchars($productCounter) . '" min="1" style="width: 60px;">
                <button type="submit" name="update_quantity" class="btn btn-sm btn-success">Update</button>
                <button type="submit" name="remove_product" class="btn btn-sm btn-danger">Remove</button>
            </form>
        </div>
    </div>';
}