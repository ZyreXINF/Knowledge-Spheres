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
      for(let i = 0; i < data.length; i++){
        if (page_amount < page_limit) {
          page_amount++;
          const new_li = document.createElement("li");
          const list = document.querySelector(".list ul");
          new_li.innerHTML = '<a class="sphereName" href="sphere_change.php?spherename=' + 
          data[i].name + '">' + data[i].name + 
          '</a><input type="color" value="' + data[i].color + '"id="colorPicker">';
          
          const new_button = document.createElement("button");
          new_button.innerHTML = "save";
          new_button.setAttribute("class", "save");
          
          new_button.addEventListener("click", ()=> {
            var htmlStringContent = new_span.parentElement.textContent;
            var resultName = htmlStringContent.substr(0, htmlStringContent.length-5);
            var colorPicker = document.getElementById("colorPicker").value;
            saveChanges(colorPicker, resultName);
          });
          new_li.appendChild(new_button);
          
          list.appendChild(new_li);
          const new_span = document.createElement("span");
          new_span.innerHTML = "X"; 

          new_span.addEventListener("click", ()=> {
            var confirmDelete = confirm("Are you sure you want to delete this sphere? 💔😔");
            if(confirmDelete){
              var htmlStringContent = new_span.parentElement.textContent;
              var resultName = htmlStringContent.substr(0, htmlStringContent.length-5);
              deleteFromDB(resultName);
              page_amount--;  
              new_span.parentElement.style.opacity = 0;
              setTimeout(()=> {
                new_span.parentElement.remove();
              }, 500)
            }
          })
          new_li.appendChild(new_span);
        }else {
          alert("Max amount of environments is " + page_limit + "!");
        }
      }
    },  
    error: function(error) {
      console.error('Error:', error);
    }
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// CALLING saveToDB() TO SAVE THE NEWLY CREATED SPHERE TO THE DATABASE

$(document).ready(function () {
  $("#submitBtn").on("click", function () {
    saveToDB();
    return false;
  });
});

// DELETING A SPHERE FROM THE DATABASE

function deleteFromDB(sphereName){
  $.ajax({
    type: "POST",
    url: "delete-sphere.php",
    data: {sphereName : sphereName},
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
  const name = $("#txt").val();  
  $.ajax({
    type: "POST",
    url: "mySpheres-form.php",
    data: { name: name },
    success: function () {
      addElement();
      console.log("data successfully saved");
    },
    error: function (error) {
      console.error("Error saving data:", error);
    }
  });
}

// SAVING THE SPHERE'S COLOR CHANGES TO THE DATABASE

function saveChanges(color, sphereName) 
{
  console.log(sphereName);
  $.ajax({
      type: "POST",
      url: "update-color-form.php",
      data: {color : color, sphereName : sphereName},
      success: function (){
        console.log("success action: color change");
      },
      error: function (error) {
        console.error("Error saving data:", error);
      }
  });
}

// CREATING A NEW SPHERE - - - - - - - - - - - - - - - - - - - - -

function addElement() {
  const input_text = document.querySelector("#txt");

  var existingElements = document.getElementsByClassName('sphereName');
  existingElements = Array.from(existingElements);

  var alreadyCreated = false;

  for(let i = 0; i<existingElements.length; i++){
    if(existingElements[i].textContent==input_text.value){
      input_text.value = "";
      alreadyCreated = true;
      alert("Can't create spheres with repeating names 😭");
    }
  }

  if(!alreadyCreated || existingElements==null){
    const button = document.querySelector(".btn-list");
    const list = document.querySelector(".list ul");
  
    if (input_text.value.replace(/(<([^>]+)>)/ig, '').replace(/ /g,'') != "") {
      if (page_amount < page_limit) {
        page_amount++;
  
        const new_li = document.createElement("li");
        input_text.value = input_text.value.replace(/(<([^>]+)>)/ig, "");
  
        new_li.innerHTML = '<a class="sphereName" href="sphere_change.php?spherename=' +
        encodeURIComponent(input_text.value) + '">' + input_text.value +
        '</a><input type="color" value="#0621f8" id="colorPicker">';
      
        list.appendChild(new_li);

        const new_button = document.createElement("button")
        new_button.innerHTML = "save";
        new_button.setAttribute("class", "save");
        new_button.addEventListener("click", ()=> {
          var htmlStringContent = new_span.parentElement.textContent;
          var resultName = htmlStringContent.substr(0, htmlStringContent.length-5);
          var colorPicker = document.getElementById("colorPicker").value;
          saveChanges(colorPicker, resultName);
        });

        new_li.appendChild(new_button);
                                                                                                                                                                                                                                                                                                                                                  
        const new_span = document.createElement("span");
        new_span.innerHTML = "X";
        new_span.addEventListener("click", ()=> {
          var confirmDelete = confirm("Are you sure you want to delete this sphere? 💔😔");
          if(confirmDelete){
            var htmlStringContent = new_span.parentElement.textContent;
            var resultName = htmlStringContent.substr(0, htmlStringContent.length-5);
            deleteFromDB(resultName);
            page_amount--;  
            new_span.parentElement.style.opacity = 0;
            setTimeout(()=> {
              new_span.parentElement.remove();
            }, 500)
          }
        })
        new_li.appendChild(new_span);
      }
      else {
        alert("Max amount of environments is " + page_limit + "!");
      }
    }
    input_text.value = "";
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -