// empty board array for the 9 boxes
// I was getting confused with the "colors object" since in tic tac toe (the way I envision it),
// there is no difference in a player's colors, but rather their "tokens",
// so I created separate variables instead
const squares = ["", "", "", "", "", "", "", "", ""];

// without the array.from function, I was getting a "node list" so I created an array from the
// node list that would be easier for me to work with (I am more comfortable with arrays)
const cells = Array.from(document.querySelectorAll('.cell'));

// I was getting confused with player1 and player-1 so I made them player1 and player2 instead
// & here I initialized player1 (or "X") as the first one
const player1 = "X";
const player2 = "O";
let currentTurn = player1;

// the 8 possible winning combinations + a tie option
// i was having trouble using them as an array so chose a long if statement instead
function winningState() {
    if (squares[0] === currentTurn) {
        if (squares[1] === currentTurn && squares[2] === currentTurn) {
            return "win";
        }
        if (squares[3] === currentTurn && squares[6] === currentTurn) {
            return "win";
        }
        if (squares[4] === currentTurn && squares[8] === currentTurn) {
            return "win";
        }
    };
    if (squares[2] === currentTurn) {
        if (squares[5] === currentTurn && squares[8] === currentTurn) {
            return "win";
        }
        if (squares[4] === currentTurn && squares[6] === currentTurn) {
            return "win";
        }
    };
    if (squares[1] === currentTurn) {
        if (squares[4] === currentTurn && squares[7] === currentTurn) {
            return "win";
        }
    };
    if (squares[3] === currentTurn) {
        if (squares[4] === currentTurn && squares[5] === currentTurn) {
            return "win";
        }
    };
    if (squares[6] === currentTurn) {
        if (squares[7] === currentTurn && squares[8] === currentTurn) {
            return "win";
        }
    };
    let tiedState = !squares.includes("");
    if (tiedState === true) {
        return "tie";
    } return false;
}

// the text below the game + the reset button
const currentStatus = document.getElementById("currentStatus");
const resetButton = document.querySelector(".resetGame");

// for each cell, whenever it's clicked, initiate the clickedCell function
cells.forEach(function (cell) {
    cell.addEventListener('click', clickedCell)
})

// This function listens to the clicked element and looks for the id from the HTML, 
// where I specified an id number for each square from 0-8.
// If the square at that id is currently empty & the game hasn't ended yet,
// the square will be registered under the current player in the array, and
// the cell will be filled in with the current player's "token".
// If the game has been won/tied, the text at the bottom should update and the game should stop (return) and 
// it shouldn't be anyone's turn (i.e.: the remaining cells should not be clickable).
// If not, the current player will alternate and the game continues.
function clickedCell(evt) {
    if (squares[evt.target.id] === "" && currentTurn !== "") {
        squares[evt.target.id] = currentTurn;
        evt.target.innerText = currentTurn;
        if (winningState() === "win") {
            currentStatus.innerText = `${currentTurn} is the winner! Congratulations!`.toUpperCase();
            // console.log(`winning state: ${winningState()}, ${squares}`);
            currentTurn = "";
            return;
        } else if (winningState() === "tie") {
            currentStatus.innerText = `it's a tie!`.toUpperCase();
            currentTurn = "";
            // console.log(`tied state: ${winningState()}, ${squares}`)
            return;
        } else {
            // console.log(`switched turn`)
            if (currentTurn === player1) {
                currentTurn = player2;
                currentStatus.innerText = `it's ${currentTurn}'s turn!`.toUpperCase();
            } else {
                currentTurn = player1;
                currentStatus.innerText = `it's ${currentTurn}'s turn!`.toUpperCase();
            };
        };
    }
}

resetButton.addEventListener('click', resetGame);

// when the button is clicked, the squares should not be registered to any player,
// the cells should have no text in them,
// the text under the game should reset to the initial value,
// the first player will revert to player1
function resetGame() {
    squares.forEach(function (square, idx) {
        squares[idx] = "";
    })
    cells.forEach(function (cell, idx) {
        cell.innerText = "";
    })
    currentStatus.innerText = `click any square to play!`;
    currentTurn = player1;
}
