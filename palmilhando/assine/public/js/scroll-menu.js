const scrollWrapper = document.querySelector('[data-scroll="wrapper"]');
const scrollBoxes = document.querySelectorAll('[data-scroll="box"]');
const scrollButton = document.querySelectorAll('[data-scroll="buttons"] button');

const boxes = scrollBoxes.length;

const maskImage0 = 'linear-gradient(to right, black 98%, transparent)';
const maskImage50 = 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)';
const maskImage100 = 'linear-gradient(to left, black 98%, rgba(0, 0, 0, 0.5), transparent)';

disable(scrollButton[0]);
scrollWrapper.style.webkitMaskImage = maskImage0;

let current = 0;

function disable(button) {
    button.setAttribute('disabled', 'true');
    button.style.cursor = 'default';
    button.style.opacity = '0.3';
};

function enable(button) {
    button.removeAttribute('disabled');
    button.style.cursor = 'pointer';
    button.style.opacity = '1';
};

for (let i = 0; i < scrollButton.length; i++) {
    scrollButton[i].addEventListener('click', () => {
        i == 0 ? --current : current++;
        scrollWrapper.scrollLeft = scrollBoxes[0].scrollWidth * (current * 2.5);
    });
};

scrollWrapper.addEventListener('scroll', () => {
    scrollButton.forEach(button => enable(button));
    if (scrollWrapper.scrollLeft == 0) {
        scrollWrapper.style.webkitMaskImage = maskImage0;
        disable(scrollButton[0]);
    }
    else if (scrollWrapper.scrollLeft >= Math.round(scrollBoxes[0].scrollWidth * (boxes/1.4))) {
        scrollWrapper.style.webkitMaskImage = maskImage100;
        disable(scrollButton[1]);
    }
    else {
        scrollWrapper.style.webkitMaskImage = maskImage50;
    }
});