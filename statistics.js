var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Data representing whether someone was active on days of the week (0 for inactive, 1 for active)
var activityData = [0, 1, 0, 1, 1, 0, 1, 0, 0 , 1]; // Assuming Monday is the first day of the week
var daysOfWeekLabels = [];

function setDates(){
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
  console.log('Page has completely loaded');
  setDates();
  createChart();
});



