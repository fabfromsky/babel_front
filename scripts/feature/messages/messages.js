$(document).ready(function(){
  username = localStorage.getItem("username");
  getMessagesByUsername(username);
  getContactsByUsername(username);
  sendMessage(username);
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
    var msgContainer = $('.messages');
    var msg;
    for(var i=0; i<dataStore.length; i++) {
      if(dataStore[i].sender == username) {
        msg = "<li class='message sent'>" +
                "<div class='message_header'>" +
                  "<span class='message_receiver'>à " + dataStore[i].receiver + " : </span>" +
                "</div>" +
                "<div class='message_content'>" + dataStore[i].content + "</div>" +
              "</li>";
        msgContainer.append(msg);

      } else {
        msg = "<li class='message received'>" +
                "<div class='message_header'>" +
                  "<span class='message_sender'>de " + dataStore[i].sender + " : </span>" +
                "</div>" +
                "<div class='message_content'>" + dataStore[i].content + "</div>" +
              "</li>";
        msgContainer.append(msg);
      }
    }
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

function sendMessage(username){
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

      $('.messages').empty();
      $('.target_selector_input').val("");
      $('.message_area').val("");
      getMessagesByUsername(username);
    } else if(receiver == "") {
      alert("veuillez selectionner un destinataire !");
    } else {
      alert("le contenu du message est vide !");
    }
  })
}





