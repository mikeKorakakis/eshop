<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8" />
	<link rel="icon" type="image/x-icon" href="layout\images\favicon.ico">
	<title><?php getTitle() ?></title>
	<link rel="stylesheet" href="<?php echo $css ?>header.css" />
	<link rel="stylesheet" href="<?php echo $css ?>footer.css" />
	<link rel="stylesheet" href="<?php echo $css ?>main.css" />

	<link rel="stylesheet" href="<?php echo $css; getCssFile(); ?>" />
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
				<div id="shopName"><a href="/"> <b>UNIWA</b>SHOP </a></div>
				<!-- COLLCETIONS ON WEBSITE -->
				<div id="collection">
					<?php
					$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id", "ASC");
					$counter = 0;
					foreach ($allCats as $cat) {
						if ($counter > 2) {
							break;
						}
						echo
							'<div>
								<a href="categories.php?page_id=' . $cat['category_id'] . '">
									' . $cat['name'] . '
								</a>
							</div>';
						$counter++;

					}
					?>
				</div>
				<!-- SEARCH SECTION -->
				<!-- <div id="search">
					<i class="fas fa-search search"></i>
					<input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories">
				</div> -->
				<div></div>
				<!-- USER SECTION (CART AND USER ICON) -->
				<div id="user">
					<div>
						<a href="cart.php"> <i class="fas fa-shopping-cart addedToCart">
								<div id="badge">
									<?php
									$cart_count = 0;
									if (isset($_SESSION['cart'])) {
										$it = $_SESSION['cart'];
										foreach ($it as &$cart_item) {
											$cart_count += $cart_item['quantity'];
										}
									}
									echo $cart_count;
									?>
								</div>
							</i></a>
					</div>
					<?php
					if (isset($_SESSION['user'])) {
						?>

						<div class="dropdown">

							<i onclick="myFunction()" class="fas fa-user-circle userIcon dropbtn"></i>
							<div id="myDropdown" class="dropdown-content">
								<a href="profile.php">My Profile</a>
								<a href="orders.php">My Orders</a>
								<!-- <a href="newad.php">New Item</a>
								<a href="myItems.php">My Items</a> -->
								<a href="logout.php">Logout</a>
							</div>
						</div>
					<?php } else {
						?>
						<div>
							<a href="login.php">
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