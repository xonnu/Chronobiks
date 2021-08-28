/**
 * 
 *  Developed by Justin Pascual - 2021
 *  Contact: https://fb.me/heychrono
 *  
 */

let seconds = 0;
let timeSolved = 0;
let milliSeconds = 1;
let isRunning = null;
let isPressed = false;
let isAlreadySecond = null;
let milliSecondsDuration = 20;
let changeColorVariable = null;
let localStorageName = 'chronobiks-2021';
let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

const timeSolvedElement = document.querySelector('#timeSolved')
const milliSecondsElement = document.querySelector('#milliSeconds');
const secondsElement = document.querySelector('#seconds')
const timerElement = document.querySelector('#timer');
const runButtonElement = document.querySelector('#runTimer');

const changeValue = (content, variableName) => {
    return variableName.textContent = content;
}

const changeColor = (textColor, variableName) => {
    return variableName.style.color = textColor
}

const AddZeroFirstCharacter = (value) => {
    return String(value).padStart(2, '0')
}

const runTimer = (lever) => {
    return !lever ? resetTimer() : isRunning = setInterval(timer, milliSecondsDuration);
}

let timerLever = () => {
    isPressed = !isPressed
    runTimer(isPressed);
}

let getTimeList = (storageName) => {
    return localStorage.getItem(storageName);
}

const defaultTimeListData = [{
    "id": 0,
    "time": "Hello, welcome to Chronobiks",
    "date": currentDate
}]

let getOldTimeListData = JSON.parse(getTimeList(localStorageName)) || defaultTimeListData;
let timeListDataStorage = [...getOldTimeListData];

// order id of the time list when browser is closed.
let solvedTimeID = 0
for (let i = 0; i < getOldTimeListData.length; i++) {
    solvedTimeID += 1;
    getOldTimeListData[i].id = solvedTimeID;
}

let addTimeList = () => {
    let solvedTimeList = {};
    let timeListDataStorageCount = timeListDataStorage.length;

    solvedTimeList['id'] = timeListDataStorageCount += 1;
    solvedTimeList['time'] = timeSolved;
    solvedTimeList['date'] = currentDate;

    // Add new data to timeListData array
    timeListDataStorage.push(solvedTimeList);
    // Add new data to localStorage
    localStorage.setItem(localStorageName, JSON.stringify(timeListDataStorage));
}

const resetTimer = () => {
    lever = false;
    timeSolved = `${seconds}.${milliSeconds}`;
    addTimeList();
    seconds = 0;
    milliSeconds = 0;
    clearInterval(isRunning);
    changeValue('00', secondsElement);
    changeValue('00', milliSecondsElement)
}

const timer = () => {
    milliSeconds++;
    isAlreadySecond = milliSeconds == 60;

    if (isAlreadySecond) {
        seconds += 1
        milliSeconds = 0;
        changeValue(AddZeroFirstCharacter(seconds), secondsElement);
    }

    changeValue(AddZeroFirstCharacter(milliSeconds), milliSecondsElement);
}

document.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        changeColor('black', timerElement)
        timerLever()
        app.$data.timeListFromStorage = timeListDataStorage
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') return changeColor('green', timerElement);
})

document.addEventListener('click', (e) => {
    if (e.target.closest('#resetButton')) {
        app.$data.timeListFromStorage = defaultTimeListData;
        return;
    }
    timerLever()
})

const app = new Vue({
    el: '#app',
    data: {
        timeListFromStorage: JSON.parse(getTimeList(localStorageName)) || defaultTimeListData
    },
    methods: {
        addTimeToList: function () {
            if (isPressed) return this.timeListFromStorage = timeListDataStorage;
        },
        timeListReset: function () {
            this.timeListFromStorage = defaultTimeListData
            localStorage.clear(localStorageName)
        }
    }
})