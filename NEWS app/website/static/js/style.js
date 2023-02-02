//styling code

//form validation
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


function turn_red() {
  //Function to turn the logo to a different color
  document.getElementById("logoImg").style.boxShadow =
    "1px 1px 10px 1px aqua";
}

function turn_grey() {
  //Function to turn the logo to a different color
  document.getElementById("logoImg").style.boxShadow =
    "3px 3px 3px 2px #656565";
}


//Adding time
function dispTime() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var meridiem = "";
  if (hours < 12) {
    var meridiem = "AM";
  } else {
    var meridiem = "PM";
  }

  //day int to words
  var int_day = today.getDay();
  let day_obj = {
    1: "MON,",
    2: "TUE,",
    3: "WED,",
    4: "THU,",
    5: "FRI,",
    6: "SAT,",
    7: "SUN,",
  };
  var day = day_obj[int_day];

  //add 0 to hours and make 12 hour format
  if (hours > 12) {
    var new_hours = hours - 12;
    var hours = "0" + new_hours;
  }

  //add zero to seconds
  if (seconds < 10) {
    var new_sec = "0" + seconds;
    var seconds = new_sec;
  }
  //add zero to minutes
  if (minutes < 10) {
    var new_min = "0" + minutes;
    var minutes = new_min;
  }

  document.getElementById("day").innerHTML = day;
  document.getElementById("hour").innerHTML = hours + ":";
  document.getElementById("minute").innerHTML = minutes + ":";
  document.getElementById("second").innerHTML = seconds;
  document.getElementById("meridiem").innerHTML = meridiem;
}

// TimeAndDate
setInterval(dispTime, 10);


//Navbar Gradient on hover effect
$(document).mousemove(function(event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  
  mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
  
  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #57abe4, #302f30)');
});






