var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

const actions = ["send code","confirm code","new password"];
var currentAction = actions[0];
var code, email;

$(document).ready(function () {
    $("#sendButton").on("click", function () {
        switch(currentAction){
            case actions[0]:
                sendCode();
                break;
            case actions[1]:
                confirmCode();
                break;
            case actions[2]:
                resetPassword();
                break;
        }
        return false;
    });
});

function sendCode(){
    email = document.getElementById("inputField").value;
    checkExistingEmail(email, function (success){
        if(success){
            let button = document.getElementById("sendButton");
            button.value = "Wait please..."
            button.disabled = true;
            code = generateCode();
            // console.log("email: "+email + "\ncode: "+code) DO NOT TOUCH
            sendEmail(email,code, function (){
                alterPage(actions[1]);
                currentAction = actions[1];
                button.disabled = false;
            });
        }else{
            alert("Such an email doesn't exist")
        }
    });
}

function confirmCode(){
    let userCode = document.getElementById("inputField").value;
    if(userCode === code){
        alterPage(actions[2]);
        currentAction = actions[2];
    }else{
        alert("Invalid code");
    }
}

function resetPassword(){
    let newPassword = document.getElementById("inputField").value;
    $.ajax({
        type: "POST",
        url: "password-reset?newPassword="+newPassword+"&email="+email,
        success: function () {
            window.location.href = "login.html";
        },
        error: function (error) {
            console.error("Error occured:", error);
        }
    });
}

function checkExistingEmail(email, callback){
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

function sendEmail(email, code, callback){
    $.ajax({
        type: "POST",
        url: "sendCode.php?email="+email+"&code="+code,
        dataType: "json",
        success: function (response) {
            console.log(response);
            callback();
        },
        error: function (error) {
            // console.error("Error occured:", error);
            callback();
        }
    });
}

function generateCode(){
    let characters = '01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function alterPage(action){ 
    let input = document.getElementById("inputField");
    let title = document.getElementById("title");
    let subtitle = document.getElementById("subtitle");
    let icon = document.querySelector("#icon");
    let button = document.getElementById("sendButton");
    switch(action){
        case "confirm code":
            //input field
            
            input.value = "";
            input.placeholder = "Code";
            input.type="name";

            //title
            
            title.innerHTML = "Enter the Code";
            
            //subtitle
            
            subtitle.innerHTML = "Enter the code we've just sent you.";

            //icon
            
            icon.className = "far fa-clipboard";

            //button text
            button.value = "Enter";

            break;
        case "new password":
            // input field
            input.value = "";
            input.placeholder = "New password";
            input.type="password";

            // title
            title.innerHTML = "Enter New Password";

            // subtitle
            subtitle.innerHTML = "Oh wow. It's really you!";

            // icon
            icon.className = "fa fa-key";

            //button text
            button.value = "Enter";
            break;
        default: 
            console.log("unknown action :(");
            break;
    }
}