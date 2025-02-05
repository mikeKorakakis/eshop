<?php

    /*
    =================================================
    == Σελίδα Κατηγοριών
    =================================================
    */

    $cssFile = "categories.css";

    ob_start(); // Έναρξη Output Buffering

    session_start();

    $pageTitle = 'Κατηγορίες';

    if (isset($_SESSION['admin'])) {

        include 'init.php';

        $do = isset($_GET['do']) ? $_GET['do'] : 'Manage';

        if ($do == 'Manage') {

        
            $cats = getAll("SELECT * FROM categories WHERE parent_id = 0");

            if (!empty($cats)) {

            ?>

            <h1 class="text-center">Διαχείριση Κατηγοριών</h1>
            <div class="container categories">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-edit"></i> Διαχείριση Κατηγοριών
                      
                    </div>
                    <div class="panel-body">
                        <?php
                            foreach($cats as $cat) {
                                echo "<div class='cat'>";
                                    echo "<div class='cat-buttons'>";
                                        echo "<a href='categories.php?do=Edit&catid=" . htmlspecialchars($cat['category_id']) . "' class='btn btn-xs btn-primary'><i class='fa fa-edit'></i> Επεξεργασία</a>";
                                        echo "<a href='categories.php?do=Delete&catid=" . htmlspecialchars($cat['category_id']) . "' class='confirm btn btn-xs btn-danger'><i class='fa fa-close'></i> Διαγραφή</a>";
                                    echo "</div>";
                                    echo "<h3>" . htmlspecialchars($cat['name']) . '</h3>';
                                    echo "<div class='full-view'>";
                                        echo "<p>"; 
                                            if($cat['description'] == '') { 
                                                echo 'Αυτή η κατηγορία δεν έχει περιγραφή'; 
                                            } else { 
                                                echo htmlspecialchars($cat['description']); 
                                            } 
                                        echo "</p>";
                                    echo "</div>";

                                    // Λήψη Υποκατηγοριών
                                    $childCats = getAll("SELECT * FROM categories WHERE parent_id = ?", [$cat['category_id']]);
                                    if (!empty($childCats)) {
                                        echo "<h4 class='child-head'>Υποκατηγορίες</h4>";
                                        echo "<ul class='list-unstyled child-cats'>";
                                            foreach ($childCats as $c) {
                                                echo "<li class='child-link'>
                                                    <a href='categories.php?do=Edit&catid=" . htmlspecialchars($c['category_id']) . "'>" . htmlspecialchars($c['name']) . "</a>
                                                    <a href='categories.php?do=Delete&catid=" . htmlspecialchars($c['category_id']) . "' class='show-delete confirm'> Διαγραφή</a>
                                                </li>";
                                            }
                                        echo "</ul>";
                                    }

                                echo "</div>";
                                echo "<hr>";
                            }
                        ?>
                    </div>
                </div>
                <a class="add-category btn btn-primary" href="categories.php?do=Add"><i class="fa fa-plus"></i> Προσθήκη Νέας Κατηγορίας</a>
            </div>

            <?php } else {

                echo '<div class="container">';
                    echo '<div class="nice-message">Δεν υπάρχουν κατηγορίες προς εμφάνιση.</div>';
                    echo '<a href="categories.php?do=Add" class="btn btn-primary">
                            <i class="fa fa-plus"></i> Νέα Κατηγορία
                        </a>';
                echo '</div>';

            } ?>

            <?php

        } elseif ($do == 'Add') { ?>

            <h1 class="text-center">Προσθήκη Νέας Κατηγορίας</h1>
            <div class="container">
                <form class="form-horizontal" action="?do=Insert" method="POST">
                    <!-- Έναρξη Πεδίου Ονόματος -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Όνομα</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="text" name="name" class="form-control" autocomplete="off" required="required" placeholder="Όνομα της Κατηγορίας" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Ονόματος -->
                    <!-- Έναρξη Πεδίου Περιγραφής -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Περιγραφή</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="text" name="description" class="form-control" placeholder="Περιγράψτε την Κατηγορία" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Περιγραφής -->
                    <!-- Έναρξη Πεδίου Ταξινόμησης -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Ταξινόμηση</label>
                        <div class="col-sm-10 col-md-6">
                            <input type="text" name="ordering" class="form-control" placeholder="Αριθμός για Ταξινόμηση των Κατηγοριών" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Ταξινόμησης -->
                    <!-- Έναρξη Επιλογής Τύπου Κατηγορίας -->
                    <div class="form-group form-group-lg">
                        <label class="col-sm-2 control-label">Γονική Κατηγορία?</label>
                        <div class="col-sm-10 col-md-6">
                            <select name="parent">
                                <option value="0">Κανένα</option>
                                <?php 
                                    $allCats = getAll("SELECT * FROM categories WHERE parent_id = 0");
                                    foreach($allCats as $cat) {
                                        echo "<option value='" . htmlspecialchars($cat['category_id']) . "'>" . htmlspecialchars($cat['name']) . "</option>";
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <!-- Τέλος Επιλογής Τύπου Κατηγορίας -->
                    
                    <!-- Έναρξη Πεδίου Υποβολής -->
                    <div class="form-group form-group-lg">
                        <div class="col-sm-offset-2 col-sm-10">
                            <input type="submit" value="Προσθήκη Κατηγορίας" class="btn btn-primary btn-lg" />
                        </div>
                    </div>
                    <!-- Τέλος Πεδίου Υποβολής -->
                </form>
            </div>

            <?php

        } elseif ($do == 'Insert') {

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {

                echo "<h1 class='text-center'>Εισαγωγή Κατηγορίας</h1>";
                echo "<div class='container'>";

                // Λήψη Μεταβλητών Από τη Φόρμα

                $name        = $_POST['name'];
                $description        = $_POST['description'];
                $parent      = $_POST['parent'];
                $ordering       = $_POST['ordering'];

                // Έλεγχος Αν Η Κατηγορία Υπάρχει στη Βάση Δεδομένων

                $check = checkItem("Name", "categories", $name);

                if ($check == 1) {

                    $theMsg = '<div class="alert alert-danger">Συγγνώμη, αυτή η κατηγορία υπάρχει ήδη.</div>';

                    redirectHome($theMsg, 'back');

                } else {

                    // Εισαγωγή Πληροφοριών Κατηγορίας στη Βάση Δεδομένων

                    $stmt = $con->prepare("INSERT INTO 

                        categories(Name, Description, parent_id, ordering)

                    VALUES(:name, :description, :parent, :order)");

                    $stmt->execute(array(
                        'name'     => $name,
                        'description'     => $description,
                        'parent'   => $parent,
                        'order'    => $ordering,
                    ));

                    // Εμφάνιση Μηνύματος Επιτυχίας

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Κατηγορία Εισήχθη</div>';

                    $seconds = 3;

                    echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε στο προφίλ σας μετά από $seconds δευτερόλεπτα.</div>";

                    header("refresh:$seconds;url='categories.php'");

                }

            } else {

                echo "<div class='container'>";

                $theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

                redirectHome($theMsg, 'back');

                echo "</div>";

            }

            echo "</div>";

        } elseif ($do == 'Edit') {

            // Έλεγχος Αν Η Παράμετρος catid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

            $catid = isset($_GET['catid']) && is_numeric($_GET['catid']) ? intval($_GET['catid']) : 0;

            // Επιλογή Όλων των Δεδομένων Βάσει Του ID

            $stmt = $con->prepare("SELECT * FROM categories WHERE category_id = ?");

            // Εκτέλεση Ερωτήματος

            $stmt->execute(array($catid));

            // Ανάκτηση των Δεδομένων

            $cat = $stmt->fetch();

            // Αριθμός Γραμμών

            $count = $stmt->rowCount();

            // Αν Υπάρχει Τέτοιο ID, Εμφάνιση της Φόρμας

            if ($count > 0) { ?>

                <h1 class="text-center">Επεξεργασία Κατηγορίας</h1>
                <div class="container">
                    <form class="form-horizontal" action="?do=Update" method="POST">
                        <input type="hidden" name="catid" value="<?php echo htmlspecialchars($catid) ?>" />
                        <!-- Έναρξη Πεδίου Ονόματος -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Όνομα</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="text" name="name" class="form-control" required="required" placeholder="Όνομα της Κατηγορίας" value="<?php echo htmlspecialchars($cat['name']) ?>" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Ονόματος -->
                        <!-- Έναρξη Πεδίου Περιγραφής -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Περιγραφή</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="text" name="description" class="form-control" placeholder="Περιγράψτε την Κατηγορία" value="<?php echo htmlspecialchars($cat['description']) ?>" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Περιγραφής -->
                        <!-- Έναρξη Πεδίου Ταξινόμησης -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Ταξινόμηση</label>
                            <div class="col-sm-10 col-md-6">
                                <input type="number" name="ordering" class="form-control" placeholder="Αριθμός για Ταξινόμηση των Κατηγοριών" value="<?php echo htmlspecialchars($cat['ordering']) ?>" />
                            </div>
                        </div>
                        <!-- Τέλος Πεδίου Ταξινόμησης -->
                        <!-- Έναρξη Επιλογής Τύπου Κατηγορίας -->
                        <div class="form-group form-group-lg">
                            <label class="col-sm-2 control-label">Γονική Κατηγορία?</label>
                            <div class="col-sm-10 col-md-6">
                                <select name="parent">
                                    <option value="0">Κανένα</option>
                                    <?php 
                                        $allCats = getAll("SELECT * FROM categories WHERE parent_id = 0");
                                        foreach($allCats as $c) {
                                            echo "<option value='" . htmlspecialchars($c['category_id']) . "'";
                                            if ($cat['parent_id'] == $c['category_id']) { echo ' selected'; }
                                            echo ">" . htmlspecialchars($c['name']) . "</option>";
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <!-- Τέλος Επιλογής Τύπου Κατηγορίας -->
                        
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

        } elseif ($do == 'Update') {

            echo "<h1 class='text-center'>Ενημέρωση Κατηγορίας</h1>";
            echo "<div class='container'>";

            if ($_SERVER['REQUEST_METHOD'] == 'POST') {

                // Λήψη Μεταβλητών Από τη Φόρμα

                $id          = $_POST['catid'];
                $name        = $_POST['name'];
                $desc        = $_POST['description'];
                $order       = $_POST['ordering'];
                $parent      = $_POST['parent'];


                // Ενημέρωση της Βάσης Δεδομένων με αυτές τις πληροφορίες

                $stmt = $con->prepare("UPDATE 
                                            categories 
                                        SET 
                                            name = ?, 
                                            description = ?, 
                                            ordering = ?, 
                                            parent_id = ?
                                        WHERE 
                                            category_id = ?");

                $stmt->execute(array($name, $desc, $order, $parent, $id));

                // Εμφάνιση Μηνύματος Επιτυχίας

                $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Κατηγορία Ενημερώθηκε</div>';

                $seconds = 3;

                echo $theMsg;
                
                echo "<div class='alert alert-info'>Θα ανακατευθυνθείτε στο προφίλ σας μετά από $seconds δευτερόλεπτα.</div>";
    
                header("refresh:$seconds;url='categories.php'");

            } else {

                $theMsg = '<div class="alert alert-danger">Συγγνώμη, δεν μπορείτε να περιηγηθείτε απευθείας σε αυτή τη σελίδα.</div>';

                redirectHome($theMsg, 'back');

            }

            echo "</div>";

        } elseif ($do == 'Delete') {

            echo "<h1 class='text-center'>Διαγραφή Κατηγορίας</h1>";
            echo "<div class='container'>";

                // Έλεγχος Αν Η Παράμετρος catid Είναι Αριθμητική & Λήψη Της Ακέραιας Τιμής Της

                $catid = isset($_GET['catid']) && is_numeric($_GET['catid']) ? intval($_GET['catid']) : 0;

                // Έλεγχος Αν Υπάρχει Τέτοιο ID

                $check = checkItem('category_id', 'categories', $catid);

                // Αν Υπάρχει Τέτοιο ID, Διαγραφή της Κατηγορίας

                if ($check > 0) {

                    $stmt = $con->prepare("DELETE FROM categories WHERE category_id = :zid");

                    $stmt->bindParam(":zid", $catid);

                    $stmt->execute();

                    $theMsg = "<div class='alert alert-success'>" . $stmt->rowCount() . ' Κατηγορία Διαγράφηκε</div>';

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
