//styling code and js responsiveness

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
//Logo shadow
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



//Navbar Gradient on hover effect
$(document).mousemove(function(event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  
  mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
  
  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,  #06a6e6, #2c2b2b');
  $('.radial-gradient-home').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,  #fffbfb  , rgb(22, 219, 219), #085a7a');
});



//CLOCK
//Adding time
var min 
var hr
function dispTime() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  //day int to words
  var int_day = today.getDay();
  let day_obj = {
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
    7: "SUN",
  };
  var day = day_obj[int_day];


  //add zero to seconds
  if (seconds < 10) {
    var new_sec = "0" + seconds;
    seconds = new_sec;
  }
  //add zero to minutes
  if (minutes < 10) {
    var new_min = "0" + minutes;
    minutes = new_min;
  }
  //0th hour
  if (hours >= 0 && hours < 10) {
    var new_hour = "0" + hours;
    hours = new_hour;
  }

  document.getElementById("day").innerHTML = day;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes ;
  document.getElementById("second").innerHTML = seconds;



  if(min != minutes){ // change bgcolor of clock when min changed
    min = minutes

    $(".time-date").css("background-color", "whitesmoke")
    setTimeout(() => { $(".time-date").css("background-color", "#009ccc5b") }, 400)

  }
  if(hr != hours){ // change bgcolor of clock when hr changed
    hr = hours

    $(".time-date").css("background-color", "aquamarine")
    setTimeout(() => { $(".time-date").css("background-color", "#009ccc5b") }, 400)

  }
  
}

setInterval(dispTime, 10);




//Responsiveness and styling according to query

let query1 = window.matchMedia("(max-width: 600px)")
let query2 = window.matchMedia("(max-width: 1300px)")

if (query1.matches){  


  $(".home-body").css({top: "8rem"})
  console.log("matches")


  //flashnews area
  $("#second").hide()
  let tempDay = $("#day")
  let hiphen = $("#hiphen")
  let colon2 = $("#colon2")
  tempDay.remove()
  hiphen.remove()
  colon2.remove()
  $(".time-date").append(tempDay)

  //reload timedate div
  setInterval(() => {
    $(".time-date").load(".time-date")
  }, 1000);
  
    
  
  
}
else if(query2.matches){

  $(".home-body").css({top: "8.5rem"})

  //flashnews area
  $(".time-date").css({width : "18rem", wordSpacing: "-5px"})
  $(".flash-text-container").css({bottom: "6px"})

}
