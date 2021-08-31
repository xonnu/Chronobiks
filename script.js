/**
 * 
 *  Developed by Justin Pascual - 2021
 *  Contact: https://fb.me/heychrono
 *  
 */

let seconds = 0;
let timeSolved = 0;
let milliseconds = 01;
let isRunning = null;
let isRunTriggered = false;
let isAlreadySecond = null;
let millisecondsDuration = 20;
let storageName = 'chronobiks-2021';

const dateObject = new Date()
const currentMonth = dateObject.toLocaleString('default', {
    month: 'short'
});
const currentDay = dateObject.getUTCDate();
const currentYear = dateObject.getFullYear();
const currentDateToday = `${currentMonth} ${currentDay}, ${currentYear}`;

const timeSolvedElement = document.querySelector('#timeSolved')
const millisecondsElement = document.querySelector('#milliseconds');
const secondsElement = document.querySelector('#seconds')
const timerElement = document.querySelector('#timer');
const runButtonElement = document.querySelector('#runTimer');

const changeElementValue = (content, variableName) => {
    return variableName.textContent = content;
}

const changeElementColor = (textColor, variableName) => {
    return variableName.style.color = textColor
}

const addZeroFirstCharacterString = (value) => {
    return String(value).padStart(2, '0')
}

const htmlEntities = (inputValue) => {
    return String(inputValue).replace(/&/g, '&amp;').replace(/</g, '').replace(/>/g, '').replace(/"/g, '');
}

const startTimer = (lever) => {
    return !lever ? resetTimerElement() : isRunning = setInterval(updateTimerElement, millisecondsDuration);
}

let timerTrigger = () => {
    isRunTriggered = !isRunTriggered
    startTimer(isRunTriggered);
}

let getLocalStorageData = (storageName) => {
    return localStorage.getItem(storageName);
}

let oldTimeListData = JSON.parse(getLocalStorageData(storageName)) || '';
let timeListDataStorage = [...oldTimeListData];

// order id of the time list when browser is closed.
let timeListID = 0
for (let i = 0; i < oldTimeListData.length; i++) {
    timeListID += 1;
    oldTimeListData[i].id = timeListID;
}



let timePerformance = (performance) => {
    let timeListArray = [];

    timeListDataStorage.forEach(list => {
        if (!isNaN(list.time)) timeListArray.push(list.time);
    });

    if (performance == 'best') {
        return Math.min(...timeListArray)
    }
    return Math.max(...timeListArray)
}

let addTimeToList = () => {
    let solvedTimeList = {};
    let timeListDataStorageCount = timeListDataStorage.length;

    let timeSplit = timeSolved.split('.')

    if (timeSplit[1].length == 1) {
        timeSolved = `${timeSplit[0]}.0${timeSplit[1]}`;
    }

    solvedTimeList['id'] = timeListDataStorageCount += 1;
    solvedTimeList['time'] = parseFloat(htmlEntities(timeSolved))
    solvedTimeList['date'] = htmlEntities(currentDateToday);

    timeListDataStorage.push(solvedTimeList);
    localStorage.setItem(storageName, JSON.stringify(timeListDataStorage));
}

const resetTimerElement = () => {
    lever = false;
    timeSolved = `${seconds}.${milliseconds}`;
    addTimeToList();
    seconds = 0;
    milliseconds = 0;
    clearInterval(isRunning);
    changeElementValue('00', secondsElement);
    changeElementValue('00', millisecondsElement);
}

const updateTimerElement = () => {
    milliseconds++;
    isAlreadySecond = milliseconds == 60;

    if (isAlreadySecond) {
        seconds += 1
        milliseconds = 00;
        changeElementValue(addZeroFirstCharacterString(seconds), secondsElement);
    }

    changeElementValue(addZeroFirstCharacterString(milliseconds), millisecondsElement);
}

const updateAll = () => {
    timerTrigger()
    app.$data.timeListFromStorage = timeListDataStorage
    app.$data.bestSolvedTimeReactive = timePerformance('best')
    app.$data.worstSolvedTimeReactive = timePerformance('worst')
}

var lastKeyUpAt = 0;
var isTriggered = false;

const pressVerify = (holdDuration = 1000) => {
    var keyDownAt = new Date();

    if (isTriggered == true) {
        isTriggered = false;
        updateAll();
    } else {
        setTimeout(() => {
            if (+keyDownAt > +lastKeyUpAt) {
                changeElementColor('green', timerElement)
                isTriggered = true
            } else {
                isTriggered = false;
            }
        }, holdDuration);
    }
}

const spaceKeyDown = (event) => {
    if (event.repeat) return;
    if (event.code == 'Space') return pressVerify();
}

const spaceKeyUp = (event) => {
    if (event.code == 'Space') {
        changeElementColor('black', timerElement)
        lastKeyUpAt = new Date();
        if (isTriggered == true) return updateAll();
    }
}

const mouseClickDown = (event) => {
    if (event.target.closest('#resetButton')) return;
    if(event.touches.length != 1) return; 
    pressVerify();
}

const mouseClickRelease = () => {
    changeElementColor('black', timerElement)
    lastKeyUpAt = new Date();
    if (isTriggered == true) return updateAll();
}

document.addEventListener('keydown', spaceKeyDown)
document.addEventListener('keyup', spaceKeyUp)
document.addEventListener('mousedown', mouseClickDown)
document.addEventListener('mouseup', mouseClickRelease)
document.addEventListener('touchstart', mouseClickDown)
document.addEventListener('touchend', mouseClickRelease)

const defaultTimeListData = [{
    "id": 0,
    "time": "Hi, welcome to Chronobiks!",
    "date": currentDateToday
}]

const app = new Vue({
    el: '#app',
    data: {
        currentDateToday: currentDateToday,
        bestSolvedTimeReactive: timePerformance('best'),
        worstSolvedTimeReactive: timePerformance('worst'),
        timeListFromStorage: JSON.parse(getLocalStorageData(storageName)) || defaultTimeListData
    },
    methods: {
        resetTimeList: function () {
            const resetData = [{
                "id": 1,
                "time": "Your data has been reset.",
                "date": currentDateToday
            }]

            resetTimerElement();
            this.bestSolvedTimeReactive = '00.00'
            this.worstSolvedTimeReactive = '00.00'
            timeListDataStorage = resetData;
            this.timeListFromStorage = resetData;
            localStorage.setItem(storageName, JSON.stringify(resetData))
        }
    }
})