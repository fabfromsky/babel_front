$(document).ready(function(){
  $(".games_container").after()
  getGames();
});

function getGames(){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/games",
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var gamesData = dataStore;
    var gameTplScript = $("#games-tpl").html();
    var gameTpl = Handlebars.compile(gameTplScript);
    $(".games_list").append(gameTpl(gamesData));
  });
}






