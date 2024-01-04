var default_data ;  //default news data
var blockchain_data ;  //default news data
var c_list
var user
var def = "def";
var block = "block"
let logoutTemp = '<a class="nav-link " id="clicksignup" href="/log-out"><i class="fa-solid fa-right-to-bracket " ></i>Logout</a>'
let togglerTreeTemp = '<i id="toggler" class="fa-solid fa-tree fa-4x"></i></i>'
let togglerLeafTemp = '<i id="toggler" class="fa-brands fa-pagelines fa-4x"></i>'

const c_append_track = {
  startId : 30
}
localStorage.setItem('c_append_track', JSON.stringify(c_append_track))

//if no images there , replace with NO-IMaGE image
function CheckImages(){ //Check images everytime new news tabs are added//Function runs while tabs appending

  // console.warn("Checking Images")
  // Select all img elements within containers with empty src
  var mainHeadlineImgs = document.querySelectorAll('.main-headline-container img[src=""]');
  var otherHeadImgs = document.querySelectorAll('.Other-head-container img[src=""]');
  var web3headlineImgs = document.querySelectorAll('web3News-section img[src=""]');

  // URL for the default image
  var defaultImageUrl = 'https://cdn.vectorstock.com/i/1000x1000/88/26/no-image-available-icon-flat-vector-25898826.webp';

  
  mainHeadlineImgs.forEach(function(img) {
      img.src = defaultImageUrl;
      img.classList.add("null-image")
  });
  otherHeadImgs.forEach(function(img) {
      img.src = defaultImageUrl;
      img.classList.add("null-image")
});
  web3headlineImgs.forEach(function(img) {
      img.src = defaultImageUrl;
      img.classList.add("null-image")
});

  
  // // Loop through each image
  // imgElements.forEach((image, index) => {
  //     // console.log(`Image ${index + 1}: ${image.src}`);
  //     console.log(image.src)
  //     if(image.src == "http://127.0.0.1:5000/null" ){
  //      
  //       image.
  //     }
      
  // });

}
// CheckImages();

async function getData(){$(function() { // <---  document.ready
  CheckImages();
  fetch('/getAlldata')   //<---  fetching data from backend using fetch api when the DOM is ready
  .then(async (response) => await response.json())
  .then(async(data) => {
    default_data = await data['def-data'];
    blockchain_data = await data['block-data'];
    c_list = await data['c-list'];
    user = await data['user']
    
    }) 
    .then(async() => {
      await $('div:not(#loader)').show();
      await $('#loader').hide();
      $('#search-results').hide();
      if(user){
      $("#clicksignup").hide();
      $("#login-button").append(logoutTemp) //add logout in place of login if user is found
      } })
    
  
  
});}


$('div:not(#loader)').hide();
setTimeout(getData, 2000)

//Hiding and Unhiding Navbar on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  function isAtTop() {
    return window.scrollY === 0;
  }
    
  if (prevScrollpos > currentScrollPos) {  //scrolling up
    //Dont unhide Novbar if the screen isnt at the top
    if (isAtTop()) {
      //unhide
      document.getElementById("navbar").style.top = "0";
      $("#navbar").fadeIn(900)
      $("#home-body").css("top", "9rem")
    }
   

  } else {  //scrolling down
    //hide
    document.getElementById("navbar").style.top = "-100px";
    $("#navbar").fadeOut(900)
    $("#home-body").css("top", "7.1rem")

  }
  prevScrollpos = currentScrollPos;
}


//Manual operate AlertArea
function manualFlash(textMsg){
  var targetDiv = document.getElementById("navBar");
  // Use insertAdjacentHTML to append content after the target div
  targetDiv.insertAdjacentHTML('afterend', '<div class="alertArea alert alert-danger alert-dismissible"  style="overflow: auto ; z-index: 9;"><button type="button" class="btn-close" data-bs-dismiss="alert"></button><h6 id="alertMsg"> '+ textMsg +' </h6></div>');
  setTimeout(()=>{
    $(".alertArea").fadeOut(2000)
  }, 2000)

}

