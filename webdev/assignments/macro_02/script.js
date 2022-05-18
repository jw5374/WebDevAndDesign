const backgroundImg = document.querySelector(".background")
const header = document.querySelector("[data-status] h1")
const timebox = document.querySelector("[data-status] .info p:first-child")
const luckyfirst = document.querySelector("[data-status] .info .first")
const luckysecond = document.querySelector("[data-status] .info .second")
const luckythird = document.querySelector("[data-status] .info .third")
const legoHead = document.querySelector("[data-lego-head]")
const legoBody = document.querySelector("[data-lego-body]")
const legoDecal = document.querySelector("[data-lego-decal]")
const words = ['Awesome!', 'Fantastic!', 'Fabulous!', 'Superb!', 'Perfect!', 'Brilliant!', 'Coming up Roses!']
const decals = ['dollars.png', 'gekota.png', 'Paimon_Hehe.png', 'saberpng.png', 'sibylpng.png', 'yato.png']
const backgroundPath = "../../assets/assignment02_images/backgrounds/"
const decalPath = "../../assets/assignment02_images/decals/"
const legoHeadPath = `../../assets/assignment02_images/heads/head${Math.floor((Math.random() * 6) + 1)}.png`
const legoBodyPath = `../../assets/assignment02_images/bodies/body${Math.floor((Math.random() * 6) + 1)}.png`


function createNumber(num) {
    let numEl = document.createElement("img")
    numEl.src = `../../assets/assignment02_images/number_icons/${num}.svg`
    numEl.style.width = "2ch"
    return numEl
}

function luckyGen(max, array = []) {
    while(array.length < 3) {
        let num = Math.floor((Math.random() * max) + 1)
        if(array.includes(num)) {
            continue
        } else {
            array.push(num)
        }
    }
    return array
}

function numElGen(numarray, res = []) {
    for(let num of numarray) {
        let digits = num.toString(10).split("")
        let number = []
        for(let digit of digits) {
            number.push(createNumber(digit))
        }
        res.push(number)
    }
    return res
}

let time = new Date()
let hour = time.getHours()
time = time.toLocaleTimeString()
time = time.split(" ")
time[0] = time[0].split(":")
time[0].pop()
time[0] = time[0].join(":")
time[1] = time[1].toLowerCase()
time = time.join("")

let userInput = prompt("Enter a number greater than or equal to 3")

while(isNaN(userInput) || userInput < 3) {
    userInput = prompt("Enter a number greater than or equal to 3")
}

let lucknums = numElGen(luckyGen(userInput))

header.textContent += words[Math.floor(Math.random() * words.length)]
legoDecal.src = decalPath + decals[Math.floor(Math.random() * decals.length)]
legoHead.src = legoHeadPath
legoBody.src = legoBodyPath

if(hour >= 0 && hour < 6) {
    timebox.textContent += `${time} - Good Night!`
    backgroundImg.src = backgroundPath + "night.png"
} else if(hour >= 6 && hour < 12) {
    timebox.textContent += `${time} - Good Morning!`
    backgroundImg.src = backgroundPath + "morning.png"
} else if(hour >= 12 && hour < 18) {
    timebox.textContent += `${time} - Good Afternoon!`
    backgroundImg.src = backgroundPath + "afternoon.png"
} else {
    timebox.textContent += `${time} - Good Evening!`
    backgroundImg.src = backgroundPath + "evening.png"
}

for(let num of lucknums[0]) {
    luckyfirst.appendChild(num)
}
for(let num of lucknums[1]) {
    luckysecond.appendChild(num)
}
for(let num of lucknums[2]) {
    luckythird.appendChild(num)
}