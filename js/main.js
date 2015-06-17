$(function() {
  $(".shutter_btn").on("click", function() {
    console.log("toto");
    $(".gameboard_shutter_left").toggleClass("hide");
    $(".gameboard_main").toggleClass("opened_shutter");
  });  
});
