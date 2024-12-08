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
