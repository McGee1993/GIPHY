var giphy = {
  searchValue: "",
  sports: [
            "Baseball", "Football", "Soccer", "Tennis", "Boxing", "Nascar", "Golf", "Cricket", "Ping-Pong", "Basketball", "Volleyball", "Jai Alai", "Pool", "Swimming", "Hockey"]
}

function init() {
  for(i=0; i < giphy.sports.length; i++){
    console.log(giphy.sports[i]);
    $("#topics").append("<button class='btn-primary topic-btn'>" + giphy.sports[i] + "</button>")
  };
};

function search() {
  
  $("#giphy-area").html("");
  giphy.searchValue = $("#search").val().trim();
  
  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ giphy.searchValue +"BimE7WZEzEAPiblHenxDtz29EW27YP1x";

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done((response) => {
    console.log(response);
    for(i = 0; i < response.data.length; i++){ 
      $("#giphy-area").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");
    };
  });
  
  giphy.sports= [];
  giphy.sports.push(giphy.searchValue);
  $("#search").val("")
  init();
};

function pressTopicBtn () {
  $("#giphy-area").html("");
  var topicBtnValue = $(this).text();
  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ topicBtnValue +"&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done((response) => {
    console.log(response);
    for(i = 0; i < response.data.length; i++){
      
      $("#giphy-area").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");
    };
  });
};

function changeImage() {
    var temp = $(this).attr("data-name");
    $(this).attr("data-name", $(this).attr("src"));
    $(this).attr("src", temp);
  };

init();
$("#search-btn").on("click", search);
$(document).on("click", ".topic-btn", pressTopicBtn);
$(document).on("click", ".gif-img", changeImage);