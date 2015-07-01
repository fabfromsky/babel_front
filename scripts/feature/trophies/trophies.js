$(document).ready(function(){
  username = localStorage.getItem("username");
  getTrophies();
  getChallengesByUsername();
});

function getTrophies(){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/trophies",
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var trophiesData = dataStore;
    var trophiesTplScript = $("#trophies-tpl").html();
    var trophisTpl = Handlebars.compile(trophiesTplScript);
    $(".trophies_list").append(trophisTpl(trophiesData));
  });
}