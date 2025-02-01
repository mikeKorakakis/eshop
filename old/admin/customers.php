<?php

    $cssFile = "dashboard.css";

    /*
    ================================================
    == Σελίδα Διαχείρισης Μελών
    == Μπορείς να Προσθέσεις | Επεξεργαστείς | Διαγράψεις Μέλη Από Εδώ
    ================================================
    */

    ob_start(); // Έναρξη Output Buffering

    session_start();

    $pageTitle = 'Μέλη';

    if (isset($_SESSION['admin'])) {

        include 'init.php';

        $do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

        // Έναρξη Σελίδας Διαχείρισης

        if ($do == 'Manage') { // Διαχείριση Μελών

            $query = '';

            if (isset($_GET['page']) && $_GET['page'] == 'Pending') {

                $query = 'AND RegStatus = 0';

            }

			// Επιλογή Όλων των Μελών εκτός του Admin

            $users = getAll("SELECT * FROM users 
			WHERE group_id != 1 $query ORDER BY user_id DESC", []);

            if (!empty($users)) {

            ?>

            <h1 class="text-center">Διαχείριση Πελατών</h1>
            <div class="container">
                <div class="table-responsive">
                    <table class="main-table manage-members text-center table table-bordered">
                        <tr>
                            <td>Avatar</td>
                            <td>Όνομα Χρήστη</td>
                            <td>Email</td>
                            <td>Πλήρες Όνομα</td>
                            <td>Ημερομηνία Εγγραφής</td>
                            <td>Ενέργειες</td>
                        </tr>
                        <?php
                            foreach($users as $user) {
                                echo "<tr>";
                                    echo "<td>";
                                    if (empty($user['avatar_url'])) {
                                        echo "<img src='". htmlspecialchars($upload_main) ."/default.png' alt='Αποκλεισμένη Εικόνα' />";
                                    } else {
                                        echo "<img src='". htmlspecialchars(formatImage($user['avatar_url'])) . "' alt='Εικόνα Χρήστη' />";
                                    }
                                    echo "</td>";

                                    echo "<td>" . htmlspecialchars($user['username']) . "</td>";
                                    echo "<td>" . htmlspecialchars($user['email']) . "</td>";
                                    echo "<td>" . htmlspecialchars($user['full_name']) . "</td>";
									echo "<td>" . htmlspecialchars($user['registration_date']) . "</td>";
                                    echo "<td>
                                        <a href='customers.php?do=Edit&userid=" . htmlspecialchars($user['user_id']) . "' class='btn btn-success' style='width:120px'><i class='fa fa-edit' ></i> Επεξεργασία</a>
                                        <a href='customers.php?do=Delete&userid=" . htmlspecialchars($user['user_id']) . "' class='btn btn-danger confirm' style='width:120px; margin-top:5px'><i class='fa fa-close' ></i> Διαγραφή </a>";
                                        
                                    echo "</td>";
                                echo "</tr>";
                            }
                        ?>
                        <tr>
                    </table>
                </div>
                <a href="customers.php?do=Add" class="btn btn-primary">
                    <i class="fa fa-plus"></i> Νέο Μέλος
                </a>
            </div>

            <?php } else {

                echo '<div class="container">';
                    echo '<div class="alert alert-info">Δεν υπάρχουν μέλη προς εμφάνιση.</div>';
                    echo '<a href="customers.php?do=Add" class="btn btn-primary">
                            <i class="fa fa-plus"></i> Νέο Μέλος
                        </a>';
                echo '</div>';

            } ?>

        <?php 

        } elseif ($do == 'Add') { // Σελίδα Προσθήκης ?>

            <h1 class="text-center">Προσθήκη Νέου Μέλους</h1>
            <div class="container">
                <form class="form-horizontal" action="?do=Insert" method="POST" enctype="multipart/form-data">
                    <!-- Έναρξη Πεδίου Ονόματος Χρήστη -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Όνομα Χρήστη</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="text" name="username" class="form-control" autocomplete="off" required="required" placeholder="Όνομα Χρήστη για Σύνδεση στο Κατάστημα" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Ονόματος Χρήστη -->
                    <!-- Έναρξη Πεδίου Κωδικού -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Κωδικός</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="password" name="password" class="password form-control" required="required" autocomplete="new-password" placeholder="Ο Κωδικός πρέπει να είναι Δύσκολος & Σύνθετος" />
                            <i class="show-pass fa fa-eye fa-2x"></i>
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Κωδικού -->
                    <!-- Έναρξη Πεδίου Email -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="email" name="email" class="form-control" required="required" placeholder="Το Email πρέπει να είναι Έγκυρο" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Email -->
                    <!-- Έναρξη Πεδίου Πλήρους Ονόματος -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Πλήρες Όνομα</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="text" name="fullname" class="form-control" required="required" placeholder="Πλήρες Όνομα που θα εμφανίζεται στη Σελίδα Προφίλ" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Πλήρους Ονόματος -->
                    <!-- Έναρξη Πεδίου Avatar -->
                    <!-- <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Avatar Χρήστη</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="file" name="avatar" class="form-control" required="required" />
                        </div>
                    </div> -->
                    <!-- Τέλος Πεδίου Avatar -->
                    <!-- Έναρξη Πεδίου Υποβολής -->
                    <div class="form-group form-group-lg">
                        <div class="col-sm-offset-2 col-sm-10">
                            <input type="submit" value="Προσθήκη Μέλους" class="btn btn-primary btn-lg" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Υποβολής -->
                </form>
            </div>

        <?php 

        } elseif ($do == 'Insert') {

            // Σελίδα Εισαγωγής Μέλους

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {

                echo "<h1 class='text-center'>Εισαγωγή Μέλους</h1>";
                echo "<div class='container'>";

                              
                // Λήψη Μεταβλητών Από τη Φόρμα

                $username   = $_POST['username'];
                $password   = $_POST['password'];
                $email  = $_POST['email'];
                $fullname   = $_POST['fullname'];

                $hashPass = password_hash($password, PASSWORD_BCRYPT);

                // Επαλήθευση της Φόρμας

                $formErrors = array();

                if (strlen($username) < 4) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι λιγότερο από <strong>4 χαρακτήρες</strong>.';
                }

                if (strlen($username) > 20) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι περισσότερο από <strong>20 χαρακτήρες</strong>.';
                }

                if (empty($username)) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

                if (empty($password)) {
                    $formErrors[] = 'Ο Κωδικός δεν μπορεί να είναι <strong>Άδειος</strong>.';
                }

                if (empty($fullname)) {
                    $formErrors[] = 'Το Πλήρες Όνομα δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

                if (empty($email)) {
                    $formErrors[] = 'Το Email δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

              

                // Επανάληψη στον Πίνακα Σφαλμάτων και Εμφάνιση τους

                foreach($formErrors as $error) {
                    echo '<div class="alert alert-danger">' . $error . '</div>';
                }

                // Έλεγχος Αν Δεν Υπάρχουν Σφάλματα, Προχωρήστε στην Εισαγωγή

                if (empty($formErrors)) {

                    // Έλεγχος Αν Υπάρχει Ο Χρήστης στη Βάση Δεδομένων

                    $check = checkItem("Username", "users", $username);

                    if ($check == 1) {

                        $theMsg = '<div class="alert alert-danger">Συγγνώμη, αυτό το χρήστης υπάρχει ήδη.</div>';

                        redirectHome($theMsg, 'back');

                    } else {

                        // Εισαγωγή Πληροφοριών Χρήστη στη Βάση Δεδομένων

                        $stmt = $con->prepare("INSERT INTO 
                                                    users(username, password, email, full_name, group_id, registration_date)
                                                VALUES(:username, :password, :email, :fullname, 0, now())");
                        $stmt->execute(array(

                            'username'     => $username,
                            'password'     => $hashPass,
                            'email'     => $email,
                            'fullname'     => $fullname,
                        ));

                        // Εμφάνιση Μηνύματος Επιτυχίας

                        $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή πραγματοποιήθηκε με επιτυχία.</div>';
                    
                        $seconds = 3;

                        echo $theMsg;

                        echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε μετά από $seconds δευτερόλεπτα.</div>";

                        header("refresh:$seconds;url='customers.php'");

                    }

                }


            } else {

                echo "<div class='container'>";

                $theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

                redirectHome($theMsg);

                echo "</div>";

            }

            echo "</div>";

        } elseif ($do == 'Edit') {

            // Έλεγχος Αν Η Παράμετρος userid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

            $userid = isset($_GET['userid']) && is_numeric($_GET['userid']) ? intval($_GET['userid']) : 0;

            // Επιλογή Όλων των Δεδομένων Βάσει Του ID

            $stmt = $con->prepare("SELECT * FROM users WHERE user_id = ? LIMIT 1");

            // Εκτέλεση Ερωτήματος

            $stmt->execute(array($userid));

            // Ανάκτηση των Δεδομένων

            $row = $stmt->fetch();

            // Αριθμός Γραμμών

            $count = $stmt->rowCount();

            // Αν Υπάρχει Τέτοιο ID, Εμφάνιση της Φόρμας

            if ($count > 0) { ?>

                <h1 class="text-center">Επεξεργασία Μέλους</h1>
                <div class="container">
                    <form class="form-horizontal" action="?do=Update" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="userid" value="<?php echo htmlspecialchars($userid) ?>" />
                        <!-- Έναρξη Πεδίου Ονόματος Χρήστη -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Όνομα Χρήστη</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="text" name="username" class="form-control" value="<?php echo htmlspecialchars($row['username']) ?>" autocomplete="off" required="required" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Ονόματος Χρήστη -->
                        <!-- Έναρξη Πεδίου Κωδικού -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Κωδικός</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="hidden" name="oldpassword" value="<?php echo htmlspecialchars($row['password']) ?>" />
                                <input type="password" name="newpassword" class="form-control" autocomplete="new-password" placeholder="Αφήστε κενό αν δεν θέλετε να αλλάξετε" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Κωδικού -->
                        <!-- Έναρξη Πεδίου Email -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="email" name="email" value="<?php echo htmlspecialchars($row['email']) ?>" class="form-control" required="required" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Email -->
                        <!-- Έναρξη Πεδίου Πλήρους Ονόματος -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Πλήρες Όνομα</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="text" name="fullname" value="<?php echo htmlspecialchars($row['full_name']) ?>" class="form-control" required="required" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Πλήρους Ονόματος -->
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

            // Αν Δεν Υπάρχει Τέτοιο ID, Εμφάνιση Μηνύματος Σφάλματος

            } else {

                echo "<div class='container'>";

                $theMsg = '<div class="alert alert-danger">Δεν υπάρχει τέτοιο ID.</div>';

                redirectHome($theMsg);

                echo "</div>";

            }

        } elseif ($do == 'Update') { // Σελίδα Ενημέρωσης

            echo "<h1 class='text-center'>Ενημέρωση Μέλους</h1>";
            echo "<div class='container'>";

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {

                // Λήψη Μεταβλητών Από τη Φόρμα

                $id      = $_POST['userid'];
                $username    = $_POST['username'];
                $email   = $_POST['email'];
                $fullname    = $_POST['fullname'];

                // Τεχνική για τον Κωδικό

                $pass = empty($_POST['newpassword']) ? $_POST['oldpassword'] : password_hash($_POST['newpassword'], PASSWORD_BCRYPT, ['cost' => 12]);

                // Επαλήθευση της Φόρμας

                $formErrors = array();

                if (strlen($username) < 4) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι λιγότερο από <strong>4 χαρακτήρες</strong>.';
                }

                if (strlen($username) > 20) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι περισσότερο από <strong>20 χαρακτήρες</strong>.';
                }

                if (empty($username)) {
                    $formErrors[] = 'Το Όνομα Χρήστη δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

                if (empty($fullname)) {
                    $formErrors[] = 'Το Πλήρες Όνομα δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

                if (empty($email)) {
                    $formErrors[] = 'Το Email δεν μπορεί να είναι <strong>Άδειο</strong>.';
                }

                // Επανάληψη στον Πίνακα Σφαλμάτων και Εμφάνιση τους

                foreach($formErrors as $error) {
                    echo '<div class="alert alert-danger">' . $error . '</div>';
                }

                // Έλεγχος Αν Δεν Υπάρχουν Σφάλματα, Προχωρήστε στην Ενημέρωση

                if (empty($formErrors)) {

                    $stmt2 = $con->prepare("SELECT 
                                                *
                                            FROM 
                                                users
                                            WHERE
                                                username = ?
                                            AND 
                                                user_id != ?");

                    $stmt2->execute(array($user, $id));

                    $count = $stmt2->rowCount();

                    // if ($count == 1) {

                    //     $theMsg = '<div class="alert alert-danger">Συγγνώμη, αυτό το χρήστης υπάρχει ήδη.</div>';

                    //     redirectHome($theMsg, 'back');

                    // } else
					//  { 

                        // Ενημέρωση της Βάσης Δεδομένων με αυτές τις πληροφορίες

                        $stmt = $con->prepare("UPDATE users SET username = ?, email = ?, full_name = ?, password = ? WHERE user_id = ?");

                        $stmt->execute(array($username, $email, $fullname, $pass, $id));

                        // Εμφάνιση Μηνύματος Επιτυχίας

                        $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή ενημερώθηκε με επιτυχία.</div>';

                        $seconds = 3;

                        echo $theMsg;

                        echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε μετά από $seconds δευτερόλεπτα.</div>";
            
                        header("refresh:$seconds;url='customers.php'");
                    }

                // }

            } else {

                $theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

                redirectHome($theMsg);

            }

            echo "</div>";

        } elseif ($do == 'Delete') { // Σελίδα Διαγραφής Μέλους

            echo "<h1 class='text-center'>Διαγραφή Μέλους</h1>";
            echo "<div class='container'>";

                // Έλεγχος Αν Η Παράμετρος userid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

                $userid = isset($_GET['userid']) && is_numeric($_GET['userid']) ? intval($_GET['userid']) : 0;

                // Έλεγχος Αν Υπάρχει Τέτοιο ID

                $check = checkItem('user_id', 'users', $userid);

                // Αν Υπάρχει Τέτοιο ID, Διαγραφή του Μέλους

                if ($check > 0) {

                    $stmt = $con->prepare("DELETE FROM users WHERE user_id = :username");

                    $stmt->bindParam(":username", $userid);

                    $stmt->execute();

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή διαγράφηκε με επιτυχία.</div>';

                    redirectHome($theMsg, 'back');

                } else {

                    $theMsg = '<div class="alert alert-danger">Αυτό το ID δεν υπάρχει.</div>';

                    redirectHome($theMsg);

                }

            echo '</div>';

        } elseif ($do == 'Activate') { // Σελίδα Ενεργοποίησης Μέλους

            echo "<h1 class='text-center'>Ενεργοποίηση Μέλους</h1>";
            echo "<div class='container'>";

                // Έλεγχος Αν Η Παράμετρος userid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

                $userid = isset($_GET['userid']) && is_numeric($_GET['userid']) ? intval($_GET['userid']) : 0;

                // Έλεγχος Αν Υπάρχει Τέτοιο ID

                $check = checkItem('user_id', 'users', $userid);

                // Αν Υπάρχει Τέτοιο ID, Ενημέρωση της Κατάστασης

                if ($check > 0) {

                    $stmt = $con->prepare("UPDATE users SET RegStatus = 1 WHERE user_id = ?");

                    $stmt->execute(array($userid));

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή ενεργοποιήθηκε με επιτυχία.</div>';

                    redirectHome($theMsg);

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
