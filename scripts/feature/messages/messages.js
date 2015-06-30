//instaciation de la variable username
username = localStorage.getItem("username");

//au démarrage, on appelle le server
$(document).ready(function(){
  getMessagesByUsername();
  getContactsByUsername();
  sendMessage();
});

//refresh messagerie 
window.setInterval(getMessagesByUsername, 2000);
var i = 0;

function getMessagesByUsername(){
  i++;
  console.log(i);
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
    var msgContainer = $('.messages');
    var msg;
    msgContainer.empty();
    for(var i=0; i<dataStore.length; i++) {
      if(dataStore[i].sender == username) {
        msg = "<li class='message sent'>" +
                "<div class='sender_img'><img src='imgs/" + dataStore[i].sender + ".jpg'/></div>" +
                "<div class='message_container'>" +
                  "<div class='message_header'>" +
                    "<span class='message_receiver'>à <span class='user'>" + dataStore[i].receiver + "</span></span>" +
                  "</div>" +
                  "<div class='message_content'>" + dataStore[i].content + "</div>" +
                "</div>" +
              "</li>";
        msgContainer.prepend(msg);

      } else {
        msg = "<li class='message received'>" +
                "<div class='message_container'>" +
                  "<div class='message_header'>" +
                    "<span class='message_sender'>de <span class='user'>" + dataStore[i].sender + "</span></span>" +
                  "</div>" +
                  "<div class='message_content'>" + dataStore[i].content + "</div>" +
                "</div>" +
                "<div class='sender_img'><img src='imgs/" + dataStore[i].sender + ".jpg'/></div>" +
              "</li>";
        msgContainer.prepend(msg);
      }
    }
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
          "sender" : username,
          "receiver" : receiver,
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
      }, 200);
    } else if(receiver == "") {
      alert("veuillez selectionner un destinataire !");
    } else {
      alert("le contenu du message est vide !");
    }
  })
}





