var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function () {
    $("#sendButton").on("click", function () {
        checkExistingEmail(function (success){
            if(success){
                let code = generateCode();
                sendCode(code);
            }else{
                alert("Such email doesn't exist")
            }
        });
        return false;
    });
});

function checkExistingEmail(callback){
    let email = document.getElementById("email").value;
    $.ajax({
        type: "GET",
        url: "email-check.php?email="+email,
        dataType: "json",
        success: function (success) {
            console.log(success);
            callback(success);
        },
        error: function (error) {
            console.error("Error occured:", error);
        }
    });
}

function sendCode(code){
    $.ajax({
        type: "GET",
        url: "sendCode.php?email="+email,
        dataType: "json",
        success: function () {
        },
        error: function (error) {
            console.error("Error occured:", error);
        }
    });
}

function generateCode(){
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

