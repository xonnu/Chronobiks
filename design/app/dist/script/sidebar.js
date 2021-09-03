const doc = document;
/* inputs */
const openButton = doc.querySelector('#open-button');
const closeButton = doc.querySelector('#close-button');
/* design */
const sidebar = doc.querySelector('.sidebar');
const sidebarOverlay = doc.querySelector('.sidebar--overlay');

const openSidebar = () => {
    sidebarOverlay.classList.remove('sidebar--overlay--close');
    sidebar.classList.add('sidebar--open')
    
    gsap.from(".sample", {
         y: 50, 
         duration: .5, 
         delay: 0.3, 
         opacity: 0,
         ease: "expo. out out"
    })
};

const closeSidebar = () => {
    sidebarOverlay.classList.add('sidebar--overlay--close');
    sidebar.classList.remove('sidebar--open');
};

sidebarOverlay.addEventListener('click', closeSidebar);
openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);