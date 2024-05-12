var facts = {
  5: 'There are approximately 5 liters of blood in an average adult human body.',
  10: 'On average, a person might use about 10 liters of water for a single shower.',
  20: 'A typical washing machine uses around 20 liters of water for one load of laundry.',
  50: '50 liters of grape juice can yield about 67 standard bottles of wine.',
  80: '80 liters of liquid chocolate can produce over 640 standard chocolate bars.',
  302: 'A standard bathtub will hold around 302 liters of water.'
};

var tiers = {
  0: 'Common',
  10: 'Mediocre',
  20: 'Decent',
  40: 'Great',
  60: 'Amazing',
  100: 'Incredible',
  150: 'Sublime',
  200: 'Otherworldly',
  500: 'Unfathomable',
  1000: 'Abyssal'
};

// liters remaining until the next tier is reached
var till_next_tier = Object.keys(tiers)[0];

// don't touch this magical variable
let extra_amount = 0;

// -----------------------------------------------------------------------------
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var color = document.getElementById("color").value;
var sphere = document.querySelector(".wave");
sphere.style.backgroundColor = color;

$(window).on('load', function() {
  console.log('Page has completely loaded');

  fetchDataOnLoad();

  // document.getElementById("sbmtBtn2").style.opacity = 0.3;
});

$(document).ready(function () {
  $("#sbmtBtn1").on("click", function () {
    updateVolume(0.1);
    triggerAnimation(1);
    return false;
  });
  $("#sbmtBtn2").on("click", function () {
    updateVolume(1);
    triggerAnimation(2);
    return false;
  });
  $("#sbmtBtn3").on("click", function () {
    updateVolume(3);
    triggerAnimation(3);
    return false;
  });
  $("#sbmtBtn4").on("click", function () {
    updateVolume(5);
    triggerAnimation(4);
    return false;
  });
});

function fetchDataOnLoad(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let sphere_name = urlParams.get('sphere_name');

  $.ajax({
    type: "GET",
    url: "fetch-sphere-onload.php?sphere_name="+encodeURIComponent(sphere_name),
    success: function (responseArray) {
      console.log("successful action: volume update");

      let parsedArray = JSON.parse(responseArray);

      let nameElement = document.getElementById("name");
      nameElement.innerHTML = sphere_name;

      let colorElement = document.getElementById("color");
      colorElement.value = parsedArray[0];
      color = colorElement.value;
      sphere.style.backgroundColor = parsedArray[0];

      let volumeElemnt = document.getElementById("incrementable");
      volumeElemnt.innerHTML = parsedArray[5];

      //SENDING A PART OF AN ARRAY THAT CONTAINS ONLY THE BUTTONS
      setButtons(Array.from([parsedArray[1],parsedArray[2],parsedArray[3],parsedArray[4]]));

      update_volume(0);
    },
    error: function (error) {
      console.error("Error occured:", error);
    }
  });
}

function setButtons(buttonsArray){
  console.log(buttonsArray);
  let buttonElement, buttonMeaning;
  for(let i = 0; i < buttonsArray.length; i++){
    buttonMeaning = document.getElementById("meaning"+(i+1));
    buttonMeaning.innerHTML = "+1 " + buttonsArray[i];
    if(buttonsArray[i+1] == 'none'){
      buttonElement = document.getElementById("sbmtBtn"+(i+2));
      buttonElement.style.opacity = 0.3;
      buttonElement.disabled = true;
    }
  }
}


//UPDATE VOLUME IN THE DATABASE
function updateVolume(volumeToAdd) {
  var nameContent = document.getElementById("name").innerHTML;
  console.log("innerHTML of the element: ", nameContent);
  $.ajax({
    type: "POST",
    url: "update-volume-form.php?volumeToAdd="+encodeURIComponent(volumeToAdd)+"&sphereName="+encodeURIComponent(nameContent),
    dataType: "json",
    success: function (response) {
      console.log(response);
      if(volumeToAdd == 0.1){
        droplet();
      }else if(volumeToAdd == 1){
        pour();
      }else if(volumeToAdd == 3){
        pour_wide();
      }else if(volumeToAdd == 5){
        rain(); 
      } 
      animateObject();
      console.log("successful action: volume update");
    },
    error: function (error) {
      console.error("Error occured:", error);
    }
  });
}

// UPDATING THE SPHERE'S TIER

