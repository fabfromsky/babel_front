$(function() {
  var windowHeight = $(window).height();
  $(".main_content").height(windowHeight - $(".gameboard_nav").height() - $(".gameboard_header").height());
  var height = $(".main_content").height();
  $(".main_content").css('line-height', height + "px");
  $(".shutter_btn").on("click", function() {
    $(".gameboard_shutter_left").toggleClass("closed");
    $(".gameboard_main").toggleClass("opened_shutter");
  }); 
  $(".login_button").on("click", function(){
  	var username = $(".login_input").val();
  	localStorage.setItem("username", username);
	});
  localStorage.setItem("challenge", null);
});

