$(document).ready(function(){
  var username = localStorage.getItem("username");
  getUserTrophies();
});

function getUserTrophies(){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url:"http://localhost:8080/user/trophy?username=" + username,
    dataType:"json",
    succes: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var trophiesData = dataStore;
    var trophiesTplScript = $('#mytrophies-tpl').html();
    var trophiesTpl = Handlebars.compile(trophiesTplScript);
    $(".my_trophies").append(trophiesTpl(trophiesData));
  });
}