"strict mode";

var pomoTime = 25;
var fiveMinBreak = 5;
var tenMinBreak = 10;
var fifteenMinBreak = 15;

const times = [pomoTime, fiveMinBreak, tenMinBreak, fifteenMinBreak]; // array of times 
const timeBtn = document.querySelectorAll(".time-button"); // returns a collection of elements with class .time-button

// all default (pomno time is the default time to be displayed on page)
timeBtn[0] = document.querySelector("#timer").innerHTML = times[0] + ":00";
var currTimeDisplayed = timeBtn[0];
var timeChosen = pomoTime;
finishedTime();

// forEach() calls a function once for each element in times array
timeBtn.forEach(function (button, index) {
  button.addEventListener('click', function () { // listens for when there is a click on btn
    clearInterval(interval); // avoids timer starting right away when user clicks one of the time buttons (5,10,15)

    document.querySelector("#timer").innerHTML = times[index] + ":00"; // querySelector() only returns the first element that matches the specified selector

    currTimeDisplayed = button; // update the current time being disaplyed
    timeChosen = times[index]; // update the time chosen

    // to display the finished at time when user clicks on the times buttons
    finishedTime();
  });
});

// variable for countdown
var interval;
// variables for the reporting
var pomosCompleted = 0;
var conTime = 0;
var breakTime = 0;
var totalTime = 0;

// for audio when timer is up
var timesUpAudio = new Audio('audio/times-up.mp3'); // duration: 10s

// for animated circle 
var initialOffset = '0';
var completedOffset = '1031'
var i = 0;
var equation = 0;

/* Need initial run as interval hasn't yet occured... */
document.querySelector(".circle_animation").style.strokeDashoffset = initialOffset;

function countdown() {
  clearInterval(interval); // avoids timer going down fast when user clicks on start button more than once

  interval = setInterval(function () {
    var timer = document.querySelector("#timer").innerHTML; // get the time value of the timer displayed
    var timeInSec = timeChosen * 60;
    console.log("time in sec: " + timeInSec);

    timer = timer.split(':'); // e.g output ["25", "00"]

    var minutes = timer[0]; // 25
    var seconds = timer[1]; // 00 

    seconds -= 1;

    if (minutes < 0) {
      return;
    }
    else if (seconds < 0 && minutes != 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) {
      seconds = '0' + seconds;
    }

    document.querySelector("#timer").innerHTML = minutes + ':' + seconds;

    // check if time is up
    if (minutes == 0 && seconds == 0) {
      clearInterval(interval); // if so, stop the timer at the exact time minutes and seconds == 0
      
      timesUpAudio.play(); // play audio when time is up

      // pomo
      if (timeChosen == pomoTime) {
        pomosCompleted += 1;
        document.querySelector("#pomosCompleted").innerHTML = pomosCompleted;
        conTime += timeChosen;
        document.querySelector("#conTime").innerHTML = conTime;
      }
      // break
      else if (timeChosen == fiveMinBreak || timeChosen == tenMinBreak || timeChosen == fifteenMinBreak) {
        breakTime += timeChosen;
        document.querySelector("#breakTime").innerHTML = breakTime;
      }
    }

    if (i == timeInSec) {  	
      clearInterval(interval);
			return;
    }

    // this is for the total time concentrated
    totalTime = conTime + breakTime;
    document.querySelector("#totalTime").innerHTML = totalTime;

    // this is for the animated circle
    equation = initialOffset+((i+1)*(completedOffset/timeInSec));
    document.querySelector(".circle_animation").style.strokeDashoffset = equation;

    i++;

  }, 1000);
}

function finishedTime () {
      // this is for the 'Finished at:' time
      var date = new Date(); // get today's date 
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am'; // if hours is >= 12 then it is the PM else it is the AM
  
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
  
      if (minutes + timeChosen > 60) {
        // check if hours = 12 bc if so, want to reset to 1
        if (hours == 12) {
          hours = 1;
        }
        else {
          hours += 1;
        }
        minutes = (minutes + timeChosen) % 60;
      }
      else if (minutes + timeChosen == 60) {
        minutes = 0;
      }
      else {
        minutes = minutes + timeChosen;
      }
  
      minutes = minutes < 10 ? '0' + minutes : minutes;
  
      var finishedAt = hours + ':' + minutes + ' ' + ampm;
  
      document.querySelector("#time-finished-at").innerHTML = finishedAt;
}

// when start btn is pressed call startTimer function
document.querySelector("#start-btn").addEventListener('click', function () {
  document.querySelector("#start-btn").innerHTML = "Start";
  countdown();
});

// when pause btn is pressed
document.querySelector("#pause-btn").addEventListener('click', function () {
  clearInterval(interval);
  document.querySelector("#start-btn").innerHTML = "Resume";
});

// when reset btn is pressed
document.querySelector("#reset-btn").addEventListener('click', function () {
  clearInterval(interval);

  document.querySelector("#timer").innerHTML = timeChosen + ":00";

  timesUpAudio.pause(); // when user clicks reset, pause audio

  document.querySelector(".circle_animation").style.strokeDashoffset = initialOffset; // resets animated circle
  i = 0;
});