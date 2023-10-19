let extra_amount = 0;

function add_bottle(amount) {
  // incrementing the value
  let element = document.getElementById("incrementable");

  let value = Number(element.innerHTML.replace(/[^0-9\.]+/g, ""));

  value += 0.5 * amount;
  value = Number(value.toFixed(2));

  element.innerHTML = "<span class='blue'>" + value.toString() + "</span>L";

  // adding an image
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

  for (let i=0; i<amount; i++) {
    img = document.createElement("img");
    img.src = "https://www.freeiconspng.com/thumbs/water-bottle-png/drinking-water-bottle-png-9.png";
    img.width = 60;
    document.body.appendChild(img);
  }
}