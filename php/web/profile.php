<?php
	ob_start();
	session_start();
	$pageTitle = 'Profile';
	include 'init.php';
	if (isset($_SESSION['user'])) {
		$getUser = $con->prepare("SELECT * FROM users WHERE username = ?");
		$getUser->execute(array($sessionUser));
		$info = $getUser->fetch();
		$userid = $info['user_id'];
?>
<h1 class="text-center">My Profile</h1>
<div class="information block">
	<div class="container">
		<div class="panel panel-primary">
			<div class="panel-heading">My Information</div>
			<div class="panel-body">
				<ul class="list-unstyled">
					<li>
						<i class="fa fa-unlock-alt fa-fw"></i>
						<span>Username</span> : <?php echo $info['username'] ?>
					</li>
					<li>
						<i class="fa fa-envelope fa-fw"></i>
						<span>Email</span> : <?php echo $info['email'] ?>
					</li>
					<li>
						<i class="fa fa-user fa-fw"></i>
						<span>Full Name</span> : <?php echo $info['full_name'] ?>
					</li>
					<li>
						<i class="fa fa-calendar fa-fw"></i>
						<span>Registered Date</span> : <?php echo $info['registration_date'] ?>
					</li>
				</ul>
				<a href="editProfile.php" class="btn btn-default">Edit Information</a>
			</div>
		</div>
	</div>
</div>
<!-- <div id="my-ads" class="my-ads block">
	<div class="container">
		<div class="panel panel-primary">
			<div class="panel-heading">My Items</div>
			<div class="panel-body">
			<?php
				$myItems = getAllFrom("*", "items", "where owner_id = $userid", "", "item_id");
				if (! empty($myItems)) {
					echo '<div class="row">';
					foreach ($myItems as $item) {
						echo '<div class="col-sm-6 col-md-3">';
							echo '<div class="thumbnail item-box">';
								if ($item['Approve'] == 0) { 
									echo '<span class="approve-status">Waiting Approval</span>'; 
								}
								echo '<span class="price-tag">$' . $item['price'] . '</span>';
								echo '<img class="img-responsive" src="img.png" alt="" />';
								echo '<div class="caption">';
									echo '<h3><a href="items.php?itemid='. $item['item_id'] .'">' . $item['Name'] .'</a></h3>';
									echo '<p>' . $item['description'] . '</p>';
									echo '<div class="date">' . $item['added_date'] . '</div>';
								echo '</div>';
							echo '</div>';
						echo '</div>';
						
					}
					echo '</div>';
				} else {
					echo 'Sorry There\' No Ads To Show, Create <a href="newad.php">New Ad</a>';
				}
			?>
			</div>
		</div>
	</div>
</div> -->
<div class="my-comments block">
	<div class="container">
		<div class="panel panel-primary">
			<div class="panel-heading">Latest Comments</div>
			<div class="panel-body">
			<?php
				$myComments = getAllFrom("content", "comments", "where user_id = $userid", "", "comment_id");
				if (! empty($myComments)) {
					foreach ($myComments as $comment) {
						echo '<p>' . $comment['content'] . '</p>';
					}
				} else {
					echo 'There\'s No Comments to Show';
				}
			?>
			</div>
		</div>
	</div>
</div>
<?php
	} else {
		header('Location: login.php');
		exit();
	}
	include $tpl . 'footer.php';
	ob_end_flush();
?>