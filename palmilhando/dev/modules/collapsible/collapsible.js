let collapsibles = document.querySelectorAll('[data-component="collapsible"]');
let collapsibleContent = document.querySelectorAll('[data-collapsible="content"]');
function toggleExpand(content) {
    if (content.parentElement.style.maxHeight) {
        content.parentElement.style.maxHeight = null;
    } else {
        content.parentElement.style.maxHeight = (content.scrollHeight * 1.5) + 'px';
    }
}
function collapseNeighbors() {
    for (let content of collapsibleContent) {
        if (content.parentElement.classList.contains('active')) {
            content.parentElement.classList.remove('active');
            toggleExpand(content);
        }
    }
}
for (let collapsible of collapsibles) {
    collapsible.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            collapseNeighbors();
        }
        this.classList.toggle('active');
        toggleExpand(this.lastElementChild);
    });
}