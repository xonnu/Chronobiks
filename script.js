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
    if (!lever) {
        return resetTimer();
    }
    isRunning = setInterval(timer, milliSecondsDuration);
}

const resetTimer = () => {
    seconds = 0;
    milliSeconds = 00;
    changeValue('0 ', secondsElement);
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
    changeValue(String(milliSeconds).padStart(2, '0'), milliSecondsElement);
}

let timerLever = () => {
    isPressed = !isPressed
    runTimer(isPressed);
}


document.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        timerLever()
    }
})

document.addEventListener('click', () => {
    timerLever()
})