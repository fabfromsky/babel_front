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
      url: "http://localhost:8080/user/search?username=" + username + "&search=" + val,
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
        toggleSlide($(this));
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

  getContactsByUsername();
  
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
    $(".contacts_list").empty();
    var contactTplScript = $("#contact_add_tpl").html();
    var contactTpl = Handlebars.compile(contactTplScript);
    $(".contacts_list").append(contactTpl(contacts));
  }).then(function(){
    $('.addContact').on("click", function(){
      addContact($(this).attr("id"));
      toggleSlide($(this));
    });
  });
}

function toggleSlide(element) {
  var parent = element.parent().parent();
  parent.hide("slide", {direction: "right"}, 500);
}

