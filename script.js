let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let players = {};

function startGame() {
    players.player1 = document.getElementById('player1').value || 'Player 1';
    players.player2 = document.getElementById('player2').value || 'Player 2';
    document.getElementById('gameStart').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    document.getElementById('grid').style.display = 'grid';
    document.getElementById('playerTurn').innerText = `${players.player1}'s Turn (X)`;
}

function makeMove(index) {
    if (gameState[index] !== "" || !gameActive) {
        return;
    }
    gameState[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    checkResult();
}

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer === 'X' ? players.player1 : players.player2);
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        announceWinner('Draw');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('playerTurn').innerText = `${currentPlayer === 'X' ? players.player1 : players.player2}'s Turn (${currentPlayer})`;
}

function announceWinner(winner) {
    document.getElementById('gameEnd').style.display = 'flex';
    document.getElementById('playerTurn').style.display = 'none';
    document.getElementById('winner').innerText = winner === 'Draw' ? 'Game Drawn!' : `Winner is ${winner}!`;
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.getElementById('gameBoard').style.display = 'none';
    document.getElementById('gameEnd').style.display = 'none';
    document.getElementById('gameStart').style.display = 'block';
    document.getElementById('playerTurn').style.display = 'block';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

document.addEventListener('DOMContentLoaded', () => {
    restartGame(); // Reset the game when page loads
});
