<?php
ob_start();
session_start();
$pageTitle = 'Εμφάνιση Προϊόντων';
$cssFile = 'contentDetails.css';
include 'cart-handler.php';
include 'init.php';

// Έλεγχος αν η παράμετρος GET 'product_id' είναι αριθμητική και λήψη της ακέραιας τιμής της
$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

// Επιλογή όλων των δεδομένων βάσει αυτού του ID
$stmt = $con->prepare("SELECT 
								products.*, 
								categories.name AS category_name, 
								users.username,
								media.path AS image_url
							FROM 
								products
							INNER JOIN 
								categories 
							ON 
								categories.category_id = products.category_id 
							INNER JOIN 
								users 
							ON 
								users.user_id = products.owner_id 
							LEFT JOIN 
								media
							ON
								media.media_id = products.media_id
							WHERE 
								product_id = ?");

// Εκτέλεση του ερωτήματος
$stmt->execute(array($product_id));

$count = $stmt->rowCount();

if ($count > 0) {

	// Ανάκτηση των δεδομένων
	$product = $stmt->fetch();
?>
	<div id="containerD">
		<div id="imageSection">
			<?php
			if (empty($product['image_url'])) {
				echo '<img id="imgDetails" src="uploads/empty_product.png" alt="Κύρια Προβολή Προϊόντος">';
			} else {
				echo '<img id="imgDetails" src="' . htmlspecialchars(formatImage($product['image_url'])) . '" alt="Κύρια Προβολή Προϊόντος">';
			}
			?>
		</div>
		<div id="productDetails">

			<h1><?php echo htmlspecialchars($product['name']) ?></h1>
			<h4><?php echo htmlspecialchars($product['category_name']) ?></h4>
			<div id="details">
				<h3><?php echo htmlspecialchars($product['price']) ?>€</h3>
				<h3>Περιγραφή</h3>
				<p><?php echo nl2br(htmlspecialchars($product['description'])) ?></p>
				<h3>Χώρα Κατασκευής</h3>
				<p><?php echo htmlspecialchars($product['country_of_origin']) ?></p>
				<!-- <h3>Προστέθηκε από</h3>
				<p><?php echo htmlspecialchars($product['username']) ?></p> -->

			</div>
			<!-- <div id="productPreview">
					<h3>Προβολή Προϊόντος</h3>
					<img id="previewImg" src="preview-image-1.jpg" alt="Προβολή Εικόνας 1">
					<img id="previewImg" src="preview-image-2.jpg" alt="Προβολή Εικόνας 2">
					<img id="previewImg" src="preview-image-3.jpg" alt="Προβολή Εικόνας 3">
				</div> -->
			<!-- <div id="button">
				<button>Προσθήκη στο Καλάθι</button>
			</div> -->
			<form action="" method="POST">
				 <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['product_id']); ?>">
				<input type="hidden" name="product_name" value="<?php echo htmlspecialchars($product['name']); ?>">
				<input type="hidden" name="product_price" value="<?php echo htmlspecialchars($product['price']); ?>">
				<input type="hidden" name="product_picture" value="<?php echo htmlspecialchars($product['image_url']); ?>">
				<button type="submit" name="add_to_cart" class="btn btn-primary">Προσθήκη στο Καλάθι</button>
				<?php
				// Εμφάνιση μηνύματος επιβεβαίωσης αν είναι διαθέσιμο
				if (isset($_SESSION['feedback'])) {
					echo '<div style="height: 10px"></div>';
					echo '<div class="alert alert-success">' . htmlspecialchars($_SESSION['feedback']) . '</div>';
					unset($_SESSION['feedback']); // Καθαρισμός του μηνύματος μετά την εμφάνιση
				}

				?>
			</form>
		</div>
	</div>


	<hr class="custom-hr">
	<?php if (isset($_SESSION['user'])) { ?>
		<!-- Έναρξη Προσθήκης Σχολίου -->
		<div class="row">
			<div class="col-md-offset-3">
				<div class="add-comment">
					<h3>Προσθήκη Σχολίου</h3>
					<form action="<?php echo $_SERVER['PHP_SELF'] . '?product_id=' . htmlspecialchars($product['product_id']) ?>" method="POST">
						<textarea name="comment" required></textarea>
						<input class="button" type="submit" name="add_comment" value="Προσθήκη">
					</form>
					<?php
					if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_comment'])) {

						$comment = filter_var($_POST['comment'], FILTER_SANITIZE_SPECIAL_CHARS);
						$product_id = $product['product_id'];
						$userid = $_SESSION['user_id'];

						if (!empty($comment)) {

							$stmt = $con->prepare("INSERT INTO 
								comments(content, created_date, product_id, user_id)
								VALUES(:zcomment, NOW(), :zproductid, :zuserid)");

							$stmt->execute(array(

								'zcomment' => $comment,
								'zproductid' => $product_id,
								'zuserid' => $userid

							));

							if ($stmt) {

								echo '<div class="alert alert-success">Το σχόλιο προστέθηκε</div>';
							}
						} else {

							echo '<div class="alert alert-danger">Πρέπει να προσθέσεις ένα σχόλιο</div>';
						}
					}
					?>
				</div>
			</div>
		</div>
		<!-- Τέλος Προσθήκης Σχολίου -->
	<?php } else {

		echo '<div class="row"><a href="login.php">Σύνδεση</a>&nbsp ή &nbsp <a href="login.php">Εγγραφή</a> &nbsp για να προσθέσεις σχόλιο</div>';
	} ?>
	<hr class="custom-hr">
	<?php

	// Επιλογή όλων των σχολίων για αυτό το προϊόν
	$comments = getAll("SELECT comments.content, media.path as image_url, users.username FROM comments INNER JOIN users ON users.user_id = comments.user_id LEFT JOIN media ON media.media_id=users.media_id WHERE product_id = ? ORDER BY comment_id DESC", [$product['product_id']]);
	?>

	<?php foreach ($comments as $comment) {
	?>
		<div class="comment-box">
			<div class="row">
				<div class="col-sm-2 text-center">
					<?php
					echo '<img class="img-responsive img-thumbnail img-circle center-block" ';
					if (empty($comment['image_url'])) { // Έλεγχος αν υπάρχει εικόνα χρήστη
						echo "src='uploads/default.png' alt='Εικόνα Χρήστη' />";
					} else {
						echo "src='" . htmlspecialchars(formatImage($comment['image_url'])) . "' alt='Εικόνα Χρήστη' />";
					}
					?>
					<p><?php echo htmlspecialchars($comment['username']) ?></p>
				</div>
				<div class="col-sm-10">
					<p class="lead"><?php echo nl2br(htmlspecialchars($comment['content'])) ?></p>
				</div>
			</div>
		</div>
		<hr class="custom-hr">
	<?php } ?>
	</div>
<?php
} else {
	echo '<div class="container">';
	echo '<div class="alert alert-danger">Δεν υπάρχει τέτοιο ID ή αυτό το προϊόν περιμένει έγκριση</div>';
	echo '</div>';
}
include $tpl . 'footer.php';
ob_end_flush();
?>