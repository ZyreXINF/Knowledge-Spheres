var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function () {
    $("#submitBtn").on("click", function () {
        var emailElement = document.getElementById("userEmail");
        var email = emailElement.value;
        var nameElement = document.getElementById("userName");
        var name = nameElement.value;
        var userPasswordElement = document.getElementById("userPassword");
        var userPassword = userPasswordElement.value;
        saveData(email, name, userPassword);
        return false;
    });
});
    
function saveData(email, name, userPassword){
    // console.log("email: "+ email + "\n" + 
    //             "name: "+ name + "\n" +
    //             "password: "+ userPassword
    // );
    $.ajax({
        type: "POST",
        url: "register-form.php",
        dataType: "json",
        data: {userEmail: email, userName: name, userPassword: userPassword},
        success: function (jsonData) {
            var link = "http://localhost/phpcodes/Knowledge-Spheres__1";
            if(jsonData == "true"){
                window.location.replace(link + "/login.html");
            }else if(jsonData == "false"){
                window.location.replace(link + "/alert_register.html");
            } 
        },
        error: function (error) {
            console.error("Error occured:", error);
        }
    });
}