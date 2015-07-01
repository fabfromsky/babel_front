$(document).ready(function(){
  username = localStorage.getItem("username");
  /*getChallengesByPlayer(username);*/
  getChallengesByUsername();
});

function getChallengesByUsername(){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/challenges?username=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var challengesData = dataStore;
    var challengesTplScript = $("#challenges-tpl").html();
    var challengesTpl = Handlebars.compile(challengesTplScript);
    $(".liste_challenges").append(challengesTpl(challengesData));
  });
}

/*function getChallengesByPlayer(username){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/challenges?player=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  });
}*/

function answerChallenge(id) {
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/challenges?challengeid=" + id,
    dataType: "json"
  }).then(function(data){
    var game = data.game.gameId;
    localStorage.setItem("challenge", JSON.stringify(data));
    $(".game_overlay").toggleClass("hide");
    $("." + game).toggleClass("hide");
  });
}

Handlebars.registerHelper('isPlayer', function(player, options){
  if(player === username) {
    return options.inverse(this);
  } else  {
    return options.fn(this);
  }
});

Handlebars.registerHelper('isAnswered', function(challengerScore, options){
  if(challengerScore != null) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});






