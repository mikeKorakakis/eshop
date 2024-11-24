<?php
ob_start();
session_start();
$noNavbar = '';
$pageTitle = 'Login';

if (isset($_SESSION['Username'])) {
	header('Location: dashboard.php'); // Redirect To Dashboard Page
}

include 'init.php';

// Check If User Coming From HTTP Post Request

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$username = $_POST['user'];
	$password = $_POST['pass'];
	$hashedPass = sha1($password);

	// Check If The User Exist In Database

	$stmt = $con->prepare("SELECT 
									user_id, username, password 
								FROM 
									users 
								WHERE 
									username = ? 
								AND 
									password = ? 
								AND 
									group_id = 1
								LIMIT 1");

	$stmt->execute(array($username, $hashedPass));
	$row = $stmt->fetch();
	$count = $stmt->rowCount();

	// If Count > 0 This Mean The Database Contain Record About This Username

	if ($count > 0) {
		$_SESSION['admin'] = $username; // Register Session Name
		$_SESSION['admin_user_id'] = $row['user_id']; // Register Session ID
		header('Location: dashboard.php'); // Redirect To Dashboard Page
		exit();
	}

}

?>
<div class="container login-page">
	<form class="login" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
		<h4 class="text-center">Admin Login</h4>
		<input class="form-control" type="text" name="user" placeholder="Username" autocomplete="off" />
		<input class="form-control" type="password" name="pass" placeholder="Password" autocomplete="new-password" />
		<input class="btn btn-primary btn-block w-100" type="submit" value="Login" />
	</form>
</div>

<?php include $tpl . 'footer.php'; ?>