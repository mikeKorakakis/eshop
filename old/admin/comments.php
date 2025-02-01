<?php

    /*
    =================================================
    == Σελίδα Διαχείρισης Σχολίων
    == Μπορείς να Επεξεργαστείς | Διαγράψεις | Εγκρίνεις Σχόλια Από Εδώ
    =================================================
    */

    ob_start(); // Έναρξη Output Buffering

    session_start();

    $pageTitle = 'Σχόλια';

    if (isset($_SESSION['admin'])) {

        include 'init.php';

        $do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

        // Έναρξη Σελίδας Διαχείρισης

        if ($do == 'Manage') { // Διαχείριση Σχολίων

            // Επιλογή Όλων των Σχολίων με Λεπτομέρειες Προϊόντος και Χρήστη

            $stmt = $con->prepare("SELECT 
                                        comments.*, products.name AS product_name, users.username AS username  
                                    FROM 
                                        comments
                                    INNER JOIN 
                                        products 
                                    ON 
                                        products.product_id = comments.product_id
                                    INNER JOIN 
                                        users 
                                    ON 
                                        users.user_id = comments.user_id
                                    ORDER BY 
                                        comment_id DESC");

            // Εκτέλεση του Statement

            $stmt->execute();

            // Ανάθεση στον Πίνακα 

            $comments = $stmt->fetchAll();

            if (! empty($comments)) {

            ?>

            <h1 class="text-center">Διαχείριση Σχολίων</h1>
            <div class="container">
                <div class="table-responsive">
                    <table class="main-table text-center table table-bordered">
                        <tr>
                            <td>Σχόλιο</td>
                            <td>Όνομα Προϊόντος</td>
                            <td>Όνομα Χρήστη</td>
                            <td>Ημερομηνία Προσθήκης</td>
                            <td>Ενέργειες</td>
                        </tr>
                        <?php
                            foreach($comments as $comment) {
                                echo "<tr>";
                                    echo "<td>" . htmlspecialchars($comment['content']) . "</td>";
                                    echo "<td>" . htmlspecialchars($comment['product_name']) . "</td>";
                                    echo "<td>" . htmlspecialchars($comment['username']) . "</td>";
                                    echo "<td>" . htmlspecialchars($comment['created_date']) ."</td>";
                                    
                                    echo "</td>";
                                    echo "<td>
                                        <a href='comments.php?do=Delete&comid=" . htmlspecialchars($comment['comment_id']) . "' class='btn btn-danger confirm'><i class='fa fa-close'></i> Διαγραφή </a>";
                                        
                                    echo "</td>";
                                echo "</tr>";
                            }
                        ?>
                        <tr>
                    </table>
                </div>
            </div>

            <?php } else {

                echo '<div class="container">';
                    echo '<div class="nice-message">Δεν υπάρχουν σχόλια προς εμφάνιση.</div>';
                echo '</div>';

            } ?>

        <?php 

        } elseif ($do == 'Delete') { // Σελίδα Διαγραφής

            echo "<h1 class='text-center'>Διαγραφή Σχολίου</h1>";

            echo "<div class='container'>";

                // Έλεγχος Αν Η Παράμετρος comid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

                $comid = isset($_GET['comid']) && is_numeric($_GET['comid']) ? intval($_GET['comid']) : 0;

                // Έλεγχος Αν Υπάρχει Τέτοιο ID

                $check = checkItem('comment_id', 'comments', $comid);

                // Αν Υπάρχει Τέτοιο ID, Διαγραφή του Σχολίου

                if ($check > 0) {

                    $stmt = $con->prepare("DELETE FROM comments WHERE comment_id = :zid");

                    $stmt->bindParam(":zid", $comid);

                    $stmt->execute();

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή διαγράφηκε με επιτυχία.</div>';

                    redirectHome($theMsg, 'back');

                } else {

                    $theMsg = '<div class="alert alert-danger">Αυτό το ID δεν υπάρχει.</div>';

                    redirectHome($theMsg);

                }

            echo '</div>';

        } elseif ($do == 'Approve') {

            echo "<h1 class='text-center'>Έγκριση Σχολίου</h1>";
            echo "<div class='container'>";

                // Έλεγχος Αν Η Παράμετρος comid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

                $comid = isset($_GET['comid']) && is_numeric($_GET['comid']) ? intval($_GET['comid']) : 0;

                // Έλεγχος Αν Υπάρχει Τέτοιο ID

                $check = checkItem('comment_id', 'comments', $comid);

                // Αν Υπάρχει Τέτοιο ID, Ενημέρωση της Κατάστασης

                if ($check > 0) {

                    $stmt = $con->prepare("UPDATE comments SET status = 1 WHERE comment_id = ?");

                    $stmt->execute(array($comid));

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Η εγγραφή εγκρίθηκε με επιτυχία.</div>';

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
