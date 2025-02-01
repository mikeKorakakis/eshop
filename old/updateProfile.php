<?php
ob_start(); // Έναρξη output buffering

session_start();
include 'init.php';

echo "<h1 class='text-center'>Ενημέρωση Προφίλ</h1>";
echo "<div class='container'>";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	// Λήψη Μεταβλητών Από τη Φόρμα

	$id      = intval($_POST['userid']);
	$username    = trim($_POST['username']);
	$email   = trim($_POST['email']);
	$fullname    = trim($_POST['fullname']);
	$avatarFile = $_FILES['pictures'];


	// Τεχνική για τον Κωδικό με χρήση bcrypt και cost 12

	// Αν ο χρήστης δεν εισάγει νέο κωδικό, χρησιμοποιούμε τον υπάρχοντα κωδικό από τη βάση δεδομένων
	// Διαφορετικά, δημιουργούμε ένα νέο hash κωδικού με bcrypt και cost 12
	if (empty($_POST['newpassword'])) {
		// Προέρχεται από τη φόρμα ως κρυφό πεδίο
		$pass = $_POST['oldpassword'];
	} else {
		// Δημιουργία hash με bcrypt και cost 12
		$pass = password_hash($_POST['newpassword'], PASSWORD_BCRYPT, ['cost' => 12]);
	}

	// Επαλήθευση της Φόρμας

	$formErrors = array();

	if (strlen($username) < 4) {
		$formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι μικρότερο από <strong>4 χαρακτήρες</strong>.';
	}

	if (strlen($username) > 20) {
		$formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι μεγαλύτερο από <strong>20 χαρακτήρες</strong>.';
	}

	if (empty($username)) {
		$formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι <strong>κενό</strong>.';
	}

	if (empty($fullname)) {
		$formErrors[] = 'Το Πλήρες Όνομα δεν μπορεί να είναι <strong>κενό</strong>.';
	}

	if (empty($email)) {
		$formErrors[] = 'Το Email δεν μπορεί να είναι <strong>κενό</strong>.';
	}

	// Βρόχος μέσα στον Πίνακα Σφαλμάτων και Εμφάνιση τους

	foreach ($formErrors as $error) {
		echo '<div class="alert alert-danger">' . htmlspecialchars($error) . '</div>';
	}

	// Έλεγχος Αν Δεν Υπάρχουν Σφάλματα, Συνεχίστε με την Ενημέρωση της Βάσης Δεδομένων

	if (empty($formErrors)) {

		// Έλεγχος αν το νέο όνομα χρήστη υπάρχει ήδη για άλλον χρήστη
		$stmt2 = $con->prepare("SELECT 
                                    *
                                FROM 
                                    users
                                WHERE
                                    username = ?
                                AND 
                                    user_id != ?");

		$stmt2->execute(array($username, $id));

		$count = $stmt2->rowCount();

		if ($count == 1) {

			$theMsg = '<div class="alert alert-danger">Συγγνώμη, αυτός ο χρήστης υπάρχει ήδη.</div>';

			redirectHome($theMsg, 'back');
		} else {

			// Ενημέρωση της Βάσης Δεδομένων με Αυτές τις Πληροφορίες
			$mediaId = null;
			if (!empty($_FILES['pictures']['name'])) {
				$mediaId = uploadImage($avatarFile, $con, $s3Client, $bucket);
				$stmt = $con->prepare("UPDATE users SET username = ?, email = ?, full_name = ?, password = ?, media_id = ? WHERE user_id = ?");
				$stmt->execute(array($username, $email, $fullname, $pass, $mediaId, $id));
				$stmt = $con->prepare("
				SELECT 
					media.path as avatar_url
				FROM 
					users 
				LEFT JOIN
					media
				ON
					media.media_id = users.media_id
				WHERE 
					username = ?
			");
				$stmt->execute(array($username));
				$get = $stmt->fetch();
				$count = $stmt->rowCount();
				if ($get["avatar_url"]) {
					$_SESSION['avatar'] = $get['avatar_url'];
				}
			} else {
				$stmt = $con->prepare("UPDATE users SET username = ?, email = ?, full_name = ?, password = ? WHERE user_id = ?");
				$stmt->execute(array($username, $email, $fullname, $pass, $id));
			}



			// Εμφάνιση Μηνύματος Επιτυχίας

			$theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Εγγραφή Ενημερώθηκε</div>';

			echo $theMsg;

			$seconds = 2;

			echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε στο προφίλ σας μετά από $seconds δευτερόλεπτα.</div>";

			header("refresh:$seconds;url='profile.php'");
		}
	}
} else {

	$theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

	redirectHome($theMsg);
}

echo "</div>";
?>
<?php include $tpl . 'footer.php'; ?>
