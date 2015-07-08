$(document).ready(function(){
  var username = localStorage.getItem("username");
  getUser();
});

function getUser(){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/user?username=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var userData = dataStore;
    var usernameTplScript = $("#username-tpl").html();
    var usernameTpl = Handlebars.compile(usernameTplScript);
    $(".username").append(usernameTpl(userData));

    var userTplScript = $("#user-tpl").html();
    var userTpl = Handlebars.compile(userTplScript);
    $(".shutter_bloc.user_bloc").append(userTpl(userData));

    localStorage.setItem("user", JSON.stringify(userData));
  });
}

