var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(window).on('load', function() {
    console.log('Page has completely loaded in visit-check.js');
    checkVisit();
});

function checkVisit(){
    $.ajax({
        type: "GET",
        url: "fetch-streak-data.php",
        dataType: 'json',
        success: function (data) {
            // 0 - day-streak sequence
            // 1 - last visit date
            // 2 - best streak
            // 3 - current streak

            // Check the visits <------

            console.log(data);
            var newData = [];
            let todaysDate = new Date();
            let lastVisitDate = new Date(new Date(data[1]).toJSON().slice(0,10));
            if(todaysDate.getFullYear() == lastVisitDate.getFullYear() || todaysDate.getMonth() - lastVisitDate.getMonth() == -11){
                if(todaysDate.getMonth() == lastVisitDate.getMonth() || todaysDate.getMonth() - lastVisitDate.getMonth() == 1){
                    if(todaysDate.getDate() - lastVisitDate.getDate() > 1){
                        let difference = todaysDate.getDate() - lastVisitDate.getDate();
                        //sequence
                        newData.push(data[0].slice(difference,10) + ('0'.repeat(difference-1)) + '1');
                        //best streak
                        newData.push(parseInt(data[2]));
                        //current streak
                        newData.push(0);
                        console.log(newData);
                        saveVisit(newData);
                    }else if(todaysDate.getDate() - lastVisitDate.getDate() == 1){
                        //sequence
                        newData.push(data[0].slice(1,10) + '1');
                        //best streak
                        if(parseInt(data[2]) === parseInt(data[3])){
                            newData.push(parseInt(data[2])+1);
                        }else{
                            newData.push(parseInt(data[2]));
                        }
                        //current streak
                        newData.push(parseInt(data[3])+1);
                        console.log(newData);
                        saveVisit(newData);
                    }
                }else{
                    //sequence
                    newData.push("0000000001");
                    //best streak
                    newData.push(parseInt(data[2]));
                    //current streak
                    newData.push(0);
                    console.log(newData);
                    saveVisit(newData);
                }
            }else{
                //sequence
                newData.push("0000000001");
                //best streak
                newData.push(parseInt(data[2]));
                //current streak
                newData.push(0);
                console.log(newData);
                saveVisit(newData);
            }
            
            //saveVisit(newData);
        },
        error: function (error) {
          console.error("Error occured:", error);
        }       
    });
}

function saveVisit(data){
    $.ajax({
        type: "GET",
        url: "save-streak-data.php?day_streak_sequence="+data[0]+"&best_streak="+data[1]+"&current_streak="+data[2],
        success: function () {

        },
        error: function (error) {
          console.error("Error occured:", error);
        }
    });
}