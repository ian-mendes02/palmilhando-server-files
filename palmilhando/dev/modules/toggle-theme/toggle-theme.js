const slider = document.querySelector('[data-theme-toggle="container"]');
slider.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'light') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
    slider.classList.toggle('toggle');
});