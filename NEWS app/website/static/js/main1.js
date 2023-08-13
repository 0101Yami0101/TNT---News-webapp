var default_data ;  //default news data
var blockchain_data ;  //default news data
var c_list
var user
var def = "def";
var block = "block"
let logoutTemp = '<a class="nav-link " id="clicksignup" href="/log-out"><i class="fa-solid fa-right-to-bracket " ></i>Logout</a>'
let togglerTreeTemp = '<i id="toggler" class="fa-solid fa-tree fa-4x"></i></i>'
let togglerLeafTemp = '<i id="toggler" class="fa-brands fa-pagelines fa-4x"></i>'



async function getData(){$(function() { // <---  document.ready

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


//if no images there , replace with NO-IMaGE image
function CheckImages(){ //Check images everytime new news tabs are added
  
  const imageContainer = document.getElementById('Other-head-container');
  const images = imageContainer.querySelectorAll('img');
  
  // Loop through each image
  images.forEach((image, index) => {
      // console.log(`Image ${index + 1}: ${image.src}`);
      if(image.src == "http://127.0.0.1:5000/null"){
        image.src = "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg";
        image.classList.add("null-image")
      }
      
  });

}
// CheckImages();

//Appending data to Default data section
var def_start_count = 0;

$( "#loadmoreOther" ).on("click", function() {

       
    def_start_count += 6;
    for(i = def_start_count; i <= def_start_count + 5 ; i++ ){ 
      
      

      //edit and add templates
      
     default_news_temp =  '<div class="news-section">'+ 
     '<div class="row">'+
          '<div class="col-12">'+
            '<h3 id="otherheader'+i+'" class="headers-title" onmouseenter="Glowup(this)"><a href="/readmore/def/'+i+'"  >' + default_data[i]["title"] +'</a></h3>'+
            '<div class="other-news-description headers-desp">'+
              ''+default_data[i]["description"]+''+
            '</div>'+
            '<div class="other-readmore-container  d-flex flex-row mb-3 justify-content-between">'+

              '<span class="other-read-more flex-grow-1"><a  class="p-2" href='+ default_data[i]["link"] +'  ><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></span> '+
              '<span class="other-visit-original "><a onclick="ShareThis(def, '+ i +')" class="p-2" href="#"><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)"  class="fa-solid fa-share fa-2x" data-toggle="tooltip" data-placement="bottom" title="Share this now!" ></i></a></span>'+
              '<span class="other-read-later " ><a class="p-2"  onclick="AppendToRL('+i+', "def")"><i onclick = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa fa-floppy-o fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later"></i></a></span> '+

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
    block_news_temp = '<div class="blockchain-news-section"><div class="row"><div class="col-12"><h3 id="blockchainheader'+i+'" class = "headers-title" onmouseenter="Glowup(this)">'
    + blockchain_data[i]["title"] + '</h3></div><div class="blockchain-news-description headers-desp">'
    + blockchain_data[i]['description'] + '</div>'+
    '<div class="block-readmore-container d-flex flex-row mb-3">'+
          '<span class="other-read-more flex-grow-1 "><a  class="p-2" href='+ blockchain_data[i]["link"] +'  ><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></span> '+
          '<span onclick="ShareThis(block, '+i+')" class="other-visit-original "><a class="p-2" href="#"><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)"  class="fa-solid fa-share fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!" ></i></a></span>'+
          '<span class="other-read-later " ><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-download fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later."><a class="p-2"  onclick="AppendToRL('+i+', "block")"></a></i></span> '+
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
     //check if mobile screen
    let maxMobwid =   window.matchMedia("(max-width: 700px)")
    if (maxMobwid.matches){
      // todo -------------->
      // $(".image-headline").css("transition", "height 2s")
      // $(".image-headline").css("height", "50rem")
    }
    
    //get search data
    searchText = $('#searchText').val().toUpperCase()

    // adjust dom and open box
    $(".other-headline-container").css("transition", "all 1s")
    $(".other-headline-container").css("top", "3rem")
    $('#search-results').fadeIn()
    $('#close-search').show()
    

    //If value is empty - re-adjust
    if($("#searchText").val() == "")
      {
          $(".other-headline-container").css("transition", "all 1s")
          $(".other-headline-container").css("top", "1rem")
          $("#search-results").fadeOut()
          $("#close-search").hide()
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
      $(".other-headline-container").css("transition", "top 1s")
      $(".other-headline-container").css("top", "1rem")
      $("#search-results").fadeOut()
      $("#close-search").hide()
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




$("#close-search").on({
  click: function(){
    $("#Other-head-container").css("top", '0')
    let MobileWidmatches =   window.matchMedia("(max-width: 700px)")

    if(MobileWidmatches){ //re-adjust in mobile device 
      $("#Other-head-container").css("top", '1rem')
    }
  }
})

//close search button
$("#close-search").on("click", function(){
  $(this).hide()
  $("#searchText").val("")
  $("#search-results").hide()
  $("#searchText").css("background", "linear-gradient(to bottom right, #dc3545, black)").css("opacity", "0.85").css("box-shadow" , "0px 4px 10px 1px black");
  $('#searchText').attr('placeholder', 'Search Headline..');
  //remove alternate placeholder color class
  const input = document.getElementById("searchText");
  input.classList.remove("focused-input"); 
 
})


//AJAX TO BACKEND to add readlaters 
function AppendToRL(id, section){
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
        console.log(response['status'])
      }
      
      
    },
    error: function(error){
      console.log("Some unknown error ");
    }
  });
}
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
  let TheElem = (crypto_div.id).toUpperCase()

  for(i in c_list){
    if(c_list[i]['asset_id'] == TheElem){
      var dataItem = c_list[i]

      //Expand the div 
      let TheId = "#"+crypto_div.id
      $(TheId).css("transition", "height 1s")
      $(TheId).css("height", "20rem")
      //readjust during transition
      $(TheId).children(".asset_ID").css("transition", "top 1s, color 3s, text-shadow 2s")
      $(TheId).children(".asset_ID").css('top', '0')
      $(TheId).children(".asset_ID").css('color', 'red')
      $(TheId).children(".asset_ID").css('text-shadow', '0px 2px 1px whitesmoke')


      // add tooltip when opened
      $(TheId).prop('title', 'Double click to close');
      

      
      
      let OnehrTrade = dataItem["volume_1hrs_usd"]
      let OnedayTrade = dataItem["volume_1day_usd"]
      let OnemonthTrade = dataItem["volume_1mth_usd"]
      let Price = dataItem["price_usd"]
      let reModPrice = Math.round((Price + Number.EPSILON) * 100) / 100


      let Temp = '<div class = "price"> <span style="color: green">$</span> '+ reModPrice +' </div>'+
                  '<div class = "OnehrVol"> 1Hr Vol - <span style="color: green">$</span> '+ OnehrTrade +' </div>'+
                  '<div class = "OnedayVol"> 1Day Vol - <span style="color: green">$</span> '+ OnedayTrade +' </div>'+
                  '<div class = "OnemonthVol"> 1Month Vol - <span style="color: green">$</span> '+ OnemonthTrade +' </div>'


        //since fading out when closing the div
      let appendplaceID = "#appendDetails"+crypto_div.id
      $(appendplaceID).html(Temp)   
      $(appendplaceID).fadeIn()       
      
    }
  } 
  
}

function CloseDetails(crypto_div){
  let TheId = "#"+crypto_div.id
  //readjust Div
  $(TheId).css("transition", "height 1s")
  $(TheId).css("height", "10rem")

  //remove details
  let appendplaceID = "#appendDetails"+crypto_div.id
  $(appendplaceID).fadeOut(100)  

  //readjust during transition
  $(TheId).children(".asset_ID").css("transition", "top 1s, color 3s, text-shadow 2s")
  $(TheId).children(".asset_ID").css('top', '20%')
  $(TheId).children(".asset_ID").css('color', 'white')
  $(TheId).children(".asset_ID").css('text-shadow', '0 10px 3px rgb(5, 5, 5)')
  $(TheId).prop('title', 'Click to open/expand');


}


//Search Crypto section
var value//Search from list if searchcrypto button is clicked
function Searchcrypto(){

  if($("#Searchcrypto").val().toUpperCase()){

    value = $("#Searchcrypto").val().toUpperCase()
    for(i in c_list){
    
      if(value == c_list[i]['asset_id']){
        
        let lowerVal = value.toLowerCase()
        let secToPrepend = document.getElementById( lowerVal )
        secToPrepend.remove()
        $("#prepend-here").prepend(secToPrepend)
        

        //changing color a bit
        secToPrepend.style.backgroundColor = '#D7B80B'
        setInterval(function(){
          secToPrepend.style.backgroundColor = '#0000008a'
        }, 1000)

        
      }
     
    }
  }
  else{
    value = $("#Searchcrypto").val()
    for(i in c_list){
    
      if(value == c_list[i]['asset_id']){
        //convert val to lowercase again
  
        let secToPrepend = document.getElementById(  value.toLowerCase() )
        secToPrepend.remove()
        $("#prepend-here").prepend(secToPrepend)
       
        
      }
     
    }
  }
    
}

//scroll on click on search crypto
$("#Searchcrypto").click(() => {
  
  document.getElementById("prepend-here").firstElementChild.scrollIntoView({ behavior: "smooth", block: "center" });

})






