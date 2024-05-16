let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};
function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            highlightWinningBoxes(playerHasWon());
            endGame();
            return;
        }

        if (isBoardFull()) {
            playerText.innerHTML = "It's a tie!";
            endGame();
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}
function isBoardFull() {
    return spaces.every(space => space !== null);
}
function highlightWinningBoxes(winningBlocks) {
    winningBlocks.forEach(boxIndex => {
        boxes[boxIndex].style.backgroundColor = winnerIndicator;
    });
}
function endGame() {
    boxes.forEach(box => {
        box.removeEventListener('click', boxClicked);
    });
}
restartBtn.addEventListener('click', restart);
function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    startGame();
}
startGame();