//AJAX TO BACKEND to add readlaters 
function AppendToRL(id, section){

  // console.log("Running")
  $.ajax({
    url: '/AddToReadlater',
    data: JSON.stringify({"id" : id, "section": section}),
    type: 'POST',
    success: function(response){

      if(typeof(response) == 'string'){

        var ifHTML = response.includes('<!DOCTYPE html>') //to check if the route is returning the login page because of @login-reqd
        if (ifHTML){
          alert("PLEASE SIGNUP")
          location.replace('/sign-up')
        }
      }
      else{
        
      //send alert response after adding
      let message = response['status']
      manualFlash(message)
  
      }
      
      
    },
    error: function(error){
      console.log(error);
      alert(response['status'])
    }
  });
}


//Appending data to Default data section
var def_start_count = 0;

$( "#loadmoreOther" ).on("click", function() {

       
    def_start_count += 6;
    for(i = def_start_count; i <= def_start_count + 5 ; i++ ){ 
      
      

      //edit and add templates
      
     default_news_temp =  '<div class="news-section">'+ 
     '<div class="row">'+
          '<div class="col-12">'+
            '<h3 id="otherheader'+i+'" class="headers-title" onmouseenter="Glowup(this)"><a href="#"  >' + default_data[i]["title"] +'</a></h3>'+
            '<div class="other-news-description headers-desp">'+
              ''+default_data[i]["description"]+''+
            '</div>'+
            '<div class="other-readmore-container  d-flex flex-row mb-3 justify-content-between">'+

              '<span class="other-read-more flex-grow-1"><a  class="p-2" href='+ default_data[i]["link"] +'  ><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></span> '+
              '<span class="other-visit-original "><a onclick="ShareThis(def, '+ i +')" class="p-2" href="#"><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)"  class="fa-solid fa-share fa-2x" data-toggle="tooltip" data-placement="bottom" title="Share this now!" ></i></a></span>'+
              '<span class="other-read-later " ><a class="p-2"  onclick= "AppendToRL('+i+',def)" ><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa fa-floppy-o fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later"></i></a></span> '+

            '</div>'+
          '</div>'+
          '<div id="otherImg'+i+'" class="col-4 new-img-demo ">'+           
              '<img class="full-screen-hover" onmouseover="FocusUp(this)" onmouseleave="FocusDown(this)" src='+ default_data[i]["image-link"] +' alt="" />'+

          '</div>'+
        '</div>'+
     '</div>'  




      $("#append-more-def-news").append(default_news_temp)  //<--- To-Do do animation while appending
      
    } 
    CheckImages();    
  });





//Appending data to block data section
var block_news_count = 0

$( "#loadmoreBlock" ).on("click", function() {
  block_news_count += 6;

  for(i = block_news_count; i <= block_news_count + 5 ; i++ ){
  //edit and add templates
    block_news_temp = '<div class="blockchain-news-section"><div class="row"><div class="col-12"><h3 id="blockchainheader'+i+'" class = "headers-title" onmouseenter="Glowup(this)"><a href="#">'
    + blockchain_data[i]["title"] + '</a></h3></div><div class="blockchain-news-description headers-desp">'
    + blockchain_data[i]['description'] + '</div>'+
    '<div class="block-readmore-container d-flex flex-row mb-3">'+
          '<span class="block-read-more flex-grow-1 "><a  class="p-2" href='+ blockchain_data[i]["link"] +'  ><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></span> '+
          '<span onclick="ShareThis(block, '+i+')" class="block-visit-original"><a class="p-2" href="#"><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)"  class="fa-solid fa-share fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!" ></i></a></span>'+
          '<span class="block-read-later " ><a class="p-2"  onclick="AppendToRL('+i+',block)"> <i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa fa-floppy-o fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later."> </i></a></span> '+
    '</div>'+
    '<div id="" class="col-4 web3-images"><img class="full-screen-hover" onmouseover="FocusUp(this)" onmouseleave="FocusDown(this)" src='+ blockchain_data[i]["image-link"] + ' alt="" /></div>'


  $("#append-more-block-news").append(block_news_temp); //<--- To-Do do animation while appending
  };


 
})


