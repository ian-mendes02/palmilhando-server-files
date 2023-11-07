const floatingButtons = document.querySelector("[data-component='floating-buttons']");
floatingButtons.innerHTML = `\n\t<a data-button="scroll-top"><button></button></a>\n\t<a href="${wpp_href}" data-button="whatsapp" target="blank"><button></button></a>`
const buttons = floatingButtons.querySelectorAll('a');
const buttonContent = floatingButtons.querySelectorAll('a button');
const scrollTop = floatingButtons.querySelectorAll('[data-button="scroll-top"]');
window.addEventListener('scroll', function () {
    buttonContent.forEach(button => button.style.opacity = '1')
    if (window.scrollY >= document.documentElement.scrollHeight * 10 / 100) {
        for (let i = 0; i < buttons.length; i++) {
            setTimeout(() => {
                buttons[i].style.left = '0';
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
scrollTop.forEach(button => button.addEventListener("click", () => {window.scrollTo(0,0)}))
floatingButtons.addEventListener('mouseenter', () => {
    buttonContent.forEach(button => button.style.opacity = '1')
})
floatingButtons.addEventListener('mouseleave', () => {
    buttonContent.forEach(button => button.style.opacity = '0.5')
})
