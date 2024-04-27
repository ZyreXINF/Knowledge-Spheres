var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var badgelvl;

var badges = ["none", "gold_badge", "ruby_badge", "diamond_badge"];

$(window).on('load', function() {
    console.log('Page has completely loaded');

    checkForSubBadges();

  });

$(document).ready(function () {
    var accepted;
    $("#gold-button").on("click", function () {
        if(badgelvl < 1){
            accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
            if(accepted){
                open("https://buy.stripe.com/test_aEU9CbeFO5l2fYY3cc");
                addBadge("gold_badge", 1);
                return false;

                // establishWebhook(function (success){
                //     if(success){
                //         open("https://buy.stripe.com/test_aEU9CbeFO5l2fYY3cc");
                //         // addBadge("gold_badge", 1);
                //         // alert("Successful operation🤍");
                //         // return false;
                //     }else{
                //         console.log("failed to establish webhook");
                //         alert("Something went wrong 😰");
                //     }
                // });
            
            }
        }else{
            alert("You already have this or better subscription activated");
        }
    });
    $("#ruby-button").on("click", function () {
        if(badgelvl < 2){
            accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
            if(accepted){
                open("");
                // addBadge("ruby_badge", 2);
                // return false;
            }
        }else{
            alert("You already have this or better subscription activated");
        }
    });
    $("#diamond-button").on("click", function () {
        if(badgelvl < 3){
            accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
            if(accepted){
                open("");
                // addBadge("diamond_badge", 3);
                // return false;
            }
        }else{
            alert("You already have this subscription activated");
        }
    });
});

// function establishWebhook(callback){
//     $.ajax({
//         type: "POST",
//         url: "webhook-establish.php",
//         success: function() {
//             callback(true);
//         },
//         error: function(error) {
//           console.error('Error:', error);
//             callback(false);
//         }
//     });
// }

function checkForSubBadges(){
    $.ajax({
        type: "GET",
        url: "subscriptions_check.php",
        success: function(badge) {
            badge = badge.substr(1, badge.length-2);
            switch(badge){ 
                case "gold_badge": 
                    badgelvl = 1;
                    break;
                case "ruby_badge": 
                    badgelvl = 2;
                    break;
                case "diamond_badge": 
                    badgelvl = 3;
                    break;
                default:
                    badgelvl = 0;
                    break;
            }
            console.log("sub badge successfully checked \nbadge = " + badge + " \nbadgelvl = " + badgelvl);
        },
        error: function(error) {
          console.error('Error:', error);
        }
    });
}

//ADDING BADGE BASED ON PLAN

function addBadge(badgeName,newlvl){
    $.ajax({
        type: "POST",
        url: "badges-form.php?badge_name="+badgeName,
        success: function() {
            console.log("successful action: added: " + badgeName);
            if (badgelvl == 0){
                addSubscriptionBadge(badgeName);
            }
            else{
                deletePreviousBadge(badges[badgelvl]);
            }
            badgelvl = newlvl;
        },
        error: function(error) {
          console.error('Error:', error);
        }
    });
}

function deletePreviousBadge(badgeName){
    $.ajax({
        type: "POST",
        url: "delete-badge.php?badge_name="+badgeName,
        success: function() {
            console.log("badge successfully deleted from db :)");
        },
        error: function(error) {
          console.error('Error:', error);
        }
    });
}

//ADDING EARLY SUPPORTER BADGE

function addSubscriptionBadge(badgeName){
    var plan;
    switch (badgeName) {
        case 'gold_badge':
            plan = "Gold";
            break;
        case 'diamond_badge':
            plan = "Diamond";
            break;  
        case 'ruby_badge':
            plan = "Ruby";
            break;
        default:
            console.log("failed to identify the plan :(");
            plan = "Undefined";
            break;
      }
    $.ajax({
        type: "POST",
        url: "badges-form.php?badge_name=early_supporter_badge",
        success: function() {
            alert(`You have subscribed to the ${plan} plan! 🎉`);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}