var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

const actions = ["send code","confirm code","new password"];

$(document).ready(function () {
    $("#sendButton").on("click", function () {
        const email = document.getElementById("inputField").value;
        checkExistingEmail(email, function (success){
            if(success){
                const code = generateCode();
                // console.log("email: "+email + "\ncode: "+code)
                sendCode(email,code, function (){
                    alterPage(actions[1]);
                });
            }else{
                alert("Such email doesn't exist")
            }
        });
        return false;
    });
});

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

function sendCode(email, code, callback){
    $.ajax({
        type: "POST",
        url: "sendCode.php?email="+email+"&code="+code,
        dataType: "json",
        success: function (response) {
            console.log(response);
            callback();
        },
        error: function (error) {
            console.error("Error occured:", error);
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
    switch(action){
        case "confirm code":
            //input field
            let input = document.getElementById("inputField");
            input.value = "";
            input.placeholder = "Code";

            //title
            let title = document.getElementById("title");
            title.innerHTML = "Enter the Code";
            
            //subtitle
            let subtitle = document.getElementById("subtitle");
            subtitle.innerHTML = "Enter the code we've just sent you.";

            //icon
            let icon = document.querySelector("#icon");
            icon.className = "far fa-clipboard";
            break;
        case "new password":
            // input field
            input.value = "";
            input.placeholder = "New password";

            // title
            title.innerHTML = "Enter New Password";

            // subtitle
            subtitle.innerHTML = "Oh wow. It's really you!";

            // icon
            icon.className = "fa fa-key";
            break;
        default: 
            console.log("unknown action :(");
            break;
    }
}