var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Data representing whether someone was active on days of the week (0 for inactive, 1 for active)
var activityData = [0, 1, 0, 1, 1, 0, 1, 0, 0 , 1]; // Assuming Monday is the first day of the week
var daysOfWeekLabels = [];

function setDates(callback){
    $.ajax({
        type: "GET",
        url: "fetch-streak-sequence.php",
        dataType: 'json',
        success: function (data) {
            for(let i = 0; i<10; i++){
                let str = data[0];
                activityData[i] = Number(str[i]);
            }
            callback();
        },
        error: function (error) {
          console.error("Error occured:", error);
        }
      });
    // Labels for days of the week
    let today = new Date();
    for (let i = 9; i >= 0; i--){
        let previousDate = new Date(today);
        previousDate.setDate(today.getDate()-i);
        previousDate.setMonth(previousDate.getMonth()+1);
        daysOfWeekLabels.push(`${previousDate.getDate()}-${previousDate.getMonth()}`,);
    }
}


function createChart(){
    // Create a new line chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: daysOfWeekLabels,
        datasets: [{
            label: 'Activity',
            data: activityData,
            borderColor: '#0621f8', // Blue color for the line
            borderWidth: 2,
            pointBackgroundColor: '#0214a3', // Blue color for the points
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false, // Do not fill the area under the line
            lineTension: 0 // Set line tension to 0 to make it straight
        }]
        },
        options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
            ticks: {
                fontColor: '#333', // Dark grey color for x-axis labels
            },
            display: true,
            }],
            yAxes: [{
            ticks: {
                fontColor: '#333', // Dark grey color for y-axis labels
                beginAtZero: true,
                stepSize: 1,
                suggestedMax: 1,
                callback: function (value) {
                return value === 1 ? 'Active' : 'Inactive';
                }
            },
            }]
        }
        }
    });
}


$(window).on('load', function() {
    console.log('Page has completely loaded in statistics.js');
    setDates(function (){   
    createChart();
    });
    // checkVisit();
});

// function checkVisit(){
//     $.ajax({
//         type: "GET",
//         url: "fetch-streak-data.php",
//         dataType: 'json',
//         success: function (data) {
//             // 0 - last visit date
//             // 1 - best streak
//             // 2 - current streak

//             // Check the visits <------

//             console.log(data[0]);
//             let todaysDate = new Date();
//             let lastVisitDate = new Date(new Date(data[0]).toJSON().slice(0,10));
//             if(todaysDate.getFullYear() == lastVisitDate.getFullYear()){
//                 if(todaysDate.getMonth() == lastVisitDate.getMonth()){
//                     if(todaysDate.getDate() - lastVisitDate.getDate() > 1){
//                         console.log(" You not are fucking molodec1");
//                     }else if(todaysDate.getDate() - lastVisitDate.getDate() == 1){
//                         console.log(" You is fucking brötchen");
//                     }else {
//                         console.log("POHUI+POHUI BRUH");
//                     }
//                 }
//             }
            
//             //saveVisit(data);
//         },
//         error: function (error) {
//           console.error("Error occured:", error);
//         }       
//     });
// }

// function saveVisit(data){
//     $.ajax({
//         type: "GET",
//         url: "save-streak-data.php",
//         success: function () {
                
//         },
//         error: function (error) {
//           console.error("Error occured:", error);
//         }
//     });
// }