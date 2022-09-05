// Initialization and app properties
var calculatorApp = {
    TRUE: 1,
    FALSE: 0
};

// Add hours and minutes to daily total
calculatorApp.addToDaily = function() {
    
    time = $('#time-diff').val();   
    hours = parseInt(time.substring(0,2));
    minutes = parseInt(time.substring(3,5));

    if (isNaN(hours) || isNaN(minutes)) {
        $('#info-label').text("Enter valid times");
    } else {

        dailyTotalHours = parseInt($('#sum-of-hours').val()) + hours;
        dailyTotalMinutes = parseInt($('#sum-of-minutes').val()) + minutes;
        if (dailyTotalMinutes > 60) {
            dailyTotalMinutes -= 60;
            dailyTotalHours++;
        }
        $('#sum-of-hours').val(dailyTotalHours);
        $('#sum-of-minutes').val(dailyTotalMinutes);
    }
}

// reset daily totals to zero
calculatorApp.clearDaily = function() {

    $('#sum-of-hours').val(0);
    $('#sum-of-minutes').val(0);
}

// add daily hours and minutes to weekly totals
calculatorApp.addToWeekly = function() {
    dailyTotalHours = parseInt($('#sum-of-hours').val());
    dailyTotalMinutes = parseInt($('#sum-of-minutes').val());
    weeklyTotalHours = parseInt($('#weekly-sum-of-hours').val()) + dailyTotalHours;
    weeklyTotalMinutes = parseInt($('#weekly-sum-of-minutes').val()) + dailyTotalMinutes;
    if (weeklyTotalMinutes > 60) {
        weeklyTotalMinutes -= 60;
        weeklyTotalHours++;
    }

    $('#weekly-sum-of-hours').val(weeklyTotalHours);
    $('#weekly-sum-of-minutes').val(weeklyTotalMinutes);
}

// clear weekly hour and minute totals
calculatorApp.clearWeekly = function() {
    $('#weekly-sum-of-hours').val(0);
    $('#weekly-sum-of-minutes').val(0);
}

// calculate elapsed time between selected start and stop times
calculatorApp.calculate = function() {

    startTime = $('#input-time1').val();
    startHour = parseInt(startTime.substring(0, 2));
    startMinute = parseInt(startTime.substring(3,5));

    stopTime = $('#input-time2').val();
    stopHour = parseInt(stopTime.substring(0,2));
    stopMinute = parseInt(stopTime.substring(3,5));

    validTime = calculatorApp.TRUE;
    if ((stopHour < startHour) ||
        ((stopHour == startHour) && (stopMinute <= startMinute))) {
        validTime = calculatorApp.FALSE;
    }

    if  (validTime) {
        timeHourDiff = stopHour - startHour;
        timeMinuteDiff = stopMinute - startMinute;
        if (timeMinuteDiff < 0) {
            timeMinuteDiff += 60;
            timeHourDiff--;
        }
        timeHourDiffStr = timeHourDiff.toString();
        if (timeHourDiffStr.length < 2) timeHourDiffStr = "0" + timeHourDiffStr;
        timeMinuteDiffStr = timeMinuteDiff.toString();
        if (timeMinuteDiffStr.length < 2) timeMinuteDiffStr = "0" + timeMinuteDiffStr;
        $('#time-diff').val(timeHourDiffStr+":"+timeMinuteDiffStr);
        $('#info-label').text("");
    } else {
        $('#time-diff').val("");
        $('#info-label').text("Enter valid times");
    }
}

// Function to perform after the window loads
window.onload = function () {
    
    var offset = -240; // Timezone offset for EDT
    var date = new Date();
    date.setTime(date.getTime()+offset*60*1000);

    var currentTime = date.toISOString().substring(11,16);
    $('#input-time1').val(currentTime);    
    inHour1 = parseInt(currentTime.substring(0,2));
    inMinute1 = parseInt(currentTime.substring(3,5));

    $('#input-time2').val(currentTime);
    inHour2 = parseInt(currentTime.substring(0, 2));
    inMinute2 = parseInt(currentTime.substring(3,5));

 }
