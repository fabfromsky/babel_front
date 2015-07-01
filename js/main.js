$(function() {
  //calcul de la taille de la zone principale
  var windowHeight = $(window).height();
  $(".main_content").height(windowHeight - $(".gameboard_nav").height() - $(".gameboard_header").height());
  var height = $(".main_content").height();
  $(".main_content").css('line-height', height + "px");

  //set challenge a null
  localStorage.setItem("challenge", null);
  
});

//gestion affichage game
$(document).on("click", ".game_btn", function(){
  var game = this.id;
  $(".game_overlay").toggleClass("hide");
  $("."+ game).toggleClass("hide");
});

//gestion ouverture volet gauche
$(document).on("click", ".shutter_btn", function() {
  $(".gameboard_shutter_left").toggleClass("closed");
  $(".gameboard_main").toggleClass("opened_shutter");
}); 

//gestion username
$(document).on("click", ".login_button", function(){
  var username = $(".login_input").val();
  localStorage.setItem("username", username);
});

