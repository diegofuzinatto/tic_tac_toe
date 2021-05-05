let board = ["", "", "", "", "", "", "", "", ""]
let symbols = ["zombie", "plant"]
let startingPlayer = 0
let playerTime = startingPlayer
let statusGame = { won: false, tied: false }
let gameOver = false
let gameTie = false
let score = [0, 0]
let game = ""
let playerWinner = ""

let winState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function handleMove(pos) {
    if (statusGame.tied || statusGame.won) 
        return 

    if (board[pos] == ""){
        board[pos] = symbols[playerTime]
        statusGame.won = isWin()
        statusGame.tied = isGameTied()
        incrementScore()
    
        if (!statusGame.won && !statusGame.tied) {
            playerTime = playerTime == 0 ? 1 : 0

        } else {
            playerWinner = playerTime
            if (startingPlayer == 0) {
                playerTime = 1
                startingPlayer = 1
            } else {
                playerTime = 0
                startingPlayer = 0
            }
        }  
    }
    return statusGame
}

function isWin() {
    for (seq of winState) {
        let pos1 = seq[0]
        let pos2 = seq[1]
        let pos3 = seq[2]

        if (board[pos1] == board[pos2] && board[pos1] == board[pos3] && board[pos1] != ""){
            playerWinner = playerTime
            return true;
        }
    }
    return false;
}

function isGameTied() {
    for (square of board) {
        if (square == "")
            return false
    }
    return true
}

function incrementScore() {
    if (isWin())
        return score[playerWinner] += 1
}

function newPositionIa(){
    let pos = Math.floor(Math.random() * 8) 
    let symbol = symbols[playerTime]

    for (seq of winState) {
        let pos1 = seq[0]
        let pos2 = seq[1]
        let pos3 = seq[2]

        if (board[pos1] == board[pos2] && board[pos1] != "" && board[pos3] == ""){
            if (board[pos1] == symbol)
                return pos3
            pos = pos3
        }
           
        else if (board[pos1] == board[pos3] && board[pos1] != "" && board[pos2] == "") {
            if (board[pos1] == symbol)
                return pos2
            pos = pos2
        }
        else if (board[pos2] == board[pos3] && board[pos2] != "" && board[pos1] == "") {
            if (board[pos2] == symbol)
                return pos1
            pos = pos1
        }
        
    }
    while (board[pos] != "") {
        pos = Math.floor(Math.random() * 8)  
    }

    return pos
}
