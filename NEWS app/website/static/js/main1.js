var default_data ;  //default news data
var blockchain_data ;  //default news data
var c_list
var def = "def";
var block = "block"



function getData(){$(function() { // <---  document.ready
  console.log( "ready to fetch data!" );

  fetch('/getAlldata')   //<---  fetching data from backend using fetch api when the DOM is ready
  .then((response) => response.json())
  .then((data) => {
    default_data = data['def-data'];
    blockchain_data = data['block-data'];
    c_list = data['c-list'];
    // for(i = 0; i < Object.keys(blockchain_data).length; i++){
    //   console.log(blockchain_data[i]["title"])
    // }
    }) 
    .then(() => {$('div:not(#loader)').show(); $('#loader').hide(); $('#search-results').hide() })
  
  
});}

$('div:not(#loader)').hide();
setTimeout(getData, 2000)


//Appending data to Default data section
var def_start_count = 0;

$( "#load1" ).on("click", function() {
       
    def_start_count += 6;
    for(i = def_start_count; i <= def_start_count + 5 ; i++ ){ 
      
      
      //edit and add templates
      default_news_temp = '<div class="news-section"><div class="row"><div class="col-8"><h3>'
      + default_data[i]['title'] + '</h3><div class="other-news-description">'
      + default_data[i]['description'] +'</div><div class="readmore-container d-flex flex-row mb-3"><a class="p-2" href="/readmore/def/'
      +i+'"> Read more </a><br /><a class="p-2" href="'
      + default_data[i]['link'] +'">Visit original article</a><br /><a class="p-2" onclick="AppendToRL('
      + i + ' , ' + def  +')"> Read Later </a></div></div><div class="col-4 new-img-demo" style="border: 2px solid green"><a > <img/> </a></div></div></div>'

      $("#append-more-def-news").append(default_news_temp)  //<--- To-Do do animation while appending
      // console.log("Appended")
    }     
  });


//Appending data to Default data section
var block_news_count = 0

$( "#load2" ).on("click", function() {
  block_news_count += 6;

  for(i = block_news_count; i <= block_news_count + 5 ; i++ ){
  //edit and add templates
    block_news_temp = '<div class="news-section blockchain-news-section"><div class="row"><div class="col-8"><h3>'
    + blockchain_data[i]["title"] + '</h3></div><div class="blockchain-news-description">'
    + blockchain_data[i]['description'] + '</div><div class="readmore-container d-flex flex-row mb-3"><a class="p-2" href="/readmore/block/'
    +i+'"> Read more </a><br/><a class="p-2" href='
    + blockchain_data[i]["link"] + '>Visit original article</a><br/><a class="p-2" onclick="AppendToRL('
    + i + ' , ' + block  +')"> Read Later </a></div>'
    +'<div id="" class="col-4 web3-images" style="border: 2px solid rgb(133, 216, 133)"><a href=""> <img src="" alt="" /> </a></div>'


  $("#append-more-block-news").append(block_news_temp); //<--- To-Do do animation while appending
  }
})


//Searching
$("#searchText").on('input', function(){
    
  if ($('#searchText').val() == ""){
    $("#search-results").hide()
  }
})

$("#search-eye").on('click', function(){
  $('#search-results').show()

  $("#search-results").text("")
  searchText = $('#searchText').val().toLowerCase()
  
  //check if both lists are same  length -- TODO
  for (i = 0 ; i < default_data.length; i++){
    var def_title = default_data[i]["title"].toLowerCase()
    var block_title = blockchain_data[i]["title"].toLowerCase()
    if(searchText == "" || searchText == null ) {
      
      $("#search-results").text("")
      alert('Please type something')
      break
    }

    if (def_title.includes(searchText) ) {
      $("#search-results").show()
      var title = default_data[i]["title"]
      var theID = default_data[i]["id"] - 1
      var temp = '<div class="container" ><h4>' + title + '<a href="/readmore/def/'+theID  +'"><button >readmore</button></a></h4></div>'

      $("#search-results").append(temp)
     
    }
    if(block_title.includes(searchText)){
      $("#search-results").show()
      var title = blockchain_data[i]["title"]
      var theID = blockchain_data[i]["id"] - 1
      var temp = '<div class="container" ><h4>' + title + '<a href="/readmore/block/'+theID  +'"><button >readmore</button></a></h4></div>'

      $("#search-results").append(temp)
    }        
  }

  //after loop check if txt area empty 
  if($("#search-results").text() == ""){
    $("#search-results").show()
    $("#search-results").append("No such results")
  }   
})

$("#close").on("click", function(){
  $("#search-results").text("")
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


//Search from list if searchcrypto button is clicked
var value
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


// Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})





