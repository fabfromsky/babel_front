//instaciation de la variable username
username = localStorage.getItem("username");

//au démarrage, on appelle le server
$(document).ready(function(){
  getMessagesByUsername();
  getContactsByUsername();
  sendMessage();
});

//refresh messagerie 
/*window.setInterval(getMessagesByUsername, 5000);
*/
function getMessagesByUsername(){
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
    $('.messages').empty();
    var messagesData = dataStore;
    var messageTplScript = $("#messages-tpl").html();
    var messageTpl = Handlebars.compile(messageTplScript);
    $('.messages').append(messageTpl(messagesData));
  });
}

function getContactsByUsername(){
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
    $(".target_selector").empty();
    var contactsData = dataStore;
    var contactsTplScript = $("#contacts-tpl").html();
    var contactsTpl = Handlebars.compile(contactsTplScript);
    $(".target_selector").append(contactsTpl(contactsData));
  });
}

function sendMessage(){
  $('.message_btn').on("click", function() {
    var receiver = $('.target_selector_input').val();
    var msg = $('.message_area').val();
    var data = JSON.stringify({
          "sender" : {
            "username": username
          },
          "receiver" : {
            "username" : receiver
          },
          "content" : msg
        });
    if(msg != "" && receiver != "") {
      console.log(data);
      $.ajax({
        type:"POST",
        url: "http://localhost:8080/messages/new",
        contentType: "application/json",
        dataType: "json",
        data: data
      });

      $('.target_selector_input').val("");
      $('.message_area').val("");
      setTimeout(function(){
        $('.messages').empty();
        getMessagesByUsername(username);
      }, 2000);
    } else if(receiver == "") {
      alert("veuillez selectionner un destinataire !");
    } else {
      alert("le contenu du message est vide !");
    }
  })
}

Handlebars.registerHelper('isReceived', function(sender, options){
    if(sender === username) {
      return options.inverse(this);
    } else {
      return options.fn(this); 
    }
});





