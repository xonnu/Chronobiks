/**
 *
 *  Developed by Justin Pascual - 2021
 *  Contact: https://fb.me/heychrono
 *
 */

let seconds = 0;
let timeSolved = 0;
let milliseconds = 1;
let isRunning = null;
let isRunTriggered = false;
let isAlreadySecond = null;
let millisecondsDuration = 20;
let storageName = "chronobiks-2021";

const dateObject = new Date();
const currentMonth = dateObject.toLocaleString("default", {
    month: "short"
});
const currentDay = dateObject.getUTCDate();
const currentYear = dateObject.getFullYear();
const currentDateToday = `${currentDay} ${currentMonth} ${currentYear}`;

const timeSolvedElement = document.querySelector("#timeSolved");
const millisecondsElement = document.querySelector("#milliseconds");
const secondsElement = document.querySelector("#seconds");
const timerElement = document.querySelector("#timer");
const runButtonElement = document.querySelector("#runTimer");

const changeElementValue = (content, variableName) => {
    return (variableName.textContent = content);
};

const changeElementColor = (textColor, variableName) => {
    return (variableName.style.color = textColor);
};

const addZeroFirstCharacterString = value => {
    return String(value).padStart(2, "0");
};

const htmlEntities = inputValue => {
    return String(inputValue)
        .replace(/&/g, "&amp;")
        .replace(/</g, "")
        .replace(/>/g, "")
        .replace(/"/g, "");
};

const startTimer = lever => {
    return !lever ?
        resetTimerElement() :
        (isRunning = setInterval(updateTimerElement, millisecondsDuration));
};

let timerTrigger = () => {
    isRunTriggered = !isRunTriggered;
    startTimer(isRunTriggered);
};

let getLocalStorageData = storageName => {
    return localStorage.getItem(storageName);
};

let oldTimeListData = JSON.parse(getLocalStorageData(storageName)) || "";
let timeListDataStorage = [...oldTimeListData];

// order id of the time list when browser is closed.
let timeListID = 0;
for (let i = 0; i < oldTimeListData.length; i++) {
    timeListID += 1;
    oldTimeListData[i].id = timeListID;
}

let timePerformance = performance => {
    let timeListArray = [];

    timeListDataStorage.forEach(list => {
        if (!isNaN(list.time)) timeListArray.push(list.time);
    });
    
    if (performance == "best") {
        return Math.min(...timeListArray);
    }
    return Math.max(...timeListArray);
};

let timePerformanceDate = performance => {
    let performanceDate;
    
    if(performance == 'best') {
        timeListDataStorage.forEach(list => {
            if(timePerformance('best') == list.time) performanceDate = list.date;
        });
    } else {
        timeListDataStorage.forEach(list => {
            if(timePerformance('worst') == list.time) performanceDate = list.date;
        });
    }

    return performanceDate;
}

let addTimeToList = () => {
    let solvedTimeList = {};
    let timeListDataStorageCount = timeListDataStorage.length;

    let timeSplit = timeSolved.split(".");

    if (timeSplit[1].length == 1) {
        timeSolved = `${timeSplit[0]}.0${timeSplit[1]}`;
    }

    solvedTimeList["id"] = timeListDataStorageCount += 1;
    solvedTimeList["time"] = parseFloat(htmlEntities(timeSolved));
    solvedTimeList["date"] = htmlEntities(currentDateToday);

    timeListDataStorage.push(solvedTimeList);
    localStorage.setItem(storageName, JSON.stringify(timeListDataStorage));
};

const resetTimerElement = () => {
    lever = false;
    timeSolved = `${seconds}.${milliseconds}`;
    addTimeToList();
    seconds = 0;
    milliseconds = 0;
    clearInterval(isRunning);
    changeElementValue("00", secondsElement);
    changeElementValue("00", millisecondsElement);
};

const updateTimerElement = () => {
    milliseconds++;
    isAlreadySecond = milliseconds == 60;

    if (isAlreadySecond) {
        seconds += 1;
        milliseconds = 00;
        changeElementValue(addZeroFirstCharacterString(seconds), secondsElement);
    }

    changeElementValue(
        addZeroFirstCharacterString(milliseconds),
        millisecondsElement
    );
};

const updateAll = () => {
    timerTrigger();
    appList.$data.timeListFromStorage = timeListDataStorage;
    appList.$data.bestSolvedTimeReactive = timePerformance("best");
    appList.$data.worstSolvedTimeReactive = timePerformance("worst");
    appList.$data.bestSolvedDateReactive = timePerformance("best");
    appList.$data.worstSolvedDateReactive = timePerformance("worst");
    appNewest.$data.newestTime = timeListDataStorage.slice().reverse()[0].time;
    appNewest.$data.newestDate = timeListDataStorage.slice().reverse()[0].date;
};

var lastKeyUpAt = 0;
var isTriggered = false;

const pressVerify = (holdDuration = 1000) => {
    var keyDownAt = new Date();

    if (isTriggered == true) {
        isTriggered = false;
        newestTime.classList.remove('timer__newest--timerRunning');
        navbar.classList.remove('navbar--timerRunning');
        updateAll();
    } else {
        setTimeout(() => {
            if (+keyDownAt > +lastKeyUpAt) {
                newestTime.classList.add('timer__newest--timerRunning');
                navbar.classList.add('navbar--timerRunning')
                goTriggered.classList.remove('go--hide');
                isTriggered = true;
            } else {
                isTriggered = false;

            }
        }, holdDuration);
    }
};

const spaceKeyDown = event => {
    if (event.repeat) return;
    if(sidebar.classList.contains('sidebar--open')) return;
    if (event.code == "Space") return pressVerify();
};

const spaceKeyUp = event => {
    if (event.code == "Space") {
        goTriggered.classList.add('go--hide');
        lastKeyUpAt = new Date();
        if (isTriggered == true) return updateAll();
    }
};

const mouseClickDown = event => {
    if (event.target.closest("#resetButton")) return;
    if(sidebar.classList.contains('sidebar--open')) return;
    pressVerify();
};

const mouseClickRelease = () => {
    goTriggered.classList.add('go--hide');
    lastKeyUpAt = new Date();
    if (isTriggered == true) return updateAll();
};

const touchDown = event => {
    if (event.repeat) return;
    if (event.target.closest("#resetButton")) return;
    if(sidebar.classList.contains('sidebar--open')) return;
    if (event.touches.length > 1) return lastKeyUpAt = new Date();
    pressVerify();
};

const touchRelease = event => {
    goTriggered.classList.add('go--hide');
    lastKeyUpAt = new Date();
    if (isTriggered === true) return updateAll();
};

// Triggers
document.addEventListener("keydown", spaceKeyDown);
document.addEventListener("keyup", spaceKeyUp);
document.addEventListener("mousedown", mouseClickDown);
document.addEventListener("mouseup", mouseClickRelease);
document.addEventListener("touchstart", touchDown);
document.addEventListener("touchend", touchRelease);

const defaultTimeListData = [{
    id: 0,
    time: "Hi, welcome to Chronobiks!",
    date: currentDateToday
}];

const appList = new Vue({
    el: "#app-list",
    data: {
        currentDateToday: currentDateToday,
        bestSolvedDateReactive: timePerformanceDate("best"),
        worstSolvedDateReactive: timePerformanceDate("worst"),
        bestSolvedTimeReactive: timePerformance("best"),
        worstSolvedTimeReactive: timePerformance("worst"),
        timeListFromStorage: JSON.parse(getLocalStorageData(storageName)) || defaultTimeListData
    },
    methods: {
        resetTimeList: function () {
            const resetData = [{
                id: 1,
                time: "Your data has been reset.",
                date: currentDateToday
            }];

            resetTimerElement();
            this.bestSolvedTimeReactive = "00.00";
            this.worstSolvedTimeReactive = "00.00";
            timeListDataStorage = resetData;
            this.timeListFromStorage = resetData;
            localStorage.setItem(storageName, JSON.stringify(resetData));
        }
    }
});

const appNewest = new Vue({
    el: "#app-newest",
    data: {
        timeListFromStorage: JSON.parse(getLocalStorageData(storageName)) || defaultTimeListData,
        currentDateToday: currentDateToday,
        newestTime: JSON.parse(getLocalStorageData(storageName)).slice().reverse()[0].time,
        newestDate: JSON.parse(getLocalStorageData(storageName)).slice().reverse()[0].date
    }
})