//Searching

function  search(){
  $("#appendSearch").text("")
  let TempsearchingIcon = '<div class="lds-hourglass searching"></div>'  //searching loader
  $("#appendSearch").append(TempsearchingIcon)

  setTimeout(() => {
    $("#appendSearch").text("") 
    searchText = $('#searchText').val().toUpperCase() //get search data

    // adjust dom and open box
   
    let maxTabwid =   window.matchMedia("(max-width: 1200px)")
    let maxMobwid =   window.matchMedia("(max-width: 700px)")

    $(".other-headline-container").css("transition", "all 1s")
    $('#search-results').fadeIn()
    $('#close-search').show()

    if (maxMobwid.matches){ //mobile
      $(".other-headline-container").css("top", "-20rem")    
    }
    else if (maxTabwid.matches){ //tablet
      $(".other-headline-container").css("top", "-21rem")
    }

    else{ //default  
      $(".other-headline-container").css("top", "1.5rem")
    }
    

    //If value is empty - re-adjust
    if($("#searchText").val() == "")
      {
          $(".other-headline-container").css("transition", "all 1s")
          $("#search-results").fadeOut()
          $("#close-search").hide()

          let maxTabwid =   window.matchMedia("(max-width: 1200px)")
          let maxMobwid =   window.matchMedia("(max-width: 700px)")
          if (maxMobwid.matches){ //mobile
            $(".other-headline-container").css("top", "-22.5rem")    
          }
          else if (maxTabwid.matches){ //tablet
            $(".other-headline-container").css("top", "-23rem")
          }
      
          else{ //default  
            $(".other-headline-container").css("top", "0rem")
          
          }
          $("#searchText").css("background-color", "#18acc3").css("opacity", "0.85").css("box-shadow" , "0px 4px 10px 1px black");
      
      
      }
      


    //function to search in the titles 
    function searchInTitle(data, listNm){ 

      for(i = 0; i < data.length; i++){
        let theTitle = data[i]["title"].toUpperCase() 
        if (theTitle.includes(searchText)){  
          //create temporary div to append

          var title = data[i]["title"]          
          var link = data[i]['link']
          var tempDivSearch = '<div class="container search-return" ><h4 class="search-titles">' + title + '<a href="'+ link +'"><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right search-readmore-icon" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></h4></div>'
          $("#appendSearch").append(tempDivSearch)
          
    
        }
        
      }
    
    }

    // call above function twice for two different data inputs
    searchInTitle(default_data, "def")
    searchInTitle(blockchain_data, "block")

    if( $("#appendSearch").children().length == 0){
      let NoTitleFound = "<div id='NoTitleFound'>No such title found. Please retry </div>"
      $("#appendSearch").append(NoTitleFound)
    }



  }, 500)

 
}



$("#searchText").on("keydown", function(event) {

  if($('#searchText').val() !== ""){
    $('#searchText').attr('placeholder', 'Backspace again to close!');
     //add alternate placeholder color class
    const input = document.getElementById("searchText");
    input.classList.add("focused-input");

    
  }


  // Check if the pressed key is the backspace 
  if (event.key === "Backspace" || event.keyCode === 8) {
    // Backspace key is pressed
    console.log($('#searchText').val())
  
    //if searchtext area becomes empty close search section
    if($('#searchText').val() == ""){

      //if searchtext is backspaced to empty perform readjustment of divs

      $("#appendSearch").text("")
      $(".other-headline-container").css("transition", "all 2s")
      $("#search-results").fadeOut()
      $("#close-search").hide()
      
      let maxTabwid =   window.matchMedia("(max-width: 1200px)")
      let maxMobwid =   window.matchMedia("(max-width: 700px)")

      if (maxMobwid.matches){ //mobile
        $(".other-headline-container").css("top", "-22.5rem")    
      }
      else if (maxTabwid.matches){ //tablet
        $(".other-headline-container").css("top", "-23rem")
      }
  
      else{ //default  
        $(".other-headline-container").css("top", "0rem")
      
      }
      
      $("#searchText").css("background", "linear-gradient(to bottom right, #dc3545, black)").css("opacity", "0.85").css("box-shadow" , "0px 4px 10px 1px black");
      $('#searchText').attr('placeholder', 'Search Headline..');
      //remove alternate placeholder color class
      const input = document.getElementById("searchText");
      input.classList.remove("focused-input"); 
     
    }
  }
  else{
    
    search() //Perform search when kepressed except backspace
  
    
  }
});



