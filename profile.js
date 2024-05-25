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
  "creativity_badge": "5+ Spheres on your account and it's all yours!",
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

var firstloadPFP = true;
var firstloadFrame = true;

// ON LOAD

let current_pfp = 1;
let current_frame = 0;

$(window).on('load', function() {
  console.log('Page has completely loaded');
  loadBadges();
  fetchCustomization();
  let frame_picture = document.getElementById('pfp_frame');
  frame_picture.style.opacity = 0;
});

$(document).ready(function () {
  // logging out
  $("#logoutButton").on("click", function () {
    var confirmLogout = confirm("Are you sure you want to logout? 😢");
    if(confirmLogout){
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "home.html";
    }
    return false;
  });
  $("#save_settings_button").on("click", function () {
    validateUserSecuritySettings();
    return false;
  });
});

// BADGE MODAL

const badge_dialog = document.querySelector("[badge-modal]");
const badgeD_close_button = document.querySelector("[badge-close-modal]");

badgeD_close_button.addEventListener("click", () => {
  badge_dialog.close();
})

badge_dialog.addEventListener("click", e => {
  const dialogDimensions = badge_dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    badge_dialog.close()
  }
})

// PFP CHANGE MODAL

const pfp_dialog = document.querySelector("[pfp-modal]");
const pfpD_close_button = document.querySelector("[pfp-close-modal]");

pfpD_close_button.addEventListener("click", () => {
  pfp_dialog.close();
})

pfp_dialog.addEventListener("click", e => {
  const dialogDimensions = pfp_dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    pfp_dialog.close()
  }
})

const pfp_element = document.getElementById("pfp");
pfp_element.addEventListener("click", e => {
  if(firstloadPFP){
    loadPfps();
    firstloadPFP = false;
  }
  pfp_dialog.showModal();
  pfp_dialog.scrollTop = 0;
})

// FRAME CHANGE MODAL

const frame_dialog = document.querySelector("[frame-modal]");
const frame_close_button = document.querySelector("[frame-close-modal]");

frame_close_button.addEventListener("click", () => {
  frame_dialog.close();
})

frame_dialog.addEventListener("click", e => {
  const dialogDimensions = frame_dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    frame_dialog.close()
  }
})

const frame_element = document.getElementById("frame");
frame_element.addEventListener("click", e => {
  if(firstloadFrame){
    loadFrames();
    firstloadFrame = false;
  }
  frame_dialog.showModal();
  frame_dialog.scrollTop = 0;
})

// PFP UPDATE

function update_pfp(idx, saveNeeded) {
  pfp_element.src='pfp' + idx + '.png';
  if(saveNeeded){
    savePFPToDB(idx);
  }
  return;
}

