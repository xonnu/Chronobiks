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
    dynamics.animate(sidebar, {
        opacity: 1
      }, {
        type: dynamics.bounce,
        frequency: 200,
        friction: 200,
        duration: 1500
      })
};

const closeSidebar = () => {
    sidebarOverlay.classList.add('sidebar--overlay--close');
    sidebar.classList.remove('sidebar--open')
};

openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);