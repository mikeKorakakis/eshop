<?php
session_start();
$cssFile = "content.css";
include 'init.php';
?>

<div id="mainContainer">
    <?php
    if (isset($_GET['page_id']) && is_numeric($_GET['page_id'])) {
        $category = intval($_GET['page_id']);
        
        // Ανάκτηση όλων των προϊόντων της συγκεκριμένης κατηγορίας
        $allProducts = getAll("SELECT * FROM products WHERE category_id = ?", [$category]);
        
        // Ανάκτηση του ονόματος της κατηγορίας
        $myCategory = getSingleValue($con, "SELECT name FROM categories WHERE category_id=?", [$category]);
        
        // Ανάκτηση όλων των κύριων κατηγοριών
        $allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC", []);
        
        // Εμφάνιση του ονόματος της κατηγορίας
        echo '<h1>' . htmlspecialchars($myCategory) . '</h1>';
        
        echo '<div id="categoryContainer">';
        
        // Ανάκτηση λεπτομερειών για όλα τα προϊόντα της κατηγορίας με χρήση INNER JOIN για τις εικόνες
        $allProducts = getAll(
            "SELECT products.product_id, products.name, products.description, price, media.path as image_url 
             FROM products 
             LEFT JOIN media ON products.media_id = media.media_id 
             WHERE category_id = :category_id",
            [':category_id' => $category]
        );
        
        // Εμφάνιση κάθε προϊόντος ως κάρτα προϊόντος
        foreach ($allProducts as $product) {
            printProductCard($product, $upload);			
        }
        
        echo '</div>';
    } else {
        // Μήνυμα λάθους αν δεν παρέχεται το page_id
        echo '<div class="alert alert-warning">Πρέπει να προσθέσεις το ID της σελίδας.</div>';
    }
    ?>
</div>
<!--  -->
</div>

<?php include $tpl . 'footer.php'; ?>
