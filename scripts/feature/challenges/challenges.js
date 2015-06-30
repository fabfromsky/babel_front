$(document).ready(function(){
  username = localStorage.getItem("username");
  /*getChallengesByPlayer(username);*/
  getChallengesByChallenger(username);
});

function getChallengesByChallenger(username){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/challenges?challenger=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var challengesData = dataStore;
    var challengesTplScript = $("#challenges-tpl").html();
    var challengesTpl = Handlebars.compile(challengesTplScript);
    $(".shutter_bloc.challenges_bloc").append(challengesTpl(challengesData));
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
    url = data.game.gameUrl;
    localStorage.setItem("challenge", JSON.stringify(data));
    location.href = url;
  });
}






