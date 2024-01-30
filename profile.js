var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var rarityColors = {
  "Common": "#27aef2",
  "Rare": "#d6901e",
  "Exceptional": "#a320c7"
};
var descriptions = {
  "gold_badge": "Can be obtained by purchasing the gold subscription.",
  "ruby_badge": "Can be obtained by purchasing the ruby subscription.",
  "diamond_badge": "Can be obtained by purchasing the diamond subscription.",
  "wisdom_badge": "Awarded for reaching the abyssal tier of any of one's spheres.",
  "early_supporter_badge": "Can be obtained by purchasing any subscription during the site's early development stage.",
  "creativity_badge": "6+ Spheres on your account and it's all yours!",
  "beta_user_badge": "Awarded to everyone who used Knowledge Spheres during its early development stage."
}
var badgeNames = {
  "gold_badge": "The Gold Supporter Badge",
  "ruby_badge": "The Ruby Supporter Badge",
  "diamond_badge": "The Diamond Supporter Badge",
  "wisdom_badge": "The Wisdom Badge",
  "early_supporter_badge": "The Early Supporter Badge",
  "creativity_badge": "The Creativity Badge",
  "beta_user_badge": "The Beta-User Badge"
}
var nameRarityMapping = {
  "gold_badge": "Exceptional",
  "ruby_badge": "Exceptional",
  "diamond_badge": "Exceptional",
  "wisdom_badge": "Exceptional",
  "early_supporter_badge": "Exceptional",
  "creativity_badge": "Rare",
  "beta_user_badge": "Common"
}

$(window).on('load', function() {
  console.log('Page has completely loaded');
  loadBadges();
});

// BADGE MODAL

const dialog = document.querySelector("dialog");
const close_button = document.querySelector("[badge-close-modal]");

close_button.addEventListener("click", () => {
  dialog.close();
})

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})

$(document).ready(function () {
  // LOGGING OUT
  $("#logoutButton").on("click", function () {
    var confirmLogout = confirm("Are you sure you want to logout? 😢");
    if(confirmLogout){
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "home.html";
    }
    return false;
  });
});

// LOADING BADGES

function loadBadges(){
  $.ajax({
    type: "GET",
    url: "fetch-badges.php",
    dataType: "json",
    success: function(data) {
      for(let i = 0; i < data.length; i++){
        const new_list_element = document.createElement("a");
        new_list_element.innerHTML = '<img id="badgeElement'+i+'" src="' + data[i].name + '.png" width="60" height="60">' + '</img>';
        const element = document.getElementById("badges_list");
        
        new_list_element.addEventListener("click", e => {
          fetchBadgeDescription(data[i].name);
        })

        element.appendChild(new_list_element);
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

//FETCHING THE BADGE DESCRIPTION 

function fetchBadgeDescription(badge_name){
  $.ajax({
    type: "GET",
    url: "fetch-badge-description.php?badge_name="+badge_name,
    dataType: "json",
    success: function(obtainmentDate) {
      setModalData(obtainmentDate, badge_name);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

//SETTING THE BADGE DATA AND OPENING IT

function setModalData(obtainmentDate, badge_name){

  document.getElementById("imageElement").src = badge_name+".png";

  document.getElementById("nameElement").innerHTML = badgeNames[badge_name];

  var rarityElement = document.getElementById("rarityElement");
  rarityElement.innerHTML = nameRarityMapping[badge_name];
  rarityElement.style.background = rarityColors[nameRarityMapping[badge_name]];

  document.getElementById("obtainmentDate").innerHTML = obtainmentDate;

  document.getElementById("badgeDescriptionElement").innerHTML = descriptions[badge_name];

  dialog.showModal();
}