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
    $(".trophies").append(trophisTpl(trophiesData));
  });
}

Handlebars.registerHelper('isCategory', function(category, value, options) {
  if(category === value) {
    return options.fn(this);
  }
});