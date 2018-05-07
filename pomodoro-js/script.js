
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

document.getElementById("breakPlus").addEventListener("click", longClick() {
    breakLength += 1;
    inject();
});

function inject() {
    document.getElementById("sessionSet").innerHTML = sessionLength;
    document.getElementById("breakSet").innerHTML = breakLength;
}

inject();

function longClick() {
    mouse = false;
    function mousedown() {
        mouse = true;
        callEvent();
    }
    function mouseup() {
        mouse = false;
    }
    function callEvent() {
        if (mouse) {
            // do whatever you want
            // it will continue executing until mouse is not released


            setTimeout("callEvent()", 1);
        }
        else
            return;
    }
}