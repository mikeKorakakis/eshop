<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="../layout/images/favicon.ico">
    <title><?php getTitle() ?></title>
    <link rel="stylesheet" href="<?php echo $css ?>header.css" />
    <link rel="stylesheet" href="<?php echo $css ?>footer.css" />
    <link rel="stylesheet" href="<?php echo $css ?>main.css" />

    <link rel="stylesheet" href="<?php echo $css;
    getCssFile(); ?>" />
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css">

</head>

<body>
    <header>
        <section>
            <div class="container">	

                <div class="admin-collection">
                    <div>
						<?php 
						$env = getenv('PHP_ENV');
						if ($env === 'production') {
                        echo '<a href='. getenv('NEW_SHOP_URL') .'>Επισκεφθείτε τον καινούριο μας ιστότοπο.</a>';
						} else {
							echo '<a href="http://localhost:3000">Επισκεφθείτε τον καινούριο μας ιστότοπο.</a>';
						}
						?>
                    </div>
                </div>
            </div>
            <!-- ΚΥΡΙΟ ΚΑΝΑΛΟ -->
            <div id="container">
                <!-- ΟΝΟΜΑ ΚΑΤΑΣΤΗΜΑΤΟΣ -->
                <div id="shopName">
                    <a href="/admin/dashboard.php"><b>UNIWA</b>SHOP</a>
                </div>
                <!-- ΣΥΛΛΟΓΕΣ ΣΤΟ ΙΣΤΟΤΟΠΟ -->
                <div id="admin-collection">
                    <div><a href="categories.php">Κατηγορίες</a></div>
                    <div><a href="products.php">Προϊόντα</a></div>
                    <div><a href="orders.php">Παραγγελίες</a></div>
                    <div><a href="customers.php">Πελάτες</a></div>
                    <div><a href="comments.php">Σχόλια</a></div>
                </div>
                <div></div>
                <div id="">

                    <?php
                    if (isset($_SESSION['admin'])) {
                        ?>

                        <div class="dropdown">

                            <i onclick="myFunction()" class="fas fa-user-circle userIcon dropbtn"></i>
                            <div id="myDropdown" class="dropdown-content">
                                <a href="../index.php">Επισκεφθείτε το Κατάστημα</a>
                                <!-- <a href="members.php?do=Edit&userid=<?php echo $_SESSION['admin_user_id'] ?>">Επεξεργασία Προφίλ</a> -->
                                <a href="logout.php">Αποσύνδεση</a>
                            </div>
                        </div>
                    <?php } else {
                        ?>
                        <div>
                            <a href="index.php">
                                <span class="pull-right">Σύνδεση/Εγγραφή</span>
                            </a>
                        </div>
                    <?php }
                    ?>

                </div>
            </div>
            </div>

        </section>
    </header>
    <div style="height: 50px"></div>
