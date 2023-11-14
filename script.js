var facts = {
  5: 'There are approximately 5 liters of blood in an average adult human body.',
  10: 'On average, a person might use about 10 liters of water for a single shower.',
  20: 'A typical washing machine uses around 20 liters of water for one load of laundry.',
  50: '50 liters of grape juice can yield about 67 standard bottles of wine.',
  80: '80 liters of liquid chocolate can produce over 640 standard chocolate bars.',
  302: 'A standard bathtub will hold around 302 liters of water.'
};

// let extra_amount = 0;

// function add_bottle(amount) {
//   // incrementing the value
//   let element = document.getElementById("incrementable");

//   let value = Number(element.innerHTML.replace(/[^0-9\.]+/g, ""));

//   value += 0.5 * amount;
//   value = Number(value.toFixed(2));

//   element.innerHTML = "<span class='blue'>" + value.toString() + "</span>L";

//   // adding an image
//   if (amount < 1) {
//     extra_amount += amount;
//     extra_amount = Number(extra_amount.toFixed(1))

//     if (extra_amount >= 1) {
//       amount = Math.trunc(extra_amount);
//       extra_amount -= amount;
//     }
//     else {
//       return;
//     }
//   }

//   for (let i=0; i<amount; i++) {
//     img = document.createElement("img");
//     img.src = "https://www.freeiconspng.com/thumbs/water-bottle-png/drinking-water-bottle-png-9.png";
//     img.width = 60;
//     document.body.appendChild(img);
//   }

//   var volume = Math.trunc(value);
  
//   if (facts.includes(volume)) {
//     // Use facts[volume] to display an interesting fact.
//     console.log(facts[volume])
//     // THERE WAS AN ERROR SO CHECK IT OUT AND FIX IT
//   }
// }
