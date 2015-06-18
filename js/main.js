$(function() {
  $(".shutter_btn").on("click", function() {
    $(".gameboard_shutter_left").toggleClass("hide");
    $(".gameboard_main").toggleClass("opened_shutter");
  });  
});
