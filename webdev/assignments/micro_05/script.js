const boxGen = document.querySelector("#generate")
const graphic = document.querySelector('.graphic')
const leftSpin = document.querySelector("#leftspin")
const rightSpin = document.querySelector("#rightspin")
const stopSpin = document.querySelector("#stop")
const boxArea = document.querySelector('section[title="Generated Boxes"]')
let offset = 0

function randomNum(max) {
    return Math.floor(Math.random() * max)
}

boxGen.addEventListener('click', () => {
    setTimeout(() => {
        let box = document.createElement('div')
        box.style.display = 'inline-block'
        box.style.width = `${randomNum(255-offset)}px`
        box.style.height = `${randomNum(255-offset)}px`
        box.style.backgroundColor = `rgb(${randomNum(255-offset)}, ${randomNum(255-offset)}, ${randomNum(255-offset)})`
        offset--
        boxArea.appendChild(box)
    }, 1000)
})

leftSpin.addEventListener('click', () => {
    graphic.classList.remove('right-animation')
    graphic.classList.remove('pause')
    graphic.classList.add('left-animation')
})

rightSpin.addEventListener('click', () => {
    graphic.classList.remove('left-animation')
    graphic.classList.remove('pause')
    graphic.classList.add('right-animation')
})

stopSpin.addEventListener('click', () => {
    graphic.classList.toggle('pause')
})

