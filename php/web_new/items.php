<?php
	ob_start();
	session_start();
	$pageTitle = 'Show Items';
	$cssFile = 'contentDetails.css';
	include 'init.php';

	// Check If Get Request item Is Numeric & Get Its Integer Value
	$itemid = isset($_GET['itemid']) && is_numeric($_GET['itemid']) ? intval($_GET['itemid']) : 0;

	// Select All Data Depend On This ID
	$stmt = $con->prepare("SELECT 
								items.*, 
								categories.Name AS category_name, 
								users.Username 
							FROM 
								items
							INNER JOIN 
								categories 
							ON 
								categories.ID = items.Cat_ID 
							INNER JOIN 
								users 
							ON 
								users.UserID = items.Member_ID 
							WHERE 
								Item_ID = ?
							AND 
								Approve = 1");

	// Execute Query
	$stmt->execute(array($itemid));

	$count = $stmt->rowCount();

	if ($count > 0) {

	// Fetch The Data
	$item = $stmt->fetch();
?>
  <div id="containerD">
            <div id="imageSection">
                <img id="imgDetails" src="<?php echo $upload . $item['picture'] ?>" alt="Product Main Preview">
            </div>
            <div id="productDetails">
                <h1><?php echo $item['Name'] ?></h1>
                <h4><?php echo $item['category_name'] ?></h4>
                <div id="details">
                    <h3><?php echo $item['Price'] ?></h3>
                    <h3>Description</h3>
                    <p><?php echo $item['Description'] ?></p>
					<h3>Made in</h3>
                    <p><?php echo $item['Country_Made'] ?></p>
					<h3>Added by</h3>
                    <p><?php echo $item['Username'] ?></p>
					<h3>Contact</h3>
                    <p><?php echo $item['contact'] ?></p>
                </div>
                <!-- <div id="productPreview">
                    <h3>Product Preview</h3>
                    <img id="previewImg" src="preview-image-1.jpg" alt="Preview Image 1">
                    <img id="previewImg" src="preview-image-2.jpg" alt="Preview Image 2">
                    <img id="previewImg" src="preview-image-3.jpg" alt="Preview Image 3">
                </div> -->
                <div id="button">
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
<!-- <h1 class="text-center"><?php echo $item['Name'] ?></h1>
<div class="container">
	<div class="row">
		<div class="col-md-3">
			<?php
				if (empty($item['picture'])) {
					echo "<img class='img-responsive img-thumbnail center-block' src='admin/uploads/default.png' alt='' />";
				} else {
					echo "<img class='img-responsive img-thumbnail center-block' src='admin/uploads/items/" . $item['picture'] . "' alt='' />";
				}
			?>
		</div>
		<div class="col-md-9 item-info">
			<h2><?php echo $item['Name'] ?></h2>
			<p><?php echo $item['Description'] ?></p>
			<ul class="list-unstyled">
				<li>
					<i class="fa fa-calendar fa-fw"></i>
					<span>Added Date</span> : <?php echo $item['Add_Date'] ?>
				</li>
				<li>
					<i class="fa fa-money fa-fw"></i>
					<span>Price</span> : <?php echo $item['Price'] ?>
				</li>
				<li>
					<i class="fa fa-building fa-fw"></i>
					<span>Made In</span> : <?php echo $item['Country_Made'] ?>
				</li>
				<li>
					<i class="fa fa-tags fa-fw"></i>
					<span>Category</span> : <a href="categories.php?pageid=<?php echo $item['Cat_ID'] ?>"><?php echo $item['category_name'] ?></a>
				</li>
				<li>
					<i class="fa fa-user fa-fw"></i>
					<span>Added By</span> : <a href="#"><?php echo $item['Username'] ?></a>
				</li>
				<li>
					<i class="fa fa-phone fa-fw"></i>
					<span>Contact</span> : <a href="#"><?php echo $item['contact'] ?></a>
				</li>
			</ul>
		</div>
	</div> -->
	<hr class="custom-hr">
	<?php if (isset($_SESSION['user'])) { ?>
	<!-- Start Add Comment -->
	<div class="row">
		<div class="col-md-offset-3">
			<div class="add-comment">
				<h3>Add Your Feedback</h3>
				<form action="<?php echo $_SERVER['PHP_SELF'] . '?itemid=' . $item['Item_ID'] ?>" method="POST">
					<textarea name="comment" required></textarea>
					<input class="button" type="submit" value="Add Comment">
				</form>
				<?php 
					if ($_SERVER['REQUEST_METHOD'] == 'POST') {

						$comment 	= filter_var($_POST['comment'], FILTER_SANITIZE_SPECIAL_CHARS);
						$itemid 	= $item['Item_ID'];
						$userid 	= $_SESSION['uid'];

						if (! empty($comment)) {

							$stmt = $con->prepare("INSERT INTO 
								comments(comment, status, comment_date, item_id, user_id)
								VALUES(:zcomment, 1, NOW(), :zitemid, :zuserid)");

							$stmt->execute(array(

								'zcomment' => $comment,
								'zitemid' => $itemid,
								'zuserid' => $userid

							));

							if ($stmt) {

								echo '<div class="alert alert-success">Comment Added</div>';

							}

						} else {

							echo '<div class="alert alert-danger">You Must Add Comment</div>';

						}

					}
				?>
			</div>
		</div>
	</div>
	<!-- End Add Comment -->
	<?php } else {
		
		echo '<div class="row"><a href="login.php">Login</a>&nbsp or &nbsp <a href="login.php">Register</a> &nbsp To Add Comment</div>';
	} ?>
	<hr class="custom-hr">
		<?php

			// Select All Users Except Admin 
			$stmt = $con->prepare("SELECT 
										comments.*, users.Username AS Member  
									FROM 
										comments
									INNER JOIN 
										users 
									ON 
										users.UserID = comments.user_id
									WHERE 
										item_id = ?
									AND 
										status = 1
									ORDER BY 
										c_id DESC");

			// Execute The Statement

			$stmt->execute(array($item['Item_ID']));

			// Assign To Variable 

			$comments = $stmt->fetchAll();

			function getSingleValue($con, $sql, $parameters){
				$q = $con->prepare($sql);
				$q->execute($parameters);
				return $q->fetchColumn();
			}
		?>
		
	<?php foreach ($comments as $comment) { 
		$myimage = getSingleValue($con, "SELECT avatar FROM users WHERE UserID=?", [$comment['user_id']]);		
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
					<?php echo $comment['Member'] ?>
				</div>
				<div class="col-sm-10">
					<p class="lead"><?php echo $comment['comment'] ?></p>
				</div>
			</div>
		</div>
		<hr class="custom-hr">
	<?php } ?>
</div>
<?php
	} else {
		echo '<div class="container">';
			echo '<div class="alert alert-danger">There\'s no Such ID Or This Item Is Waiting Approval</div>';
		echo '</div>';
	}
	include $tpl . 'footer.php';
	ob_end_flush();
?>