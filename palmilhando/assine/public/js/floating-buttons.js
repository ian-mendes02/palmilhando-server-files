const floatingButtons = document.querySelector('[data-button="container"]');
const buttons = document.querySelectorAll('[data-button="container"] a');
const buttonContent = document.querySelectorAll('[data-button="container"] button');
const scrollTop = document.querySelectorAll('[data-button="scroll-top"]');

window.addEventListener('scroll', function () {
    buttonContent.forEach(button => button.style.opacity = '1')
    if (window.scrollY >= this.document.documentElement.scrollHeight * 10 / 100) {
        for (let i = 0; i < buttons.length; i++) {
            setTimeout(() => {
                buttons[i].style.left = 0;
            }, 50 * i);
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            setTimeout(() => {
                buttons[i].style.left = '150px';
            }, 50 * i);
        }
    };
    setTimeout(() => {
        buttonContent.forEach(button => button.style.opacity = '0.5')
    }, 2000)
});

floatingButtons.addEventListener('mouseenter', () => {
    buttonContent.forEach(button => button.style.opacity = '1')
})
floatingButtons.addEventListener('mouseleave', () => {
    buttonContent.forEach(button => button.style.opacity = '0.5')
})
