let screenSelection = document.getElementById("screenSelection")
let screenStage = document.getElementById("screenStage")
let screenResult = document.getElementById("screenResult")
let scoreBoard = document.getElementsByClassName("scoreBoard")
let scoreBoardContainer = document.getElementsByClassName("scoreBoardContainer")
let imgWinner = document.getElementById("imgWinner")
let msgGame = document.getElementById("msgGame")
let classGame

document.addEventListener("DOMContentLoaded", () => {
    let squares = document.querySelectorAll(".square")

    squares.forEach( (square) => {
        square.addEventListener("click", handleClick)
    })
    updateScore()
})

function typeGame() {
    classGame = event.target.className

    screenSelection.setAttribute("style", "display: none")
    screenStage.setAttribute("style", "display: grid")

    changeAnimation()
}

function backScreenSelection() {
    screenStage.setAttribute("style", "display: none")
    screenSelection.setAttribute("style", "display: flex")
    resetSquares()
    resetScoreBoard()
    updateScore()
    
}

function handleClick() {

    let square = event.target
    let position = square.id
    let status

    if (board[position] != "")
        return 

    if (classGame == "onePlayer") {
        status = handleMove(position)
        changeAnimation()

        if(status.won || status.tied) {
            if (status.won){
                updateScore()
                msgResult(status)
            }
            updateSquare(square)
            msgResult(status)
        } else {
            updateSquare(square)
            moveIa()
        }
    }
    
    if (classGame == "twoPlayer") {
        status = handleMove(position)
        changeAnimation()

        if (status.won || status.tied) {
            if (status.won){
                updateScore()
                msgResult(status)
            }
            msgResult(status)
        }
        updateSquare(square)
    }
}

function moveIa() {

    let position = newPositionIa() 
    let status = handleMove(position)
    
    changeAnimation()
    if (status.won || status.tied) {
        if (status.won){
            updateScore()
        }
        msgResult(status)
    }
    square = document.getElementById(position)
    setTimeout(() => {
        updateSquare(square)
    }, 500)
}

function msgResult(status) {

    setTimeout(() => {
        screenStage.setAttribute("style", "display: none")
        screenResult.setAttribute("style", "display: flex")

        if (status.won) {
            msgGame.innerText = "Vencedor"
            imgWinner.setAttribute("src", `./assets/images/${symbols[playerWinner]}.png`)
        }
        else {
            msgGame.innerText = "Empate"
            imgWinner.setAttribute("src", `./assets/images/hashtag.png`)
        }
    }, 1500)
}

function updateSquare(square) {
    let position = square.id
    let symbol = board[position]

    if (symbol != "")
        square.innerHTML = `<div class='${symbol}'></div>`
}

function updateScore() {
    scoreBoard[0].innerHTML = score[0]    
    scoreBoard[1].innerHTML = score[1]
}

function resetSquares() {
    let squares = document.querySelectorAll(".square")

    squares.forEach((square) => {
        let position = square.id
        board[position] = ""
        square.innerText = ""
    })
    
    if (!statusGame.tied && !statusGame.won) {
        startingPlayer = 0
        playerTime = startingPlayer
        changeAnimation()
    }

    statusGame.tied = false
    statusGame.won = false
    playerWinner = ""
    

    if (startingPlayer == 1 && classGame == "onePlayer") {
        moveIa()
    }

    screenStage.setAttribute("style", "display: grid")
    screenResult.setAttribute("style", "display: none")
}

function resetScoreBoard() {
    score = [0, 0]
    updateScore()
    resetSquares()
}

function changeAnimation() { //muda a animação para o jogador da vez
    let classBoard0 = scoreBoardContainer[0].classList
    let classBoard1 = scoreBoardContainer[1].classList
    
    if (playerTime == 1) {
        classBoard0.remove("animationScoreBoard")
        classBoard1.add("animationScoreBoard")
    } else {
        classBoard1.remove("animationScoreBoard")
        classBoard0.add("animationScoreBoard")
    }
}