const maintext = document.getElementsByTagName("main")[0]
let textSize = parseFloat(window.getComputedStyle(maintext).getPropertyValue("font-size"))
const daysText = document.getElementById("daysText")
const currentDay = document.getElementById("currentDay")
const today = new Date()
const dayText = document.createElement('p')
dayText.classList.add("backgroundText")
const body = document.getElementsByTagName("body")[0]

const submitComment = () => {
    let commentInput = document.getElementById("textInput")
    let newComment = document.createElement('p')
    let randomNum = window.crypto.getRandomValues(new Uint16Array(1))[0]
    newComment.innerHTML = `CommentId: ${randomNum} <br>` + commentInput.value
    maintext.appendChild(newComment)
    commentInput.value = ''
}

document.getElementById("incTxt").addEventListener('click', () => {
    maintext.style.fontSize = (textSize += 1) + "px"
})

document.getElementById("decTxt").addEventListener('click', () => {
    maintext.style.fontSize = (textSize -= 1) + "px"
})

if (currentDay && daysText) {
    currentDay.innerText = today.toString()
    currentDay.style.color = "black"
    let originDate = new Date(2020, 8, 28).getTime()
    let days = Math.floor(((((today.getTime() - originDate) / 1000) / 60) / 60) / 24)
    daysText.innerText = days
    daysText.style.color = "black"
}

switch (today.getDay()) {
    case 0:
        dayText.innerText = "Sunday"
        dayText.style.color = "purple"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 1:
        dayText.innerText = "Monday"
        dayText.style.color = "pink"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 2:
        dayText.innerText = "Tuesday"
        dayText.style.color = "red"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 3:
        dayText.innerText = "Wednesday"
        dayText.style.color = "orange"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 4:
        dayText.innerText = "Thursday"
        dayText.style.color = "yellow"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 5:
        dayText.innerText = "Friday"
        dayText.style.color = "green"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
    case 6:
        dayText.innerText = "Saturday"
        dayText.style.color = "cyan"
        body.className == "wishpage" ? body.insertBefore(dayText, body.firstChild.nextSibling) : body.insertBefore(dayText, body.firstChild)
        break;
}