//close search button
$("#close-search").on("click", function(){

  $(this).hide()
  $("#searchText").val("")
  $("#search-results").fadeOut()
  $("#close-search").hide()
  $(".other-headline-container").css("transition", "all 1s")

  let maxTabwid =   window.matchMedia("(max-width: 1200px)")
  let maxMobwid =   window.matchMedia("(max-width: 700px)")

  if (maxMobwid.matches){ //mobile
    $(".other-headline-container").css("top", "-22.5rem")    
  }
  else if (maxTabwid.matches){ //tablet
    $(".other-headline-container").css("top", "-23rem")
  }

  else{ //default  
    $(".other-headline-container").css("top", "0rem")
  
  }
  $("#searchText").css("background", "linear-gradient(to bottom right, #dc3545, black)").css("opacity", "0.85").css("box-shadow" , "0px 4px 10px 1px black");
  $('#searchText').attr('placeholder', 'Search Headline..');
  //remove alternate placeholder color class
  const input = document.getElementById("searchText");
  input.classList.remove("focused-input"); 
 
})



//AJAX TO BACKEND to remove readlater
$('#emptyTag').hide()
function RemoveFromRL(id){
  // confirm('Are you sure?')
  $.ajax({
    url: '/removeReadlater',
    data: JSON.stringify({"newsId" : id}),
    type: 'POST',
    success: function(){
      var secToremove = '#newsListId'+id


      $(secToremove).css("transition", "transform 2s")
      $(secToremove).css('transform', 'rotate(90deg)')
      $(secToremove).fadeOut()
      setTimeout(function(){
        $(secToremove).remove()
        // check if my-readlaters is empty
        let readlaterLength = ($('#my-readlaters').children()).length
        if (readlaterLength == 0){
          $('#emptyTag').fadeIn()
          $('#my-readlaters').css('top', '11.5rem')
         
        }
      }, 1000)


      
    },
    error: function(error){
      console.log("Some unknown error ");
    }
  });
}

// check if my-readlaters is empty
let readlaterLength = ($('#my-readlaters').children()).length
if (readlaterLength == 0){
  $('#emptyTag').show()
}



// Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//Menu toggle button
var ToggleOn = false

