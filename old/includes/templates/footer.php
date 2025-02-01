<div style="height:100px"></div>

<footer>
	<?php
	$cssFile = "footer.css";
	?>
	<section>
		<div id="containerFooter">

			<div id="webFooter">
				<h3>ΚΑΤΗΓΟΡΙΕΣ </h3>
				<?php
				$allCats = getAll("SELECT * FROM categories WHERE parent_id = 0 ORDER BY category_id ASC", []);
				foreach ($allCats as $cat) {
					echo '<p><a href="categories.php?page_id=' . $cat['category_id'] . '">
									' . $cat['name'] . '
								</a></p>';
				}
				?>

			</div>
			<div id="webFooter">
				<h3>ΣΥΝΔΕΣΜΟΙ</h3>
				<p><a href="/">ΑΡΧΙΚΗ</a> </p>
				<p><a href="#">ΣΧΕΤΙΚΑ</a> </p>
				<p><a href="#">ΕΠΙΚΟΙΝΩΝΙΑ</a> </p>
			</div>

			<div id="webFooter">
				<h3>ΔΙΕΥΘΥΝΣΗ</h3>
				<p> ΑΓΙΟΥ ΣΠΥΡΙΔΩΝΟς </p>
				<p> ΤΑΧΥΔΡΟΜΙΚΟΣ ΚΩΔΙΚΑΣ 12243 </p>
				<p> ΕΛΛΑΔΑ </p>
			</div>
		</div>
		<div id="credit"><a href="https://www.uniwa.gr"> © UNIWA TEAM </a> &nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp <a
				href="https://www.uniwa.gr/" target="_blank"> UNIWA </a></div>
	</section>

</footer>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>


<script src="<?php echo $js ?>main.js"></script>
</html>