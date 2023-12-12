var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var page_amount = 0;
var page_limit = 10;

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
          new_li.innerHTML = '<a class="sphereName" href="sphere_change.php?spherename=' + data[i].name + '">' + data[i].name + '</a><input type="color" value=' + data[i].color + '>';
          list.appendChild(new_li);
          const new_span = document.createElement("span");
          new_span.innerHTML = "X"; 
          new_span.addEventListener("click", ()=> {
            var confirmDelete = confirm("Are you sure you want to delete this sphere? 💔😔");
            if(confirmDelete){
              var htmlStringContent = new_span.parentElement.textContent;
              var resultName = htmlStringContent.substr(0, htmlStringContent.length-1);
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

$(document).ready(function () {
  $("#submitBtn").on("click", function () {
    phpInvoke();
    return false;
  });
});

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

function phpInvoke() {
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

function addElement() {
  // var index = 0
  
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
  
        // GENERATE A LINK BASED ON THE INDEX
  
        // var link = 
        // 'sphere' + index.toString() + '.html';
  
        // index++;
  
        new_li.innerHTML = '<a class="sphereName" href="sphere_change.php?spherename=' + encodeURIComponent(input_text.value) + '">' + input_text.value + '</a><input type="color" value="#0621f8">';
        list.appendChild(new_li);
                                                                                                                                                                                                                                                                                                                                                  
        const new_span = document.createElement("span");
        new_span.innerHTML = "X";
        new_span.addEventListener("click", ()=> {
          var confirmDelete = confirm("Are you sure you want to delete this sphere? 💔😔");
          if(confirmDelete){
            var htmlStringContent = new_span.parentElement.textContent;
            var resultName = htmlStringContent.substr(0, htmlStringContent.length-1);
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