let tiles = document.querySelectorAll("[data-carousel=tile]");
const carousels = document.querySelectorAll("[data-component='carousel']");
if (window.innerWidth > 820) {
    for (const carousel_container of carousels) {
        let button = document.querySelectorAll("[data-carousel='buttons'] button");
        let carousel = carousel_container.querySelector("ul");
        let tiles = Array.from(carousel.children);
        const transition = ".2s ease-out";
        function updateTiles() {
            let tiles = Array.from(carousel.children);
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].classList.remove("active");
            };
            let c = Math.round(tiles.length / 2) - 1;
            [tiles[c - 1], tiles[c], tiles[c + 1]].forEach(tile => tile.classList.add("active"));
        }
        function gotoPrev() {
            button[0].removeEventListener("click", gotoPrev);
            tiles = Array.from(carousel.children);
            let half_2 = tiles.slice(-2);
            carousel.style.transition = transition;
            carousel.style.transform = `translateX(${tiles[0].clientWidth}px)`;
            carousel.ontransitionend = () => {
                carousel.style.transition = "none";
                for (let j = 1; j < half_2.length; j++) {
                    carousel.insertBefore(half_2[j].cloneNode(true), carousel.firstElementChild);
                    tiles[tiles.length - j].remove();
                };
                button[0].addEventListener("click", gotoPrev);
                carousel.style.transform = "none";
                updateTiles();
            };
        };
        function gotoNext() {
            button[1].removeEventListener("click", gotoNext);
            tiles = Array.from(carousel.children);
            let half_1 = tiles.slice(1, 2);
            carousel.style.transition = transition;
            carousel.style.transform = `translateX(-${tiles[0].clientWidth}px)`;
            carousel.ontransitionend = () => {
                carousel.style.transition = "none";
                for (let j = 0; j < half_1.length; j++) {
                    carousel.appendChild(tiles[j].cloneNode(true));
                    tiles[j].remove();
                };
                button[1].addEventListener("click", gotoNext);
                carousel.style.transform = "none";
                updateTiles();
            };
        };
        if (tiles.length % 2 == 0) { carousel.appendChild(tiles[2].cloneNode(true)); };
        carousel.style.width = `${(tiles[0].clientWidth + 24) * tiles.length}px`;
        button[0].addEventListener("click", gotoPrev);
        button[1].addEventListener("click", gotoNext);
        updateTiles();
    }
}