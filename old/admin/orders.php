<?php
/*
============================================
== Σελίδα Παραγγελιών
============================================
*/

ob_start(); // Έναρξη Output Buffering

session_start();

$pageTitle = 'Παραγγελίες';

if (isset($_SESSION['admin'])) {

    include 'init.php';

    // Λήψη Παραγγελιών με Λεπτομέρειες Χρήστη
    $stmt = $con->prepare("
        SELECT 
            orders.*, 
            users.username AS Customer 
        FROM 
            orders 
        INNER JOIN 
            users 
        ON 
            users.user_id = orders.user_id
        ORDER BY 
            order_id DESC
    ");

    $stmt->execute();
    $orders = $stmt->fetchAll();

    if (!empty($orders)) {
        ?>

        <h1 class="text-center">Διαχείριση Παραγγελιών</h1>
        <div class="container">
            <div class="table-responsive">
                <table class="main-table manage-orders text-center table table-bordered">
                    <tr>
                        <td>Κωδικός Παραγγελίας</td>
                        <td>Πελάτης</td>
                        <td>Ημερομηνία Παραγγελίας</td>
                        <td>Συνολικό Ποσό</td>
                        <td>Κατάσταση</td>
                        <td>Προϊόντα</td>
                    </tr>
                    <?php
                    foreach ($orders as $order) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($order['order_id']) . "</td>";
                        echo "<td>" . htmlspecialchars($order['Customer']) . "</td>";
                        echo "<td>" . htmlspecialchars($order['order_date']) . "</td>";
                        echo "<td>" . htmlspecialchars(number_format($order['total_amount'], 2)) . " €</td>";
                        echo "<td>" . htmlspecialchars($order['order_status']) . "</td>";

                        // Λήψη Προϊόντων για την Τρέχουσα Παραγγελία
                        $productStmt = $con->prepare("
                            SELECT 
                                products.name AS product_name, 
                                order_items.quantity, 
                                order_items.price_at_purchase 
                            FROM 
                                order_items 
                            INNER JOIN 
                                products 
                            ON 
                                products.product_id = order_items.product_id 
                            WHERE 
                                order_items.order_id = ?
                        ");

                        $productStmt->execute([$order['order_id']]);
                        $products = $productStmt->fetchAll();

                        echo "<td>";
                        if (!empty($products)) {
                            echo "<ul>";
                            foreach ($products as $product) {
                                echo "<li>";
                                echo htmlspecialchars($product['product_name']) . " - Ποσότητα: " . htmlspecialchars($product['quantity']) . ", Τιμή: €" . htmlspecialchars(number_format($product['price_at_purchase'], 2));
                                echo "</li>";
                            }
                            echo "</ul>";
                        } else {
                            echo "Δεν βρέθηκαν προϊόντα.";
                        }
                        echo "</td>";

                        echo "</tr>";
                    }
                    ?>
                </table>
            </div>
        </div>

        <?php
    } else {
        echo '<div class="container">';
        echo '<div class="alert alert-info">Δεν υπάρχουν παραγγελίες προς εμφάνιση.</div>';
        echo '</div>';
    }

    include $tpl . 'footer.php';

} else {

    header('Location: index.php');

    exit();
}

ob_end_flush(); // Απελευθέρωση της Εξόδου
?>
