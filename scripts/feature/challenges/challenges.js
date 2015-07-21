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
    var date;
    var day;
    var hours;
    var minutes;
    var seconds;
    for(var i=0; i<dataStore.length; i++) {
      date = new Date(JSON.parse(dataStore[i].date));
      day = date.getDate();
      month = "0" + date.getMonth();
      year = date.getFullYear();
      hours = date.getHours();
      minutes = "0" + date.getMinutes();
      date = "Le " + day + " " + month.substr(-2) + " " + year + " à " + hours + "H" + minutes.substr(-2);  
      dataStore[i].date = date;
    }
    console.log(dataStore);
    var challengesData = dataStore;
    var challengesTplScript = $("#challenges-tpl").html();
    var challengesTpl = Handlebars.compile(challengesTplScript);
    $(".liste_challenges").append(challengesTpl(challengesData));

    var allChallengesTplScript = $("#all-challenges-tpl").html();
    var allChallengesTpl = Handlebars.compile(allChallengesTplScript);
    $(".challenges_list").append(allChallengesTpl(challengesData));
  });
}

function answerChallenge(id) {
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/challenges?challengeid=" + id,
    dataType: "json"
  }).then(function(data){
    var game = data.game.gameTitle;
    localStorage.setItem("challenge", JSON.stringify(data));
    $(".game_overlay").toggleClass("hide");
    $("." + game).toggleClass("hide");
  });
}

Handlebars.registerHelper('isPlayer', function(player, options){
  if(player === username) {
    return options.fn(this);
  } else  {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('isAnswered', function(challengerScore, options){
  if(challengerScore === null) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('isWinner', function(a, b, c, options){
  var result;
  if( a!=null && b!=null ) {
    if(a>b) {
      result = "winner";
    } else if(a<b) {
      result = "looser"
    } else if(a==b) {
      result = "draw"
    }
    if(result == c) {
      return options.fn(this)
    } 
  }
});






