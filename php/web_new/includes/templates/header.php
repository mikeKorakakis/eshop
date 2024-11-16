<!DOCTYPE html>
<html>
	<head>
		<?php 
		    $cssFile = 'header.css';
		?>
		<meta charset="UTF-8" />
		<title><?php getTitle() ?></title>
		<!-- <link rel="stylesheet" href="<?php echo $css ?>bootstrap.min.css" /> -->
		<link rel="stylesheet" href="<?php echo $css ?>font-awesome.min.css" />
		<link rel="stylesheet" href="<?php echo $css ?>jquery-ui.css" />
		<link rel="stylesheet" href="<?php echo $css ?>jquery.selectBoxIt.css" />
		<link rel="stylesheet" href="<?php echo $css ?>front.css" />
		<link rel="stylesheet" href="<?php echo $css; getCssFile();?>" />

	</head>
	<body>
	<div class="upper-bar">
		<div class="container">
			<?php 
				if (isset($_SESSION['user'])) { 
			?>

				<img class="my-image img-circle" src="admin/uploads/avatars/<?php echo $sessionAvatar ?>" alt="" />
				<div class="btn-group my-info">
					<span class="btn btn-default dropdown-toggle" data-toggle="dropdown">
						<?php echo $sessionUser ?>
						<span class="caret"></span>
					</span>
					<ul class="dropdown-menu">
						<li><a href="profile.php">My Profile</a></li>
						<li><a href="newad.php">New Item</a></li>
						<li><a href="myItems.php">My Items</a></li>
						<li><a href="logout.php">Logout</a></li>
					</ul>
				</div>

				<?php

				} else {
			?>
			<a href="login.php">
				<span class="pull-right">Login/Signup</span>
			</a>
			<?php } ?>
		</div>
	</div>
	<!-- <nav class="navbar navbar-inverse">
	  <div class="container">
	    <div class="navbar-header">
	      <button 
	      		type="button" 
	      		class="navbar-toggle collapsed" 
	      		data-toggle="collapse" 
	      		data-target="#app-nav" 
	      		aria-expanded="false">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="index.php"><i class="fa fa-home" aria-hidden="true"></i> Home</a>
	    </div>
	    <div class="collapse navbar-collapse" id="app-nav">
	      <ul class="nav navbar-nav navbar-right">
	      <?php
	      	$allCats = getAllFrom("*", "categories", "where parent = 0", "", "ID", "ASC");
			foreach ($allCats as $cat) {
				echo 
				'<li>
					<a href="categories.php?pageid=' . $cat['ID'] . '">
						' . $cat['Name'] . '
					</a>
				</li>';
			}
	      ?>
	      </ul>
	    </div>
	  </div>
	</nav> -->

	<header>
        <section>
            <!-- MAIN CONTAINER -->
            <div id="container">
                <!-- SHOP NAME -->
                <div id="shopName"><a href="index.html"> <b>SHOP</b>LANE </a></div>
                    <!-- COLLCETIONS ON WEBSITE -->
                    <div id="collection">
                        <div id="clothing"><a href="clothing.html"> CLOTHING </a></div>
                        <div id="accessories"><a href="accessories.html"> ACCESSORIES </a></div>
                    </div>
                    <!-- SEARCH SECTION -->
                    <div id="search">
                        <i class="fas fa-search search"></i>
                        <input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories">
                    </div>
                    <!-- USER SECTION (CART AND USER ICON) -->
                    <div id="user">
                        <a href="cart.html"> <i class="fas fa-shopping-cart addedToCart"><div id="badge"> 0 </div></i></a>
                        <a href="#"> <i class="fas fa-user-circle userIcon"></i> </a>
                    </div>
            </div>

        </section>
    </header>
