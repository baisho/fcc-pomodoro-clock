
var sessionLength = 25;
var breakLength = 5;
var loopThis = 0;
//var start = 0;
var paused = true;
var repeatMyInterval = 0;
//var countDownTime = 0;
var stoppedValue = 0;
var clickCounter = 0;


// Adding 1 to session time.
// By clicking.
document.getElementById("sessionPlus").addEventListener("click", adding1ToSession);

// By holding the mouse.
document.getElementById("sessionPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToSession, 200);
});

function adding1ToSession() {
    clickCounter = 0;
    sessionLength += 1;
    inject();
}


// Substracting 1 from session time.
// By clicking.
document.getElementById("sessionMinus").addEventListener("click", substracting1FromSession);

// By holding the mouse.
document.getElementById("sessionMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromSession, 200);
});

function substracting1FromSession() {
    clickCounter = 0;
    sessionLength -= 1;
    if (sessionLength <= 1) {
        sessionLength = 1;
    }
    inject();
}


// Adding 1 to break time.
// By clicking.
document.getElementById("breakPlus").addEventListener("click", adding1ToBreak);

// By holding the mouse.
document.getElementById("breakPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToBreak, 200);
});

function adding1ToBreak() {
    clickCounter = 0;
    breakLength += 1;
    inject();
}


// Substracting 1 from break time.
// By clicking.
document.getElementById("breakMinus").addEventListener("click", substracting1FromBreak);

// By holding the mouse.
document.getElementById("breakMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromBreak, 200);
});

function substracting1FromBreak() {
    clickCounter = 0;
    breakLength -= 1;
    if (breakLength <= 1) {
        breakLength = 1;
    }
    inject();
}

// Stop changing sessionLength or breakLength when holding of the mouse is finished.
document.getElementsByTagName("body")[0].addEventListener("mouseup", function () {
    clearInterval(loopThis);
});

// Function to refresh the set times.
function inject() {
    document.getElementById("sessionSet").innerHTML = sessionLength;
    document.getElementById("breakSet").innerHTML = breakLength;
    document.getElementById("sessionValue").innerHTML = sessionLength;
}

inject();





// Starting the session by clicking on time.
document.getElementById("sessionValue").addEventListener("click", showTime);

function showTime() {
    clickCounter ++;
    if (clickCounter > 2) {
        sessionLength = ;
    }
    /*if (clickCounter % 2 == 1) {

    } else if (clickCounter % 2 == 0) {
        
    }*/

    console.log("clickCounter: " + clickCounter);
    if (paused) {

        // Get starting date and time
        var start = Date.now();

        // Set the date we're counting down to
        var countDownTime = (start + sessionLength * 60 * 1000);

        // Update the count down every 1 second
        repeatMyInterval = setInterval(repeatIt, 1000);
        paused = false;

    } else if (!paused) {
        stopIt();
                document.getElementById("demo").innerHTML = "Stopped";
        paused = true;
    }
    function ez() { console.log(paused); }
    setTimeout(ez, 1500);
}

function repeatIt() {

        now = Date.now();

        // Find the distance between start an the count down date
        var distance = countDownTime - now;
        //var distance = stoppedValue - now;

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        // Display the result in the element with id="sessionValue"
        if (distance > 60 * 60 * 1000) {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            document.getElementById("sessionValue").innerHTML = hours + ":"
                + minutes + ":" + seconds;
        } else {
            document.getElementById("sessionValue").innerHTML = minutes + ":" + seconds;
        }

        // If the count down is finished, write some text 
        if (distance <= 0) {
            stopIt();
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }

function stopIt() {
    var atStopping = Date.now();
    console.log("countDownTime: " + countDownTime);
    console.log("stoppedValue: " + stoppedValue);
    clearInterval(repeatMyInterval);
    return atStopping;
}

function timeTransformer(timeInMiliSeconds) {
    var hours = Math.floor((timeInMiliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeInMiliSeconds % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeInMiliSeconds % (1000 * 60)) / 1000);
    return hours, minutes, seconds;
}


/*var myVar = setInterval(function(){ myTimer() }, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
    clearInterval(myVar);
}*/