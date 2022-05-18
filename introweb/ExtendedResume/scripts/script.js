const rootStyle = document.documentElement
const mediaQuery = window.matchMedia('(min-width: 55em)')
const sideBar = document.querySelector('.grid-wrapper .sidebar')
const content = document.querySelector('.grid-wrapper .content-container')
const dimmer = document.querySelector('#dimmer')
const typer = document.querySelector('.typewriter')
const typingLength = typer.textContent.length


if(mediaQuery.matches) {
    rootStyle.style.setProperty('--text-length', typingLength)
    rootStyle.style.setProperty('--text-width', typingLength + "ch")
    rootStyle.style.setProperty('--time-per-ch', typingLength * 0.20 + 's')
    
    sideBar.addEventListener("mouseenter" , function addDim() {
        content.classList.add('blur')
        dimmer.classList.add('dim')
    })
    
    sideBar.addEventListener("mouseleave" , function removeDim() {
        content.classList.remove('blur')
        dimmer.classList.remove('dim')
    })

    typer.addEventListener("animationend", function removeCursor() {
        typer.style.setProperty('border-right', '0')
    }, {once: true})
}

