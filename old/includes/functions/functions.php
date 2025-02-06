<?php

use Aws\Exception\AwsException;

/**
 * Συνάρτηση για την ανάκτηση μιας μοναδικής τιμής από τη βάση δεδομένων
 *
 * @param PDO $con Σύνδεση στη βάση δεδομένων
 * @param string $sql Το SQL ερώτημα
 * @param array $parameters Οι παράμετροι για το ερώτημα
 *
 * @return mixed Η πρώτη στήλη του πρώτου αποτελέσματος
 */
function getSingleValue($con, $sql, $parameters)
{
	$q = $con->prepare($sql);
	$q->execute($parameters);
	return $q->fetchColumn();
}

/**
 * Συνάρτηση για την ανάκτηση όλων των αποτελεσμάτων από ένα SQL ερώτημα
 *
 * @param string $sql Το SQL ερώτημα
 * @param array $parameters Οι παράμετροι για το ερώτημα (προαιρετικά)
 *
 * @return array Τα αποτελέσματα του ερωτήματος
 */
function getAll($sql, $parameters = [])
{
	global $con;
	$q = $con->prepare($sql);
	$q->execute($parameters);
	return $q->fetchAll();
}

// Η παρακάτω συνάρτηση έχει σχολιαστεί και δεν χρησιμοποιείται
/*
function getAllFrom($field, $table, $join = '', $where = '', $and = '', $orderfield = '', $ordering = 'DESC', $params = [])
{
	global $con;

	// Επικύρωση της εισόδου για την ταξινόμηση
	$validOrderings = ['ASC', 'DESC'];
	$ordering = in_array(strtoupper($ordering), $validOrderings) ? strtoupper($ordering) : 'DESC';

	// Δημιουργία του ερωτήματος
	$query = "SELECT $field FROM $table $join";
	if (!empty($where)) {
		$query .= " $where";
	}
	if (!empty($and)) {
		$query .= " $and";
	}
	if (!empty($orderfield)) {
		$query .= " ORDER BY $orderfield $ordering";
	}

	// Προετοιμασία και εκτέλεση του ερωτήματος
	$stmt = $con->prepare($query);
	$stmt->execute($params); // Δέσμευση παραμέτρων
	return $stmt->fetchAll();
}
*/

/**
 * Συνάρτηση για ανέβασμα εικόνας, εισαγωγή στον πίνακα media και επιστροφή του media_id
 *
 * @param array $file Τα δεδομένα του αρχείου από το $_FILES
 * @param PDO $con Η σύνδεση στη βάση δεδομένων
 * @param Aws\S3\S3Client $s3Client Ο πελάτης S3 για MinIO
 * @param string $bucket Το όνομα του bucket στο MinIO
 *
 * @return int Το media_id της εισαγόμενης εικόνας
 *
 * @throws Exception Αν υπάρξει σφάλμα κατά το ανέβασμα ή την εισαγωγή
 */
function uploadImage($file, $con, $s3Client, $bucket)
{
	// Εξαγωγή πληροφοριών αρχείου
	$avatarName = $file['name'];
	$avatarSize = $file['size'];
	$avatarTmp = $file['tmp_name'];

	// Επιτρεπτές επεκτάσεις
	$allowedExtensions = ["jpeg", "jpg", "png", "gif"];

	// Λήψη επεκτάσεως αρχείου
	$ref = explode('.', $avatarName);
	$extension = strtolower(end($ref));

	// Έλεγχος επεκτάσεως
	if (!in_array($extension, $allowedExtensions)) {
		throw new Exception("Μόνο αρχεία JPEG, JPG, PNG και GIF επιτρέπονται");
	}

	// Έλεγχος μεγέθους (μέγιστο 2MB)
	if ($avatarSize > 2097152) {
		throw new Exception("Το μέγεθος της εικόνας δεν μπορεί να υπερβαίνει τα 2MB");
	}

	// Δημιουργία μοναδικού ονόματος αρχείου
	$uniqueName = rand(0, 10000000000) . '_' . basename($avatarName);

	// Ορισμός του object key (μονοπάτι) στο bucket
	$objectKey = 'uploads/' . $uniqueName;

	try {
		// Ανέβασμα του αρχείου στο MinIO
		$s3Client->putObject([
			'Bucket' => $bucket,
			'Key'    => $objectKey,
			'SourceFile' => $avatarTmp,
			'ACL'    => 'public-read', // Κάνε το αντικείμενο δημόσιο για εύκολη πρόσβαση
			'ContentType' => mime_content_type($avatarTmp), // Ορισμός του σωστού τύπου περιεχομένου
		]);

		// Εισαγωγή στον πίνακα media
		$stmt = $con->prepare("INSERT INTO media (name, path, size) VALUES (:name, :path, :size)");
		$stmt->execute([
			'name' => $uniqueName,
			'path' => $objectKey, // Αποθήκευση του σχετικού μονοπατιού
			'size' => $avatarSize
		]);

		// Λήψη του media_id
		$mediaId = $con->lastInsertId();

		return $mediaId;
	} catch (AwsException $e) {
		// Χειρισμός σφαλμάτων κατά το ανέβασμα
		throw new Exception("Σφάλμα κατά το ανέβασμα της εικόνας: " . $e->getMessage());
	} catch (Exception $e) {
		// Χειρισμός άλλων σφαλμάτων
		throw new Exception($e->getMessage());
	}
}

