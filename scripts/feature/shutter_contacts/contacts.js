$(document).ready(function(){
  
  var username = localStorage.getItem("username");

  $('.search_input').keyup(function() {
    searchUser();
  });

  showContacts();

});

function searchUser() {
  var val = $('.search_input').val();
  if(val != "") {
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
  var contact = {
    "contact": contactUsername,
    "user": username
  }

  var contactStr = JSON.stringify(contact);
  $.ajax({
    type:"POST",
    url: "http://localhost:8080/user/contact/add",
    dataType: "json",
    contentType: "application/json",
    data: contactStr
  });
}

function showContacts() {
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/contact?username=" + username,
    dataType: "json",
    success: function(data) {
      var contacts = data;
      return contacts;
    } 
  }).then(function(contacts){
    var contactTplScript = $("#contact_add_tpl").html();
    var contactTpl = Handlebars.compile(contactTplScript);
    $(".contacts_list").append(contactTpl(contacts));
  });
}

