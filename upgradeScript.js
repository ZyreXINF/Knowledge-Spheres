var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


$(document).ready(function () {
    var accepted;
    $("#gold-button").on("click", function () {
        accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
        if(accepted){
            addBadge("gold_badge");
            return false;
        }
    });
    $("#diamond-button").on("click", function () {
        accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
        if(accepted){
            addBadge("diamond_badge");
            return false;
        }
    });
    $("#ruby-button").on("click", function () {
        accepted = confirm("Are you sure you want to subscribe to this plan? 👀");
        if(accepted){
            addBadge("ruby_badge");
            return false;
        }
        
    });
});

//ADDING BADGE BASED ON PLAN

function addBadge(badgeName){
    $.ajax({
        type: "POST",
        url: "badges-form.php?badge_name="+badgeName,
        success: function() {
            console.log("successful action: added: " + badgeName);
            addSubscriptionBadge(badgeName);
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