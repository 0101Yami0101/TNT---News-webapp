var default_data ;  //default news data
var blockchain_data ;  //default news data
// let lenOfdefData = Object.keys(default_data).length
// let lenOfblockData = Object.keys(blockchain_data).length



$(function() { // <---  document.ready
  console.log( "ready!" );

  
  fetch('/loadmore/general')   //<---  fetching data from backend using fetch api when the DOM is ready
  .then((response) => response.json())
  .then((data) => {
    default_data = data['def-data'];
    blockchain_data = data['block-data'];
    // for(i = 0; i < Object.keys(blockchain_data).length; i++){
    //   console.log(blockchain_data[i]["title"])
    // }
    }) 
  .then(() =>{ console.log("DATA ACHIEVED SUCCESSFULLY")})
  .catch((error) => {console.log("SORRY " + error)});
  
  
  
});

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
      + default_data[i]['link'] +'">Visit original article</a><br /><a class="p-2" href="/readlater"> Read Later </a></div></div><div class="col-4 new-img-demo" style="border: 2px solid green"><a > <img/> </a></div></div></div>'

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
    + blockchain_data[i]["link"] + '>Visit original article</a><br/><a class="p-2" href="/readlater"> Read Later </a></div>'
    +'<div id="" class="col-4 web3-images" style="border: 2px solid rgb(133, 216, 133)"><a href=""> <img src="" alt="" /> </a></div>'


  $("#append-more-block-news").append(block_news_temp); //<--- To-Do do animation while appending
  // console.log("Appended");

  }

})

//Searching

$("#searchText").on('input', function(){
  
  if ($('#searchText').val() == ""){
    $("#search-results").hide()
  }
})

$("#search-eye").on('click', function(){
  

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



//AJAX TO BACKEND for readlaters 
function AppendToRL(id){
  $.ajax({
    url: '/AddToReadlater',
    data: {"id" : id},
    type: 'POST',
    success: function(response){
      console.log(response);
    },
    error: function(error){
      console.log("ERRor");
    }
  });
}