function ToggleMenu(){
  if(ToggleOn){
    //hide menu /closing
    ToggleOn = false
    $(".nav-item").fadeOut(1000)
    $(".navbar").animate({height: '7rem'}, 1000)
    $(".logo-container").css({height: "6rem"})
    $("#logoImg").animate({width: "138px"})
    $(".home-body").animate({top: '9rem'}, 1200)


    //tree
    $("#toggler").fadeOut()
    $("#toggler").remove()
    $("#togglerLink").append(togglerLeafTemp)
    $("#toggler").fadeIn()

    

    let query1 = window.matchMedia("(max-width: 600px)")
    let query2 = window.matchMedia("(max-width: 1300px)")
    console.log(query1.matches)

    
    
    if(query1.matches){//if closing and maxwidth is 600px
      $("#nav-toggler").animate({bottom: "0.2rem"}, "fast")
      console.log("query 1 matches")
      $("#logoImg").animate({width: "120px"})
      //navbar
      $(".nav-item").hide()
      $(".navbar").animate({height: '7.7rem'}, 100) //readjusting navbar
      $(".home-body").animate({top: "8.7rem"}, 1000)
      
      //tree
      $("#toggler").hide()
      $("#toggler").fadeIn(3000)
      
    }   
    else if(query2.matches){ //if closing and maxwidth 1300 

      $("#nav-toggler").animate({bottom: "-2.4rem"}, 100)
      $(".navbar").animate({height: '7.5rem'}, 100) //readjusting navbar
      $(".home-body").animate({top: "8.7rem"}, 1000)

      console.log("query 2 matches")
      
      $("#toggler").fadeOut()
      $("#toggler").fadeIn(4000)


    }

    
  }
  else{
    //unhide menu /opening
    ToggleOn = true
    $(".nav-item").fadeIn(1000)
    $(".navbar").animate({height: '15rem' }, 1000)
    $(".logo-container").css({height: "3rem"})
    $("#logoImg").animate({width: "100px"})
    $(".home-body").animate({top: '15.6rem'})

    



    let query1 = window.matchMedia("(max-width: 600px)")
    let query2 = window.matchMedia("(max-width: 1300px)")
    console.log(query1.matches)

    
    
    if(query1.matches){//if opening and maxwidth is 600px
      console.log("query 1 matches")
      
      //adjust navitems
      $("#whoAreWe").css({position: "relative", top: "3rem"})
      $("#talkWithUs").css({position: "relative", top: "4rem"})
      $("#r-laterButton").css({position: "relative", top: "-4.4rem", right: "-13rem"})
      $(".logo-container").css({height: "3rem", top: "0rem"})
      $('.navbar-nav').css({left: '0.8rem'})
      $("#nav-toggler").css({bottom: "9rem", right: '2.5rem'})

      //toggler/tree
      $("#toggler").remove()
      setTimeout(() => { $("#togglerLink").append(togglerTreeTemp)},1500)
   
      
        

    }  
    else if(query2.matches){//if opening and maxwidth is 1300px
      $("#nav-toggler").animate({bottom: "-1rem"}, "slow")
      $("#login-button").css({right: "24rem", top: "4rem"})
      $(".l1").css({position: "relative", top: "-1rem"})

      //toggler/tree
      $("#toggler").fadeOut()
      $("#toggler").remove()
      setTimeout(() => { $("#togglerLink").append(togglerTreeTemp)},1000)
      setTimeout(() => { $("#toggler").fadeIn()},2000)
      

    }
    
    
  }
}




///Share Area
function copyToClipboard() {
  const copyText = document.getElementById("copy-input").value;
  navigator.clipboard.writeText(copyText)
    .then(() => {
      alert("Copied link: " +   copyText);
    })
    .catch((error) => {
      console.error("Unable to copy text: ", error);
    });
}

function ShareThis(section, number){
  var url = ''
  section= section ; 
  number = number;
  console.log("clicking and sharing")

  fetch('/share/'+section+'/'+number) //get link
  .then(response => response.json())
  .then(data => url = data['URL'])
  .then(url => {

    

      //custom share tab
    const customShareTab = `
    <div class="share-buttons">
       
      <a href="https://api.whatsapp.com/send?text=CheckItOut: ${encodeURIComponent(url)}" target="_blank" rel="noopener" class="share-button whatsapp">
        <i class="fab fa-whatsapp fa-2x"></i>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="share-button facebook">
        <i class="fab fa-facebook-f fa-2x"></i>
      </a>
      <a href="https://twitter.com/share?url=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="share-button twitter">
        <i class="fab fa-twitter fa-2x"></i>
      </a>
      <a href="https://www.instagram.com/share?url=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="share-button instagram">
        <i class="fab fa-instagram fa-2x"></i>
      </a>
      <div class = "copytoClip">
        <input type="text" id="copy-input" value="${url}
        ">
        <button class="btn copy-button" onclick="copyToClipboard()">Copy</button>
      </div>

      <span onclick= "closeSearch()" class="close-search" data-toggle="tooltip" data-placement="right" title="Close!"><i class="fa-brands fa-xbox"></i></span>
    
    </div>
    `;

    let ele = document.getElementById('shareTab');
    ele.classList.toggle('visible'); // toggle visibility
    ele.setAttribute("style", "display: fixed !important")
    $('#shareTab').fadeIn()
  
  
    const targetElement = document.getElementById('shareTab');
    targetElement.innerHTML = customShareTab;

  })
  .catch(error => console.error(error));


}
function closeSearch(){
  let ele = document.getElementById('shareTab');
    ele.classList.toggle('visible'); // toggle visibility
    $('#shareTab').fadeOut()
}


