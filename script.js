let isRunning = null;
let seconds = 0;
let milliSeconds = 1;
let isAlreadySecond = null;
let isPressed = false;
let milliSecondsDuration = 20;
let localStorageName = 'chrono-rubiks-timer-2021';
let timeSolved = 0;
let changeColorVariable = null;
let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
let solvedTimeList = {};
let timeListDataStorageCount = 0;

const timeSolvedElement = document.querySelector('#timeSolved')
const milliSecondsElement = document.querySelector('#ms');
const secondsElement = document.querySelector('#seconds')
const timerElement = document.querySelector('#timer');

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

let getTimeList = (storageName) =>  {
	return localStorage.getItem(storageName);
}

const defaultTimeListData = [{
    "id": 1,
    "time": timeSolved,
    "date": currentDate
}]

let getOldTimeListData = JSON.parse(getTimeList(localStorageName)) || '';
let timeListDataStorage = [...getOldTimeListData];
let solvedTimeID = 0
for (let i = 0; i < getOldTimeListData.length; i++) {
    solvedTimeID += 1;
    getOldTimeListData[i].id = solvedTimeID;
}
let addTimeList = () => {
	timeListDataStorageCount = timeListDataStorage.length;
	solvedTimeList['id'] = timeListDataStorageCount += 1;
    solvedTimeList['time'] = timeSolved;
    solvedTimeList['date'] = currentDate;

 

    // Add new data to todoStorage array
	timeListDataStorage.push(solvedTimeList);
	// Add this new data to storage browser
	localStorage.setItem(localStorageName, JSON.stringify(timeListDataStorage));
}

const resetTimer = () => {
    lever = false;
    timeSolved = seconds + '.' + milliSeconds;
    addTimeList();
    seconds = 0;
    milliSeconds = 00;
    clearInterval(isRunning);
    changeValue(timeSolved, timeSolvedElement)
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
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        changeColor('green', timerElement)
    }
})


document.addEventListener('click', () => {
    timerLever()
})

