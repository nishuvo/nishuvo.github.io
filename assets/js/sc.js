//  smooth scroll for the whole website scrolling experience
$(document).ready(function() {
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// navigation before after scroll
$(function() {
  var nav = $(".navbar-default");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      nav.removeClass('navbar-default').addClass("nav-scrolled");
    } else {
      nav.removeClass("nav-scrolled").addClass('navbar-default');
    }
  });
});

// navigation active state on scroll
$(document).ready(function() {
  $(document).on("scroll", onScroll);

  //smoothscroll
  $('nav a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top + 2
    }, 500, 'swing', function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('.nav a').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.nav ul li a').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

// disapear navigation on mobile after click
$('.clickedNav').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// contact form actions (require jQuery validator)
// This requires jQuery and jQuery Validation Plugin (https://jqueryvalidation.org/)

$( "#contactform" ).validate({
  rules: {
    name: {
      required: true
    },
    email: {
      required: true,
      email: true
    }
  },
   submitHandler: function(form) {
        var form = $("#contactform"); // contact form
        var submitButton = $("#contactform--submit");  // submit button
        var response = $('#response'); // alert div for show alert message
    $.ajax({

      // url: "//formspree.io/testemail@test.com", //local
      url: "//formspree.io/nisgeek@gmail.com", //live
      method: "POST",
      data:  $("#contactform").serialize(),
      dataType: "json",

      beforeSend: function() {
        response.text('Sending....'); // change response text
      },
      success: function(data) {
        response.html('<i class="fas fa-check"></i> Message sent').fadeIn(); // fade in response data
        form.trigger('reset'); // reset form
      },
      error: function(e) {
        console.log(e);
        response.text('There was an error!'); // change response text
      }
    });

}// end submit handler
});




// get current year dynamically
document.getElementById("currentYear").innerHTML = new Date().getFullYear();
