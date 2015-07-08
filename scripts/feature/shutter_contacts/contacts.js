$(document).ready(function(){

  $('.search_input').keyup(function() {
    searchUser();
  });

});

function searchUser() {
  var val = $('.search_input').val();
  if(val != "" && val.length > 2) {
    $.ajax({
      type:"GET",
      url: "http://localhost:8080/user/search?search=" + val,
      dataType: "json",
      success: function(data) {
        var users = data; 
        return users;
      }
    }).then(function(users){
      var searchTplScript = $("#contact_search_tpl").html();
      var searchTpl = Handlebars.compile(searchTplScript);
      $(".search_result").empty();
      $(".search_result").append(searchTpl(users));
    }).then(function(){
      $('.addContact').on("click", function(){
        addContact($(this).attr("id"));
      });
    });
  }
  else {
    $(".search_result").empty();
  }
  
}

function addContact(contactUsername){
  var username = localStorage.getItem("username");
  var contact = {
    "contact": contactUsername,
    "user": username
  }

  var contactStr = JSON.stringify(contact);
  console.log(contactStr);
  $.ajax({
      type:"POST",
      url: "http://localhost:8080/user/contact/add",
      dataType: "json",
      contentType: "application/json",
      data: contactStr
    });
}

