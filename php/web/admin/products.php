<?php

	/*
	================================================
	== Items Page
	================================================
	*/

	ob_start(); // Output Buffering Start

	session_start();

	$pageTitle = 'Items';

	if (isset($_SESSION['admin'])) {

		include 'init.php';

		$do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

		if ($do == 'Manage') {


			$stmt = $con->prepare("SELECT 
										products.*, 
										categories.name AS category_name, 
										users.username 
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
									ORDER BY 
										product_id DESC");

			// Execute The Statement

			$stmt->execute();

			// Assign To Variable 

			$products = $stmt->fetchAll();

			if (! empty($products)) {

			?>

			<h1 class="text-center">Manage Products</h1>
			<div class="container">
				<div class="table-responsive">
					<table class="main-table manage-members text-center table table-bordered">
						<tr>
							<td>Picture</td>
							<td>Item Name</td>
							<td>Price</td>
							<td>Adding Date</td>
							<td>Category</td>
							<td>Owner</td>
							<td>Action</td>
						</tr>
						<?php
							foreach($products as $product) {
								echo "<tr>";
									echo "<td>";
									if (empty($product['image_url'])) {
										echo "<img src='uploads/default.png' alt='' />";
									} else {
										echo "<img src='" . $upload . $product['image_url'] . "' alt='' />";
									}
									echo "</td>";
									echo "<td>" . $product['name'] . "</td>";
									echo "<td>" . $product['price'] . "</td>";
									echo "<td>" . $product['added_date'] ."</td>";
									echo "<td>" . $product['category_name'] ."</td>";
									echo "<td>" . $product['username'] ."</td>";
									echo "<td>
										<a href='products.php?do=Edit&product_id=" . $product['product_id'] . "' class='btn btn-success'><i class='fa fa-edit'></i> Edit</a>
										<a href='products.php?do=Delete&product_id=" . $product['product_id'] . "' class='btn btn-danger confirm'><i class='fa fa-close'></i> Delete </a>";
										
									echo "</td>";
								echo "</tr>";
							}
						?>
						<tr>
					</table>
				</div>
				<a href="products.php?do=Add" class="btn btn-sm btn-primary">
					<i class="fa fa-plus"></i> New Item
				</a>
			</div>

			<?php } else {

				echo '<div class="container">';
					echo '<div class="nice-message">There\'s No Items To Show</div>';
					echo '<a href="products.php?do=Add" class="btn btn-sm btn-primary">
							<i class="fa fa-plus"></i> New Item
						</a>';
				echo '</div>';

			} ?>

		<?php 

		} elseif ($do == 'Add') { ?>

			<h1 class="text-center">Add New Item</h1>
			<div class="container">
				<form class="form-horizontal" action="?do=Insert" method="POST" enctype="multipart/form-data">
					<!-- Start Name Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Name</label>
						<div class="col-sm-10 col-md-6">
							<input 
								type="text" 
								name="name" 
								class="form-control" 
								required="required"  
								placeholder="Name of The Item" />
						</div>
					</div>
					<!-- End Name Field -->
					<!-- Start Description Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Description</label>
						<div class="col-sm-10 col-md-6">
							<input 
								type="text" 
								name="description" 
								class="form-control" 
								required="required"  
								placeholder="Description of The Item" />
						</div>
					</div>
					
					<!-- End Price Field -->
					<!-- Start Price Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Price</label>
						<div class="col-sm-10 col-md-6">
							<input 
								type="number" 
								name="price" 
								class="form-control" 
								required="required" 
								placeholder="Price of The Item" />
						</div>
					</div>
					<!-- End Price Field -->
					<!-- Start Country Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Country</label>
						<div class="col-sm-10 col-md-6">
							<input 
								type="text" 
								name="country" 
								class="form-control" 
								required="required" 
								placeholder="Country of Made" />
						</div>
					</div>
					
					<!-- End Members Field -->
					<!-- Start Categories Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Category</label>
						<div class="col-sm-10 col-md-6">
							<select name="category">
								<option value="0">...</option>
								<?php
									$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "parent_id");
									foreach ($allCats as $cat) {
										echo "<option value='" . $cat['category_id'] . "'>" . $cat['name'] . "</option>";
										$childCats = getAllFrom("*", "categories", "where parent_id = {$cat['category_id']}", "", "category_id");
										foreach ($childCats as $child) {
											echo "<option value='" . $child['category_id'] . "'>--- " . $child['name'] . "</option>";
										}
									}
								?>
							</select>
						</div>
					</div>
					<!-- End Categories Field -->
					<!-- Start Tags Field -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Picture</label>
						<div class="col-sm-10 col-md-6">
							<input 
								type="file" 
								name="picture" 
								class="form-control"  />
						</div>
					</div>
					<!-- End Tags Field -->
					<!-- Start Submit Field -->
					<div class="form-group form-group-lg">
						<div class="col-sm-offset-2 col-sm-10">
							<input type="submit" value="Add Item" class="btn btn-primary btn-sm" />
						</div>
					</div>
					<!-- End Submit Field -->
				</form>
			</div>

			<?php

		} elseif ($do == 'Insert') {

			if ($_SERVER['REQUEST_METHOD'] == 'POST') {

				echo "<h1 class='text-center'>Insert Item</h1>";
				echo "<div class='container'>";

				// Upload Variables

				$avatarName = $_FILES['picture']['name'];
				$avatarSize = $_FILES['picture']['size'];
				$avatarTmp	= $_FILES['picture']['tmp_name'];
				$avatarType = $_FILES['picture']['type'];

				// List Of Allowed File Typed To Upload

				$avatarAllowedExtension = array("jpeg", "jpg", "png", "gif");

				// Get Avatar Extension
				
				$ref = explode('.', $avatarName);
				$avatarExtension = strtolower(end($ref));

				// Get Variables From The Form

				$name		= $_POST['name'];
				$desc 		= $_POST['description'];
				$price 		= $_POST['price'];
				$country 	= $_POST['country'];
				$cat 		= $_POST['category'];

				// Validate The Form

				$formErrors = array();

				if (empty($name)) {
					$formErrors[] = 'Name Can\'t be <strong>Empty</strong>';
				}

				if (empty($desc)) {
					$formErrors[] = 'Description Can\'t be <strong>Empty</strong>';
				}

				if (empty($price)) {
					$formErrors[] = 'Price Can\'t be <strong>Empty</strong>';
				}

				if (empty($country)) {
					$formErrors[] = 'Country Can\'t be <strong>Empty</strong>';
				}

				if ($cat == 0) {
					$formErrors[] = 'You Must Choose the <strong>Category</strong>';
				}

				if (! empty($avatarName) && ! in_array($avatarExtension, $avatarAllowedExtension)) {
					$formErrors[] = 'This Extension Is Not <strong>Allowed</strong>';
				}

				if (empty($avatarName)) {
					$formErrors[] = 'Item Picture Is <strong>Required</strong>';
				}

				if ($avatarSize > 4194304) {
					$formErrors[] = 'Avatar Cant Be Larger Than <strong>4MB</strong>';
				}

				// Loop Into Errors Array And Echo It

				foreach($formErrors as $error) {
					echo '<div class="alert alert-danger">' . $error . '</div>';
				}

				// Check If There's No Error Proceed The Update Operation

				if (empty($formErrors)) {

					$avatar = rand(0, 10000000000) . '_' . $avatarName;

					move_uploaded_file($avatarTmp, $upload . $avatar);

					// Insert Userinfo In Database

					$stmt = $con->prepare("INSERT INTO 

						products(name, description, price, country_of_origin, added_date, category_id, owner_id, image_url)

						VALUES(:zname, :zdesc, :zprice, :zcountry, now(), :zcat, :zmember, :zpicture)");

					$stmt->execute(array(

						'zname' 	=> $name,
						'zdesc' 	=> $desc,
						'zprice' 	=> $price,
						'zcountry' 	=> $country,
						'zcat'		=> $cat,
						'zmember'	=> $_SESSION['admin_user_id'],
						'zpicture'	=> $avatar,

					));

					// Echo Success Message

					$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Record Inserted</div>';

					$seconds = 3;

					echo $theMsg;

					echo "<div class='alert alert-info'>You Will Be Redirected After $seconds Seconds.</div>";
		
					header("refresh:$seconds;url='products.php'");
				}

			} else {

				echo "<div class='container'>";

				$theMsg = '<div class="alert alert-danger">Sorry You Cant Browse This Page Directly</div>';

				redirectHome($theMsg);

				echo "</div>";

			}

			echo "</div>";

		} elseif ($do == 'Edit') {

			// Check If Get Request item Is Numeric & Get Its Integer Value

			$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

			// Select All Data Depend On This ID

			$stmt = $con->prepare("SELECT * FROM products WHERE product_id = ?");

			// Execute Query

			$stmt->execute(array($product_id));

			// Fetch The Data

			$product = $stmt->fetch();

			// The Row Count

			$count = $stmt->rowCount();

			// If There's Such ID Show The Form

			if ($count > 0) { ?>

				<h1 class="text-center">Edit Item</h1>
				<div class="container">
					<form class="form-horizontal" action="?do=Update" method="POST">
						<input type="hidden" name="product_id" value="<?php echo $product_id ?>" />
						<!-- Start Name Field -->
						<div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Name</label>
							<div class="col-sm-10 col-md-6">
								<input 
									type="text" 
									name="name" 
									class="form-control" 
									required="required"  
									placeholder="Name of The Item"
									value="<?php echo $product['name'] ?>" />
							</div>
						</div>
						<!-- End Name Field -->
						<!-- Start Description Field -->
						<div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Description</label>
							<div class="col-sm-10 col-md-6">
								<input 
									type="text" 
									name="description" 
									class="form-control" 
									required="required"  
									placeholder="Description of The Item"
									value="<?php echo $product['description'] ?>" />
							</div>
						</div>
					
						<!-- End Contact Field -->
						<!-- Start Price Field -->
						<div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Price</label>
							<div class="col-sm-10 col-md-6">
								<input 
									type="number" 
									name="price" 
									class="form-control" 
									required="required" 
									placeholder="Price of The Item"
									value="<?php echo $product['price'] ?>" />
							</div>
						</div>
						<!-- End Price Field -->
						<!-- Start Country Field -->
						<div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Country</label>
							<div class="col-sm-10 col-md-6">
								<input 
									type="text" 
									name="country" 
									class="form-control" 
									required="required" 
									placeholder="Country of Made"
									value="<?php echo $product['country_of_origin'] ?>" />
							</div>
						</div>
						
						<!-- End Status Field -->
						<!-- Start Members Field -->
						<!-- <div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Member</label>
							<div class="col-sm-10 col-md-6">
								<select name="member">
									<?php
										$allMembers = getAllFrom("*", "users", "", "", "user_id");
										foreach ($allMembers as $user) {
											echo "<option value='" . $user['user_id'] . "'"; 
											if ($product['owner_id'] == $user['user_id']) { echo 'selected'; } 
											echo ">" . $user['username'] . "</option>";
										}
									?>
								</select>
							</div>
						</div> -->
						<!-- End Members Field -->
						<!-- Start Categories Field -->
						<div class="form-group form-group-lg">
							<label class="col-sm-2 control-label">Category</label>
							<div class="col-sm-10 col-md-6">
								<select name="category">
									<?php
										$allCats = getAllFrom("*", "categories", "where parent_id = 0", "", "category_id");
										foreach ($allCats as $cat) {
											echo "<option value='" . $cat['category_id'] . "'";
											if ($product['category_id'] == $cat['category_id']) { echo ' selected'; }
											echo ">" . $cat['name'] . "</option>";
											$childCats = getAllFrom("*", "categories", "where parent_id = {$cat['category_id']}", "", "category_id");
											foreach ($childCats as $child) {
												echo "<option value='" . $child['category_id'] . "'";
												if ($product['category_id'] == $child['category_id']) { echo ' selected'; }
												echo ">--- " . $child['name'] . "</option>";
											}
										}
									?>
								</select>
							</div>
						</div>
						<!-- End Categories Field -->
						<!-- Start Submit Field -->
						<div class="form-group form-group-lg">
							<div class="col-sm-offset-2 col-sm-10">
								<input type="submit" value="Save Item" class="btn btn-primary btn-sm" />
							</div>
						</div>
						<!-- End Submit Field -->
					</form>

					<?php

					// Select All Users Except Admin 

					$stmt = $con->prepare("SELECT 
												comments.*, users.Username AS Member  
											FROM 
												comments
											INNER JOIN 
												users 
											ON 
												users.user_id = comments.user_id
											WHERE product_id = ?");

					// Execute The Statement

					$stmt->execute(array($product_id));

					// Assign To Variable 

					$rows = $stmt->fetchAll();

					if (! empty($rows)) {
						
					?>
					<h1 class="text-center">Manage [ <?php echo $product['Name'] ?> ] Comments</h1>
					<div class="table-responsive">
						<table class="main-table text-center table table-bordered">
							<tr>
								<td>Comment</td>
								<td>User Name</td>
								<td>Added Date</td>
								<td>Control</td>
							</tr>
							<?php
								foreach($rows as $row) {
									echo "<tr>";
										echo "<td>" . $row['comment'] . "</td>";
										echo "<td>" . $row['Member'] . "</td>";
										echo "<td>" . $row['comment_date'] ."</td>";
										echo "<td>
											<a href='comments.php?do=Edit&comid=" . $row['category_id'] . "' class='btn btn-success'><i class='fa fa-edit'></i> Edit</a>
											<a href='comments.php?do=Delete&comid=" . $row['category_id'] . "' class='btn btn-danger confirm'><i class='fa fa-close'></i> Delete </a>";
											if ($row['status'] == 0) {
												echo "<a href='comments.php?do=Approve&comid="
														 . $row['category_id'] . "' 
														class='btn btn-info activate'>
														<i class='fa fa-check'></i> Approve</a>";
											}
										echo "</td>";
									echo "</tr>";
								}
							?>
							<tr>
						</table>
					</div>
					<?php } ?>
				</div>

			<?php

			// If There's No Such ID Show Error Message

			} else {

				echo "<div class='container'>";

				$theMsg = '<div class="alert alert-danger">Theres No Such ID</div>';

				redirectHome($theMsg);

				echo "</div>";

			}			

		} elseif ($do == 'Update') {

			echo "<h1 class='text-center'>Update Item</h1>";
			echo "<div class='container'>";

			if ($_SERVER['REQUEST_METHOD'] == 'POST') {

				// Get Variables From The Form

				$id 		= $_POST['product_id'];
				$name 		= $_POST['name'];
				$desc 		= $_POST['description'];
				$price 		= $_POST['price'];
				$country	= $_POST['country'];
				$cat 		= $_POST['category'];

				// Validate The Form

				$formErrors = array();

				if (empty($name)) {
					$formErrors[] = 'Name Can\'t be <strong>Empty</strong>';
				}

				if (empty($desc)) {
					$formErrors[] = 'Description Can\'t be <strong>Empty</strong>';
				}


				if (empty($price)) {
					$formErrors[] = 'Price Can\'t be <strong>Empty</strong>';
				}

				if (empty($country)) {
					$formErrors[] = 'Country Can\'t be <strong>Empty</strong>';
				}


				// if ($member == 0) {
				// 	$formErrors[] = 'You Must Choose the <strong>Member</strong>';
				// }

				if ($cat == 0) {
					$formErrors[] = 'You Must Choose the <strong>Category</strong>';
				}

				// Loop Into Errors Array And Echo It

				foreach($formErrors as $error) {
					echo '<div class="alert alert-danger">' . $error . '</div>';
				}

				// Check If There's No Error Proceed The Update Operation

				if (empty($formErrors)) {

					// Update The Database With This Info

					$stmt = $con->prepare("UPDATE 
												products 
											SET 
												name = ?, 
												description = ?, 
												price = ?, 
												country_of_origin = ?,
												category_id = ?
											WHERE 
												product_id = ?");

					$stmt->execute(array($name, $desc, $price, $country, $cat, $id));

					// Echo Success Message

					$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Record Updated</div>';

					$seconds = 3;

					echo $theMsg;

					echo "<div class='alert alert-info'>You Will Be Redirected After $seconds Seconds.</div>";
		
					header("refresh:$seconds;url='products.php'");

				}

			} else {

				$theMsg = '<div class="alert alert-danger">Sorry You Cant Browse This Page Directly</div>';

				redirectHome($theMsg);

			}

			echo "</div>";

		} elseif ($do == 'Delete') {

			echo "<h1 class='text-center'>Delete Item</h1>";
			echo "<div class='container'>";

				// Check If Get Request Item ID Is Numeric & Get The Integer Value Of It

				$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

				// Select All Data Depend On This ID

				$check = checkItem('product_id', 'products', $product_id);

				// If There's Such ID Show The Form

				if ($check > 0) {

					$stmt = $con->prepare("DELETE FROM products WHERE product_id = :zid");

					$stmt->bindParam(":zid", $product_id);

					$stmt->execute();

					$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Record Deleted</div>';

					redirectHome($theMsg, 'back');

				} else {

					$theMsg = '<div class="alert alert-danger">This ID is Not Exist</div>';

					redirectHome($theMsg);

				}

			echo '</div>';

		} 
		include $tpl . 'footer.php';

	} else {

		header('Location: index.php');

		exit();
	}

	ob_end_flush(); // Release The Output

?>