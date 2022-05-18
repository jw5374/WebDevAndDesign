const startScreen = document.querySelector('#start-screen')
const easyButton = document.querySelector('#easy-button')
const mediumButton = document.querySelector('#medium-button')
const hardButton = document.querySelector('#hard-button')
const playScreen = document.querySelector('main')
const gameOverScreen = document.querySelector('#gameover-screen')
const currentTime = document.querySelector('#current-time')
const bestTime = document.querySelector('#best-time')
const nameInput = document.querySelector('#time-name')
const saveRecord = document.querySelector('#save-record')
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
            console.log(e.currentTarget.firstElementChild.src, e.currentTarget)
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
                        let recordObj = JSON.parse(window.localStorage.getItem('Best-' + diff))
                        saveRecord.dataset.diff = diff
                        if(recordObj) {
                            let timesBeat = recordObj.bestTimes.filter((el) => parseInt(el) > parseInt(timer.dataset.time))
                            if(timesBeat.length > 0 && recordObj.bestTimes.length == 3) {
                                nameInput.parentElement.classList.remove('hide')
                                playAgain.classList.add('hide')
                                timesBeat.sort((a,b) => parseInt(a) - parseInt(b))
                                recordObj.bestTimes.splice(recordObj.bestTimes.indexOf(timesBeat[0]), 1)
                                recordObj.bestTimes.push(timer.dataset.time)
                                recordObj.names.splice(recordObj.names.findIndex((el) => el[0] == timesBeat[0]), 1)
                                recordObj.bestTimes.sort((a,b) => parseInt(a) - parseInt(b))
                                window.localStorage.setItem('Best-' + diff, JSON.stringify(recordObj))
                            } else if(timesBeat.length >= 0 && recordObj.bestTimes.length < 3) {
                                nameInput.parentElement.classList.remove('hide')
                                playAgain.classList.add('hide')
                                recordObj.bestTimes.push(timer.dataset.time)
                                recordObj.bestTimes.sort((a,b) => parseInt(a) - parseInt(b))
                                window.localStorage.setItem('Best-' + diff, JSON.stringify(recordObj))
                            } else if(timesBeat.length == 0 && recordObj.bestTimes.length == 3) {
                                playAgain.classList.remove('hide')
                                if(recordObj.names.length != recordObj.bestTimes.length) {
                                    for(let i = 0; i < recordObj.bestTimes.length; i++) {
                                        let recordListing = recordObj.names.findIndex((el) => el[0] == recordObj.bestTimes[i])
                                        if(recordListing == -1) {
                                            recordObj.bestTimes.splice(i, 1)
                                        } 
                                    }
                                    window.localStorage.setItem('Best-' + diff, JSON.stringify(recordObj))
                                }
                                for(let record of recordObj.names) {
                                    let listing = document.createElement('p')
                                    listing.textContent = `${record[1]}: ${record[0]}`
                                    bestTime.appendChild(listing)
                                }
                            }
                        } else {
                            nameInput.parentElement.classList.remove('hide')
                            playAgain.classList.add('hide')
                            recordObj = {
                                bestTimes: [timer.dataset.time]
                            }
                            window.localStorage.setItem('Best-' + diff, JSON.stringify(recordObj))
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
    while(bestTime.firstElementChild) {
        bestTime.removeChild(bestTime.lastElementChild)
    }
    playGrid.classList.remove('easy-board', 'med-board', 'hard-board')
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

saveRecord.addEventListener('click', (e) => {
    let recordObj = JSON.parse(window.localStorage.getItem('Best-' + e.target.dataset.diff))
    e.target.parentElement.classList.add('hide')
    if(nameInput.value && !recordObj.names) {
        recordObj.names = [[timer.dataset.time, nameInput.value]]
    } else if(!nameInput.value && !recordObj.names) {
        recordObj.names = [[timer.dataset.time, "unknown"]]
    } else if(recordObj.names) {
        recordObj.names.push([timer.dataset.time, (nameInput.value ? nameInput.value : "unknown")])
    }
    recordObj.names.sort((a,b) => {
        return parseInt(a[0]) - parseInt(b[0])
    })
    if(recordObj.names.length != recordObj.bestTimes.length) {
        for(let i = 0; i < recordObj.bestTimes.length; i++) {
            let recordListing = recordObj.names.findIndex((el) => el[0] == recordObj.bestTimes[i])
            if(recordListing == -1) {
                recordObj.bestTimes.splice(i, 1)
            } 
        }
    }
    window.localStorage.setItem('Best-' + e.target.dataset.diff, JSON.stringify(recordObj))
    for(let record of recordObj.names) {
        let listing = document.createElement('p')
        listing.textContent = `${record[1]}: ${record[0]}`
        bestTime.appendChild(listing)
    }
    playAgain.classList.remove('hide')
})

playAgain.addEventListener('click', () => {
    reset()
    playScreen.classList.add('hide')
    gameOverScreen.classList.add('hide')
    startScreen.classList.remove('hide')
})