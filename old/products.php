<?php
ob_start();
session_start();
$pageTitle = 'Show Items';
$cssFile = 'contentDetails.css';
include 'cart-handler.php';
include 'init.php';

// Check If Get Request product Is Numeric & Get Its Integer Value
$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

// Select All Data Depend On This ID
$stmt = $con->prepare("SELECT 
								products.*, 
								categories.name AS category_name, 
								users.username ,
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
							INNER JOIN 
								media
							ON
								media.media_id = products.media_id
							WHERE 
								product_id = ?");

// Execute Query
$stmt->execute(array($product_id));

$count = $stmt->rowCount();

if ($count > 0) {

	// Fetch The Data
	$product = $stmt->fetch();
?>
	<div id="containerD">
		<div id="imageSection">
			<img id="imgDetails" src="<?php echo formatImage($product['image_url']) ?>" alt="Product Main Preview">
		</div>
		<div id="productDetails">

			<h1><?php echo $product['name'] ?></h1>
			<h4><?php echo $product['category_name'] ?></h4>
			<div id="details">
				<h3><?php echo $product['price'] ?></h3>
				<h3>Description</h3>
				<p><?php echo $product['description'] ?></p>
				<h3>Made in</h3>
				<p><?php echo $product['country_of_origin'] ?></p>
				<!-- <h3>Added by</h3>
				<p><?php echo $product['username'] ?></p> -->

			</div>
			<!-- <div id="productPreview">
					<h3>Product Preview</h3>
					<img id="previewImg" src="preview-image-1.jpg" alt="Preview Image 1">
					<img id="previewImg" src="preview-image-2.jpg" alt="Preview Image 2">
					<img id="previewImg" src="preview-image-3.jpg" alt="Preview Image 3">
				</div> -->
			<!-- <div id="button">
				<button>Add to Cart</button>
			</div> -->
			<form action="" method="POST">
				<input type="hidden" name="product_id" value="<?php echo $product['product_id']; ?>">
				<input type="hidden" name="product_name" value="<?php echo $product['name']; ?>">
				<input type="hidden" name="product_price" value="<?php echo $product['price']; ?>">
				<input type="hidden" name="product_picture" value="<?php echo $product['image_url']; ?>">
				<button type="submit" name="add_to_cart" class="btn btn-primary">Add to Cart</button>
				<?php
				// Display feedback message if available
				if (isset($_SESSION['feedback'])) {
					echo '<div style="height: 10px"></div>';
					echo '<div class="alert alert-success">' . $_SESSION['feedback'] . '</div>';
					unset($_SESSION['feedback']); // Clear feedback after showing
				}

				?>
			</form>
		</div>
	</div>


	<hr class="custom-hr">
	<?php if (isset($_SESSION['user'])) { ?>
		<!-- Start Add Comment -->
		<div class="row">
			<div class="col-md-offset-3">
				<div class="add-comment">
					<h3>Add Your Feedback</h3>
					<form action="<?php echo $_SERVER['PHP_SELF'] . '?product_id=' . $product['product_id'] ?>" method="POST">
						<textarea name="comment" required></textarea>
						<input class="button" type="submit" name="add_comment">
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

								echo '<div class="alert alert-success">Comment added</div>';
							}
						} else {

							echo '<div class="alert alert-danger">You must add a comment</div>';
						}
					}
					?>
				</div>
			</div>
		</div>
		<!-- End Add Comment -->
	<?php } else {

		echo '<div class="row"><a href="login.php">Login</a>&nbsp or &nbsp <a href="login.php">Register</a> &nbsp to add comment</div>';
	} ?>
	<hr class="custom-hr">
	<?php

	// Select All Users Except Admin \
	$comments = getAll("SELECT comments.content, comments.content,  media.path as image_url,  users.username as username FROM comments INNER JOIN users ON users.user_id = comments.user_id INNER JOIN media ON media.media_id=users.media_id WHERE product_id = ? ORDER BY comment_id DESC", [$product['product_id']]);
	?>

	<?php foreach ($comments as $comment) {
	?>
		<div class="comment-box">
			<div class="row">
				<div class="col-sm-2 text-center">
					<?php
					echo '<img class="img-responsive img-thumbnail img-circle center-block" ';
					if (empty($myimage)) {
						echo "<img src='uploads/default.png' alt='' />";
					} else {
						echo "<img src='" . formatImage($myimage) . "' alt='' />";
					}
					?>
					<p><?php echo $comment['username'] ?></p>
				</div>
				<div class="col-sm-10">
					<p class="lead"><?php echo $comment['content'] ?></p>
				</div>
			</div>
		</div>
		<hr class="custom-hr">
	<?php } ?>
	</div>
<?php
} else {
	echo '<div class="container">';
	echo '<div class="alert alert-danger">There\'s no such ID or this product is waiting approval</div>';
	echo '</div>';
}
include $tpl . 'footer.php';
ob_end_flush();
?>