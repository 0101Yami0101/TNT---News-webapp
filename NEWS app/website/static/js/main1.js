var default_data ;  //default news data
var blockchain_data ;  //default news data
var c_list
var user
var def = "def";
var block = "block"
let logoutTemp = '<a class="nav-link " id="clicksignup" href="/log-out"><i class="fa-solid fa-right-to-bracket " ></i>Logout</a>'
let togglerTreeTemp = '<i id="toggler" class="fa-solid fa-tree fa-4x"></i></i>'
let togglerLeafTemp = '<i id="toggler" class="fa-brands fa-pagelines fa-4x"></i>'



function getData(){$(function() { // <---  document.ready
  console.log( "ready to fetch data!" );

  fetch('/getAlldata')   //<---  fetching data from backend using fetch api when the DOM is ready
  .then((response) => response.json())
  .then((data) => {
    default_data = data['def-data'];
    blockchain_data = data['block-data'];
    c_list = data['c-list'];
    user = data['user']
    
    }) 
    .then(() => {$('div:not(#loader)').show(); $('#loader').hide(); $('#search-results').hide(); if(user){
      $("#clicksignup").hide();
      $("#login-button").append(logoutTemp) //add logout in place of login if user is found
      
    } })
    
  
  
});}

$('div:not(#loader)').hide();
setTimeout(getData, 2000)


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

              '<span class="other-read-more flex-grow-1 "><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"><a  class="p-2" href="/readmore/def/'+i+'"  ></a> </i> </span> '+
              '<span class="other-visit-original "><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-person-running fa-2x" data-toggle="tooltip" data-placement="bottom" title="Visit the original article.."><a class="p-2" href='+ default_data[i]["link"] +'></a></i></span>'+
              '<span class="other-read-later " ><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-download fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later."><a class="p-2"  onclick="AppendToRL('+i+', "def")"></a></i></span> '+

            '</div>'+
          '</div>'+
          '<div id="otherImg'+i+'" class="col-4 new-img-demo ">'+
            '<a href='+ default_data[i]["image-link"] +' target="_blank">'+
              '<img onmouseover="FocusUp(this)" onmouseleave="FocusDown(this)" src='+ default_data[i]["image-link"] +' alt="" />'+
            '</a>'+
          '</div>'+
        '</div>'+
     '</div>'  




      $("#append-more-def-news").append(default_news_temp)  //<--- To-Do do animation while appending
    }     
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
          '<span class="other-read-more flex-grow-1 "><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="Read more now!"><a  class="p-2" href="/readmore/block/'+i+'"  ></a> </i> </span> '+
          '<span class="other-visit-original "><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-person-running fa-2x" data-toggle="tooltip" data-placement="bottom" title="Visit the original article.."><a class="p-2" href='+ blockchain_data[i]["link"] +'></a></i></span>'+
          '<span class="other-read-later " ><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-download fa-2x" data-toggle="tooltip" data-placement="bottom" title="Add to read-later."><a class="p-2"  onclick="AppendToRL('+i+', "block")"></a></i></span> '+
    '</div>'+
    '<div id="" class="col-4 web3-images"><a href=' +
    blockchain_data[i]["image-link"] + ' target="_blank"><img onmouseover="FocusUp(this)" onmouseleave="FocusDown(this)" src='+ blockchain_data[i]["image-link"] + ' alt="" /></a></div>'


  $("#append-more-block-news").append(block_news_temp); //<--- To-Do do animation while appending
  }
})


//Searching

function searchText(){
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
    $(".other-headline-container").css("transition", "top 1s")
    $(".other-headline-container").css("top", "14rem")
    $('#search-results').fadeIn()
    $('#close-search').show()

    //If value is empty - re-adjust
    if($("#searchText").val() == "")
      {
          $(".other-headline-container").css("transition", "top 1s")
          $(".other-headline-container").css("top", "-2rem")
          $("#search-results").fadeOut()
          $('#close-search').hide()
      
      
      }
      


    //function to search in the titles 
    function searchInTitle(data, listNm){ 

      for(i = 0; i < data.length; i++){
        let theTitle = data[i]["title"].toUpperCase() 
        if (theTitle.includes(searchText)){  
          //create temporary div to append

          var title = data[i]["title"]
          var theID = data[i]["id"] - 1
          var tempDivSearch = '<div class="container search-return" ><h4>' + title + '<a href="/readmore/'+ listNm +'/'+theID  +'"><i onmouseenter = "FadeReadLater(this)" onmouseleave="FadestopReadLater(this)" class="fa-solid fa-angles-right search-readmore-icon" data-toggle="tooltip" data-placement="bottom" title="Read more now!"></i></a></h4></div>'
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

//Tracking input and searching corresponding text
$("#searchText").on('input', searchText)


$("#close-search").on({
  click: function(){
    $("#Other-head-container").css("top", '0')
    let MobileWidmatches =   window.matchMedia("(max-width: 700px)")

    if(MobileWidmatches){ //re-adjust in mobile device 
      $("#Other-head-container").css("top", '-2rem')
    }
  }
})

//close search button
$("#close-search").on("click", function(){
  $(this).hide()
  $("#searchText").val("")
  $("#search-results").hide()
 
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


//Scrolling buttons and Loadmore buttons 
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


// Stock Section 
function ExpandDetails(crypto_div){
 
  let TheElem = (crypto_div.id).toUpperCase()
  console.log(TheElem)

  for(i in c_list){
    if(c_list[i]['asset_id'] == TheElem){
      var dataItem = c_list[i]
      // \\\\Expand
      var currentElement = document.getElementById(crypto_div.id)
      currentElement.style.height = "22rem"
      
      let OnehrTrade = dataItem["volume_1hrs_usd"]
      let OnedayTrade = dataItem["volume_1day_usd"]
      let OnemonthTrade = dataItem["volume_1mth_usd"]
      let Price = dataItem["price_usd"]
       //ADD CLOSE BTN
      let template = '<span onclick = "closeThis(this)"><button class= "crypto-close" >Close</button></span><div>Price :'+ Price.toFixed(2) +' </div>'+'<br/>' + '<div><h5>1 Hr Trade Vol : ' + OnehrTrade.toFixed(2) +'$</h5></div>'+'<br/>'+'<div><h5>1 day Trade Vol : ' + OnedayTrade.toFixed(2) +'$</h5></div>'+'<br/>'+'<div><h5>1 day Trade Vol : ' + OnemonthTrade.toFixed(2) +'$</h5></div>'

      let appendplace = document.getElementById("appendDetails"+crypto_div.id)
      appendplace.innerHTML = template            
      
    }
  } 
  
}


// Function to close crypto tabs
function closeThis(section){
  console.log("close request")
  section.parentElement.parentElement.style.height = "2.9rem"
  
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
        console.log(secToPrepend.style.backgroundColor = '#D7B80B')
        setInterval(function(){
          secToPrepend.style.backgroundColor = '#C8F3AE'
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

//
$("#Searchcrypto").click(() => {
  
  let elem = document.getElementById("prepend-here").firstElementChild.scrollIntoView({ block: "center" })
  console.log(elem)
  
})