function savePFPToDB(index){
  let pfpName = 'pfp' + index;
  console.log(pfpName);
  $.ajax({
    type: "POST",
    url: "save-pfp.php?pfp="+pfpName,
    success: function() {
      console.log("successfully updated pfp in the db");
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// FRAME UPDATE

function update_frame(idx, saveNeeded) {
  let frame_image = document.getElementById('pfp_frame');
  if (idx == 0){
    frame_image.style.opacity = 0;
  }
  else {
    frame_image.style.opacity = 1;
    frame_image.src='frame' + idx + '.png';
  }
  if(saveNeeded){
    saveFrameToDB(idx);
  }
  return;
}

function saveFrameToDB(index){
  let frameName = 'frame' + index;
  console.log(frameName);
  $.ajax({
    type: "POST",
    url: "save-frame.php?frame="+frameName,
    success: function() {
      console.log("successfully updated frame in the db");
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// SETTINGS MODAL

var password_changed = false, email_changed = false, username_changed = false;

const settings_dialog = document.querySelector("[settings-modal]");
const settings_close_button = document.querySelector("[settings-close-modal]");

settings_close_button.addEventListener("click", () => {
    settings_dialog.close();
})

settings_dialog.addEventListener("click", e => {
  const dialogDimensions = settings_dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    settings_dialog.close()
  }
})

const settings_button = document.getElementById("settings_button");
settings_button.addEventListener("click", e => {
  username_input.disabled = true;
  email_input.disabled = true;
  old_password_input.style.opacity = .5;
  new_password_input.style.opacity = .5;
  old_password_input.disabled = true;
  new_password_input.disabled = true;
  old_password_input.value = "";
  new_password_input.value = "";

  settings_dialog.showModal();
})

const edit_username_button = document.getElementById("edit_username_button");
const edit_email_button = document.getElementById("edit_email_button");
const edit_password_button = document.getElementById("edit_password_button");

const username_input = document.getElementById("username_input");
const email_input = document.getElementById("email_input");
const old_password_input = document.getElementById("old_password");
const new_password_input = document.getElementById("new_password");

edit_username_button.addEventListener("click", e => {
  getLimit(function (limit){
    if(limit > 0){
      username_input.disabled = false;
      username_changed = true;
    }else{
      if(window.confirm("You are out of nickname changes! 🙀 \nYou might want to try out subscription to get more! 💎")){
        window.location.href = "upgrade.html";
      }else{
        console.log("жадина говядина, вонючка");
      }
    }
  });
})

edit_email_button.addEventListener("click", e => {
  email_input.disabled = false;
  email_changed = true;
})

edit_password_button.addEventListener("click", e => {
  old_password_input.style.opacity = 1;
  new_password_input.style.opacity = 1;
  old_password_input.disabled = false;
  new_password_input.disabled = false;
  password_changed = true;
})

function validateUserSecuritySettings(){
  console.log("username: " + username_changed + " | email: " + email_changed + " | password: " + password_changed);
  if(username_changed || email_changed || password_changed){
    let file_url = "user-security-settings-save.php?";  
    let firstAppend = true;
    getLimit(function (limit){
      if(username_changed){ 
        if(limit > 0){
          if(document.getElementById("username_input").value.length >= 4){
            file_url = file_url + "userName=" + encodeURIComponent(document.getElementById("username_input").value);
            firstAppend = false;
          }else{
            file_url = "";  
            alert("Username must contain at least 4 charachters!!!");
          }
        } 
        else{
          if(window.confirm("You are out of ability to change nickname.🙀 \nYou might want to try out subscription to get more!💎")){
            window.location.href = "upgrade.html";
          }else{
            console.log("пошел нахуй жадина");
          }
          // alert("You are out of ability to change nickname.🙀 \nIf you want to change nickname you can try out subscription!💎");
        }                                                
      }if(email_changed){
        if(firstAppend){
          file_url = file_url + "userEmail=" + encodeURIComponent(document.getElementById("email_input").value);
          firstAppend = false;
        }else{
          file_url = file_url + "&userEmail=" + encodeURIComponent(document.getElementById("email_input").value);
          // username_input = username_input.getElementById("username_input").textContent = "Must be at least 4 characters!";
        }
      }if(password_changed){
        //PASSWORD VALIDATION
        validatePassword(function (password_validate_result){
          console.log(password_validate_result);
          if(password_validate_result){
            console.log("valid password");
            if(firstAppend){
              file_url = file_url + "userPassword=" + encodeURIComponent(document.getElementById("new_password").value);
              firstAppend = false;
            }else{
              file_url = file_url + "&userPassword=" + encodeURIComponent(document.getElementById("new_password").value);
            }
            saveSecurityData(file_url);
          }
        });
      }else if(!password_changed){
        saveSecurityData(file_url);
      }
    });     
    settings_dialog.close();
    
  }
}

function getLimit(callback){
  $.ajax({
    type: "GET",
    url: "password-limit-change.php",
    dataType: "json",
    success: function(response) {
      console.log(response);
      callback(response);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

function saveSecurityData(file_url){
  // console.log(file_url);
  $.ajax({
    type: "POST",
    url: file_url,
    success: function(response) {
      // console.log(response + "\n"); 
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

function validatePassword(callback){
  $.ajax({
    type: "GET",
    url: "password-validate.php?old_password="+document.getElementById("old_password").value,
    dataType: "json",
    success: function(bruh_is_ok) {
      callback(bruh_is_ok);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// LOADING BADGES

function loadBadges(){
  $.ajax({
    type: "GET",
    url: "fetch-badges.php",
    dataType: "json",
    success: function(data) {
      for(let i = 0; i < data.length; i++){
        const new_list_element = document.createElement("a");
        new_list_element.innerHTML = '<img id="badgeElement'+i+'" src="' + data[i].name + '.png" width="80" height="80">' + '</img>';
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

function loadPfps(){
  for (let i = 1; i < 19; i++) {
    let new_list_element = document.createElement("a");
    new_list_element.innerHTML = '<img class="pfp_list_element" src="pfp' + i + '.png">' + '</img>';
    let element = document.getElementById("pfp_list");
    
    new_list_element.addEventListener("click", e => {
      // save the pfp idx to the db
      current_pfp = i;
      pfp_dialog.close();
      update_pfp(i, true);
    })

    element.appendChild(new_list_element);
  }
}

function loadFrames(){
  for (let j = 0; j < 9; j++) {
    let new_list_element = document.createElement("a");
    new_list_element.innerHTML = '<img class="frame_list_element" src="frame' + j + '.png">' + '</img>';
    let element = document.getElementById("frame_list");
    
    new_list_element.addEventListener("click", e => {
      // save the pfp idx to the db
      current_frame = j;
      frame_dialog.close();
      update_frame(j, true);
    })

    element.appendChild(new_list_element);
  }
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

//FETCHING THE CUSTOMI(S/Z)ATION 

function fetchCustomization(){
  $.ajax({
    type: "GET",
    url: "fetch-profile-customisation.php",
    dataType: "json",
    success: function(customization) {
      let pfpIndex = customization["pfp"];
      pfpIndex = pfpIndex.match(/\d+$/)[0];
      update_pfp(pfpIndex, false);

      let frameIndex = customization["frame"];
      frameIndex = frameIndex.match(/\d+$/)[0];
      update_frame(frameIndex, false);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}

// SETTING THE BADGE DATA AND OPENING IT

function setModalData(obtainmentDate, badge_name){

  document.getElementById("imageElement").src = badge_name+".png";

  document.getElementById("nameElement").innerHTML = badgeNames[badge_name];

  var rarityElement = document.getElementById("rarityElement");
  rarityElement.innerHTML = nameRarityMapping[badge_name];
  rarityElement.style.background = rarityColors[nameRarityMapping[badge_name]];

  document.getElementById("obtainmentDate").innerHTML = obtainmentDate;

  document.getElementById("badgeDescriptionElement").innerHTML = descriptions[badge_name];

  badge_dialog.showModal();
}