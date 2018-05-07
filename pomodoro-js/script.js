
var sessionLength = 25;
var breakLength = 5;

document.getElementById("sessionMinus").addEventListener("click", function () {
    sessionLength -= 1;
    if (sessionLength <= 1) {
        sessionLength = 1;
    }
    inject();
});

document.getElementById("sessionPlus").addEventListener("click", function () {
    sessionLength += 1;
    inject();
});

document.getElementById("breakMinus").addEventListener("click", function () {
    breakLength -= 1;
    if (breakLength <= 1) {
        breakLength = 1;
    }
    inject();
});

document.getElementById("breakPlus").addEventListener("click", function () {
    breakLength += 1;
    inject();
});

document.getElementById("breakPlus").addEventListener("mousedown", function() {
    loopthis = setInterval(repeatingfunction, 200);
});

document.getElementById("breakPlus").addEventListener("mouseup", function() {
    clearInterval(loopthis);
});

function repeatingfunction() {
    breakLength += 1;
    inject();
}

function inject() {
    document.getElementById("sessionSet").innerHTML = sessionLength;
    document.getElementById("breakSet").innerHTML = breakLength;
}

inject();

