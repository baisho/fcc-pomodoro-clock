
var sessionLength = 25;
var breakLength = 5;
//var loopThis = 0;


// Adding 1 to session time.
// By clicking.
document.getElementById("sessionPlus").addEventListener("click", adding1ToSession);

// By holding the mouse.
document.getElementById("sessionPlus").addEventListener("mousedown", function() {
    loopThis = setInterval(adding1ToSession, 200);
});

document.getElementById("sessionPlus").addEventListener("mouseup", function() {
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
document.getElementById("sessionMinus").addEventListener("mousedown", function() {
    loopThis = setInterval(substracting1FromSession, 200);
});

document.getElementById("sessionMinus").addEventListener("mouseup", function() {
    clearInterval(loopThis);
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
document.getElementById("breakPlus").addEventListener("mousedown", function() {
    loopThis = setInterval(adding1ToBreak, 200);
});

document.getElementById("breakPlus").addEventListener("mouseup", function() {
    clearInterval(loopThis);
});

function adding1ToBreak() {
    breakLength += 1;
    inject();
}


// Substracting 1 from break time.
// By clicking.
document.getElementById("breakMinus").addEventListener("click", substracting1FromBreak);

// By holding the mouse.
document.getElementById("breakMinus").addEventListener("mousedown", function() {
    loopThis = setInterval(substracting1FromBreak, 200);
});

document.getElementById("breakMinus").addEventListener("mouseup", function() {
    clearInterval(loopThis);
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
}

inject();

