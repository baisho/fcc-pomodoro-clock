
var sessionLength = 25;
var breakLength = 5;
var loopThis = 0;
var start = 0;
var paused = true;

// Adding 1 to session time.
// By clicking.
document.getElementById("sessionPlus").addEventListener("click", adding1ToSession);

// By holding the mouse.
document.getElementById("sessionPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToSession, 200);
});

document.getElementsByTagName("body")[0].addEventListener("mouseup", function () {
    clearInterval(loopThis);
});

function adding1ToSession() {
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
    breakLength -= 1;
    if (breakLength <= 1) {
        breakLength = 1;
    }
    inject();
}

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
    
    if (paused) {
        paused = false;
    } else if (!paused) {
        paused = true;
    }

    console.log(paused);
start = Date.now();//currentTime();
// Get todays date and time

// Set the date we're counting down to
var countDownTime = (start + sessionLength * 60 * 1000);

// Update the count down every 1 second
var x = setInterval(function () {
    
    now = Date.now();

    // Find the distance between start an the count down date
    var distance = countDownTime - now;

    // Time calculations for hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // Display the result in the element with id="sessionValue"
    if (distance > 60*60*1000) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    document.getElementById("sessionValue").innerHTML = hours + ":"
        + minutes + ":" + seconds;
    } else {
        document.getElementById("sessionValue").innerHTML = minutes + ":" + seconds;
    }

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
};