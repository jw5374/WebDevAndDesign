const imagePath = "../../assets/assignment03_images/"
// possible pokemon
const pokemon = ['images/bulbasaur.png', 'images/charmander.png', 'images/squirtle.png', 'images/pikachu.png', 'images/eevee.png']
const names = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Eevee']
const typeColors = ['green', 'orange', 'blue', 'yellow', 'brown']
let historyCount = 1
let guaranteeFlag = false
const supermode = document.querySelector(".super")
const progressNotif = document.querySelector("#progress")
const forest = document.querySelector("#forest_container")
const grassContainer = document.querySelector(".item-container")
const pokeballCount = document.querySelector("#pokeballs_left")
const pokemonCount = document.querySelector("#pokemon_caught")
const playAgain = document.querySelector("#play_again_button")
const clearHistory = document.querySelector("#clear-history")
const restart = document.querySelector("#restart")
const history = document.querySelector(".history")
const gameOver = document.querySelector(".game-over")
const catchInfo = document.querySelector("footer>h2")
const histogram = document.querySelector("table")
const grass = document.querySelectorAll(".grass")

function shuffle(array) {
    for(let i = 0; i < array.length - 1; i++) {
        let shuffleindex = Math.floor(Math.random() * (array.length - i) + i)
        let temp = array[i]
        array[i] = array[shuffleindex]
        array[shuffleindex] = temp
    }
}

function getAllSiblings(parent, element) {
    let sib = []
    for(let el of parent.children) {
        if(el == element) {
            continue
        }
        sib.push(el)
    }
    return sib
}

function clearElements(el) {
    while(el.firstElementChild) {
        el.removeChild(el.lastElementChild)
    }
}

function addHistory(text) {
    let historyentry = document.createElement("p")
    historyentry.textContent = historyCount++ + ". " + text
    if(supermode.textContent) {
        historyentry.style.color = 'gold'
    }
    history.insertBefore(historyentry, history.firstChild)
}

function grassShowHandler(event) {
    let superChance = Math.floor(Math.random() * 20)
    let items = [1, 2, 3]
    if(superChance == 0) {
        items.splice(Math.floor(Math.random() * items.length), 1)
        items.push(4)
    }
    if(guaranteeFlag) {
        guaranteeFlag = false
        items = [2, 2, 2]
    } else {
        shuffle(items)
    }
    let pokemonChoice = Math.floor(Math.random() * pokemon.length)
    let gotPoke = imagePath + pokemon[pokemonChoice]
    let gotBall = imagePath + "images/pokeballs.png"
    let progressString
    let ballcount = pokeballCount.textContent
    let caught = pokemonCount.textContent
    for(let i = 0; i < grassContainer.children.length; i++) {
        let grassChoice = grassContainer.children[i]
        grassChoice.classList.remove("blur")
        if(grassChoice == event.target) {
            grassChoice.style.opacity = 1
        } else {
            grassChoice.style.opacity = 0.3
        }
        switch(items[i]) {
            case 1:
                if(grassChoice == event.target) {
                    let pokemonTableCount = histogram.tBodies[0].rows[pokemonChoice].cells[1].textContent
                    progressString = "You caught a(n) " + names[pokemonChoice]
                    let histoEntry = document.createElement("div")
                    histoEntry.classList.add("histo-block")
                    histoEntry.style.backgroundColor = typeColors[pokemonChoice]
                    pokeballCount.textContent = String(parseInt(ballcount) - 1)
                    histogram.tBodies[0].rows[pokemonChoice].cells[1].textContent = String(parseInt(pokemonTableCount) + 1)
                    histogram.tBodies[0].rows[pokemonChoice].cells[2].appendChild(histoEntry)
                    pokemonCount.textContent = String(parseInt(caught) + 1)
                }
                grassChoice.src = gotPoke
                break
            case 2:
                if(grassChoice == event.target) {
                    progressString = "You found two Pokeballs!"
                    pokeballCount.textContent = String(parseInt(ballcount) + 2)
                }
                grassChoice.src = gotBall
                break
            case 3:
                if(grassChoice == event.target) {
                    progressString = "Nothing here!"
                    pokeballCount.textContent = String(parseInt(ballcount) - 1)
                    grassChoice.style.opacity = 0
                }
                break
            case 4:
                let superItems = ['images/mewtwo.png', 'images/times4.png', 'images/guarantee.png']
                let superChoice = Math.floor(Math.random() * superItems.length)
                if(grassChoice == event.target) {
                    supermode.textContent = "You got a super item!"
                    progressString = superHandler(superChoice)
                }
                grassChoice.src = imagePath + superItems[superChoice]
                break
        }
    } 
    addHistory(progressString)
    progress.textContent = progressString
    forest.classList.add("disable")
    playAgain.classList.remove("hide")
    if(parseInt(pokeballCount.textContent) < 1) {
        history.classList.add("hide")
        gameOver.classList.remove("hide")
        playAgain.classList.add("hide")
    }
    if(!catchInfo.textContent) {
        for(let row of histogram.tBodies[0].rows) {
            if(row.cells[1].textContent == '0') {
                return
            }
        }
        catchInfo.textContent = "Pokemon Master: You caught one of each type!"
    }
}

function superHandler(choice) {
    switch(choice) {
        case 0:
            let pokemonTableCount = histogram.tBodies[0].rows[5].cells[1].textContent
            let histoEntry = document.createElement("div")
            histoEntry.classList.add("histo-block")
            histoEntry.style.backgroundColor = "pink"
            pokeballCount.textContent = String(parseInt(pokeballCount.textContent) - 1)
            histogram.tBodies[0].rows[5].cells[1].textContent = String(parseInt(pokemonTableCount) + 1)
            histogram.tBodies[0].rows[5].cells[2].appendChild(histoEntry)
            pokemonCount.textContent = String(parseInt(pokemonCount.textContent) + 1)
            return "You caught a(n) Mewtwo"
        case 1:
            pokeballCount.textContent = parseInt(pokeballCount.textContent) * 4
            return "Your pokeballs are multiplied by 4!"
        case 2:
            guaranteeFlag = true
            return "Guaranteed pokeballs next round!"
    }
}

function resetGame(play) {
    if(!play) {
        historyCount = 1
        pokemonCount.textContent = "0" 
        pokeballCount.textContent = "5"
        for(let row of histogram.tBodies[0].rows) {
            row.cells[1].textContent = "0"
            clearElements(row.cells[2])
        }
        progressNotif.textContent = "Your progress so far ..."
        gameOver.classList.add("hide")
        history.classList.remove("hide")
        catchInfo.textContent = ""
        clearElements(history)
    } 
    supermode.textContent = ""
    for(let grass of grassContainer.children) {
        grass.src = imagePath + "images/grass.png"
        grass.style.opacity = 1
    }
    playAgain.classList.add("hide")
    forest.classList.remove("disable")
}

for(let grassEl of grass) {
    grassEl.addEventListener('mouseenter', (e) => {
        let sibs = getAllSiblings(grassContainer, e.target)
        for(let sib of sibs) {
            sib.classList.add("blur")
        } 
    })
    grassEl.addEventListener('mouseleave', (e) => {
        let sibs = getAllSiblings(grassContainer, e.target)
        for(let sib of sibs) {
            sib.classList.remove("blur")
        } 
    })
    grassEl.addEventListener('click', (e) => {
        grassShowHandler(e)
    })
}

playAgain.addEventListener('click', () => {
    resetGame(true)
})

clearHistory.addEventListener('click', () => {
    clearElements(history)
})

restart.addEventListener('click', () => {
    resetGame(false)
})




