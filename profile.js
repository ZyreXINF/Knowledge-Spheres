var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(window).on('load', function() {
  console.log('Page has completely loaded');
  loadBadges();
});

// LOGGING OUT

$(document).ready(function () {
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
        new_list_element.innerHTML = '<img src="' + data[i].name + '.jpg" width="80" height="80">' + '</img>';
        const element = document.getElementById("badges_list");
        element.appendChild(new_list_element);
      }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}