const doc = document;
/* inputs */
const openButton = doc.querySelector('#open-button');
const closeButton = doc.querySelector('#close-button');
/* design */
const sidebar = doc.querySelector('.sidebar');
const sidebarOverlay = doc.querySelector('.sidebar--overlay');

let delayAdded = 0.3;
const openSidebar = () => {
    sidebarOverlay.classList.remove('sidebar--overlay--close');
    setTimeout(() => {
        sidebar.classList.add('sidebar--open')
        document.querySelectorAll('.sidebar__timeGroup > *').forEach(time => {
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