function update_tier() {
  let volume_element = document.getElementById("incrementable").innerText;
  let volume = parseFloat(volume_element.slice(0, -1));

  let tier_element = document.getElementById("tier");
  let till_next_tier_element = document.getElementById("till_next_tier");

  let next_tier_key = null;
  let next_tier_exists = false;
  let previous_tier = ""; 

  for (var threshold in tiers) {
    if (volume < parseFloat(threshold)) {
      next_tier_key = parseFloat(threshold);
      next_tier_exists = true;
      break;
    }
    till_next_tier = parseFloat(threshold);
    previous_tier = tiers[threshold];
  }

  if (next_tier_exists) {
    let difference = next_tier_key - volume;
    till_next_tier = difference > 0 ? (difference % 1 === 0 ? difference.toFixed(0) : difference.toFixed(1)) : Infinity.toFixed(1);
  } else {
    till_next_tier = Infinity.toFixed(1);
  }

  tier_element.innerHTML = "Tier: " + previous_tier;
  till_next_tier_element.innerHTML = "Until next tier: " + till_next_tier + "L";

  var updatedTier = tier_element.innerHTML;
  updatedTier = updatedTier.replace('Tier: ', '');

  if(updatedTier === "Abyssal"){
    checkBadge(function (){
      addWisdomBadge();
    });
  }

  var nameContent = document.getElementById("name").innerHTML;
  $.ajax({
    type: "POST",
    url: "update-tier-form.php",
    data: { updatedTier : updatedTier, sphereName : nameContent},
    success: function () {
      console.log("successful action: tier update");
    },
    error: function (error) {
      console.error("Error occured:", error);
    }
  });
  return;
}

function checkBadge(callback){
  $.ajax({
    type: "GET",
    url: "fetch-badge.php&badge_name=wisdom_badge",
    success: function (exists) {
      if(!exists){
        callback();
        
      }else{
        callback();
      }
    },
    error: function (error) {
      console.error("Error occured:", error);
    }
  });
}

function addWisdomBadge(){
  $.ajax({
    type: "POST",
    url: "badges-form.php?badge_name=wisdom_badge",
    success: function() {
      console.log("added");
    },
    error: function(error) {
        console.error('Error:', error);
    }
  });
}

// LIQUID ANIMATIONS

function droplet() {
  var droplet = document.createElement('div');
  droplet.className = 'droplet';
  document.body.appendChild(droplet);
  droplet.style.backgroundColor = color;      
  return update_volume(0.1);
}

function pour() {
  var water_pour = document.createElement('div');
  water_pour.className = 'water_pour';
  document.body.appendChild(water_pour);
  water_pour.style.backgroundColor = color;  
  return update_volume(1);
}

function pour_wide() {
  var water_pour_wide = document.createElement('div');
  water_pour_wide.className = 'water_pour_wide';
  document.body.appendChild(water_pour_wide);
  water_pour_wide.style.backgroundColor = color;  
  return update_volume(3);
}

function make_it_rain() {
  const raindrop = document.createElement('div');
  raindrop.className = 'raindrop';
  raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  raindrop.style.top = '0';
  document.body.appendChild(raindrop);
  raindrop.style.backgroundColor = color; 

  const animation = raindrop.animate([
    { transform: 'translateY(0)' },
    { transform: `translateY(${window.innerHeight}px)` }
  ], {
    duration: Math.random() * 750 + 250,
    easing: 'linear',
    fill: 'forwards'
  });

  animation.onfinish = () => {
    document.body.removeChild(raindrop);
  };
}

function rain() {
  const intervalId = setInterval(make_it_rain, 10);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 1200);

  return update_volume(5);
}

// UPDATING THE SPHERE'S VOLUME AFTER ADDING A CERTAIN AMOUNT OF LIQUID

function update_volume(amount) {
  document.getElementById("incrementable");

  let element = document.getElementById("incrementable");
  let value = Number(element.innerHTML.replace(/[^0-9\.]+/g, ""));

  value += amount;
  value = Number(value.toFixed(2));

  element.innerHTML = value.toString() + "L";

  if (amount < 1) {
    extra_amount += amount;
    extra_amount = Number(extra_amount.toFixed(1))

    if (extra_amount >= 1) {
      amount = Math.trunc(extra_amount);
      extra_amount -= amount;
    }
  }
  return update_tier();
}

// SPHERE ANIMATION

function animateObject() {
  var element = document.getElementById('sphere');
  var initialWidth = 500;
  var targetWidth = initialWidth * 1.1;

  element.style.width = targetWidth + 'px';

  setTimeout(function() {
    element.style.width = initialWidth + 'px';
  }, 1000);
}

// TEXT ANIMATION

function triggerAnimation(buttonIndex) {
  let element = document.getElementById("meaning" + buttonIndex);
  element.style.opacity = 1;
  setTimeout(() => {
    element.style.opacity = 0;
  }, 500);
}