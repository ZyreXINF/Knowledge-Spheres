var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Data representing whether someone was active on days of the week (0 for inactive, 1 for active)
var activityData = [0, 1, 0, 1, 1, 0, 1, 0, 0 , 1]; // Assuming Monday is the first day of the week
var daysOfWeekLabels = [];
var litersData = [];

$(window).on('load', function() {
    console.log('Page has completely loaded in statistics.js');
    setDates(function (){   
        createChart();
        setLitersValues(function (){
            createLitersChart();
        });
    });
    
    displayStreaks();
    displayMostLiters();
    displayAmountOfSpheres();
    displayLargestSphere();
});

function displayMostLiters(){
    $.ajax({
        type: "GET",
        url: "fetch-most-liters.php",
        dataType: 'json',
        success: function (mostLiters) {
            console.log(mostLiters);
            let mostLitersLabel = document.getElementById("most_liters");
            mostLitersLabel.textContent = mostLiters;

        },
        error: function (error) {
          console.error("Error occured:", error);
        }
      });
}

function displayAmountOfSpheres(){
    $.ajax({
        type: "GET",
        url: "fetch-amount-of-spheres.php",
        dataType: 'json',
        success: function (sphereAmount) {
            console.log(sphereAmount);
            let amountLabel = document.getElementById("spheres_amount");
            amountLabel.textContent = sphereAmount;

        },
        error: function (error) {
          console.error("Error occured:", error);
        }
      });
}

function displayLargestSphere(){
    $.ajax({
        type: "GET",
        url: "fetch-largest-sphere.php",
        dataType: 'json',
        success: function (largestSphere) {
            let sphereLabel = document.getElementById("largest_sphere");
            sphereLabel.textContent = largestSphere;

        },
        error: function (error) {
          console.error("Error occured:", error);
        }
      });
}

function displayStreaks(){
    $.ajax({
        type: "GET",
        url: "fetch-streak-sequence.php",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let streakLabel = document.getElementById("streak");
            streakLabel.textContent = data[2];
            let bestStreakLabel = document.getElementById("best_streak");
            bestStreakLabel.textContent = data[1];
        },
        error: function (error) {
          console.error("Error occured:", error);
        }
      });
}

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

function setLitersValues(callback){
    $.ajax({
        type: "GET",
        url: "fetch-added-liters.php",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let dateAndLitersMapping = {};
            for (let i = 0; i < 10; i++){
                dateAndLitersMapping[daysOfWeekLabels[i]] = 0;
                let formatedDate = new Date();
                formatedDate.setMonth(2);
                let add_date = data[i].add_date;
                formatedDate.setDate(add_date.substring(8,10));
                formatedDate.setMonth(add_date.substring(5,7)-1);
                formatedDate.setFullYear(add_date.substring(0,4));
                console.log(add_date.substring(5,7));
                console.log(formatedDate);  
            }
            
            for (let i = 0; i < data.length; i++) {  
                litersData.push(data[i].volume_added); 
            }   
            console.log(litersData);
            callback();
        },
        error: function(xhr, status, error) {
            console.error("Error occurred:", xhr, status, error);
        }
      });
}

function createLitersChart(){
    // Create a new line chart
    let litersChart = new Chart("myChart2", {
        type: "line",
        data: {
          labels: daysOfWeekLabels,
          datasets: [{
            borderColor: '#0621f8',
            label: 'Liters Per Day',
            borderWidth: 2,
            pointBackgroundColor: '#0214a3', // Blue color for the points
            pointRadius: 5,
            pointHoverRadius: 7,
            // fill: false, // Do not fill the area under the line
            data: litersData
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
                    },
                }]
            }
        }
      });
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

