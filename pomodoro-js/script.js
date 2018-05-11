
var session = true;
var clickCounter = 0;
var sessionButtonClickCounter = 0;
var sessionLength = 0.2;
var breakLength = 0.2;
var sectionLength = 0;
var sectionName = "";
var loopThis = 0;
var repeatMyInterval = 0;
var currentTime1Val = 0;
var currentTime2Val = 0;
var endTimeVal = 0;
var rememberTimeLeftVal = 0;
var volumeUp = true;


// Adding 1 to session time
// By clicking.
document.getElementById("sessionPlus").addEventListener("click", adding1ToSession);

// By holding the mouse
document.getElementById("sessionPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToSession, 200);
});

function adding1ToSession() {
    if (session) {
        // Everytime the countdown is not stopped
        if (clickCounter % 2 == 1) {
            clickCounter = 1;
        }
        // Everytime the countdown is stopped
        else if (clickCounter % 2 == 0) {
            clickCounter = 0;
            sessionLength++;
            sessionButtonClickCounter++;
            injectSessionLength();
            injectSectionLength();
        }
    }
    else if (!session) {
        return;
    }
}


// Substracting 1 from session time
// By clicking.
document.getElementById("sessionMinus").addEventListener("click", substracting1FromSession);

// By holding the mouse
document.getElementById("sessionMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromSession, 200);
});

function substracting1FromSession() {
    if (session) {
        // Everytime the countdown is not stopped
        if (clickCounter % 2 == 1) {
            clickCounter = 1;
        }
        // Everytime the countdown is stopped
        else if (clickCounter % 2 == 0) {
            clickCounter = 0;
            sessionButtonClickCounter++;
            sessionLength--;
            // sessionLength cannot be less then one
            if (sessionLength <= 1) {
                sessionLength = 1;
            }
            injectSessionLength();
            injectSectionLength();
        }
    }
    else if (!session) {
        return;
    }
}


// Adding 1 to break time
// By clicking.
document.getElementById("breakPlus").addEventListener("click", adding1ToBreak);

// By holding the mouse
document.getElementById("breakPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToBreak, 200);
});

function adding1ToBreak() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        if (session) {
            if (sessionButtonClickCounter = 0) {
                clickCounter = 2;
            }
            else if (sessionButtonClickCounter > 0) {
                clickCounter = 0;
            }
        }
        breakLength++;
        injectBreakLength();
        if (!session) {
            clickCounter = 0;
            injectSectionLength();
        }
    }
}


// Substracting 1 from break time
// By clicking.
document.getElementById("breakMinus").addEventListener("click", substracting1FromBreak);

// By holding the mouse
document.getElementById("breakMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromBreak, 200);
});

function substracting1FromBreak() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        if (session) {
            if (sessionButtonClickCounter = 0) {
                clickCounter = 2;
            }
            else if (sessionButtonClickCounter > 0) {
                clickCounter = 0;
            }
        }
        breakLength--;
        // breakLength cannot be less then one
        if (breakLength <= 1) {
            breakLength = 1;
        }
        injectBreakLength();
        if (!session) {
            clickCounter = 0;
            injectSectionLength();
        }
    }
}


// Stop changing sessionLength or breakLength when holding of the mouse is finished
document.getElementsByTagName("body")[0].addEventListener("mouseup", function () {
    clearInterval(loopThis);
});


// Functions to refresh the elements
function injectSessionLength() {
    document.getElementById("sessionSet").innerHTML = sessionLength;
}

function injectBreakLength() {
    document.getElementById("breakSet").innerHTML = breakLength;
}

function injectSectionName() {
    sessionOrBreak();
    document.getElementById("sectionTitle").innerHTML = sectionName;
}

function injectSectionLength() {
    sessionOrBreak();
    document.getElementById("sectionValue").innerHTML = sectionLength;
}

function injectAll() {
    injectSectionLength();
    injectBreakLength();
    injectSectionName();
    injectSessionLength();
}


// Calling injectAll() when the page is loaded
injectAll();


// Starting the session by clicking on time
document.getElementById("sectionValue").addEventListener("click", showTime);


// Functions for calculating and keeping track of time
function currentTime1() { //every odd click
    currentTime1Val = Date.now();
}

function currentTime2() { //every even click
    currentTime2Val = Date.now();
}

function endTime() {
    sessionOrBreak();
    if (clickCounter > 1) {
        endTimeVal = currentTime1Val + rememberTimeLeftVal;
    } else {
        endTimeVal = currentTime1Val + sectionLength * 60 * 1000;
    }
}

function rememberTimeLeft() {
    rememberTimeLeftVal = endTimeVal - currentTime2Val;
}


// This happens when sectionValue is clicked
function showTime() {
    injectSectionName();
    clickCounter++;

    // Every odd counts: start or continue countdown
    if (clickCounter % 2 == 1) {
        sessionOrBreak();
        currentTime1();
        endTime();
        var audio5sec = document.getElementById('5sec');
        if (!audio5sec.paused || audio5sec.currentTime) {
            play5sec();
        }
        // Update the countdown every 0.1 second by setInterval
        repeatMyInterval = setInterval(countDown, 100);
    }
    // Every even counts: pause countdown
    else if (clickCounter % 2 == 0) {
        sessionOrBreak();
        currentTime2();
        rememberTimeLeft();
        var audio5sec = document.getElementById('5sec');
        if (!audio5sec.paused || audio5sec.currentTime) {
            pause5sec();
        }
        // Stop the countdown
        stopIt();
    }
}

// Function for running in every seconds, thus making a countdown
function countDown() {
    var now = Date.now();
    // Find the distance between start and the end
    var distance = endTimeVal - now;

    // Time calculations for hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Making seconds two digits if it is less then 10
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // Display the result in sectionValue
    // If the time is more then an hour, display hours
    if (distance > 60 * 60 * 1000) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        document.getElementById("sectionValue").innerHTML = hours + ":"
            + minutes + ":" + seconds;
    }
    // If the time is less then an hour, don't display hours
    else {
        document.getElementById("sectionValue").innerHTML = minutes + ":" + seconds;
    }

    // If the countdown is finished, stop the current one and change for the next session
    if (distance <= 100) {
        sessionButtonClickCounter = 0;
        stopIt();
        if (session) {
            session = false;
        }
        else if (!session) {
            session = true;
        }
        clickCounter = 0;
        showTime();
        return;
    }

    if (distance <= 6100) {
        play5sec();
    }
}


// Function for keeping track of session
function sessionOrBreak() {
    if (session) {
        sectionLength = sessionLength;
        sectionName = "Session";
    }
    else if (!session) {
        sectionLength = breakLength;
        sectionName = "Break";
    }
}


// Function for stopping the countdown by clearInterval
function stopIt() {
    clearInterval(repeatMyInterval);
}

// Function to play 5sec.mp3 audio file
function play5sec() {
    document.getElementById("5sec").play();
}

// Function to pause 5sec.mp3 audio file
function pause5sec() {
    document.getElementById("5sec").pause();
}

document.getElementById("volumeSymbol").addEventListener("click", toggleSoundOnAndOff);

function toggleSoundOnAndOff() {

    if (volumeUp) {
        document.getElementById("volumeUp").classList.add("hidden");
        document.getElementById("volumeOff").classList.remove("hidden");
        document.getElementById("5sec").muted = true;
        volumeUp = false;
    } else if (!volumeUp) {
        document.getElementById("volumeUp").classList.remove("hidden");
        document.getElementById("volumeOff").classList.add("hidden");
        document.getElementById("5sec").muted = false;
        volumeUp = true;
    }
}