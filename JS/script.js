"strict mode";

const times = [25, 5, 10, 15]; // array of times 
const timeBtn = document.querySelectorAll(".time-button"); // returns a collection of elements with class .time-button

// all default (pomno time is the default time to be displayed on page)
timeBtn[0] = document.querySelector("#timer").innerHTML = times[0] + ":00";
var currTimeDisplayed = timeBtn[0];
var timeChosen = 25;
finishedTime();

// forEach() calls a function once for each element in times array
timeBtn.forEach(function (button, index) {
  button.addEventListener('click', function () { // listens for when there is a click on btn
    clearInterval(interval); // avoids timer starting right away when user clicks one of the time buttons (5,10,15)

    document.querySelector("#timer").innerHTML = times[index] + ":00"; // querySelector() only returns the first element that matches the specified selector

    currTimeDisplayed = button; // update the current time being disaplyed
    timeChosen = times[index]; // update the time chosen

    finishedTime();
  });
});

var interval;
var pomosCompleted = 0;

function countdown() {
  clearInterval(interval); // avoids timer going down fast when user clicks on start button more than once
  interval = setInterval(function () {
    var timer = document.querySelector("#timer").innerHTML;
    timer = timer.split(':');
    var minutes = timer[0];
    var seconds = timer[1];
    seconds -= 1;
    if (minutes < 0) return;
    else if (seconds < 0 && minutes != 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) {
      seconds = '0' + seconds;
    }

    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);
      pomosCompleted += 1;
      document.querySelector();
    }

    document.querySelector("#timer").innerHTML = minutes + ':' + seconds;
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
        hours += 1;
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
});