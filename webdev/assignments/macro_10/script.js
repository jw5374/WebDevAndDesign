const startScreen = document.querySelector('#start-screen')
const easyButton = document.querySelector('#easy-button')
const mediumButton = document.querySelector('#medium-button')
const hardButton = document.querySelector('#hard-button')
const playScreen = document.querySelector('main')
const gameOverScreen = document.querySelector('#gameover-screen')
const currentTime = document.querySelector('#current-time')
const playAgain = document.querySelector('#playagain-button')
const playGrid = document.querySelector('#play-grid')
const timer = document.querySelector('main p')
const imgPath = "../../assets/assignment06_images/"
const correct = new Audio(imgPath + 'correct.wav')
const wrong = new Audio(imgPath + 'wrong.wav')
const assets = ['snorlax.png', 'electrabuzz.png', 'chansey.png', 'oddish.png',
              'pikachu.png', 'paras.png', 'arcanine.png', 'ponita.png',
              'venonat.png', 'eggsecute.png', 'machop.png', 'pidgey.png',
              'psyduck.png', 'tauros.png', 'vulpix.png', 'gloom.png',
              'krabby.png', 'butterfree.png', 'bulbasaur.png', 'clefairy.png',
              'koffing.png', 'goldeen.png', 'magikarp.png', 'beedrill.png',
              'lapras.png', 'meowth.png', 'ekans.png', 'jigglypuff.png',
              'horsea.png', 'polywog.png', 'sandshrew.png', 'rattata.png',
              'gengar.png', 'eevee.png', 'bellsprout.png', 'squirtle.png',
              'seel.png', 'caterpie.png']
const volumeNum = 0.25

const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')
const leaderboards = document.querySelector('#leaderboards')
const leadButton = document.querySelector('#show-leader')
const boardContainer = document.querySelector('#leaderboard-container')
const easyBoard = document.querySelector('#easyboard')
const medBoard = document.querySelector('#mediumboard')
const hardBoard = document.querySelector('#hardboard')
const showhist = document.querySelector('#showuserhistory')
const userhist = document.querySelector('#userhistory')
const leadHomeButton = document.querySelector('#home')
const showLogin = document.querySelector('#show-login')
const showReg = document.querySelector('#show-register')
const logout = document.querySelector('#logout-button')
const regError = document.querySelector('#reg-error')
const loginError = document.querySelector('#login-error')
const cookies = document.cookie.split(";")
let loggedin = false;
for(let cookie of cookies) {
    cookie = cookie.trim()
    if(cookie.startsWith("matching10")) {
        showLogin.classList.add('hide')
        showReg.classList.add('hide')
        logout.classList.remove('hide')
        loggedin = true
        break
    }
}

let matches = []
let picked = ["", null]
let matched = 0
let timeInter

correct.volume = volumeNum
wrong.volume = volumeNum

function swap(a, b, array) {
    let temp = array[a]
    array[a] = array[b]
    array[b] = temp
}

function hideall() {
    startScreen.classList.add('hide')
    playScreen.classList.add('hide')
    gameOverScreen.classList.add('hide')
    leaderboards.classList.add('hide')
}

function createBoard(size) {
    let pokeCopy = [...assets]
    for(let i = 0; i < size/2; i++) {
        let pick = pokeCopy.splice(Math.floor(Math.random() * pokeCopy.length), 1)
        matches.push(...pick, ...pick)
    }

    for(let i = 0; i < matches.length; i++) {
        let randomChoice = Math.floor(Math.random() * (matches.length - i)) + i
        swap(i, randomChoice, matches)
    }

    for(let i = 0; i < size; i++) {
        let tile = document.createElement('div')
        let back = document.createElement('img')
        let front = document.createElement('img')
        tile.classList.add('gametile')
        back.classList.add('backtile')
        back.src = imgPath + matches[i]
        back.alt = "gametile_image"
        front.classList.add('fronttile')
        front.src = imgPath + "pokeball.png"
        front.alt = "gametile_image"
        tile.appendChild(back)
        tile.appendChild(front)
        playGrid.appendChild(tile)
    }
}

function setBoard(size, diff) {
    for(let i = 0; i < playGrid.children.length; i++) {
        playGrid.children[i].addEventListener('click', (e) => {
            e.currentTarget.classList.add('gametile-flip')
            e.currentTarget.classList.add('disable')
            if(!picked[0]) {
                picked[0] = e.currentTarget.firstElementChild.src
                picked[1] = e.currentTarget
            } else {
                if(picked[0] == e.currentTarget.firstElementChild.src && picked[1] != e.currentTarget) {
                    correct.play()
                    matched++
                    picked = ["", null]
                    if(matched == size) {
                        clearInterval(timeInter)
                        playScreen.classList.add('hide')
                        gameOverScreen.classList.remove('hide')
                        currentTime.textContent = `Your time (${diff}): ` + timer.dataset.time
                        if(loggedin) {
                            let formdata = new FormData();
                            formdata.append('diff', diff)
                            formdata.append('matchtime', timer.dataset.time)
                            fetch('lib/savetime.php', {
                                method: "POST",
                                body: formdata
                            })
                        }
                    }
                } else {
                    wrong.play()
                    playGrid.classList.add('disable')
                    setTimeout(() => {
                        e.target.parentElement.classList.remove('disable')
                        picked[1].classList.remove('disable')
                        e.target.parentElement.classList.remove('gametile-flip')
                        picked[1].classList.remove('gametile-flip')
                        playGrid.classList.remove('disable')
                        picked = ["", null]
                    }, 500)
                }
            }
        })
    }
    
}