/**
 * Συνάρτηση για τη διαμόρφωση του URL της εικόνας
 *
 * @param string $path Το μονοπάτι της εικόνας
 *
 * @return string Το πλήρες URL της εικόνας
 */
function formatImage($path)
{
	$env = getenv('PHP_ENV');
	if ($env === 'production') {
		$minio = getenv('MINIO_URL');
		if ($minio) {
			return $minio . "/shop/" . $path;
		}
	} else {
		return 'http://localhost:9000/shop/' . $path;
	}
}

/**
 * Συνάρτηση για τον έλεγχο της κατάστασης του χρήστη
 *
 * @param string $user Το όνομα χρήστη
 *
 * @return int Ο αριθμός των εγγραφών που αντιστοιχούν στο χρήστη
 */
function checkUserStatus($user)
{
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

/**
 * Συνάρτηση για τον έλεγχο αν ένα στοιχείο υπάρχει σε έναν πίνακα
 *
 * @param string $select Το πεδίο για τον έλεγχο
 * @param string $from Ο πίνακας για τον έλεγχο
 * @param mixed $value Η τιμή που αναζητείται
 *
 * @return int Ο αριθμός των εγγραφών που αντιστοιχούν στο στοιχείο
 */
function checkItem($select, $from, $value)
{
	global $con;

	$statement = $con->prepare("SELECT $select FROM $from WHERE $select = ?");

	$statement->execute(array($value));

	$count = $statement->rowCount();

	return $count;
}

/**
 * Συνάρτηση για την εμφάνιση του τίτλου της σελίδας
 */
function getTitle()
{
	global $pageTitle;

	if (isset($pageTitle)) {
		echo htmlspecialchars($pageTitle);
	} else {
		echo 'Default';
	}
}

/**
 * Συνάρτηση για την εμφάνιση του αρχείου CSS της σελίδας
 */
function getCssFile()
{
	global $cssFile;

	if (isset($cssFile)) {
		echo htmlspecialchars($cssFile);
	}
}

/**
 * Συνάρτηση για την ανακατεύθυνση του χρήστη με μήνυμα
 *
 * @param string $theMsg Το μήνυμα προς εμφάνιση
 * @param string|null $url Η διεύθυνση URL για την ανακατεύθυνση (προαιρετικά)
 * @param int $seconds Ο αριθμός των δευτερολέπτων πριν την ανακατεύθυνση (προαιρετικά)
 */
function redirectHome($theMsg, $url = null, $seconds = 3)
{
	if ($url === null) {
		$url = 'index.php';
		$link = 'Αρχική Σελίδα';
	} else {
		if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] !== '') {
			$url = $_SERVER['HTTP_REFERER'];
			$link = 'Προηγούμενη Σελίδα';
		} else {
			$url = 'index.php';
			$link = 'Αρχική Σελίδα';
		}
	}

	echo $theMsg;

	echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε στην $link μετά από $seconds δευτερόλεπτα.</div>";

	header("refresh:$seconds;url=$url");

	exit();
}

