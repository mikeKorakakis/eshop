<?php

    ob_start(); // Έναρξη Output Buffering
    $cssFile = "dashboard.css";

    session_start();

    if (isset($_SESSION['admin'])) {

        $pageTitle = 'Πίνακας Ελέγχου';

        include 'init.php';

        /* Έναρξη Σελίδας Πίνακα Ελέγχου */

        $numUsers = 6; // Αριθμός Τελευταίων Χρηστών

        $latestUsers = getLatest("*", "users", "user_id", $numUsers); // Πίνακας Τελευταίων Χρηστών

        $numItems = 6; // Αριθμός Τελευταίων Προϊόντων

        $latestProducts = getLatest("*", 'products', 'product_id', $numItems); // Πίνακας Τελευταίων Προϊόντων

        $numComments = 4; // Αριθμός Τελευταίων Σχολίων

        ?>
    
        <div class="home-stats">
            <div class="container text-center">
                <h1>Πίνακας Ελέγχου</h1>
                <div class="row">
                    <div class="col-md-4">
                        <div class="stat st-members">
                            <i class="fa fa-users"></i>
                            <div class="info">
                                Σύνολο Μελών
                                <span>
                                    <a href="members.php"><?php echo countItems('user_id', 'users') ?></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat st-items">
                            <i class="fa fa-tag"></i>
                            <div class="info">
                                Σύνολο Προϊόντων
                                <span>
                                    <a href="products.php"><?php echo countItems('product_id', 'products') ?></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat st-comments">
                            <i class="fa fa-comments"></i>
                            <div class="info">
                                Σύνολο Ανατροφοδοτήσεων
                                <span>
                                    <a href="comments.php"><?php echo countItems('comment_id', 'comments') ?></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="latest">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="fa fa-users"></i> 
                                Τελευταίοι <?php echo $numUsers ?> Εγγεγραμμένοι Χρήστες 
                                <span class="toggle-info pull-right">
                                    <i class="fa fa-plus fa-lg"></i>
                                </span>
                            </div>
                            <div class="panel-body">
                                <ul class="list-unstyled latest-users">
                                <?php
                                    if (!empty($latestUsers)) {
                                        foreach ($latestUsers as $user) {
                                            echo '<li>';
                                                echo htmlspecialchars($user['username']);
                                                echo '<a href="customers.php?do=Edit&userid=' . htmlspecialchars($user['user_id']) . '">';
                                                    echo '<span class="btn btn-success pull-right">';
                                                        echo '<i class="fa fa-edit"></i> Επεξεργασία';
                                                echo '</span>';
                                                echo '</a>';
                                            echo '</li>';
                                        }
                                    } else {
                                        echo '<li>Δεν υπάρχουν μέλη προς εμφάνιση.</li>';
                                    }
                                ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="fa fa-tag"></i> Τελευταία <?php echo $numItems ?> Προϊόντα 
                                <span class="toggle-info pull-right">
                                    <i class="fa fa-plus fa-lg"></i>
                                </span>
                            </div>
                            <div class="panel-body">
                                <ul class="list-unstyled latest-users">
                                    <?php
                                        if (!empty($latestProducts)) {
                                            foreach ($latestProducts as $product) {
                                                echo '<li>';
                                                    echo htmlspecialchars($product['name']);
                                                    echo '<a href="products.php?do=Edit&product_id=' . htmlspecialchars($product['product_id']) . '">';
                                                        echo '<span class="btn btn-success pull-right">';
                                                            echo '<i class="fa fa-edit"></i> Επεξεργασία';
                                                        echo '</span>';
                                                    echo '</a>';
                                                echo '</li>';
                                            }
                                        } else {
                                            echo '<li>Δεν υπάρχουν προϊόντα προς εμφάνιση.</li>';
                                        }
                                    ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Έναρξη Τελευταίων Σχολίων -->
                <div class="row">
                    <div class="col-sm-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <i class="fa fa-comments-o"></i> 
                                Τελευταίες <?php echo $numComments ?> Ανατροφοδοτήσεις 
                                <span class="toggle-info pull-right">
                                    <i class="fa fa-plus fa-lg"></i>
                                </span>
                            </div>
                            <div class="panel-body">
                                <?php
                                    $stmt = $con->prepare("SELECT 
                                                                comments.*, users.username AS member  
                                                            FROM 
                                                                comments
                                                            INNER JOIN 
                                                                users 
                                                            ON 
                                                                users.user_id = comments.user_id
                                                            ORDER BY 
                                                                comment_id DESC
                                                            LIMIT :numComments");
                                    
                                    // Δέσμευση παραμέτρων για αποφυγή SQL Injection
                                    $stmt->bindParam(':numComments', $numComments, PDO::PARAM_INT);
                                    $stmt->execute();
                                    $comments = $stmt->fetchAll();

                                    if (!empty($comments)) {
                                        foreach ($comments as $comment) {
                                            echo '<div class="comment-box">';
                                                echo '<span class="member-n">
                                                    <a href="members.php?do=Edit&userid=' . htmlspecialchars($comment['user_id']) . '">
                                                        ' . htmlspecialchars($comment['member']) . '</a></span>';
                                                echo '<p class="member-c">' . htmlspecialchars($comment['content']) . '</p>';
                                            echo '</div>';
                                        }
                                    } else {
                                        echo '<p>Δεν υπάρχουν σχόλια προς εμφάνιση.</p>';
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Τέλος Τελευταίων Σχολίων -->
            </div>
        </div>

        <?php

        /* Τέλος Σελίδας Πίνακα Ελέγχου */

        include $tpl . 'footer.php';

    } else {

        header('Location: index.php');
        exit();
    }

    ob_end_flush(); // Απελευθέρωση της Εξόδου

?>
