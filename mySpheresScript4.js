var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var page_amount = 0;
var page_limit = 5;

// LOADING THE SPHERES BACK TO THE PAGE ON_LOAD - - - - - - - - - -

$(window).on('load', function() {
  console.log('Page has completely loaded');
  $.ajax({
    type: "GET",
    url: "fetch-spheres.php",
    dataType: "json",
    success: function(data) {
      for (let i = 0; i < data.length; i++) {
        addElement(data[i].name);
      } // close the for loop
    },  
    error: function(error) {
      console.error('Error:', error);
    }
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(document).ready(function () {
  $("#submitBtn").on("click", function () {
    saveToDB();
    return false;
  });
  $("#save-button").on("click", function() {
    saveChanges(); //not ready, php needed
    return false;
  });
});

// DELETING A SPHERE FROM THE DATABASE

function deleteFromDB(sphereName){
  console.log(sphereName);
  $.ajax({
    type: "POST",
    url: 'delete-sphere.php?sphereName='+sphereName,
    success: function () {
      console.log("successful action: delete");
    },
    error: function (error) {
      console.error("Error deleting data:", error);
    }
  });
}

// SAVING THE NEWLY CREATED SPHERE TO THE DATABASE

function saveToDB() {
  const sphereName = document.querySelector("#txt").value; 
  $.ajax({
    type: "POST",
    url: 'mySpheres-form.php?sphereName='+sphereName,
    success: function () {
      addElement(sphereName);
      console.log("data successfully saved");
    },
    error: function (error) {
      console.error("Error saving data:", error);
    }
  });
}

// SAVING THE SPHERE'S CONFIGURATION CHANGES TO THE DATABASE

function saveChanges(color, sphereName, meanings, description) 
{
  $.ajax({
      type: "POST",
      url: "update-configuration-form.php",
      data: {
        color : color, 
        sphereName : sphereName,
        droplet: meanings[0],
        pour : meanings[1],
        pourWide : meanings[2],
        rain : meanings[3],
        description :  description
        },
      success: function (){
        console.log("success action: sphere config updated");
      },
      error: function (error) {
        console.error("Error saving data:", error);
      }
  });
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const dialog = document.querySelector("dialog");

const close_button = document.querySelector("[data-close-modal");
const modal = document.querySelector("[data-modal]");

const title = document.querySelector("[title]");

close_button.addEventListener("click", () => {
  modal.close();
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

// CREATING A NEW SPHERE

function addElement(sphereName){
  var existingElements = document.getElementsByClassName('sphereName');
  existingElements = Array.from(existingElements);

  var alreadyCreated = false;
  if(existingElements.length != null){
    for(let i = 0; i<existingElements.length; i++){
      if(existingElements[i].textContent==sphereName){
        document.querySelector("#txt").value = "";
        alreadyCreated = true;
        alert("Can't create spheres with repeating names 😭");
      }
    }
  }
  
  if(!alreadyCreated || existingElements==null){
    const list = document.querySelector(".list ul");

    if (sphereName.replace(/(<([^>]+)>)/ig, '').replace(/ /g,'') != "") {
      if (page_amount < page_limit) {
        page_amount++;

        const new_li = document.createElement("li");
        sphereName = sphereName.replace(/(<([^>]+)>)/ig, "");

        new_li.innerHTML = '<a class="sphereName" href="sphere_change.php?spherename=' +
          encodeURIComponent(sphereName) + '">' + sphereName + '</a>';

        list.appendChild(new_li);

        // ADDING THE BUTTONS

        var button_container = document.createElement('div');
        button_container.className = 'button_container';

        const config_button = document.createElement("button");
        config_button.innerHTML = "⚙";
        config_button.setAttribute("class", "configuration");
        config_button.setAttribute("id", "configuration-button");
        config_button.addEventListener("click", () => {
          var htmlStringContent = config_button.parentElement.textContent;
          var resultName = htmlStringContent.substr(0, htmlStringContent.length - 5);

          // ADD CODE TO INVOKE FETCHING DATA FROM DB TO SEND IT TO THE MODAL
          // ...

          modal.showModal();
          title.blur();
        });

        const delete_button = document.createElement("span");
        delete_button.innerHTML = "X";
        delete_button.addEventListener("click", () => {
          var confirmDelete = confirm("Are you sure you want to delete this sphere? 💔😔");
          if (confirmDelete) {
            var htmlStringContent = delete_button.parentElement.parentElement.textContent;
            var resultName = htmlStringContent.substr(0, htmlStringContent.length - 2);
            deleteFromDB(resultName);
            page_amount--;
            delete_button.parentElement.parentElement.style.opacity = 0;
            setTimeout(() => {
              delete_button.parentElement.parentElement.remove();
            }, 500);
          }
        });

        button_container.appendChild(config_button);
        button_container.appendChild(delete_button);

        new_li.appendChild(button_container);
      }
      else {
        alert("Max amount of environments is " + page_limit + "!");
      }
    }
    document.querySelector("#txt").value = "";
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -