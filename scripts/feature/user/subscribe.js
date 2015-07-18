$(document).ready(function(){
  $(".validate").on("click", function(){
    var username = $(".login").val();
    var password = $(".password").val();
    var mail = $(".mail").val();
    var firstname = $(".firstname").val();
    var lastname = $(".lastname").val();
    var sex = $(".isMale").is(":checked")? "M" : "F";

    if(username == "") {
      $(".login").addClass("required");
    } else if(password == "") {
      $(".password").addClass("required");
    } else if(mail == "") {
      $(".mail").addClass("required");      
    } else if(firstname == "") {
      $(".firstname").addClass("required");      
    } else if(lastname == "") {
      $(".lastname").addClass("required");      
    } else {
      var user = {
        "username": username,
        "firstName": firstname,
        "lastName": lastname,
        "pwd": password,
        "mail": mail,
        "sex": sex
      }

      var userStr = JSON.stringify(user);

      persistUser(userStr);  
    }
    
  })
});

function persistUser(user) {
  $.ajax({
    type:"POST",
    url: "http://localhost:8080/user/save",
    contentType: "application/json",
    dataType: "json",
    data: user
  }).then(function(){
    var data = JSON.parse(user);
    localStorage.setItem("username", data.username);
    setTimeout(redirect()), 5000);
}

function redirect() {
  location.href = "index.html";
}