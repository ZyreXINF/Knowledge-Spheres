var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function () {
  $("#logoutButton").on("click", function () {
    var confirmLogout = confirm("Are you sure you want to logout? 😢");
    if(confirmLogout){
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "index.html";
    }
    return false;
  });
});