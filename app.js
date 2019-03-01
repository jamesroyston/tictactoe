// factory function for Player creation
const playerFactory = (symbol, name) => {
  const marker = symbol;

  const makeMove = (id) => {
    if (board.board[id] === '') {
      board.board[id] = marker;
      displayController.DOMstrings.squares[id].innerHTML = marker;
      game.switchTurns();
      let gameCheck = checker();
      if (didWinTest().didOWin.length > 0 || didWinTest().didXWin.length > 0) {
        gameCheck.winChecker()
        displayController.gameOverModal()
      }
    } else {
      console.log('not true');
    }
  }
  return {
    makeMove,
    marker,
    name,
  } // object shorthand notation
}


const playerX = playerFactory('x', 'PlayerX');
const playerO = playerFactory('o', 'PlayerO');


// module for game logic
const game = (() => {

  let turnObj = {
    xTurn: false,
    oTurn: false
  }

  const init = () => {
    displayController.whoStartsModal();
    resetTurns();
    displayController.clearBoard();
    clearGameboardArr();
    displayController.removeModal2();
  }

  const clearGameboardArr = () => {
    board.board = ['', '', '', '', '', '', '', '', ''];
  }

  const resetTurns = () => {
    turnObj.xTurn = false;
    turnObj.oTurn = false;
  }

  const switchTurns = () => {
    if (turnObj.xTurn == true) {
      turnObj.xTurn = false;
      turnObj.oTurn = true;
    } else if (turnObj.oTurn == true) {
      turnObj.xTurn = true;
      turnObj.oTurn = false;
    }
  }

  /*
    game flow

    I want to be able to start a game
    I need a new board with no markers
    I need to decide who goes first
    I need to be able to place markers on the board
    I need to be able to place board markers into board array
    I want to be able to see whose turn it is to place a marker
    I want to be able to check that my board placements have or have not won the game
    I want to filter the board array into two new arrays
      each array will contain either the X positions or the O positions
    I will then compare the x and o arrays to the win array of arrays
    I will compare by looping over the win array
    If the win array has an array that === the  x or o arr: winner!
    I want to be able to restart the game
  */

  return {
    init,
    switchTurns,
    turnObj
  }
})();

const board = () => {
  let board = ['', '', '', '', '', '', '', '', ''];
  return {
    board
  }
}

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function checkForWinner (arr, player) {
//   arr.map( val => val == player).filter( val => arr.indexOf(val))
// }

const winPattern = () => {
  let xWinPattern = board.board.map(val => val == 'x')
    .filter(val => board.board.indexOf(val));
  let oWinPattern = board.board.map(val => val == 'o')
    .filter(val => board.board.indexOf(val));
  return {
    xWinPattern,
    oWinPattern
  }
}


const didWinTest = () => {
  let didOWin = winConditions.filter(pattern => {
    for (let i = 0; i < pattern.length; i++) {
      if (winPattern().oWinPattern[pattern[i]] == false) {
        return false
      }
    }
    return true;
  })

  let didXWin = winConditions.filter(pattern => {
    for (let i = 0; i < pattern.length; i++) {
      if (winPattern().xWinPattern[pattern[i]] == false) {
        return false
      }
    }
    return true;
  })
  return {
    didOWin,
    didXWin
  }
}


const checker = () => {
  let winChecker = () => {
    if (didWinTest().didXWin.length > 0) {
      return true;
    } else {
      if (didWinTest().didOWin.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  return {
    winChecker
  }
}


// module for display controller
const displayController = ((gameCtrl) => {

  const DOMstrings = {
    app: document.querySelector('body'),
    squares: document.querySelectorAll('.square'),
    playerBtns: document.querySelectorAll('.player_button'),
    winner: document.querySelector('#winner').innerHTML,
  }

  const displayHelpers = {
    removeButtonStyles: function () {
      DOMstrings.playerBtns.forEach(button => {
        button.classList.remove('button_click');
        button.classList.remove('button_hover');
      })
    }
  }


  // adds click listeners to each square and shows ID
  DOMstrings.squares.forEach(square => {
    square.addEventListener('click', function (e) {
      let id = e.target.id;
      if (gameCtrl.turnObj.xTurn == true && gameCtrl.turnObj.oTurn == false) {
        playerX.makeMove(id);
      } else if (gameCtrl.turnObj.xTurn == false && gameCtrl.turnObj.oTurn == true) {
        playerO.makeMove(id);
      }
    })
  });


  DOMstrings.playerBtns.forEach(button => {
    button.addEventListener('click', function (e) {
      if (e.target.innerHTML == 'X') {
        button.classList.add('button_click')
        startingPlayer('x');
        gameCtrl.turnObj.xTurn = true;
      } else if (e.target.innerHTML == 'O') {
        startingPlayer('o');
        button.classList.add('button_click')
        gameCtrl.turnObj.oTurn = true;
      }
    })
    button.addEventListener('mouseover', function() {
      button.classList.add('button_hover')
    })
    button.addEventListener('mouseout', function() {
      button.classList.remove('button_hover')
    })
  })


  const startingPlayer = (value) => {
    if (value == 'x') {
      setTimeout(removeModal, 800)
    } else if (value == 'o') {
      setTimeout(removeModal, 800)
    }
   }


  const whoStartsModal = () => {
    document.querySelector('.modal').style.display = 'block';
  }


  const removeModal = () => {
    document.querySelector('#gamestart').style.display = 'none';
    displayHelpers.removeButtonStyles()
  }


  const removeModal2 = () => {
    document.querySelector('#gameover_modal').style.display = 'none';
    displayHelpers.removeButtonStyles()
  }


  const gameOverModal = () => {
    showWinner();
    document.querySelector('#gameover_modal').style.display = 'block';
    document.querySelector('#gameover_modal').style.transition = '0.3s';
  }


  const showWinner = () => {
    let win = '';
    if (didWinTest().didOWin.length > 0) {
      win = 'O'
      console.log(win)
    } else if (didWinTest().didXWin.length > 0) {
      console.log(win)
      win = 'X'
    }
    document.querySelector('#winner').innerHTML = win;
  }


  const clearBoard = () => {
    DOMstrings.squares.forEach(square => {
      square.innerHTML = '';
    })
  }


  return {
    showWinner,
    removeModal2,
    displayHelpers,
    gameOverModal,
    whoStartsModal,
    removeModal,
    startingPlayer,
    DOMstrings,
    clearBoard
  }

})(game);

game.init();