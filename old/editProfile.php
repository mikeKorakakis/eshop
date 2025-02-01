<?php

session_start();
include 'init.php';

// Λήψη του ID του χρήστη από το Session
$do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

$userid = getSingleValue($con, "SELECT user_id FROM users WHERE username=?", [$_SESSION['user']]);

// Επιλογή όλων των δεδομένων βάσει αυτού του ID
$stmt = $con->prepare("SELECT * FROM users WHERE user_id = ? LIMIT 1");

// Εκτέλεση του ερωτήματος
$stmt->execute(array($userid));

// Ανάκτηση των δεδομένων
$row = $stmt->fetch();

// Ο αριθμός των εγγραφών
$count = $stmt->rowCount();

// Αν υπάρχει τέτοιο ID, εμφάνισε τη φόρμα
if ($count > 0) { ?>

	<h1 class="text-center">Επεξεργασία των Στοιχείων μου</h1>
	<div class="container">
		<form class="form-horizontal" action="updateProfile.php" method="POST" enctype="multipart/form-data">
			<input type="hidden" name="userid" value="<?php echo htmlspecialchars($userid); ?>" />
			<!-- Έναρξη Πεδίου Username -->
			<div class="form-group form-group-lg">
				<label class="col-sm-2 control-label">Όνομα Χρήστη</label>
				<div class="col-sm-10 col-md-6">
					<input type="text" name="username" class="form-control" value="<?php echo htmlspecialchars($row['username']); ?>" autocomplete="off" required />
				</div>
			</div>
			<!-- Τέλος Πεδίου Username -->
			<!-- Έναρξη Πεδίου Password -->
			<div class="form-group form-group-lg">
				<label class="col-sm-2 control-label">Κωδικός</label>
				<div class="col-sm-10 col-md-6">
					<input type="hidden" name="oldpassword" value="<?php echo htmlspecialchars($row['password']); ?>" />
					<input type="password" name="newpassword" class="form-control" autocomplete="new-password" placeholder="Αφήστε κενό αν δεν θέλετε να αλλάξετε" />
				</div>
			</div>
			<!-- Τέλος Πεδίου Password -->
			<!-- Έναρξη Πεδίου Email -->
			<div class="form-group form-group-lg">
				<label class="col-sm-2 control-label">Email</label>
				<div class="col-sm-10 col-md-6">
					<input type="email" name="email" value="<?php echo htmlspecialchars($row['email']); ?>" class="form-control" required />
				</div>
			</div>
			<!-- Τέλος Πεδίου Email -->
			<!-- Έναρξη Πεδίου Ονόματος -->
			<div class="form-group form-group-lg">
				<label class="col-sm-2 control-label">Πλήρες Όνομα</label>
				<div class="col-sm-10 col-md-6">
					<input type="text" name="fullname" value="<?php echo htmlspecialchars($row['full_name']); ?>" class="form-control" required />
				</div>
			</div>
			<!-- Τέλος Πεδίου Ονόματος -->
			<!-- Έναρξη Πεδίου Εικόνας -->
			<div class="form-group form-group-lg">
				<label class="col-sm-2 control-label">Εικόνα</label>
				<div class="col-sm-10 col-md-6">
					<input class="form-control" type="file" name="pictures" />
				</div>
			</div>
			<!-- Έναρξη Πεδίου Υποβολής -->
			<div class="form-group form-group-lg">
				<div class="col-sm-offset-2 col-sm-10">
					<input type="submit" value="Αποθήκευση" class="btn btn-primary btn-lg" />
				</div>
			</div>
			<!-- Τέλος Πεδίου Υποβολής -->
		</form>
	</div>

<?php
} else {
	// Αν δεν βρεθεί ο χρήστης, εμφάνιση μηνύματος λάθους
	echo '<div class="container">';
	echo '<div class="alert alert-danger">Δεν βρέθηκε ο χρήστης.</div>';
	echo '</div>';
}

include $tpl . 'footer.php';
?>