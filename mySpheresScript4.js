var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var page_amount = 0;
var page_limit = 5;

var openedSphereName;

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
  $("#save-changes").on("click", function() {
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

function saveChanges() {
  var color = document.getElementById("colorPicker").value;
  var newName = document.getElementById("sphere_name").value;
  var meanings = [];
  meanings.push(document.getElementById("cfg_droplet").value);
  meanings.push(document.getElementById("cfg_pour").value);
  meanings.push(document.getElementById("cfg_waterfall").value);
  meanings.push(document.getElementById("cfg_rain").value);
  var description = document.getElementById("description").value;
{
  $.ajax({
      type: "POST",
      url: "update-configuration-form.php?color=" + encodeURIComponent(color) + "&new_sphere_name=" + encodeURIComponent(newName) +
       "&old_sphere_name="+ encodeURIComponent(openedSphereName) +"&droplet=" + encodeURIComponent(meanings[0]) + "&pour=" + encodeURIComponent(meanings[1]) +
        "&waterfall=" + encodeURIComponent(meanings[2]) +
        "&rain=" + encodeURIComponent(meanings[3]) + "&description=" + encodeURIComponent(description),
      success: function (response){
        console.log("action result: " + response);
      },  
      error: function (error) {
        console.error("Error saving data:", error);
      }
  });
}
}

// FETCHING THE SPHERE'S CONFIGURATION CHANGES FROM THE DATABASE

function fetchSpheresConfig(callback) {
  $.ajax({
      type: "GET",
      url: "fetch-spheres-configuration-form.php?sphere_name=" + encodeURIComponent(openedSphereName),
      dataType: 'json',
      success: function (sphereConfiguration) {
          console.log("successful action: fetched sphere configuration");
          callback(sphereConfiguration);
      },
      error: function (error) {
          console.error("Error fetching data:", error);
          // Handle the error or pass null to the callback
          callback(null);
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
          var htmlStringContent = config_button.parentElement.parentElement.textContent;
          var resultName = htmlStringContent.substr(0, htmlStringContent.length - 2);
          openedSphereName = resultName;
          
          fetchSpheresConfig(function (values) {
            modal.showModal();
            title.blur();

            document.getElementById("sphere_name").value = openedSphereName;
            document.getElementById("colorPicker").value = values[0];
            document.getElementById("cfg_droplet").value = values[1];
            document.getElementById("cfg_pour").value = values[2];
            document.getElementById("cfg_waterfall").value = values[3];
            document.getElementById("cfg_rain").value = values[4];
            document.getElementById("description").value = values[5];
          });      
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