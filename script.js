let isRunning;
let seconds = 0;
let milliSeconds = 1;
let isPressed = false;
let milliSecondsDuration = 100;
let localStorageName = 'chrono-rubiks-timer-2021';

localStorage.setItem(localStorageName, '');

const milliSecondsElement = document.querySelector('#ms');
const secondsElement = document.querySelector('#seconds')

const changeValue = (content, variableName) => {
    return variableName.textContent = content;
}

const runTimer = (lever) => {
    if (lever == true) {
        isRunning = setInterval(timer, milliSecondsDuration);
    } else {
        resetTimer();
    }
}

const resetTimer = () => {
    seconds = 0;
    milliSeconds = 00;
    changeValue('0', secondsElement);
    changeValue('00', milliSecondsElement)
    clearInterval(isRunning);
    lever = false;
}

const timer = () => {
    milliSeconds++;
    let isAlreadySecond = milliSeconds == 60;

    if (isAlreadySecond) {
        seconds += 1
        milliSeconds = 0;
        changeValue(seconds, secondsElement);
    }
    changeValue(milliSeconds, milliSecondsElement);
}

document.addEventListener('keyup', (e) => {
    const isSpaceBarPressed = e.keyCode == 32;

    if (isSpaceBarPressed) {
        isPressed = !isPressed
        runTimer(isPressed);
    }
}) 
