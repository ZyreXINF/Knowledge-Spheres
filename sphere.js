var facts = {
  5: 'There are approximately 5 liters of blood in an average adult human body.',
  10: 'On average, a person might use about 10 liters of water for a single shower.',
  20: 'A typical washing machine uses around 20 liters of water for one load of laundry.',
  50: '50 liters of grape juice can yield about 67 standard bottles of wine.',
  80: '80 liters of liquid chocolate can produce over 640 standard chocolate bars.',
  302: 'A standard bathtub will hold around 302 liters of water.'
};

var tiers = {
  10: 'Mediocre',
  20: 'Decent',
  40: 'Great',
  60: 'Amazing',
  100: 'Incredible',
  150: 'Sublime',
  200: 'Otherworldly'
};

var tier = 'Common';

let extra_amount = 0;

// -----------------------------------------------------------------------------

function tier_updater(volume) {
  for (var threshold in tiers) {
    if (volume < parseInt(threshold)) {
      tier = tiers[threshold];
      break;
    }
  }
}

function droplet() {
  var droplet = document.createElement('div');
  droplet.className = 'droplet';
  document.body.appendChild(droplet);
  return update_volume(0.1);
}

function pour() {
  var water_pour = document.createElement('div');
  water_pour.className = 'water_pour';
  document.body.appendChild(water_pour);
  return update_volume(1);
}

function pour_wide() {
  var water_pour_wide = document.createElement('div');
  water_pour_wide.className = 'water_pour_wide';
  document.body.appendChild(water_pour_wide);
  return update_volume(3);
}

function make_it_rain() {
  const raindrop = document.createElement('div');
  raindrop.className = 'raindrop';
  raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  raindrop.style.top = '0'; // Set the initial top position to 0
  document.body.appendChild(raindrop);

  // Animate the raindrop with a faster duration
  const animation = raindrop.animate([
    { transform: 'translateY(0)' },
    { transform: `translateY(${window.innerHeight}px)` }
  ], {
    duration: Math.random() * 750 + 250, // random duration between 0.25 and 0.75 seconds
    easing: 'linear',
    fill: 'forwards'
  });

  animation.onfinish = () => {
    document.body.removeChild(raindrop);
  };
}

function rain() {
  // Generate raindrops at intervals
  const intervalId = setInterval(make_it_rain, 10);

  // Stop raining after 2 seconds
  setTimeout(() => {
    clearInterval(intervalId);
  }, 1200);

  return update_volume(5);
}

// -----------------------------------------------------------------------------

function update_volume(amount) {
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
    else {
      return;
    }
  }
}

function animateObject() {
  var element = document.getElementById('sphere');
  var initialWidth = 500; // Get the initial width
  var targetWidth = initialWidth * 1.1;

  // Gradually widen the object
  element.style.width = targetWidth + 'px';

  // After a delay, reset the width with a bounce effect
  setTimeout(function() {
    element.style.width = initialWidth + 'px';
  }, 1000); // 1000 milliseconds (1 second) delay
}