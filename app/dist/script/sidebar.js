const openButton = document.querySelector('#open-button');
const closeButton = document.querySelector('#close-button');

const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar--overlay');
const timeGroup = document.querySelectorAll('.sidebar__timeGroup > *')

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
                ease: "expo.out",
                onComplete: () => {
                    delayAdded = 0.3;
                }
            })
        })
    }, 250);
};

const closeSidebar = () => {
    if (!document.querySelector('#modal').classList.contains('modal--hide')) return;
    setTimeout(() => {
        sidebarOverlay.classList.add('sidebar--overlay--close');
    }, 400);

    sidebar.classList.remove('sidebar--open');
};

sidebarOverlay.addEventListener('click', closeSidebar);
openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);