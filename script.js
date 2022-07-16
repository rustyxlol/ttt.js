const ticTacBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  const $gameBoard = document.querySelector(".board");
  const $gameStatus = document.querySelector(".gameStatus");
  const $resetBoard = document.querySelector(".resetBoard");
  const $bot = document.querySelector(".bot");

  $bot.addEventListener("click", function (e) {
    botMove();
    updatePlayer();
    $bot.disabled = true;
  });
  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function isHTMLElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  }

  function updatePlayer() {
    currentPlayer == "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  }

  function resetBoard(board) {
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].innerHTML = "";
      }
    }
    $bot.disabled = false;
    $gameStatus.textContent = String.fromCharCode(160);
  }

  function getWinner(board) {
    let winner = checkWinner(board);
    if (winner != null) {
      return winner;
    }
    if (isEmpty(board) == false) {
      return "T";
    }
    return null;
  }

  function checkWinner(board) {
    let boardArray;
    if (isHTMLElement(board)) {
      boardArray = HTMLtoArray(board);
    } else {
      boardArray = board;
    }
    for (let axis of winningAxes) {
      let [a, b, c] = axis;
      if (
        boardArray[a] &&
        boardArray[a] == boardArray[b] &&
        boardArray[b] == boardArray[c]
      ) {
        return boardArray[a];
      }
    }
    return null;
  }

  function HTMLtoArray(board) {
    let boardArray = [];
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        boardArray.push(board.rows[i].cells[j].textContent);
      }
    }
    return boardArray;
  }

  function arrayToHTML(board, array) {
    let k = 0;
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].innerHTML =
          "<div class='content'>" + array[k++] + "</div>";
      }
    }
  }

  function isEmpty(board) {
    let boardArray;
    if (isHTMLElement(board)) {
      boardArray = HTMLtoArray(board);
    } else {
      boardArray = board;
    }
    for (let i = 0; i < 9; i++) {
      if (boardArray[i] == "") {
        return true;
      }
    }
    return false;
  }

  function consoleWinner(winner) {
    if (winner != null) {
      if (winner == "X") {
        $gameStatus.textContent = "X IS THE WINNER";
      } else if (winner == "O") {
        $gameStatus.textContent = "O IS THE WINNER";
      } else {
        $gameStatus.textContent = "Bummer! It's a tie";
      }
    }
  }

  function botMove() {
    let boardArray = HTMLtoArray($gameBoard);
    let move;
    let bestValue = Infinity;
    for (let i = 0; i < 9; i++) {
      if (boardArray[i] == "") {
        boardArray[i] = "O";
        let value = miniMax(boardArray, false);
        boardArray[i] = "";
        if (value < bestValue) {
          move = i;
          bestValue = value;
        }
      }
    }
    boardArray[move] = "O";
    getWinner(boardArray);
    consoleWinner(getWinner(boardArray));
    arrayToHTML($gameBoard, boardArray);
    updatePlayer();
  }
  //event listeners

  function miniMax(boardArray, isMaximizing) {
    let winner = getWinner(boardArray);
    if (winner == "X") {
      return +10;
    }
    if (winner == "O") {
      return -10;
    }
    if (winner == "T" || !isEmpty(boardArray)) {
      return 0;
    }

    // BOT - MINIMIZER
    if (isMaximizing) {
      let bestValue = 9999;
      for (let i = 0; i < 9; i++) {
        if (boardArray[i] == "") {
          boardArray[i] = "O";
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
          boardArray[i] = "X";
          let value = miniMax(boardArray, !isMaximizing);
          bestValue = Math.max(bestValue, value);
          boardArray[i] = "";
        }
      }
      return bestValue;
    }
  }

  // EVENT LISTENERS

  $resetBoard.onclick = () => {
    resetBoard($gameBoard);
  };
  function cellOnClick(i, j) {
    if ($gameBoard.rows[i].cells[j].textContent == "") {
      $gameBoard.rows[i].cells[j].innerHTML =
        "<div class='content'>" + currentPlayer + "</div>";
      getWinner($gameBoard);
      if (currentPlayer == "X") {
        botMove();
        updatePlayer();
      }
    }
  }

  for (let i = 0; i < $gameBoard.rows.length; i++) {
    for (let j = 0; j < $gameBoard.rows[i].cells.length; j++) {
      $gameBoard.rows[i].cells[j].addEventListener(
        "click",
        function () {
          cellOnClick(i, j);
        },
        false
      );
    }
  }

  return {
    board,
  };
})();