function setupGame(boardsize, boardclass, boarddiff) {
    createBoard(boardsize)
    setBoard(boardsize / 2, boarddiff)
    timeInter = setInterval(() => {
        timer.dataset.time = parseInt(timer.dataset.time) + 1
        timer.textContent = "Time: " + parseInt(timer.dataset.time)
    }, 1000)
    startScreen.classList.add('hide')
    playScreen.classList.remove('hide')
    playGrid.classList.add(boardclass)
}

function reset() {
    matches = []
    matched = 0
    timer.dataset.time = 0
    timer.textContent = "Time: 0"
    while(playGrid.firstElementChild) {
        playGrid.removeChild(playGrid.lastElementChild)
    }
    playGrid.classList.remove('easy-board', 'med-board', 'hard-board')
}

function clearLeader() {
    while(easyBoard.firstElementChild) {
        easyBoard.removeChild(easyBoard.lastElementChild)
    }
    while(medBoard.firstElementChild) {
        medBoard.removeChild(medBoard.lastElementChild)
    }
    while(hardBoard.firstElementChild) {
        hardBoard.removeChild(hardBoard.lastElementChild)
    }
    while(userhist.firstElementChild) {
        userhist.removeChild(userhist.lastElementChild)
    }
}

easyButton.addEventListener('click', () => {
    setupGame(12, 'easy-board', 'easy')
})

mediumButton.addEventListener('click', () => {
    setupGame(20, 'med-board', 'medium')
})

hardButton.addEventListener('click', () => {
    setupGame(30, 'hard-board', 'hard')
})

playAgain.addEventListener('click', () => {
    reset()
    hideall()
    startScreen.classList.remove('hide')
})

showLogin.addEventListener('click', () => {
    loginError.classList.add('hide')
    regError.classList.add('hide')
    registerForm.classList.add('hide')
    loginForm.classList.toggle('hide')
})

showReg.addEventListener('click', () => {
    loginError.classList.add('hide')
    regError.classList.add('hide')
    loginForm.classList.add('hide')
    registerForm.classList.toggle('hide')
})

logout.addEventListener('click', () => {
    fetch('lib/logout.php', {
        method: "GET"
    }).then(() => {
        location.reload()
    })
})

leadButton.addEventListener('click', () => {
    hideall()
    clearLeader()
    leaderboards.classList.remove('hide')
    fetch('lib/getleaderboards.php', {
        method: "GET"
    }).then(async (res) => {
        let resp = await res.text()
        let scores = JSON.parse(resp)
        for(let score of scores[0]) {
            let scoreEl = document.createElement('p')
            scoreEl.innerHTML = `Date: ${score.date}<br> (${score.difficulty}) ${score.user} - ${score.matchtime}`
            easyBoard.appendChild(scoreEl)
        }
        for(let score of scores[1]) {
            let scoreEl = document.createElement('p')
            scoreEl.innerHTML = `Date: ${score.date}<br> (${score.difficulty}) ${score.user} - ${score.matchtime}`
            medBoard.appendChild(scoreEl)
        }
        for(let score of scores[2]) {
            let scoreEl = document.createElement('p')
            scoreEl.innerHTML = `Date: ${score.date}<br> (${score.difficulty}) ${score.user} - ${score.matchtime}`
            hardBoard.appendChild(scoreEl)
        }
        for(let score of scores[3]) {
            let scoreEl = document.createElement('p')
            scoreEl.innerHTML = `Date: ${score.date}<br> ${score.difficulty} - ${score.matchtime}`
            userhist.appendChild(scoreEl)
        }
    })
})

showhist.addEventListener('click', () => {
    boardContainer.classList.toggle('hide')
    userhist.classList.toggle('hide')
})

leadHomeButton.addEventListener('click', () => {
    hideall()
    startScreen.classList.remove('hide')
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginError.classList.add('hide')
    regError.classList.add('hide')
    let form = new FormData()
    form.append('user', e.target[0].value)
    form.append('pass', e.target[1].value)
    fetch('lib/login.php', {
        method: "POST",
        body: form
    }).then(async (res) => {
        let resp = await res.text()
        if(resp == "error") {
            loginError.classList.remove('hide')
        } else {
            location.reload()
        }
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginError.classList.add('hide')
    regError.classList.add('hide')
    let form = new FormData()
    form.append('user', e.target[0].value)
    form.append('pass', e.target[1].value)
    fetch('lib/register.php', {
        method: "POST",
        body: form
    }).then(async (res) => {
        let resp = await res.text()
        if(resp == "error") {
            regError.classList.remove('hide')
        } else {
            location.reload()
        }
    })
})