
function turn_red() {
  //Function to turn the logo to a different color
  document.getElementById("logoImg").style.boxShadow =
    "3px 3px 3px 2px #FDB813";
}

function turn_grey() {
  //Function to turn the logo to a different color
  document.getElementById("logoImg").style.boxShadow =
    "3px 3px 3px 2px #656565";
}

// function TNT_in() {
//   //Function to add effects to initials/demo
//   const initials = document.getElementsByClassName("initials");
//   for (let i = 0; i < initials.length; i++) {
//     initials[i].setAttribute("style", "font-family: Cursive;");
//   }
// }

// function TNT_out() {
//   //Function to remove effects from initials/demo
//   const initials = document.getElementsByClassName("initials");
//   for (let i = 0; i < initials.length; i++) {
//     initials[i].setAttribute("style", "font-family: 'Rubik Glitch';");
//   }
// }




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



///////////////STYLING JS BELOW

// //Adding d-flex to website-name header when dom width is mobile width
// let w = window.innerWidth;
// if (w <= 450) {
//   let target = document.getElementById("website_name");
//   target.setAttribute("class", "d-flex");
// }

// //Adding effect to initails when in mobile width
// if (w <= 450) {
//   const init = document.getElementsByClassName("initials");

//   for (let i = 0; i < init.length; i++) {
//     init[i].setAttribute("onmouseover", "TNT_in()");
//     init[i].setAttribute("onmouseout", "TNT_out()");
//   }
// }

//try
function color(crypto){
  crypto.style.backgroundColor = "aquamarine";
}
function colorback(crypto){
  crypto.style.backgroundColor = "white";
}



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



