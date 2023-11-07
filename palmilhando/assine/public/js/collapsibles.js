const collapsibles = document.querySelectorAll('[data-collapsible="toggle"]');
const collapsibleContent = document.querySelectorAll('[data-collapsible="content"]');
const wrapper = document.querySelectorAll('[data-collapsible="wrapper"]');

function toggleExpand(content) {
    if (content.parentElement.style.maxHeight) {
        content.parentElement.style.maxHeight = null;
    } else {
        content.parentElement.style.maxHeight = (content.scrollHeight + content.scrollHeight * 25 / 100) + 'px'
    }
}

function collapseNeighbors() {
    for (const content of collapsibleContent) {
        if (content.parentElement.classList.contains('active')) {
            content.parentElement.classList.remove('active');
            toggleExpand(content);
        }
    }
}

for (const collapsible of collapsibles)
    collapsible.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            collapseNeighbors();
        }
        this.classList.toggle('active');
        toggleExpand(this.lastElementChild)
    });