<?php
ob_start();
session_start();
$pageTitle = 'Show Items';
$cssFile = 'contentDetails.css';
include 'cart-handler.php';
include 'init.php';

// Check If Get Request item Is Numeric & Get Its Integer Value
$itemid = isset($_GET['itemid']) && is_numeric($_GET['itemid']) ? intval($_GET['itemid']) : 0;

// Select All Data Depend On This ID
$stmt = $con->prepare("SELECT 
								items.*, 
								categories.name AS category_name, 
								users.username 
							FROM 
								items
							INNER JOIN 
								categories 
							ON 
								categories.category_id = items.category_id 
							INNER JOIN 
								users 
							ON 
								users.user_id = items.owner_id 
							WHERE 
								item_id = ?
							AND 
								is_approved = 1");

// Execute Query
$stmt->execute(array($itemid));

$count = $stmt->rowCount();

if ($count > 0) {

	// Fetch The Data
	$item = $stmt->fetch();
	?>
	<div id="containerD">
		<div id="imageSection">
			<img id="imgDetails" src="<?php echo $upload . $item['image_url'] ?>" alt="Product Main Preview">
		</div>
		<div id="productDetails">

			<h1><?php echo $item['name'] ?></h1>
			<h4><?php echo $item['category_name'] ?></h4>
			<div id="details">
				<h3><?php echo $item['price'] ?></h3>
				<h3>Description</h3>
				<p><?php echo $item['description'] ?></p>
				<h3>Made in</h3>
				<p><?php echo $item['country_of_origin'] ?></p>
				<!-- <h3>Added by</h3>
				<p><?php echo $item['username'] ?></p> -->
				<h3>Contact</h3>
				<p><?php echo $item['contact_info'] ?></p>
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
				<input type="hidden" name="item_id" value="<?php echo $item['item_id']; ?>">
				<input type="hidden" name="item_name" value="<?php echo $item['name']; ?>">
				<input type="hidden" name="item_price" value="<?php echo $item['price']; ?>">
				<input type="hidden" name="item_picture" value="<?php echo $item['image_url']; ?>">
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
					<form action="<?php echo $_SERVER['PHP_SELF'] . '?itemid=' . $item['item_id'] ?>" method="POST">
						<textarea name="comment" required></textarea>
						<input class="button" type="submit" name="add_comment">
					</form>
					<?php
					if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_comment'])) {

						$comment = filter_var($_POST['comment'], FILTER_SANITIZE_SPECIAL_CHARS);
						$itemid = $item['item_id'];
						$userid = $_SESSION['user_id'];

						if (!empty($comment)) {

							$stmt = $con->prepare("INSERT INTO 
								comments(content, status, created_date, item_id, user_id)
								VALUES(:zcomment, 1, NOW(), :zitemid, :zuserid)");

							$stmt->execute(array(

								'zcomment' => $comment,
								'zitemid' => $itemid,
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

	// Select All Users Except Admin 
	$stmt = $con->prepare("SELECT 
										comments.*, users.username AS member  
									FROM 
										comments
									INNER JOIN 
										users 
									ON 
										users.user_id = comments.user_id
									WHERE 
										item_id = ?
									AND 
										status = 1
									ORDER BY 
										comment_id DESC");

	// Execute The Statement

	$stmt->execute(array($item['item_id']));

	// Assign To Variable 

	$comments = $stmt->fetchAll();


	?>

	<?php foreach ($comments as $comment) {
		$myimage = getSingleValue($con, "SELECT avatar_url FROM users WHERE user_id=?", [$comment['user_id']]);
		?>
		<div class="comment-box">
			<div class="row">
				<div class="col-sm-2 text-center">
					<?php
					echo '<img class="img-responsive img-thumbnail img-circle center-block" ';
					if (empty($myimage)) {
						echo "<img src='admin/uploads/default.png' alt='' />";
					} else {
						echo "<img src='admin/uploads/avatars/" . $myimage . "' alt='' />";
					}
					?>
					<?php echo $comment['member'] ?>
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
	echo '<div class="alert alert-danger">There\'s no such ID or this item is waiting approval</div>';
	echo '</div>';
}
include $tpl . 'footer.php';
ob_end_flush();
?>