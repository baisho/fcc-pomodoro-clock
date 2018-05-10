
var session = true;
var clickCounter = 0;
var sessionLength = 0.1;
var breakLength = 0.2;
var sectionLength = 0;
var sectionName = "";
var loopThis = 0;
var repeatMyInterval = 0;
var currentTime1Val = 0;
var currentTime2Val = 0;
var endTimeVal = 0;
var rememberTimeLeftVal = 0;
var atvaltasszamolo = 0;

// Adding 1 to session time.
// By clicking.
document.getElementById("sessionPlus").addEventListener("click", adding1ToSession);

// By holding the mouse.
document.getElementById("sessionPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToSession, 200);
});

function adding1ToSession() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
        console.log("cC fent:" + clickCounter);
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        clickCounter = 0;
        sessionLength += 1;
        inject();
    }
}


// Substracting 1 from session time.
// By clicking.
document.getElementById("sessionMinus").addEventListener("click", substracting1FromSession);

// By holding the mouse.
document.getElementById("sessionMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromSession, 200);
});

function substracting1FromSession() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
        console.log("cC fent:" + clickCounter);
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        clickCounter = 0;
        sessionLength -= 1;
        // sessionLength cannot be less then one
        if (sessionLength <= 1) {
            sessionLength = 1;
        }
        inject();
    }
}


// Adding 1 to break time.
// By clicking.
document.getElementById("breakPlus").addEventListener("click", adding1ToBreak);

// By holding the mouse.
document.getElementById("breakPlus").addEventListener("mousedown", function () {
    loopThis = setInterval(adding1ToBreak, 200);
});

function adding1ToBreak() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
        console.log("cC fent:" + clickCounter);
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        clickCounter = 0;
        breakLength += 1;
        inject();
    }
}


// Substracting 1 from break time.
// By clicking.
document.getElementById("breakMinus").addEventListener("click", substracting1FromBreak);

// By holding the mouse.
document.getElementById("breakMinus").addEventListener("mousedown", function () {
    loopThis = setInterval(substracting1FromBreak, 200);
});

function substracting1FromBreak() {
    // Everytime the countdown is not stopped
    if (clickCounter % 2 == 1) {
        clickCounter = 1;
        console.log("cC fent:" + clickCounter);
    }
    // Everytime the countdown is stopped
    else if (clickCounter % 2 == 0) {
        clickCounter = 0;
        breakLength -= 1;
        // breakLength cannot be less then one
        if (breakLength <= 1) {
            breakLength = 1;
        }
        inject();
    }
}


// Stop changing sessionLength or breakLength when holding of the mouse is finished.
document.getElementsByTagName("body")[0].addEventListener("mouseup", function () {
    clearInterval(loopThis);
});


// Function to refresh the set times.
function inject() {
    console.log("inject vagyok");
    sessionOrBreak();
    document.getElementById("sessionSet").innerHTML = sessionLength;
    document.getElementById("breakSet").innerHTML = breakLength;
    document.getElementById("sectionTitle").innerHTML = sectionName;
    document.getElementById("sectionValue").innerHTML = sectionLength;
}

// Calling inject() when the page is loaded.
inject();


// Starting the session by clicking on time.
document.getElementById("sectionValue").addEventListener("click", showTime);


function currentTime1() { //every odd click
    currentTime1Val = Date.now();
}


function currentTime2() { //every even click
    currentTime2Val = Date.now();
}


function endTime() {
    console.log("endTime vagyok");
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


function showTime() {
    inject();
    console.log("showtime vagyok");
    clickCounter++;
    console.log("clickCounter: " + clickCounter);

    // Every odd counts
    if (clickCounter % 2 == 1) {
        sessionOrBreak();
        currentTime1();
        endTime();
        // Update the count down every 0.1 second by setInterval
        repeatMyInterval = setInterval(countDown, 100);
    }
    // Every even counts
    else if (clickCounter % 2 == 0) {
        sessionOrBreak();
        currentTime2();
        rememberTimeLeft();
        // Stop the countdown
        stopIt();
    }
}


// Function for running in every seconds, thus making a countdown
function countDown() {
    console.log("countdown vagyok");
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

    // If the count down is finished, write some text 
    if (distance <= 0) {
        atvaltasszamolo++;
        console.log("atvaltasszamolo: "+atvaltasszamolo);
        console.log("distance <= 0 eleje: "+session);
        stopIt();
        if (session) {
            session = false;
        } 
        else if (!session) {
            session = true;
        }

        /*if (sectionLength = sessionLength && sectionName = "Session") {
            sectionLength = breakLength;
            sectionName = "Break";
        } 
        else if (sectionLength = breakLength && sectionName = "Break") {
            sectionLength = sessionLength;
            sectionName = "Session";
        }*/
        clickCounter = 0;
        console.log("distance <= 0 vége: "+session);
        console.log(sectionName);
        console.log("cC after distance < 0: "+clickCounter);
        showTime();
    }
}

function sessionOrBreak() {
    console.log("sessionOrBreak funkció eleje: "+session);
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



console.log("betöltésnél valsz: "+session);
console.log("atvaltasszamolo: "+atvaltasszamolo);