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
  $('.radial-gradient-home').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #09cccc  , #1b1a1a');
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
  if(day == undefined || day == null){
    day = "--"
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


//Main headline area

//headline
function Glowup(elem){
  let id = "#"+elem.id 
  
  $(id).css("color", "aqua")
  $(id).css("background" , "linear-gradient( #3B9DEA, black)")
  $(id).mouseleave(function(){
    $(id).css("color", "#daf6fc");
    $(id).css("background" , "linear-gradient(rgba(0, 0, 0, 0.562), rgba(0, 182, 228, 0.384))")
    
  });

  
}

//IMAGES
const css = window.document.styleSheets[1];
css.insertRule(`
@keyframes focus {
  25% {box-shadow: 0px 2px 15px 9px black;  } 
  50% {box-shadow: 0px 2px 15px 9px rgb(80, 78, 78);} 
  75% {box-shadow: 0px 1px 10px 7px black;;} 
   
 }`, css.cssRules.length);

css.insertRule(`
@keyframes fadeAnim {
  25% {text-shadow: 1px 1px 4px red; opacity: 1} 
  50% {text-shadow: 2px 2px black;} 
  75% {text-shadow: 4px 2px 4px red; opacity: 0.2} 
   
 }`, css.cssRules.length);


function FocusUp(img){

  img.style.animation = "focus 2s infinite"
  img.style.opacity = 1 ;
  

}
function FocusDown(img){


  img.style.animation = "None";
  img.style.opacity = 0.65 ;

}

//Readmore section
function FadeReadLater(rmore){
  rmore.style.animation = "fadeAnim 2s infinite"

}
function FadestopReadLater(rmore){
  rmore.style.animation = ""

}


//Search section



$("#searchText").on({
  mouseenter: function(){
    $(this).css("background-color", "white").css("opacity", "1");
  },
  mouseleave: function(){
    $(this).css("background-color", "white").css("opacity", "0.85").css("box-shadow" , "0px 4px 10px 1px black");
  },
  dblclick: function(){
    $(this).css("background", "linear-gradient(yellow, orange, aqua)").css("box-shadow", "0px 1px 8px 1px white");
  },
  keypress: function(){
    $(this).css("background", "white");
  }
});





//Responsiveness and styling according to query

let query1 = window.matchMedia("(max-width: 600px)");
let query2 = window.matchMedia("(max-width: 1300px)");

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

$("#search-results").show()