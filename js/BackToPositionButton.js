var to_top_button = document.getElementById("to-top-button");
var to_prev_pos_button = document.getElementById("to-prev-pos-button");
var prevPosY = 0, currPosY = 0;
var counter = 0;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    
  counter++;
    
  if(counter==15){
      prevPosY = currPosY;
      currPosY = window.pageYOffset || document.documentElement.scrollTop;
      counter = 0;
  }
  
    
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    to_top_button.style.display = "block";
    to_prev_pos_button.style.display = "block";    
  } else {
    to_top_button.style.display = "none";
    to_prev_pos_button.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function goToTopFunc() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function goToPrevPosFunc() {
  document.body.scrollTop = prevPosY;
  document.documentElement.scrollTop = prevPosY;
}


