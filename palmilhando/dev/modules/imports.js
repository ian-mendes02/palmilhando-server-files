const mds = ['collapsible', 'floating-buttons', 'scroll-menu', 'toggle-theme', 'carousel'];
const url = ".";
const import_modules = new Promise ((resolve) => {
    var imports = [];
    for (var i = 0; i < mds.length; i++) {
        var msrc = `${url}/${mds[i]}/${mds[i]}.js`;
        if (document.querySelectorAll(`[data-component=\'${mds[i]}\']`).length > 0) {
            document.getElementsByTagName("head")[0].appendChild(Object.assign(document.createElement("link"), {
                rel: "stylesheet",
                href: `${url}/modules/${mds[i]}/${mds[i]}.css`
            }));
            import(msrc)
            .then(imports.push(mds[i]))
            .catch(error => console.log(`%cFailed to import module ${mds[i]} from ${msrc}. ${error}`,"color: tomato"));
        }
} resolve(imports)
});
window.addEventListener("DOMContentLoaded", () => {
    import_modules.then(i => { i.length > 0 
        ? console.log(`Successfully imported ${i.length} modules`) 
        : console.log("No modules were imported.")
    })
})