const doc = document;
/* inputs */
const openButton = doc.querySelector('#open-button');
const closeButton = doc.querySelector('#close-button');
/* design */
const sidebar = doc.querySelector('.sidebar');
const sidebarOverlay = doc.querySelector('.sidebar--overlay');
const timeGroup = doc.querySelectorAll('.sidebar__timeGroup > *')
let delayAdded = 0.3;

const openSidebar = () => {
    sidebarOverlay.classList.remove('sidebar--overlay--close');
    setTimeout(() => {
        sidebar.classList.add('sidebar--open')
        timeGroup.forEach(time => {
            delayAdded += 0.1
            gsap.from(time, {
                y: 30,
                duration: .3,
                delay: delayAdded,
                opacity: 0,
                ease: "expo. out out",
                onComplete: () => {
                    delayAdded = 0.3;
                }
            })
        })
    }, 250);
};

const closeSidebar = () => {
    setTimeout(() => {
        sidebarOverlay.classList.add('sidebar--overlay--close');
    }, 400);

    sidebar.classList.remove('sidebar--open');
};

sidebarOverlay.addEventListener('click', closeSidebar);
openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);


const navbar = doc.querySelector('.navbar');
const goTriggered = doc.querySelector('.go');
const newestTime = doc.querySelector('.timer__newest');

var lastKeyUpAt = 0;
var isTriggered = false;

const pressVerify = (holdDuration = 1000) => {
    var keyDownAt = new Date();

    if (isTriggered == true) {
        isTriggered = false;
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

doc.addEventListener('keypress', () => {

    pressVerify()
})

doc.addEventListener('keyup', () => {
    goTriggered.classList.add('go--hide');
    lastKeyUpAt = new Date();
    isTriggered = false;
})