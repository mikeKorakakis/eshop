		<div style="height:100px"></div>

		<footer>
			<?php
			$cssFile = "footer.css";
			?>
			<section>
				<div id="containerFooter">

					<div id="webFooter">
						<h3> online store </h3>
						<?php
						$allCats = getAllFrom("*", "categories", "where parent = 0", "", "ID", "ASC");
						foreach ($allCats as $cat) {
							echo '<p><a href="categories.php?pageid=' . $cat['ID'] . '">
									' . $cat['Name'] . '
								</a></p>';
						}
						?>

					</div>
					<div id="webFooter">
						<h3> helpful link </h3>
						<p><a href="/"> home </a> </p>
						<p><a href="#"> about </a> </p>
						<p><a href="#"> contact </a> </p>
					</div>

					<div id="webFooter">
						<h3> address </h3>
						<p> Ag. Spyridonos Str. </p>
						<p> Egaleo Park Campus </p>
						<p> Egaleo Postal Code 12243 </p>
						<p> Greece </p>
					</div>
				</div>
				<div id="credit"><a href="https://www.uniwa.gr"> © UNIWA TEAM </a> &nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp <a href="https://www.uniwa.gr/" target="_blank"> UNIWA </a></div>
			</section>

		</footer>
		</body>
		<!-- <script src="<?php echo $js ?>jquery-3.4.1.js"></script> -->
		<!-- <script src="<?php echo $js ?>jquery-1.12.1.min.js"></script>
		<script src="<?php echo $js ?>jquery-ui.min.js"></script> -->
		<!-- <script src="<?php echo $js ?>bootstrap.min.js"></script> -->
		<script src="<?php echo $js ?>jquery.selectBoxIt.min.js"></script>
		<script src="<?php echo $js ?>front.js"></script>

		</html>