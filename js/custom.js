// typing
$(function () {
  $(".type").typed({
    strings: ["create.", "design.", "code.", "solve.", "dream."],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
  });
});

// particles
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 160,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#999999"
      },
      "shape": {
        "type": ["star", "circle"],
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0.2,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

);


// flexslider
$(window).load(function () {
  $('.flexslider').flexslider();
});

$(document).ready(function () {
  // load projects from projects.json
  $.getJSON("js/projects.json", function (data) {
    console.log(data);
    // var items = [];
    // $.each(data, function (key, val) {
    //   items.push("<li id='" + key + "'>" + val + "</li>");
    // });

    // $("<ul/>", {
    //   "class": "my-new-list",
    //   html: items.join("")
    // }).appendTo("body");
  });

  // click send button
  $("#contact-send").click(function () {
    var name = encodeURIComponent($("#contact-name").val());
    var subject = encodeURIComponent($("#contact-subject").val());
    var message = encodeURIComponent($("#contact-message").val());
    window.location.href = "mailto:me@yolandaz.com?subject=" + subject + "&body=" + message + "%0A%0A" + name;
  });

  // smooth scrolling
  $('#nav a').click(function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
  });

  // view header when goes into view & scrollspy
  var aboutSection = new Waypoint({
    element: $('#about')[0],
    handler: function (direction) {
      if (direction === "down") {
        $("#nav").removeClass("animated");
        $("#nav").addClass("visible");
        $("#nav-container a").removeClass("active");
        $("#nav-about").addClass("active");
      } else {
        $("#nav").removeClass("visible");
      }
    },
    offset: 50
  });

  // scrollspy for the rest of them
  var aboutSection = new Waypoint({
    element: $('#experience')[0],
    handler: function (direction) {
      if (direction === "down") {
        $("#nav-container a").removeClass("active");
        $("#nav-" + this.element.id).addClass("active");
      } else {
        $("#nav-container a").removeClass("active");
        $("#nav-" + this.element.id).prev().addClass("active");
      }
    },
    offset: 50
  });
  var aboutSection = new Waypoint({
    element: $('#contact')[0],
    handler: function (direction) {
      if (direction === "down") {
        $("#nav-container a").removeClass("active");
        $("#nav-" + this.element.id).addClass("active");
      } else {
        $("#nav-container a").removeClass("active");
        $("#nav-" + this.element.id).prev().addClass("active");
      }
    },
    offset: 50
  });

  // project expanders
  $('.project-item').click(function () {
    // select correct expander
    var expander = $("#" + $(this).attr("data-ex"));

    // if clicked the open item, close it
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      expander.removeClass("open");
    } else {
      // if not, close all
      $(".project-item").removeClass("open");
      $(".project-expander").removeClass("open");

      // move expander to right place
      var containerWidth = $("#project-container").width();
      var projectWidth = $(".project-item").width();
      var itemsPerRow = Math.floor(containerWidth / projectWidth);
      var projectIndex = $(this).index(".project-item") + 1;
      var numProjects = $('.project-item').length;
      var insertIndex = Math.ceil(projectIndex / itemsPerRow) * itemsPerRow - 1;
      if (insertIndex >= numProjects) {
        insertIndex = numProjects - 1;
      }
      var insertAfterItem = $(".project-item:eq(" + insertIndex + ")");

      expander.insertAfter(insertAfterItem);

      // fixth width and positioning
      expander.width($(window).width() - expander.css("padding-left").replace("px", "") - expander.css("padding-right").replace("px", ""));
      expander.css("margin-left", -($(window).width() - $("#project-container").width()) / 2);

      // display expander
      $(this).addClass("open");
      expander.addClass("open");

      // jump bottom of page to bottom of expander
      $('html, body').animate({
        scrollTop: expander.offset().top + expander.outerHeight() - $(window).height()
      }, 500);
    }
  });
});