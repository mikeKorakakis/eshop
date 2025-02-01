<?php
ob_start();
session_start();
$pageTitle = 'Προφίλ';
include 'init.php';

if (isset($_SESSION['user'])) {
    // Προετοιμασία ερωτήματος για την ανάκτηση των δεδομένων του χρήστη
    $getUser = $con->prepare("SELECT * FROM users WHERE username = ?");
    $getUser->execute(array($sessionUser));
    $info = $getUser->fetch();
    $userid = $info['user_id'];
    ?>

    <h1 class="text-center">Το Προφίλ Μου</h1>
    <div class="information block">
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">Οι Πληροφορίες Μου</div>
                <div class="panel-body">
                    <ul class="list-unstyled">
                        <li>
                            <i class="fa fa-unlock-alt fa-fw"></i>
                            <span>Όνομα Χρήστη</span> : <?php echo htmlspecialchars($info['username']); ?>
                        </li>
                        <li>
                            <i class="fa fa-envelope fa-fw"></i>
                            <span>Email</span> : <?php echo htmlspecialchars($info['email']); ?>
                        </li>
                        <li>
                            <i class="fa fa-user fa-fw"></i>
                            <span>Πλήρες Όνομα</span> : <?php echo htmlspecialchars($info['full_name']); ?>
                        </li>
                        <li>
                            <i class="fa fa-calendar fa-fw"></i>
                            <span>Ημερομηνία Εγγραφής</span> : <?php echo htmlspecialchars($info['registration_date']); ?>
                        </li>
                    </ul>
                    <a href="editProfile.php" class="btn btn-default">Επεξεργασία Πληροφοριών</a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="my-comments block">
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">Τελευταία Σχόλια</div>
                <div class="panel-body">
                    <?php
                    $myComments = getAll("SELECT content FROM comments WHERE user_id = ? ORDER BY comment_id DESC", [$userid]);
                    if (!empty($myComments)) {
                        foreach ($myComments as $comment) {
                            echo '<p>' . htmlspecialchars($comment['content']) . '</p>';
                        }
                    } else {
                        echo 'Δεν υπάρχουν σχόλια προς εμφάνιση.';
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
<?php
} else {
    // Αν ο χρήστης δεν είναι συνδεδεμένος, ανακατεύθυνση στη σελίδα σύνδεσης
    header('Location: login.php');
    exit();
}

include $tpl . 'footer.php';
ob_end_flush();
?>
