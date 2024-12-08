<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8" />
	<link rel="icon" type="image/x-icon" href="../layout\images\favicon.ico">
	<title><?php getTitle() ?></title>
	<link rel="stylesheet" href="<?php echo $css ?>header.css" />
	<link rel="stylesheet" href="<?php echo $css ?>footer.css" />
	<link rel="stylesheet" href="<?php echo $css ?>main.css" />

	<link rel="stylesheet" href="<?php echo $css;
	getCssFile(); ?>" />
	<link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css">

</head>

<body>
	<header>
		<section>
			<!-- MAIN CONTAINER -->
			<div id="container">
				<!-- SHOP NAME -->
				<div id="shopName"><a href="/admin/dashboard.php"> <b>UNIWA</b>SHOP </a></div>
				<!-- COLLCETIONS ON WEBSITE -->
				<div id="admin-collection">
					<div><a href="categories.php">Categories</a></div>
					<div><a href="products.php">Products</a></div>
					<div><a href="orders.php">Orders</a></div>
					<div><a href="members.php">Customers</a></div>
					<div><a href="comments.php">Comments</a></div>
				</div>
				<div></div>
				<div id="">

					<?php
					if (isset($_SESSION['admin'])) {
						?>

						<div class="dropdown">

							<i onclick="myFunction()" class="fas fa-user-circle userIcon dropbtn"></i>
							<div id="myDropdown" class="dropdown-content">
								<a href="../index.php">Visit Shop</a>
								<a href="members.php?do=Edit&userid=<?php echo $_SESSION['admin_user_id'] ?>">Edit Profile</a>
								<a href="logout.php">Logout</a>
							</div>
						</div>
					<?php } else {
						?>
						<div>
							<a href="index.php">
								<span class="pull-right">Login/Signup</span>
							</a>
						</div>
					<?php }
					?>

				</div>
			</div>
			</div>

		</section>
	</header>
	<div style="height: 100px"></div>