//prevent share tab from opening at default location and ahref pointing to it causing to scroll top by default// Share tab appears wherever screen is
const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.exclude-from-prevDef)');  //:not() will exclude this effect to the selected
anchorLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});



// Sticky Plane Icons
const container = document.querySelector('#Other-head-container');
const icon = document.querySelector('#scrollBottomOther');

container.addEventListener('scroll', () => {
  const scrollPosition = container.scrollTop;
  icon.style.transform = `translateY(${scrollPosition}px)`;
});



//Scrolling buttons and Loadmore buttons //chamge this
$("#scrollBottomOther").click(() => {
  let appNewsLen = $("#append-more-block-news").children().length
  if(appNewsLen == 0){
   
    document.getElementById("otherheader5").scrollIntoView(true)
  }
  else{
    let appNewsLen = $("#append-more-def-news").children().length
    const newNum = appNewsLen + 5
    let id = "otherheader"+newNum 
    document.getElementById(id).scrollIntoView(true)

  }
})

$("#scrollTopOther").click(() => {
  
  
  let id = "otherheader1"
  document.getElementById(id).scrollIntoView(true)

 
})

//add for #scrollTopBlock


$("#scrollBottomBlock").click(() => {
  let appNewsLen = $("#append-more-def-news").children().length
  if(appNewsLen == 0){
   
    document.getElementById("blockchainheader5").scrollIntoView(true)
  }
  else{
    let appNewsLen = $("#append-more-block-news").children().length
    const newNum = appNewsLen + 5
    let id = "blockchainheader"+newNum 
    document.getElementById(id).scrollIntoView(true)

  }
})


// Crypto Section 
function ExpandDetails(crypto_div){
  let TheElem = crypto_div.id

 
  // console.log(TheElem)
  //Make "Close All" button visible
  $("#closeButton").fadeIn(1000)


  for(i in c_list){
    if(c_list[i]['asset_id'] == TheElem){

      var dataItem = c_list[i]

      //Expand the div 
      let TheId = "#"+crypto_div.id
      $(TheId).css("transition", "height 1.8s ease, border 1.8s ease-in, border-radius 1.8s ease, backdrop-filter 1s ease-out");
      $(TheId).css("height", "20rem");
      $(TheId).css("border", "2px solid whitesmoke");
      $(TheId).css("border-radius", "0 2rem");
      $(TheId).css("filter", "brightness(100%)");
      

      //readjust Name during transition
      $(TheId).children(".asset_ID").css("transition", "top 1s, color 3s, text-shadow 2s");
      $(TheId).children(".asset_ID").css('top', '7px');
      $(TheId).children(".asset_ID").css('color', ' #0ee2e6');
      $(TheId).children(".asset_ID").css('text-shadow', '0px 2px 1px whitesmoke');  

      // add tooltip when opened
      $(TheId).prop('title', 'Double click to close');
      
   
      let OnehrTrade = dataItem["volume_1hrs_usd"];
      let OnedayTrade = dataItem["volume_1day_usd"];
      let OnemonthTrade = dataItem["volume_1mth_usd"];
      let Price = dataItem["price_usd"]
      let reModPrice = Math.round((Price + Number.EPSILON) * 100) / 100;
      let startedDate = dataItem["data_start"];


      let price = '<div class = "price"> <span style="color: green">$</span> '+ reModPrice +' </div>';
      let Onehr = '<div class = "OnehrVol"> <span class= "cryptodetailsHeads"> 1H-</span><span class="detailValues"> '+ OnehrTrade +'</span> </div>';
      let Oneday = '<div class = "OnedayVol"> <span class= "cryptodetailsHeads">1D-</span><span class="detailValues">'+ OnedayTrade +' </span></div>';
      let Onemon = '<div class = "OnemonthVol"> <span class= "cryptodetailsHeads">1M-</span><span class="detailValues"> '+ OnemonthTrade +'</span></div>';
      let ProjectStart = '<span class = "start-date"> Started At: '+ startedDate + '</span>';
      


      //since fading out when closing the div
      let appendplaceID = "#appendDetails"+crypto_div.id
      $(appendplaceID).fadeIn(100)  
      
      
      if($(appendplaceID).children().length == 0){
        $(appendplaceID).append(price)      
        $(appendplaceID).append(Onehr)           
        $(appendplaceID).append(Oneday)          
        $(appendplaceID).append(Onemon)           
        $(appendplaceID).append(ProjectStart)           
        //Entry styling of appended items

        $('.price').fadeIn(100).addClass('sliding');
        $('.OnehrVol').fadeIn(2000).addClass('sliding');
        $('.OnedayVol').fadeIn(2900).addClass('sliding');
        $('.OnemonthVol').fadeIn(3200).addClass('sliding');
        $('.start-date').fadeIn(8000).addClass('sliding');
      }

      
    }
  
  } 
  
  
}

