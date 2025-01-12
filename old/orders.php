<?php
/*
================================================
== Orders Page
================================================
*/

ob_start(); // Output Buffering Start

session_start();

$pageTitle = 'Orders';

if (isset($_SESSION['user'])) {

    include 'init.php';

    // Fetch Orders with User Details
    $stmt = $con->prepare("
        SELECT 
            orders.*
        FROM 
            orders
		WHERE user_id=?
        ORDER BY 
            order_id DESC
    ");

    $stmt->execute([$_SESSION["user_id"]]);
    $orders = $stmt->fetchAll();

    if (!empty($orders)) {
        ?>

        <h1 class="text-center">View Your Orders</h1>
        <div class="container">
            <div class="table-responsive">
                <table class="main-table manage-orders text-center table table-bordered">
                    <tr>
                        <td>Order Date</td>
                        <td>Total Amount</td>
                        <td>Status</td>
                        <td>Products</td>
                    </tr>
                    <?php
                    foreach ($orders as $order) {
                        echo "<tr>";
                        echo "<td>" . $order['order_date'] . "</td>";
                        echo "<td>" . $order['total_amount'] . "</td>";
                        echo "<td>" . $order['order_status'] . "</td>";

                        // Fetch Products for the Current Order
                        $productStmt = $con->prepare("
                            SELECT 
                                products.Name AS product_name, 
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
                                echo $product['product_name'] . " - Qty: " . $product['quantity'] . ", Price: $" . $product['price_at_purchase'];
                                echo "</li>";
                            }
                            echo "</ul>";
                        } else {
                            echo "No products found.";
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
        echo '<div class="nice-message">There are no orders to show.</div>';
        echo '</div>';
    }

    include $tpl . 'footer.php';

} else {

    header('Location: index.php');

    exit();
}

ob_end_flush(); // Release The Output
?>
