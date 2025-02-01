<?php
ob_start(); // Έναρξη output buffering

session_start();
$pageTitle = 'Σύνδεση'; // Τίτλος Σελίδας
if (isset($_SESSION['user'])) {
    header('Location: index.php'); // Ανακατεύθυνση στην αρχική σελίδα αν ο χρήστης είναι ήδη συνδεδεμένος
}
include 'init.php';
require 'vendor/autoload.php';

use Aws\Exception\AwsException;

// ΕΛΕΓΧΟΣ ΑΝ ΕΧΕΙ ΠΑΤΗΘΕΙ ΤΟ ΚΟΥΜΠΙ ΣΥΝΔΕΣΗΣ

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST['login'])) {

        $user = $_POST['username'];
        $pass = $_POST['password'];

        // ΕΛΕΓΧΟΣ ΑΝ ΥΠΑΡΧΕΙ Ο ΧΡΗΣΤΗΣ ΣΤΗ ΒΑΣΗ ΔΕΔΟΜΕΝΩΝ
        $stmt = $con->prepare("
            SELECT 
                user_id, username, password, media.path as avatar_url, group_id
            FROM 
                users 
            LEFT JOIN
                media
            ON
                media.media_id = users.media_id
            WHERE 
                username = ?
        ");
        $stmt->execute(array($user));
        $get = $stmt->fetch();
        $count = $stmt->rowCount();

        if ($count > 0 && password_verify($pass, $get['password'])) {
            $_SESSION['group_id'] = $get['group_id'];

            if ($get["group_id"] == 0) {

                $_SESSION['user'] = $user; // Αποθήκευση ονόματος χρήστη στο session

                $_SESSION['user_id'] = $get['user_id']; // Αποθήκευση ID χρήστη στο session
                $_SESSION['avatar'] = $get['avatar_url'];

                header('Location: index.php'); // Ανακατεύθυνση στην αρχική σελίδα
            } else if ($get["group_id"] == 1) {

                $_SESSION['admin'] = $user; // Αποθήκευση ονόματος διαχειριστή στο session

                $_SESSION['admin_user_id'] = $get['user_id']; // Αποθήκευση ID διαχειριστή στο session

                header('Location: /admin/dashboard.php'); // Ανακατεύθυνση στον πίνακα διαχειριστή
            }

            exit();
        } else {

            $formErrors = array();

            $formErrors[] = 'Το όνομα χρήστη ή ο κωδικός είναι λάθος';
        }
    } else {

        $formErrors = array();

        $username = $_POST['username'];
        $password = $_POST['password'];
        $password2 = $_POST['password2'];
        $email = $_POST['email'];
        $fullname = $_POST['fullname'];

        // Μεταβλητές για την εισαγωγή της εικόνας του χρήστη

        // $avatarName = $_FILES['pictures']['name'];
        // $avatarSize = $_FILES['pictures']['size'];
        // $avatarTmp = $_FILES['pictures']['tmp_name'];
        // $avatarType = $_FILES['pictures']['type'];
        
        // Μεταβλητη για την εισαγωγή της εικόνας του χρήστη
        $avatarFile = $_FILES['pictures'];


        // Λίστα με τις επιτρεπτές επεκτάσεις για την εικόνα

        // $avatarAllowedExtension = array("jpeg", "jpg", "png", "gif");


        // $ref = explode('.', $avatarName);
        // $avatarExtension = strtolower(end($ref));

        // Λίστα με τα λάθη που μπορεί να εμφανιστούν κατά την εγγραφή του χρήστη

        if (isset($username)) {

            $filterdUser = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);

            if (strlen($filterdUser) < 4) {

                $formErrors[] = 'Το όνομα χρήστη πρέπει να έχει τουλάχιστον 4 χαρακτήρες';
            }
        }

        if (isset($password) && isset($password2)) {

            if (empty($password)) {

                $formErrors[] = 'Συγνώμη, ο κωδικός δεν μπορεί να είναι κενός';
            }

            if ($password !== $password2) {
                $formErrors[] = 'Οι κωδικοί δεν ταιριάζουν';
            }
        }

        if (isset($email)) {

            $filterdEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

            if (filter_var($filterdEmail, FILTER_VALIDATE_EMAIL) != true) {

                $formErrors[] = 'Το email δεν είναι έγκυρο';
            }
        }

        // Έλεγχος αν δεν υπάρχουν σφάλματα για να προχωρήσει η προσθήκη του χρήστη

        if (empty($formErrors)) {
            $avatarUrl = '';


            // Λήψη του URL του αντικειμένου
            try {
                // Ανέβασμα του αρχείου στο MinIO


                $check = checkItem("username", "users", $username);

                if ($check == 1) {
                    $formErrors[] = 'Συγνώμη, αυτό το όνομα χρήστη υπάρχει ήδη';
                } else {

					if (empty($avatarFile['name'])) {
                    $mediaId = uploadImage($avatarFile, $con, $s3Client, $bucket);
					} else {
						$mediaId = null;
					}

                    $stmtUser  = $con->prepare("INSERT INTO 
                                                users(username, password, email, full_name, group_id, registration_date, media_id)
                                            VALUES(:username, :password, :email, :full_name, 0, now(), :media_id)");

                    if ($stmtUser->execute(array(
                        'username' => $username,
                        'password' => password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]), // Ορισμός cost σε 12
                        'email' => $email,
                        'full_name' => $fullname,
                        'media_id' => $mediaId // Αποθήκευση του URL της εικόνας
                    ))) {
                        // Εμφάνιση μηνύματος επιτυχίας
                        $succesMsg = 'Συγχαρητήρια! Είσαι πλέον εγγεγραμμένος χρήστης';
                    } else {
                        // Προσθήκη μηνύματος λάθους αν η εισαγωγή απέτυχε
                        $errorInfo = $stmtUser->errorInfo();
                        $formErrors[] = 'Σφάλμα κατά την εγγραφή του χρήστη: ' . htmlspecialchars($errorInfo[2]);
                    }
                }
            } catch (AwsException $e) {
                // Χειρισμός σφαλμάτων κατά το ανέβασμα
                $formErrors[] = 'Σφάλμα κατά το ανέβασμα της εικόνας: ' . htmlspecialchars($e->getMessage());
            }

            // Έλεγχος αν ο χρήστης υπάρχει ήδη στη βάση δεδομένων

        }
    }
}
?>

