$(document).ready(function(){
  username = localStorage.getItem("username");
  getMessagesByUsername(username);
  getContactsByUsername(username);
});

function getMessagesByUsername(username){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/messages?username=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var messagesData = dataStore;
    var messagesTplScript = $("#messages-tpl").html();
    var messagesTpl = Handlebars.compile(messagesTplScript);
    $(".messages_container").prepend(messagesTpl(messagesData));
  });
}

function getContactsByUsername(username){
  var dataStore = null;
  $.ajax({
    type:"GET",
    url: "http://localhost:8080/user/contacts?username=" + username,
    dataType: "json",
    success: function(data) {
      dataStore = data;
      return dataStore;
    }
  }).then(function(dataStore){
    var contactsData = dataStore;
    var contactsTplScript = $("#contacts-tpl").html();
    var contactsTpl = Handlebars.compile(contactsTplScript);
    $(".target_selector").append(contactsTpl(contactsData));
  });
}






