$(document).ready(function(){

  $('.search_input').keyup(function searchUser() {
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
      });
    }
    else {
      $(".search_result").empty();
    }
    
  });
});

