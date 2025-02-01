<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8" />
	<link rel="icon" type="image/x-icon" href="layout\images\favicon.ico">
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
			<div class="container">
				<div class="admin-collection">
					<div>
						<?php
						$env = getenv('PHP_ENV');
						if ($env === 'production') {
							echo '<a href=' . getenv('NEW_SHOP_URL') . '>Επισκεφθείτε τον καινούριο μας ιστότοπο.</a>';
						} else {
							echo '<a href="http://localhost:3000">Επισκεφθείτε τον καινούριο μας ιστότοπο.</a>';
						}
						?>
					</div>
				</div>
			</div>
			</div>
			<!-- MAIN CONTAINER -->
			<div id="container">

				<!-- SHOP NAME -->
				<div id="shopName"><a href="/"> <b>UNIWA</b>SHOP </a></div>
				<!-- COLLCETIONS ON WEBSITE -->
				<div id="collection">
					<?php
					$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC", []);
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
				<div id="search">
					<form action="search.php" method="GET" id="searchForm">
						<i class="fas fa-search search" onclick="document.getElementById('searchForm').submit();"></i>
						<input type="text" id="input" name="search" placeholder="Αναζήτηση...">
					</form>
				</div>
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

							<?php if (isset($_SESSION['avatar'])) { ?>
								<img src="<?php echo formatImage($_SESSION['avatar']); ?>" class="userIcon dropbtn" style="width:40px; height:40px; border-radius:50%; " onclick="myFunction()">
							<?php } else { ?>
								<i onclick="myFunction()" class="fas fa-user-circle userIcon dropbtn"></i>
							<?php } ?>

							<div id="myDropdown" class="dropdown-content">
								<a href="profile.php">Προφίλ</a>
								<a href="orders.php">Παραγγελίες</a>
								<a href="logout.php">Αποσύνδεση</a>
							</div>
						</div>
					<?php } else {
					?>
						<div>
							<a href="login.php">
								<span class="pull-right">Σύνδεση/Εγγραφή</span>
							</a>
						</div>
					<?php }
					?>

				</div>
			</div>
			</div>

		</section>
	</header>
	<div style="height: 50px"></div>