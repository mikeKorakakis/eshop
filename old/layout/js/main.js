$(function () {
    "use strict";

    // Εναλλαγή μεταξύ Εισόδου & Εγγραφής
    $(".login-page h1 span").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".login-page form").hide();
        $("." + $(this).data("class")).fadeIn(100);
    });

    // Απόκρυψη του Placeholder κατά την εστίαση (Focus) στη Φόρμα
    $("[placeholder]")
        .focus(function () {
            $(this).attr("data-text", $(this).attr("placeholder"));
            $(this).attr("placeholder", "");
        })
        .blur(function () {
            $(this).attr("placeholder", $(this).attr("data-text"));
        });

    // Προσθήκη αστερίσκου σε υποχρεωτικά πεδία
    $("input").each(function () {
        if ($(this).attr("required") === "required") {
            $(this).after('<span class="asterisk">*</span>');
        }
    });

    // Μήνυμα επιβεβαίωσης στο κουμπί
    $(".confirm").click(function () {
        return confirm("Είστε σίγουροι;");
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

    // // Αν θέλετε να ενεργοποιήσετε SelectBoxIt
    // $("select").selectBoxIt({
    //     autoWidth: false
    // });

    // Απόκρυψη του Placeholder κατά την εστίαση (Focus) στη Φόρμα
    $("[placeholder]")
        .focus(function () {
            $(this).attr("data-text", $(this).attr("placeholder"));
            $(this).attr("placeholder", "");
        })
        .blur(function () {
            $(this).attr("placeholder", $(this).attr("data-text"));
        });

    // Προσθήκη αστερίσκου σε υποχρεωτικά πεδία (ξανά αν χρειάζεται)
    $("input").each(function () {
        if ($(this).attr("required") === "required") {
            $(this).after('<span class="asterisk">*</span>');
        }
    });

    // Μετατροπή πεδίου κωδικού σε πεδίο κειμένου κατά το hover
    var passField = $(".password");

    $(".show-pass").hover(
        function () {
            passField.attr("type", "text");
        },
        function () {
            passField.attr("type", "password");
        }
    );

    // Μήνυμα επιβεβαίωσης στο κουμπί (ξανά αν χρειάζεται)
    $(".confirm").click(function () {
        return confirm("Είστε σίγουροι;");
    });

    // Επιλογή Προβολής Κατηγορίας
    // $(".cat h3").click(function () {
    //     $(this).next(".full-view").fadeToggle(200);
    // });

    // $(".option span").click(function () {
    //     $(this).addClass("active").siblings("span").removeClass("active");

    //     if ($(this).data("view") === "full") {
    //         $(".cat .full-view").fadeIn(200);
    //     } else {
    //         $(".cat .full-view").fadeOut(200);
    //     }
    // });

    // Εμφάνιση κουμπιού Διαγραφής στις θυγατρικές κατηγορίες (child cats)
    $(".child-link").hover(
        function () {
            $(this).find(".show-delete").fadeIn(400);
        },
        function () {
            $(this).find(".show-delete").fadeOut(400);
        }
    );
});

// Dropdown για το Προφίλ
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Κλείσιμο dropdown εάν ο χρήστης κάνει κλικ εκτός από αυτό
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

// Αλλαγή τιμής όταν αλλάζει ο τρόπος αποστολής
$(".shipping-option").change(function () {
    let shippingCost = parseFloat($(this).data("cost"));
    let productTotal = parseFloat($("#product-total").text().replace(",", ""));
    let finalTotal = productTotal + shippingCost;

    $("#shipping-total").text(shippingCost.toFixed(2));
    $("#final-total").text(finalTotal.toFixed(2));
});
