$(document).ready(function(){
  $('.contact').on("click", function(){
    toggleShutter();
  });
});

function toggleShutter() {
  $('.gameboard_shutter_right').toggleClass("closed");
}