function CloseDetails(crypto_div){
  let TheId = "#"+crypto_div.id
  //readjust Div

  $(TheId).css("height", "3rem");
  $(TheId).css("border", "0");
  $(TheId).css("border-radius", "1rem");
  $(TheId).css("filter", "brightness(250%)");
  $(TheId).css("backdropFilter", ""); //from hover effect
 

    

  //readjust during transition
  $(TheId).children(".asset_ID").css("transition", "top 1s, color 3s, text-shadow 2s")
  $(TheId).children(".asset_ID").css('top', '20%')
  $(TheId).children(".asset_ID").css('color', 'white')
  $(TheId).children(".asset_ID").css('text-shadow', '0 10px 3px rgb(5, 5, 5)')
  $(TheId).prop('title', 'Click to open/expand');


  //hide appended part
  let appendplaceID = "#appendDetails"+crypto_div.id
  $(appendplaceID).fadeOut(100)
  //remove appended items
  $(appendplaceID).html('')




}


//Search Crypto section

function Searchcrypto() {

  var searchValue = $("#Searchcrypto").val().toUpperCase();
  for (var i = 0; i < c_list.length; i++) {

      var assetId = c_list[i].asset_id.toUpperCase();
      if (assetId === searchValue) {       //if match found
          let id = assetId.toLowerCase()

          var matchingElement = $("#prepend-here [id='" + searchValue + "']");
          if (matchingElement.length > 0) {
            matchingElement.remove();
            $("#prepend-here").prepend(matchingElement);
          } else {
            $("#prepend-here").prepend("<div id="+c_list[i]['asset_id']+"  onclick='ExpandDetails(this)' ondblclick='CloseDetails(this)' class='cryptos col c-tabs'  style = 'background-image: url(https://coinicons-api.vercel.app/api/icon/"+id+"')> <h2 class='asset_ID'>"+id.toUpperCase()+"</h2><div id='appendDetails"+id.toUpperCase()+"' class='append-details' > </div></div>") ;
          }
          return;
      }

      
  }
  if(searchValue == ""){ 

    //if backspaced to empty
    //restore default
    document.getElementById("prepend-here").innerHTML = "";
    for(i=0; i<30; i++){
      let id = c_list[i].asset_id.toLowerCase()
      $("#prepend-here").append("<div id="+c_list[i]['asset_id']+"  onclick='ExpandDetails(this)' ondblclick='CloseDetails(this)' class='cryptos col c-tabs'  style = 'background-image: url(https://coinicons-api.vercel.app/api/icon/"+id+"')> <h2 class='asset_ID'>"+id.toUpperCase()+"</h2><div id='appendDetails"+id.toUpperCase()+"' class='append-details' > </div></div>") ;
    }
  }

  
  console.log("No matching data found");
}




// Call the Searchcrypto function whenever the input value changes
$("#Searchcrypto").on("input", Searchcrypto);




