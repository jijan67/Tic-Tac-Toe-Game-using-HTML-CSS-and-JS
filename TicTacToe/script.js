const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const cells = [];

let currentPlayer = 'X';
let moves = 0;
let gameWon = false;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent || gameWon) return;

    cell.textContent = currentPlayer;
    moves++;
    if (checkWin()) {
        gameWon = true;
    } else if (moves === 9) {
        message.textContent = "It's a draw!";
        // Display the new game button
        resetButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let hasWinner = false;

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = 'green';
            cells[b].style.backgroundColor = 'green';
            cells[c].style.backgroundColor = 'green';
            gameWon = true;
            message.textContent = `Player ${currentPlayer} wins!`;

            // Apply the "winner" class to the winning cells
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');

            // Display the new game button
            resetButton.style.display = 'block';
            hasWinner = true;
            break;
        }
    }

    if (!hasWinner && moves === 9) {
        message.textContent = "It's a draw!";
        // Display the new game button
        resetButton.style.display = 'block';
        return true;
    }

    return hasWinner;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    for (const cell of cells) {
        cell.textContent = '';
        cell.style.backgroundColor = '#eee';
        cell.classList.remove('winner'); // Remove the "winner" class
    }
    currentPlayer = 'X';
    moves = 0;
    gameWon = false;
    message.textContent = '';
    
    // Hide the new game button
    resetButton.style.display = 'none';
}

resetGame();
