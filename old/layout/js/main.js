$(function () {
	"use strict";

	// Switch Between Login & Signup

	$(".login-page h1 span").click(function () {
		$(this).addClass("selected").siblings().removeClass("selected");

		$(".login-page form").hide();

		$("." + $(this).data("class")).fadeIn(100);
	});
	// Hide Placeholder On Form Focus

	$("[placeholder]")
		.focus(function () {
			$(this).attr("data-text", $(this).attr("placeholder"));

			$(this).attr("placeholder", "");
		})
		.blur(function () {
			$(this).attr("placeholder", $(this).attr("data-text"));
		});

	// Add Asterisk On Required Field

	$("input").each(function () {
		if ($(this).attr("required") === "required") {
			$(this).after('<span class="asterisk">*</span>');
		}
	});

	// Confirmation Message On Button

	$(".confirm").click(function () {
		return confirm("Are You Sure?");
	});

	$(".live").keyup(function () {
		$($(this).data("class")).text($(this).val());
	});

	$(".toggle-info").click(function () {
		$(this)
			.toggleClass("selected")
			.parent()
			.next(".panel-body")
			.fadeToggle(100);

		if ($(this).hasClass("selected")) {
			$(this).html('<i class="fa fa-minus fa-lg"></i>');
		} else {
			$(this).html('<i class="fa fa-plus fa-lg"></i>');
		}
	});

	// Trigger The Selectboxit

	// $("select").selectBoxIt({

	// 	autoWidth: false

	// });

	// Hide Placeholder On Form Focus

	$("[placeholder]")
		.focus(function () {
			$(this).attr("data-text", $(this).attr("placeholder"));

			$(this).attr("placeholder", "");
		})
		.blur(function () {
			$(this).attr("placeholder", $(this).attr("data-text"));
		});

	// Add Asterisk On Required Field

	$("input").each(function () {
		if ($(this).attr("required") === "required") {
			$(this).after('<span class="asterisk">*</span>');
		}
	});

	// Convert Password Field To Text Field On Hover

	var passField = $(".password");

	$(".show-pass").hover(
		function () {
			passField.attr("type", "text");
		},
		function () {
			passField.attr("type", "password");
		}
	);

	// Confirmation Message On Button

	$(".confirm").click(function () {
		return confirm("Are You Sure?");
	});

	// Category View Option

	$(".cat h3").click(function () {
		$(this).next(".full-view").fadeToggle(200);
	});

	$(".option span").click(function () {
		$(this).addClass("active").siblings("span").removeClass("active");

		if ($(this).data("view") === "full") {
			$(".cat .full-view").fadeIn(200);
		} else {
			$(".cat .full-view").fadeOut(200);
		}
	});

	// Show Delete Button On Child Cats

	$(".child-link").hover(
		function () {
			$(this).find(".show-delete").fadeIn(400);
		},
		function () {
			$(this).find(".show-delete").fadeOut(400);
		}
	);
});

function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};

// change price when shipping method is changed
$(".shipping-option").change(function () {
	let shippingCost = parseFloat($(this).data("cost"));
	let productTotal =
		parseFloat($("#product-total").text().replace(",", "")) ;
	let finalTotal = productTotal + shippingCost;

	$("#shipping-total").text(shippingCost.toFixed(2));
	$("#final-total").text(finalTotal.toFixed(2));
});
