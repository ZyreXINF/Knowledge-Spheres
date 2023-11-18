function phpInvoke() {
    const name = $("#txt").val();
    $.ajax({
        type: "POST",
        url: "mySpheres-form.php", // Your PHP script to save the name
        data: { name: name },
        success: function (response) {
            addElement()
            console.log("data successfully saved");
            // Additional JavaScript actions can be added here
        },
        error: function (error) {
            console.error("Error saving data:", error);
        }
    });
}
function addElement(){
    var page_limit = 10
    var index = 0
    let page_amount = 0

    const input_text = document.querySelector("#txt");
    //const button = document.querySelector(".btn-list");
    const list = document.querySelector(".list ul");

    if (input_text.value.replace(/(<([^>]+)>)/ig, '').replace(/ /g,'') != "") {
        if (page_amount < page_limit) {
          e.preventDefault();
          page_amount++;
    
          const new_li = document.createElement("li");
          input_text.value = input_text.value.replace(/(<([^>]+)>)/ig, "");

          // GENERATE A LINK BASED ON THE INDEX

          link = 
          'sphere' + index.toString() + '.html';

          index++;

          new_li.innerHTML = '<a href="' + link + '" target="_blank">' + input_text.value + '</a><input type="color" value="#ff0000">';

          list.appendChild(new_li);

          const new_span = document.createElement("span");
          new_span.innerHTML = "X";
          new_span.addEventListener("click", ()=> {
            page_amount--;
            new_span.parentElement.style.opacity = 0;
            setTimeout(()=> {
              new_span.parentElement.remove();
            }, 500)
          })
          new_li.appendChild(new_span);
        }
        else {
          alert("Max amount of environments is " + page_limit + "!");
        }
      }
      input_text.value = "";

    //button.addEventListener("click", (e)=> {});
}

$(document).ready(function () {
    $("#submitBtn").on("click", function () {
        phpInvoke();
    });
});