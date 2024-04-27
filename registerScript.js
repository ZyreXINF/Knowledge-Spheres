var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function () {
    $("#submitBtn").on("click", function () {
        var email = document.getElementById("userEmail").value;
        var name = document.getElementById("userName").value;
        var userPassword = document.getElementById("userPassword").value;
        if(name.length >= 4){
            saveData(email, name, userPassword);
        }else{
            alert("Username must contain at least 4 charachters!!!");
        }

        return false;
    });
});
    
function saveData(email, name, password){
    console.log("email: "+ email + "\n" + 
                "name: "+ name + "\n" +
                "password: "+ password
    );
    $.ajax({
        type: "POST",
        url: "register-form.php?userEmail="+email+"&userName="+name+"&userPassword="+password,
        dataType: "json",
        success: function (jsonData) {
            if(jsonData == "true"){
                window.location.href = "login.html";
            }else if(jsonData == "false"){
                window.location.href = "alert_register.html";
            } 
        },
        error: function (error) {
            console.error("Error occured:", error);
        }
    });
}