//Close all divs "close-all" button  //Note: const closeButton = document.getElementById('closeButton'); Already declared in style.js
closeButton.addEventListener('click', function() {
  const appendDetailsDivs = document.querySelectorAll('.append-details');

  appendDetailsDivs.forEach(div => {
      
    if(div.children.length>0 ){  
      //Apply CloseDetails method to parent element if length>0
      CloseDetails(div.parentElement)
    }
   
      
  });
  //Make "Close All" button invisible
  $("#closeButton").fadeOut(1000)

});


//Add more crypto section
$(document).ready(function() {
  let scrollTimeout;

  
  $('#prepend-here').on('scroll', function() {
  
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(function() {
          
          if ($(this).scrollTop() === $(this)[0].scrollHeight - $(this).outerHeight()) {// Check if the div is scrolled to the bottom
              
              $(".scroll-highlight").remove();// Remove existing "Scroll to load more" highlight
              
              // Append elements
              var divData  = JSON.parse(localStorage.getItem('c_append_track'));
              let start = divData.startId; 
              
               
              for(i=start; i< start + 5; i++){
                let id = c_list[i]['asset_id'].toLowerCase()
                $("#prepend-here").append("<div id="+c_list[i]['asset_id']+"  onclick='ExpandDetails(this)' ondblclick='CloseDetails(this)' onmouseenter='lightUpCryptos(this,`on`)' onmouseleave='lightUpCryptos(this, `off`)' class='cryptos col c-tabs'  style = 'background-image: url(https://coinicons-api.vercel.app/api/icon/"+id+"')> <h2 class='asset_ID'>"+id.toUpperCase()+"</h2><div id='appendDetails"+id.toUpperCase()+"' class='append-details' > </div></div>")
              }
              const newTrack = {
                startId : start + 5
              }
              localStorage.setItem('c_append_track', JSON.stringify(newTrack)) //Set new local storage value

              
              

              // $("#prepend-here").append('<div >ADD MORE</div>'); console.log(c_list[divCount]['asset_id'])
              

              // Append "Scroll to load more" highlight at the bottom again
              $("#prepend-here").append('<div class="scroll-highlight"><div class="scroll-loader"></div></div>');
          }
      }.bind(this), 1000); 
  });
});




//scroll on click on search crypto
$("#Searchcrypto").click(() => {
  
  document.getElementById("prepend-here").firstElementChild.scrollIntoView({ behavior: "smooth", block: "center" });

})



function FadeReadLater(rmore){
  rmore.style.transition = 'transform 2s';
  rmore.style.animation = "fadeAnim 2s infinite"
  // rmore.style.transform = 'scale(2)';

}
function FadestopReadLater(rmore){
  setTimeout(() => {
    rmore.style.animation = ""   
  }, 3800);

}






// //Flash news Fade away
console.log($(".alertArea").length)
if($("#alertMsg").length>0){
  setTimeout(function () {
    $(".alertArea").fadeOut(2000)
  }, 5000);
}

//Footer Send News


// Footer Input form validate
function validateFootFormAndSend(event) {
  event.preventDefault();  // Prevent the default form submission behavior

  var emailInput = document.getElementById('emailInput').value;
  var errorElement = document.getElementById("formErrorFoot");

  if (!isValidEmail(emailInput)) { //validating email
      errorElement.textContent = 'Please enter a valid email address.';
      return false;
  }

  // If validation is successful, make the asynchronous POST request
  sendPostIdea(emailInput, document.getElementById('messageTextarea').value);

  

  errorElement.textContent = '';
  return true;
}

function isValidEmail(email) {
  // Basic email validation using a regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendPostIdea(email, message) {
  var data = {
      email: email,
      message: message
  };

  fetch('/sendPostIdea', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  
      //after successful resp
      document.getElementById('emailInput').value = "";
      document.getElementById("messageTextarea").value = "";
      let message = data['status']
      manualFlash(message)
     
  })
  .catch(error => {
      console.error('Error:', error);  // Handle any errors
  });
}

