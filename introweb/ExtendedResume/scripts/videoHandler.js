const videoBack = document.querySelector('.content-sections .skills-background')
const pathName = window.location.pathname.split("/")
let vidSrc = ''

if(pathName.includes("details")) {
    vidSrc = "../assets/"
} else {
    vidSrc = "./assets/"
}

if(mediaQuery.matches) {
    videoBack.insertAdjacentHTML("beforeend", `<source src="${vidSrc}codestock.mp4" type="video/mp4">`)
} else {
    videoBack.insertAdjacentHTML("beforeend", `<source src="${vidSrc}codestock-compressed.mp4" type="video/mp4">`)
}

window.addEventListener("resize", function handleResize() {
    if(mediaQuery.matches) {
        videoBack.removeChild(videoBack.lastChild)
        videoBack.insertAdjacentHTML("beforeend", `<source src="${vidSrc}codestock.mp4" type="video/mp4">`)
    } else {
        videoBack.removeChild(videoBack.lastChild)
        videoBack.insertAdjacentHTML("beforeend", `<source src="${vidSrc}codestock-compressed.mp4" type="video/mp4">`)
    }
})