<div class="container login-page">
    <h1 class="text-center">
        <span class="selected" data-class="login">Σύνδεση</span> |
        <span data-class="signup">Εγγραφή</span>
    </h1>
    <!-- Έναρξη Φόρμας Σύνδεσης -->
    <form class="login" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
        <div class="input-container">
            <input class="form-control" type="text" name="username" autocomplete="off" placeholder="Όνομα Χρήστη"
                required />
        </div>
        <div class="input-container">
            <input class="form-control" type="password" name="password" autocomplete="new-password"
                placeholder="Κωδικός" required />
        </div>
        <div><input class="button w-100" name="login" type="submit" value="Σύνδεση" /></div>
    </form>
    <!-- Τέλος Φόρμας Σύνδεσης -->
    <!-- Έναρξη Φόρμας Εγγραφής -->
    <form class="signup" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" enctype="multipart/form-data">
        <div class="input-container">
            <input pattern=".{4,}" title="Το όνομα χρήστη πρέπει να έχει τουλάχιστον 4 χαρακτήρες" class="form-control" type="text"
                name="username" autocomplete="off" placeholder="Όνομα Χρήστη" required />
        </div>
        <div class="input-container">
            <input minlength="4" class="form-control" type="password" name="password" autocomplete="new-password"
                placeholder="Κωδικός" required />
        </div>
        <div class="input-container">
            <input minlength="4" class="form-control" type="password" name="password2" autocomplete="new-password"
                placeholder="Επιβεβαίωση Κωδικού" required />
        </div>
        <div class="input-container">
            <input class="form-control" type="email" name="email" placeholder="Email" required />
        </div>
        <div class="input-container">
            <input class="form-control" type="text" name="fullname" placeholder="Πλήρες Όνομα" required />
        </div>
        <div class="input-container">
            <input class="form-control" type="file" name="pictures" />
        </div>
        <input class="button w-100" name="signup" type="submit" value="Εγγραφή" />
    </form>
    <!-- Τέλος Φόρμας Εγγραφής -->
    <div class="the-errors text-center">
        <?php

        if (!empty($formErrors)) {

            foreach ($formErrors as $error) {

                echo '<div class="msg error">' . htmlspecialchars($error) . '</div>';
            }
        }

        if (isset($succesMsg)) {

            echo '<div class="msg success">' . htmlspecialchars($succesMsg) . '</div>';
        }

        ?>
    </div>
</div>

<?php
include $tpl . 'footer.php';
ob_end_flush();
?>