/**
 * Συνάρτηση για την καταμέτρηση των αντικειμένων σε έναν πίνακα
 *
 * @param string $item Το πεδίο για την καταμέτρηση
 * @param string $table Ο πίνακας για την καταμέτρηση
 *
 * @return int Ο αριθμός των αντικειμένων
 */
function countItems($item, $table)
{
	global $con;

	$stmt2 = $con->prepare("SELECT COUNT($item) FROM $table");

	$stmt2->execute();

	return $stmt2->fetchColumn();
}

/**
 * Συνάρτηση για την ανάκτηση των τελευταίων εγγραφών από έναν πίνακα
 *
 * @param string $select Τα πεδία για την επιλογή
 * @param string $table Ο πίνακας για την επιλογή
 * @param string $order Το πεδίο για την ταξινόμηση
 * @param int $limit Ο αριθμός των εγγραφών που θα ανακτηθούν (προαιρετικά, default 5)
 *
 * @return array Τα τελευταία αποτελέσματα
 */
function getLatest($select, $table, $order, $limit = 5)
{
	global $con;

	$getStmt = $con->prepare("SELECT $select FROM $table ORDER BY $order DESC LIMIT $limit");

	$getStmt->execute();

	$rows = $getStmt->fetchAll();

	return $rows;
}

/**
 * Συνάρτηση για την εμφάνιση μιας κάρτας προϊόντος
 *
 * @param array $product Τα δεδομένα του προϊόντος
 */
function printProductCard($product)
{
	echo '<div id="box">';
	echo '<a href="products.php?product_id=' . htmlspecialchars($product['product_id']) . '">';
	if (!empty($product['image_url'])) {
		echo '<img src="' . formatImage(htmlspecialchars($product["image_url"])) . '" alt="Προβολή Είδους Ρούχου">';
	} else {
		echo '<img src="/uploads/empty_product.png" alt="Προβολή Είδους Ρούχου">';
	}
	echo '<div id="details">';
	echo '<h3>' . htmlspecialchars($product["name"]) . '</h3>';
	echo '<h4>' . htmlspecialchars($product['description']) . '</h4>';
	echo '<h2>' . htmlspecialchars($product['price']) . ' €</h2>';
	echo '</div>';
	echo '</a>';
	echo '</div>';
}

/**
 * Συνάρτηση για τη δημιουργία δυναμικής ενότητας προϊόντος στο καλάθι
 *
 * @param array $product Τα δεδομένα του προϊόντος
 * @param int $productCounter Ο αριθμός των τεμαχίων του προϊόντος
 * @param mixed $upload Το URL της εικόνας ή άλλο σχετικό δεδομένο (προαιρετικά)
 *
 * @return string Το HTML της ενότητας του προϊόντος στο καλάθι
 */
function dynamicCartSection($product, $productCounter)
{
    // Ελέγχουμε αν υπάρχει εικόνα, διαφορετικά χρησιμοποιούμε την προεπιλεγμένη εικόνα
    $imageUrl = $product['image_url'] == NULL ? formatImage($product['image_url']) : '/uploads/empty_product.png';

    // Δημιουργία του HTML για το προϊόν στο καλάθι
    return '
    <div id="box">
        <img style="height: 220px; object-fit: contain;" src="' . htmlspecialchars($imageUrl) . '" alt="' . htmlspecialchars($product['name']) . '">
        <div>
            <h3>' . htmlspecialchars($product['name']) . ' × ' . htmlspecialchars($productCounter) . '</h3>
            <h4>Ποσό: ' . htmlspecialchars($product['price']) . ' €</h4>
            <h4>Συνολικό Ποσό: ' . htmlspecialchars($product['price'] * $productCounter) . ' €</h4>
            <form action="" method="POST" style="display: flex; gap: 10px; margin-top: 10px;">
                <input type="hidden" name="product_id" value="' . htmlspecialchars($product['id']) . '">
                <input type="number" class="form-control-small" name="quantity" value="' . htmlspecialchars($productCounter) . '" min="1" style="width: 60px;">
                <button type="submit" name="update_quantity" class="btn btn-sm btn-success">Ενημέρωση</button>
                <button type="submit" name="remove_product" class="btn btn-sm btn-danger">Αφαίρεση</button>
            </form>
        </div>
    </div>';
}

