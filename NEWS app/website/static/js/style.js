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
  
  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%,  rgba(13, 13, 14, 0.415), rgb(7, 202, 246)');
  // $('.radial-gradient-home').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #09cccc  , #1b1a1a');
});

//Home-body background video



// CLOCK
// Adding time
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

//headlines hovering effect
function Glowup(elem){
  let id = "#"+elem.id 

  
  
  
 
  
  $(id).css("transform" , "scale(1.1)")
  $(id).css("background-color" , "rgb(7 7 7 / 69%)")
  $(id).css("text-shadow", "2px 2px 8px aqua")

  if(id == "#head-news-title"){
    
    $(id).css("box-shadow", "1px 1px 7px 1px #ffffff")
   
  }
  else{
    
    $(id).css("box-shadow", "1px 1px 7px 1px grey")
    
  }
  
  
  
  $(id).mouseleave(function(){


    if(id == "#head-news-title"){
      $(id).css("box-shadow", "0px 1px 10px 2px rgb(12, 12, 12)")
      $(id).css("transform" , "scale(1)")
      $(id).css("background-color" , " rgba(1, 1, 1, 0.384)")
      $(id).css("text-shadow", "2px 3px 5px #080808")
    }
    else{
      $(id).css("box-shadow", "0px 1px 10px 2px rgb(12, 12, 12)")
      $(id).css("transform" , "scale(1)")
      $(id).css("background-color" , "#52505061")
      $(id).css("text-shadow", "2px 3px 5px #080808")
    }
      
        
    });

  
}


//IMAGES
const css = window.document.styleSheets[1];
css.insertRule(`
@keyframes focus {
  25% {box-shadow: 0px 2px 10px 2px grey;  } 
  50% {box-shadow: 0px 2px 15px 3px black;} 
  75% {box-shadow: 0px 1px 10px 2px grey;;} 
   
 }`, css.cssRules.length);



//Readmore section
css.insertRule(`
@keyframes fadeAnim {
 
  25% {
    text-shadow: 3px 3px 6px black; opacity: 0.5; transform: scale(1.6);
  }
  50% {
    text-shadow: 2px 2x 4px aquamarine; opacity: 1; transform: scale(1);
  }
  75% {
    text-shadow: 3px 3px 6px black; opacity: 1; transform: scale(1.6);
  }
   
 }`, css.cssRules.length);



//Images becomes fullscreen on click
var elements = document.getElementsByClassName('full-screen-hover');
let homeBody = document.getElementById("home-body");
const sectionElement = document.getElementById('display-zoomed-image');
setInterval(()=>{ //to continuously accumulate newly added news section
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', expandFullScreen);
  
  }

}, 1000)

function removeAppendedImg(){ //remove image from 'display-zoomed-image' section
  sectionElement.style.display = "none";
  sectionElement.innerHTML = "";

  homeBody.style.filter = "blur(0px)";
  homeBody.style.pointerEvents = ""

}

function expandFullScreen() {
  // console.log("clicking " +  this.src );

  //Hide and unhide full-screen-hover section accordingly // note - this works the other way since this is happening before the appending
  
  let template = `<img id="appendedImg" onclick="removeAppendedImg()" src='${this.src}' alt="" />`;  
  sectionElement.style.display = "block";
  document.getElementById("home-body").style.filter = "blur(6px)";
  sectionElement.innerHTML += template;
  homeBody.style.pointerEvents = "none";



}


//Search section

$("#searchText").on({
  
  click: function(){
 
    $('#searchText').attr('placeholder', 'Type Something');

    if (window.matchMedia("(max-width: 600px)").matches) { /*If mobile window . scroll search section to middle on click */
      var searchTextElement = document.getElementById("searchText");
      var viewportHeight = window.innerHeight;
      var elementTop = searchTextElement.getBoundingClientRect().top;
      var desiredScrollPosition = elementTop - (viewportHeight /4) + (searchTextElement.offsetHeight / 1);
      
      window.scrollTo({
          top: desiredScrollPosition,
          behavior: "smooth"
      });
  }
    
  },


 

  keypress: function(){
    
    $(this).css("background", "white").css("opacity", "1");

    if($('#searchText').val() == ""){
      $('#searchText').attr('placeholder', 'Search Headline..');
    }
    else{
      console.log($('#searchText').val())
      
    } 
    
    
    
  },

  focus: function(){
    $(this).css("outline", "none");
    
  },


  
});


$("#searchText").on('click', () => {
  
})





//crypto search section

$("#Searchcrypto").on({
  mouseenter: function(){
    $(this).css("background-color", "white").css("opacity", "1");
  },
  mouseleave: function(){
    $(this).css("background-color", "white").css("opacity", "0.85");
  },
  dblclick: function(){
    $(this).css("background", "linear-gradient(yellow, orange, aqua)").css("box-shadow", "0px 1px 8px 1px white");
  },
  keypress: function(){
    $(this).css("background", "white");
  }
});

//Crypto close button
const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'brown';
    this.style.color = 'black';
});

closeButton.addEventListener('mouseout', function() {
    this.style.backgroundColor = '#5c9ba3';
    this.style.color = 'black';
});

//cryptos On hover

const lightUpCryptos = (crypto_div, onOrOff) => {
  const appendDetails = crypto_div.querySelector('.append-details');


  if (appendDetails.childNodes.length == 1 || appendDetails.childNodes.length == 0) { //checks if empty : default =1 ; after one expansion =0
    if (onOrOff === 'on') {
      crypto_div.style.filter = 'brightness(400%)';
    } else {
      crypto_div.style.filter = 'brightness(200%)';
    }
  }else {
    if (onOrOff === 'on') {
      crypto_div.style.backdropFilter = " brightness(400%)"
    } else {
      crypto_div.style.backdropFilter = "";
    }
   
  }
};

// Call the function to apply the hover effect








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


  
 

 
  
    
  
  
}
else if(query2.matches){

  $(".home-body").css({top: "8.5rem"})

  //flashnews area
  $(".time-date").css({width : "18rem", wordSpacing: "-5px"})
  $(".flash-text-container").css({bottom: "6px"})

}

$("#search-results").show()



//FOOTER
function changeShadow(icon){
  icon.style.transform = "scale(1.5)"
  icon.style.color = "aquamarine"
  
}

function changeBack(icon){
  icon.style.transform = "scale(1)"
  icon.style.color = "white"
}


function highlightAboutUs(){
  setTimeout(function(){
    $('#aboutUSsec').css({transition: "background-color 1.5s"})
    $('#aboutUSsec').css({backgroundColor: "lime"})
  },1000)

  setTimeout(function(){
    $('#aboutUSsec').css({backgroundColor: "black"})
  },2000)
  
}


function highlightTalkwithUs(){
  setTimeout(function(){
    $('#contactUsSec').css({transition: "background-color 1.5s"})
    $('#contactUsSec').css({backgroundColor: "lime"})
  },1000)

  setTimeout(function(){
    $('#contactUsSec').css({backgroundColor: "black"})
  },2000)
}


// Scrollbar in Mobile/Tab view
// Check if the screen width is 800px or less
if (window.innerWidth <= 1400) {
  // Create a style rule for the scrollbar
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
      /* Style for scrollbar */
      ::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
      }

      ::-webkit-scrollbar-thumb {
          background-color: #888; /* Color of the scrollbar thumb */
      }
  `;
  
  // Append the style rule to the head element
  document.head.appendChild(style);
}

// focus images animation
function FocusUp(img){

  img.style.animation = "focus 2s infinite"

  

}
function FocusDown(img){


  img.style.animation = "None";
  // img.style.opacity = 0.65 ;

}

