//Some AJAX requests/commands not in place yet due to my server being a small rapsberry pi that cant handle all the processing and i just tested the basica .js functionality in comparison to my .py script
//"Most" things should be pretty selfexplanatory, if not ask me @lorenzoothaaboy or stackoverflow

let User_Lesson = 1; //Current streak
let lesson_completed = false; //not relevant to lable
let heute = new Date(); //Current Date --> needed for graph
let gestern = new Date(); //not needed, why is this til here??

document.addEventListener("DOMContentLoaded", function() {
    let streak_element = document.getElementById('streak');
    streak_element.innerHTML = User_Lesson;
});

function LessonDone() { //tracks time to complete lesson 
    let started = Date.now();

    setTimeout(() => {
        lesson_completed = true; // Simulating completion trigger, for now, will need to put an actual trigger here from front/mid-backend
    }, 3000);
    
    // Simulating additional processing time after completion for buffer
    while (!lesson_completed) {
        // Do nothing, nothing in place yet --> wont be needed
    }

    let finished = Date.now(); //if API ever implemented, needs to be changed to a POSTED bool!!
    let timed = (finished - started) / 1000; // Convert ms to s
    
    if (timed > 0)
    {
        DidDo = true;
        console.log(DidDo, heute); //this shiiiiiiiiiiiiiit af lmao, i wana kms
    }
    return DidDo;
    

}

function DidDoRest()
{
    if(DidDo == true && heute.getHours() == "0")
    {
        DidDO = false;
    }

}

function StreakFunct() // dont know what to use this for yet
{   
    if (DidDo == true)
    {
        User_Lesson + 1;
    }
    
    else if (DidDo == false)
    {
        User_Lesson = 0;
    }
}   

let timed = LessonTime(); //ouput
let Info = {User_Lesson, DidDo, heute}; //in text/splitable 

// Needs an AJAX request to save data to teh actual server
// Replace the URL with the actual endpoint for data handeling
function SaveStatisticsData(Info, DidDo){
    $.ajax({ //replaces code above ig ?
        type: 'POST',
        url: "save-statistics-data.php",
        success: function(){
            console.log("successful action: saved to db "); 
            console.log(Info, DidDo); 
        },
        error: function (error) {
            console.error("Error saving data:", error);
          }
})
}
// Needs AJAX requests for retrieving and analyzing score data !! Needs to be in place to work --> not needed anymore due to requested changes 
    // function GetRetentiveness(ChosenLesson, Retent_start){
    //     let score = data.score;
    //     let yValue = heute;
    //     let xValue = DidDo; 
        
    //     console.log(ChosenLesson);
    //     console.log(Retent_start);
    //     if (score.length >= 40) {
    //     $.ajax({
    //       type: "POST",
    //       url: 'fetch-statistics-data.php',
    //       success: function () {
    //         console.log("successful action: ");
    //       },
    //       error: function (error) {
    //         console.error("Error deleting data:", error);
    //       }
    //     });
    //   }
    //   }

console.log("Code still running?"); //checkpoint

let yValue = heute;
let xValue = DidDo; 

// Needs AJAX request for updating lesson completion status on server
    function UpdateStatisticsData(){
    $.ajax({
        type: "GET",
        url: 'fetch-statistics-data.php',
        success: function () {
            console.log(`These are the X-Values: ${xValue}`); //need to be posted to SQL server and frontend --> futher disscussion about style etc.
            console.log(`These are the Y-Values: ${yValue}`); //if above 0 == true --> steak commended
        },
        error: function (error) {
          console.error("Error deleting data:", error);
        }
      });
    }