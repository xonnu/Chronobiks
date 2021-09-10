const modalStorageName = 'chronobiks-modal-view-v1';
const modal = document.querySelector("#modal");
const modalButton = document.querySelector("#understand");
const modalInnerElements = document.querySelectorAll('#modal > *');

if(localStorage.getItem(modalStorageName) == null) {
    localStorage.setItem(modalStorageName, true);
}

if(localStorage.getItem(modalStorageName) === 'false') {
    modal.classList.add('modal--hide');
    document.querySelector('.sidebar--overlay').classList.add('sidebar--overlay--close');
} else {
    modal.classList.remove('modal--hide');
    document.querySelector('.sidebar--overlay').classList.remove('sidebar--overlay--close');

    gsap.from(modal, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "bounce.out"
    })

    let delay = 0.3;
    modalInnerElements.forEach(elements => {
        delay += 0.1
        gsap.from(elements, {
            y: 30,
            duration: 1,
            delay: delay,
            opacity: 0,
            ease: "expo.out",
            onComplete: () => {
                delay = 0.3;
            }
        })
    })

}

const userUnderstand = () => {
    gsap.to(modal, {
        duration: 0.3,
        y: 50,
        opacity: 0,
        ease: "expo.out",
        onComplete: () => {
            localStorage.setItem(modalStorageName, false);
            modal.classList.add('modal--hide')
            sidebarOverlay.classList.add('sidebar--overlay--close');
        }
    })
}

modalButton.addEventListener('click', userUnderstand);