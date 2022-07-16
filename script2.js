// gameBoard = module
// player = FF
// displayController = module
// gameController = module

const gameBoard = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, player) => {
    gameBoard[index] = player;
  };

  const getGameBoard = () => {
    return gameBoard;
  };

  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
  };

  return {
    getGameBoard: getGameBoard,
    setField: setField,
    resetBoard: resetBoard,
  };
})();

const Player = (player) => {
  let _player = player;

  const getPlayer = () => _player;

  const setPlayer = (player) => {
    _player = player;
  };

  return {
    getPlayer: getPlayer,
    setPlayer: setPlayer,
  };
};

const displayController = (function () {
  let turn = 1;
  // cache dom
  const $gameBoard = document.querySelector(".board");
  const $gameStatus = document.querySelector(".gameStatus");
  const $resetBoard = document.querySelector(".resetBoard");
  const $bot = document.querySelector(".bot");

  // events
  $resetBoard.addEventListener("click", resetBoard);
  $gameBoard.addEventListener("click", clickHandler);
  $bot.addEventListener("click", botEvent);
  // functions

  function botEvent() {
    gameController.botMove();
    render();
    $bot.disabled = true;
  }

  function setStatus(winner) {
    if (winner != null) {
      if (winner == "draw") {
        setMessage(`Bummer! It's a tie`);
      } else {
        setMessage(`${winner} is the winner!`);
      }
    }
  }

  function setMessage(message) {
    $gameStatus.textContent = message;
  }

  function clickHandler(event) {
    let i = event.target.parentNode.rowIndex;
    i == 0 ? (i = 0) : i == 1 ? (i = 3) : (i = 6);
    if (event.target.textContent == "") {
      gameBoard.setField(i + event.target.cellIndex, "x");
      gameController.botMove();
    }
    render();
  }

  function render() {
    console.log(gameBoard.getGameBoard());
    arrayToHTML(gameBoard.getGameBoard());
    setStatus(gameController.getWinner());
  }

  function resetBoard() {
    $bot.disabled = false;
    gameBoard.resetBoard();
    setMessage(String.fromCharCode(160));
    render();
  }

  function arrayToHTML(array) {
    let k = 0;
    let board = $gameBoard;
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].innerHTML =
          "<div class='content'>" + array[k++] + "</div>";
      }
    }
  }

  return {
    setStatus: setStatus,
  };
})();

const gameController = (function () {
  let board = gameBoard.getGameBoard();

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

  function botMove() {
    let boardArray = gameBoard.getGameBoard();
    let move;
    let bestValue = Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardArray[i] == "") {
        boardArray[i] = "o";
        let value = miniMax(boardArray, false);
        boardArray[i] = "";
        if (value < bestValue) {
          move = i;
          bestValue = value;
        }
      }
    }
    gameBoard.setField(move, "o");
  }

  function miniMax(boardArray, isMaximizing) {
    let winner = getWinner();
    if (winner == "x") {
      return +10;
    }
    if (winner == "o") {
      return -10;
    }
    if (winner == "draw" || !isEmpty()) {
      return 0;
    }

    // BOT - MINIMIZER
    if (isMaximizing) {
      let bestValue = 9999;
      for (let i = 0; i < 9; i++) {
        if (boardArray[i] == "") {
          boardArray[i] = "o";
          let value = miniMax(boardArray, !isMaximizing);
          bestValue = Math.min(bestValue, value);
          boardArray[i] = "";
        }
      }
      return bestValue;
    }
    // PLAYER - MAXIMIZER; other way doesn't work
    else {
      let bestValue = -9999;
      for (let i = 0; i < 9; i++) {
        if (boardArray[i] == "") {
          boardArray[i] = "x";
          let value = miniMax(boardArray, !isMaximizing);
          bestValue = Math.max(bestValue, value);
          boardArray[i] = "";
        }
      }
      return bestValue;
    }
  }

  function isEmpty() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "") {
        return true;
      }
    }
    return false;
  }

  function checkWinner() {
    for (let combo of winningCombos) {
      let [a, b, c] = combo;
      if (board[a] && board[a] == board[b] && board[b] == board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function getWinner() {
    let winner = checkWinner();
    if (winner != null) {
      return winner;
    }
    if (isEmpty() == false) {
      return "draw";
    }
    return null;
  }

  return {
    getWinner: getWinner,
    botMove: botMove,
  };
})();
