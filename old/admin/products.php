<?php

/*
    =================================================
    == Σελίδα Προϊόντων
    =================================================
*/

ob_start(); // Έναρξη Output Buffering

session_start();

$pageTitle = 'Προϊόντα';

if (isset($_SESSION['admin'])) {

	include 'init.php';

	$do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

	if ($do == 'Manage') {


		$products = getAll("SELECT 
                                products.*, 
                                categories.name AS category_name, 
                                users.username,
                                media.path AS image_url
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
                            LEFT OUTER JOIN 
                                media
                            ON
                                media.media_id = products.media_id
                            ORDER BY 
                                product_id DESC");

		if (!empty($products)) {

?>

			<h1 class="text-center">Διαχείριση Προϊόντων</h1>
			<div class="container">
				<div class="table-responsive">
					<table class="main-table manage-members text-center table table-bordered">
						<tr>
							<td>Εικόνα</td>
							<td>Όνομα Προϊόντος</td>
							<td>Τιμή</td>
							<td>Ημερομηνία Προσθήκης</td>
							<td>Κατηγορία</td>
							<td>Ιδιοκτήτης</td>
							<td>Ενέργειες</td>
						</tr>
						<?php
						foreach ($products as $product) {
							echo "<tr>";
							echo "<td>";
							if (empty($product['image_url'])) {
								echo "<img src='/uploads/empty_product.png' alt='Αποκλεισμένη Εικόνα' />";
							} else {
								echo "<img src='" . formatImage($product['image_url']) . "' alt='Εικόνα Προϊόντος' />";
							}
							echo "</td>";
							echo "<td>" . htmlspecialchars($product['name']) . "</td>";
							echo "<td>" . htmlspecialchars($product['price']) . " €</td>";
							echo "<td>" . htmlspecialchars($product['added_date']) . "</td>";
							echo "<td>" . htmlspecialchars($product['category_name']) . "</td>";
							echo "<td>" . htmlspecialchars($product['username']) . "</td>";
							echo "<td>
                                        <a href='products.php?do=Edit&product_id=" . $product['product_id'] . "' class='btn btn-success' style='width:130px'><i class='fa fa-edit'></i> Επεξεργασία</a>
                                        <a href='products.php?do=Delete&product_id=" . $product['product_id'] . "' class='btn btn-danger confirm'  style='width:130px; margin-top:5px '><i class='fa fa-close'></i> Διαγραφή</a>
                                    </td>";
							echo "</tr>";
						}
						?>
						<tr>
					</table>
				</div>
				<a href="products.php?do=Add" class="btn btn-sm btn-primary">
					<i class="fa fa-plus"></i> Νέο Προϊόν
				</a>
			</div>

		<?php } else {

			echo '<div class="container">';
			echo '<div class="nice-message">Δεν υπάρχουν προϊόντα προς εμφάνιση.</div>';
			echo '<a href="products.php?do=Add" class="btn btn-sm btn-primary">
                            <i class="fa fa-plus"></i> Νέο Προϊόν
                        </a>';
			echo '</div>';
		} ?>

	<?php

	} elseif ($do == 'Add') { ?>

		<h1 class="text-center">Προσθήκη Νέου Προϊόντος</h1>
		<div class="container">
			<form class="form-horizontal" action="?do=Insert" method="POST" enctype="multipart/form-data">
				<!-- Έναρξη Πεδίου Ονόματος -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Όνομα</label>
					<div class="col-sm-10 col-md-6">
						<input
							type="text"
							name="name"
							class="form-control"
							required="required"
							placeholder="Όνομα του Προϊόντος" />
					</div>
				</div>
				<!-- Τέλος Πεδίου Ονόματος -->
				<!-- Έναρξη Πεδίου Περιγραφής -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Περιγραφή</label>
					<div class="col-sm-10 col-md-6">
						<input
							type="text"
							name="description"
							class="form-control"
							required="required"
							placeholder="Περιγραφή του Προϊόντος" />
					</div>
				</div>

				<!-- Τέλος Πεδίου Τιμής -->
				<!-- Έναρξη Πεδίου Τιμής -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Τιμή</label>
					<div class="col-sm-10 col-md-6">
						<input
							type="number"
							name="price"
							class="form-control"
							required="required"
							placeholder="Τιμή του Προϊόντος" />
					</div>
				</div>
				<!-- Τέλος Πεδίου Τιμής -->
				<!-- Έναρξη Πεδίου Χώρας -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Χώρα Κατασκευής</label>
					<div class="col-sm-10 col-md-6">
						<input
							type="text"
							name="country"
							class="form-control"
							required="required"
							placeholder="Χώρα Κατασκευής" />
					</div>
				</div>

				<!-- Τέλος Πεδίου Κατηγορίας -->
				<!-- Έναρξη Πεδίου Κατηγορίας -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Κατηγορία</label>
					<div class="col-sm-10 col-md-6">
						<select name="category">
							<option value="0">Επιλέξτε Κατηγορία</option>
							<?php
							$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC");
							foreach ($allCats as $cat) {
								echo "<option value='" . htmlspecialchars($cat['category_id']) . "'>" . htmlspecialchars($cat['name']) . "</option>";
							}
							?>
						</select>
					</div>
				</div>
				<!-- Τέλος Πεδίου Κατηγορίας -->
				<!-- Έναρξη Πεδίου Εικόνας -->
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">Εικόνα</label>
					<div class="col-sm-10 col-md-6">
						<input class="form-control" type="file" name="pictures" />
					</div>
				</div>
				<!-- Τέλος Πεδίου Εικόνας -->
				<!-- Έναρξη Πεδίου Υποβολής -->
				<div class="form-group form-group-lg">
					<div class="col-sm-offset-2 col-sm-10">
						<input type="submit" value="Προσθήκη Προϊόντος" class="btn btn-primary btn-sm" />
					</div>
				</div>
				<!-- Τέλος Πεδίου Υποβολής -->
			</form>
		</div>

		<?php

	} elseif ($do == 'Insert') {

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {

			echo "<h1 class='text-center'>Εισαγωγή Προϊόντος</h1>";
			echo "<div class='container'>";

			$avatarFile = $_FILES['pictures'];


			// Λήψη Μεταβλητών Από τη Φόρμα

			$name    = $_POST['name'];
			$description    = $_POST['description'];
			$price   = $_POST['price'];
			$country = $_POST['country'];
			$category     = $_POST['category'];
			$avatarFile = $_FILES['pictures'];

			// Επαλήθευση της Φόρμας

			$formErrors = array();

			if (empty($name)) {
				$formErrors[] = 'Το Όνομα δεν μπορεί να είναι <strong>Άδειο</strong>.';
			}

			if (empty($description)) {
				$formErrors[] = 'Η Περιγραφή δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if (empty($price)) {
				$formErrors[] = 'Η Τιμή δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if (empty($country)) {
				$formErrors[] = 'Η Χώρα Κατασκευής δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if ($category == 0) {
				$formErrors[] = 'Πρέπει να επιλέξετε μια <strong>Κατηγορία</strong>.';
			}

			// Επανάληψη στον Πίνακα Σφαλμάτων και Εμφάνιση τους

			foreach ($formErrors as $error) {
				echo '<div class="alert alert-danger">' . $error . '</div>';
			}

			// Έλεγχος Αν Δεν Υπάρχουν Σφάλματα, Προχωρήστε στην Εισαγωγή

			if (empty($formErrors)) {



				if (empty($avatarFile['name'])) {
					$mediaId = null;
				} else {
					$mediaId = uploadImage($avatarFile, $con, $s3Client, $bucket);
				}

				// Εισαγωγή Πληροφοριών Προϊόντος στη Βάση Δεδομένων

				$stmt = $con->prepare("INSERT INTO 

                        products(name, description, price, country_of_origin, added_date, category_id, owner_id, media_id)

                        VALUES(:name, :description, :price, :country, now(), :category, :owner, :media_id)");

				$stmt->execute(array(

					'name'    => $name,
					'description'    => $description,
					'price'   => $price,
					'country' => $country,
					'category'     => $category,
					'owner' => $_SESSION['admin_user_id'],
					'media_id' => $mediaId,

				));

				// Εμφάνιση Μηνύματος Επιτυχίας

				$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Προϊόν Εισήχθη με Επιτυχία.</div>';

				$seconds = 3;

				echo $theMsg;

				echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε μετά από $seconds δευτερόλεπτα.</div>";

				header("refresh:$seconds;url='products.php'");
			}
		} else {

			echo "<div class='container'>";

			$theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

			redirectHome($theMsg);

			echo "</div>";
		}

		echo "</div>";
	} elseif ($do == 'Edit') {

		// Έλεγχος Αν Η Παράμετρος product_id Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

		$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

		// Επιλογή Όλων των Δεδομένων Βάσει Του ID

		$stmt = $con->prepare("SELECT * FROM products WHERE product_id = ?");

		// Εκτέλεση Ερωτήματος

		$stmt->execute(array($product_id));

		// Ανάκτηση των Δεδομένων

		$product = $stmt->fetch();

		// Αριθμός Γραμμών

		$count = $stmt->rowCount();

		// Αν Υπάρχει Τέτοιο ID, Εμφάνιση της Φόρμας

		if ($count > 0) { ?>

			<h1 class="text-center">Επεξεργασία Προϊόντος</h1>
			<div class="container">
				<form class="form-horizontal" action="?do=Update" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product_id) ?>" />
					<!-- Έναρξη Πεδίου Ονόματος -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Όνομα</label>
						<div class="col-sm-10 col-md-6">
							<input
								type="text"
								name="name"
								class="form-control"
								required="required"
								placeholder="Όνομα του Προϊόντος"
								value="<?php echo htmlspecialchars($product['name']) ?>" />
						</div>
					</div>
					<!-- Τέλος Πεδίου Ονόματος -->
					<!-- Έναρξη Πεδίου Περιγραφής -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Περιγραφή</label>
						<div class="col-sm-10 col-md-6">
							<input
								type="text"
								name="description"
								class="form-control"
								required="required"
								placeholder="Περιγραφή του Προϊόντος"
								value="<?php echo htmlspecialchars($product['description']) ?>" />
						</div>
					</div>

					<!-- Τέλος Πεδίου Τιμής -->
					<!-- Έναρξη Πεδίου Τιμής -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Τιμή</label>
						<div class="col-sm-10 col-md-6">
							<input
								type="number"
								name="price"
								class="form-control"
								required="required"
								placeholder="Τιμή του Προϊόντος"
								value="<?php echo htmlspecialchars($product['price']) ?>" />
						</div>
					</div>
					<!-- Τέλος Πεδίου Τιμής -->
					<!-- Έναρξη Πεδίου Χώρας -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Χώρα Κατασκευής</label>
						<div class="col-sm-10 col-md-6">
							<input
								type="text"
								name="country"
								class="form-control"
								required="required"
								placeholder="Χώρα Κατασκευής"
								value="<?php echo htmlspecialchars($product['country_of_origin']) ?>" />
						</div>
					</div>

					<!-- Τέλος Πεδίου Κατηγορίας -->
					<!-- Έναρξη Πεδίου Κατηγορίας -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Κατηγορία</label>
						<div class="col-sm-10 col-md-6">
							<select name="category">
								<?php
								$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0", []);
								foreach ($allCats as $cat) {
									echo "<option value='" . htmlspecialchars($cat['category_id']) . "'";
									if ($product['category_id'] == $cat['category_id']) {
										echo ' selected';
									}
									echo ">" . htmlspecialchars($cat['name']) . "</option>";
									$childCats = getAll("SELECT * FROM categories WHERE parent_id = ?", [$cat['category_id']]);
									foreach ($childCats as $child) {
										echo "<option value='" . htmlspecialchars($child['category_id']) . "'";
										if ($product['category_id'] == $child['category_id']) {
											echo ' selected';
										}
										echo ">--- " . htmlspecialchars($child['name']) . "</option>";
									}
								}
								?>
							</select>
						</div>
					</div>
					<!-- Τέλος Πεδίου Κατηγορίας -->
					<!-- Έναρξη Πεδίου Εικόνας -->
					<div class="form-group form-group-lg">
						<label class="col-sm-2 control-label">Εικόνα</label>
						<div class="col-sm-10 col-md-6">
							<input class="form-control" type="file" name="pictures" />
						</div>
					</div>
					<!-- Τέλος Πεδίου Εικόνας -->

					<!-- Έναρξη Πεδίου Υποβολής -->
					<div class="form-group form-group-lg">
						<div class="col-sm-offset-2 col-sm-10">
							<input type="submit" value="Αποθήκευση Προϊόντος" class="btn btn-primary btn-sm" />
						</div>
					</div>
					<!-- Τέλος Πεδίου Υποβολής -->
				</form>

				<?php

				// Επιλογή Όλων των Σχολίων για το Προϊόν

				$stmt = $con->prepare("SELECT 
                                            comments.*, users.Username AS Member  
                                        FROM 
                                            comments
                                        INNER JOIN 
                                            users 
                                        ON 
                                            users.user_id = comments.user_id
                                        WHERE product_id = ?");

				// Εκτέλεση του Statement

				$stmt->execute(array($product_id));

				// Ανάθεση σε Μεταβλητή 

				$rows = $stmt->fetchAll();

				if (!empty($rows)) {

				?>
					<h1 class="text-center">Διαχείριση Σχολίων για [ <?php echo htmlspecialchars($product['name']) ?> ]</h1>
					<div class="table-responsive">
						<table class="main-table text-center table table-bordered">
							<tr>
								<td>Σχόλιο</td>
								<td>Όνομα Χρήστη</td>
								<td>Ημερομηνία Προσθήκης</td>
								<td>Ενέργειες</td>
							</tr>
							<?php
							foreach ($rows as $row) {
								echo "<tr>";
								echo "<td>" . htmlspecialchars($row['comment']) . "</td>";
								echo "<td>" . htmlspecialchars($row['Member']) . "</td>";
								echo "<td>" . htmlspecialchars($row['comment_date']) . "</td>";
								echo "<td>
                                            <a href='comments.php?do=Edit&comid=" . $row['comment_id'] . "' class='btn btn-success'><i class='fa fa-edit'></i> Επεξεργασία</a>
                                            <a href='comments.php?do=Delete&comid=" . $row['comment_id'] . "' class='btn btn-danger confirm'><i class='fa fa-close'></i> Διαγραφή </a>";
								if ($row['status'] == 0) {
									echo "<a href='comments.php?do=Approve&comid="
										. $row['comment_id'] . "' 
                                                        class='btn btn-info activate'>
                                                        <i class='fa fa-check'></i> Έγκριση</a>";
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

			// Αν Δεν Υπάρχει Τέτοιο ID, Εμφάνιση Μηνύματος Σφάλματος

		} else {

			echo "<div class='container'>";

			$theMsg = '<div class="alert alert-danger">Δεν υπάρχει τέτοιο ID.</div>';

			redirectHome($theMsg);

			echo "</div>";
		}
	} elseif ($do == 'Update') {

		echo "<h1 class='text-center'>Ενημέρωση Προϊόντος</h1>";
		echo "<div class='container'>";

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {

			// Λήψη Μεταβλητών Από τη Φόρμα

			$id       = $_POST['product_id'];
			$name     = $_POST['name'];
			$description     = $_POST['description'];
			$price    = $_POST['price'];
			$country  = $_POST['country'];
			$category      = $_POST['category'];


			// Επαλήθευση της Φόρμας

			$formErrors = array();

			if (empty($name)) {
				$formErrors[] = 'Το Όνομα δεν μπορεί να είναι <strong>Άδειο</strong>.';
			}

			if (empty($description)) {
				$formErrors[] = 'Η Περιγραφή δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if (empty($price)) {
				$formErrors[] = 'Η Τιμή δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if (empty($country)) {
				$formErrors[] = 'Η Χώρα Κατασκευής δεν μπορεί να είναι <strong>Άδεια</strong>.';
			}

			if ($category == 0 || !is_numeric($category)) {
				$formErrors[] = 'Πρέπει να επιλέξετε μια <strong>Κατηγορία</strong>.';
			}

			// Επανάληψη στον Πίνακα Σφαλμάτων και Εμφάνιση τους

			foreach ($formErrors as $error) {
				echo '<div class="alert alert-danger">' . $error . '</div>';
			}

			// Έλεγχος Αν Δεν Υπάρχουν Σφάλματα, Προχωρήστε στην Ενημέρωση

			if (empty($formErrors)) {

				$avatarFile = $_FILES['pictures'];

				if (empty($avatarFile['name'])) {
					$mediaId = null;
				} else {
					$mediaId = uploadImage($avatarFile, $con, $s3Client, $bucket);
				}

				// Ενημέρωση της Βάσης Δεδομένων με αυτές τις πληροφορίες

				if($mediaId == null) {
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

					$stmt->execute(array($name, $description, $price, $country, $category, $id));
				} else {
					$stmt = $con->prepare("UPDATE 
				                            products 
				                        SET 
				                            name = ?, 
				                            description = ?, 
				                            price = ?, 
				                            country_of_origin = ?,
				                            category_id = ?,
											media_id = ?
				                        WHERE 
				                            product_id = ?");

					$stmt->execute(array($name, $description, $price, $country, $category, $mediaId, $id));
				}
				


				// Εμφάνιση Μηνύματος Επιτυχίας

				$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Προϊόν Ενημερώθηκε με Επιτυχία.</div>';

				$seconds = 3;

				echo $theMsg;

				echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε μετά από $seconds δευτερόλεπτα.</div>";

				header("refresh:$seconds;url='products.php'");
			}
		} else {

			$theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

			redirectHome($theMsg, 'back');
		}

		echo "</div>";
	} elseif ($do == 'Delete') {

		echo "<h1 class='text-center'>Διαγραφή Προϊόντος</h1>";
		echo "<div class='container'>";

		// Έλεγχος Αν Η Παράμετρος product_id Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

		$product_id = isset($_GET['product_id']) && is_numeric($_GET['product_id']) ? intval($_GET['product_id']) : 0;

		// Έλεγχος Αν Υπάρχει Τέτοιο ID

		$check = checkItem('product_id', 'products', $product_id);

		// Αν Υπάρχει Τέτοιο ID, Διαγραφή του Προϊόντος

		if ($check > 0) {

			$stmt = $con->prepare("DELETE FROM products WHERE product_id = :zid");

			$stmt->bindParam(":zid", $product_id);

			$stmt->execute();

			$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Προϊόν Διαγράφηκε με Επιτυχία.</div>';

			redirectHome($theMsg, 'back');
		} else {

			$theMsg = '<div class="alert alert-danger">Αυτό το ID δεν υπάρχει.</div>';

			redirectHome($theMsg);
		}

		echo '</div>';
	}
	include $tpl . 'footer.php';
} else {

	header('Location: index.php');

	exit();
}

ob_end_flush(); // Απελευθέρωση της Εξόδου

?>