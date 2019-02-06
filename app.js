// factory function for Player creation

const playerFactory = (symbol, name) => {
  const marker = symbol;
  // const completeTurn = () => {
  //   this.thisPlayersTurn = false;
  // };

  const makeMove = (id) => {
    console.log(id);
    if (gameboard.gameboardArr[id] === '') {
      game.turnCheck();
      gameboard.gameboardArr[id] = marker;
      displayController.DOMstrings.squares[id].innerHTML = marker;
      game.switchTurns();
    } else {
      console.log('not true');
    }
    console.log(gameboard.gameboardArr);
  }
  return {
    makeMove,
    marker,
    name,
  } // object shorthand notation
}



const playerX = playerFactory('x', 'PlayerX');
const playerO = playerFactory('o', 'PlayerO');


const game = (() => {

  let turnObj = {
    xTurn: false,
    oTurn: false
  }

  const init = () => {
    displayController.whoStartsModal();
    displayController.clearBoard();
    clearGameboardArr();
  }

  const clearGameboardArr = () => {
    gameboard.gameboardArr = ['', '', '', '', '', '', '', '', ''];
    console.log(gameboard.gameboardArr)
  }

  const turnCheck = () => {

    console.log(`X's turn : ${turnObj.xTurn}`)
    console.log(`O's turn : ${turnObj.oTurn}`)

  }

  const switchTurns = () => {
    if (turnObj.xTurn == true) {
      turnObj.xTurn = false;
      turnObj.oTurn = true;
    } else {
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
  I want to be able to see whose turn it is to place a market
  I want to be able to check that my board placements have or have not won the game
  I want to be able to restart the game
  */

  return { 
    init,
    turnCheck,
    switchTurns,
    turnObj
  }
})();

const gameboard = (() => {
  // sample data for now
  let gameboardArr = ['', '', '', '', '', '', '', '', ''];

  // let checkForWinner = () => {
  //   gameboardArr.map(()=> {
  //     winConditions.map(()=> {
  //     })
  //   })
  // }

  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  return { gameboardArr };

  /* same thing as 
    return {
      gameboardArr: gameboardArr,
    }
  */
})();


// module for display controller

const displayController = ((gameCtrl) => {
  
  const DOMstrings = {
    app: document.querySelector('body'),
    squares: document.querySelectorAll('.square'),
    buttons: document.querySelectorAll('.button')
  }

  // adds click listeners to each square and shows ID
  DOMstrings.squares.forEach(square => {
    square.addEventListener('click', function(e) {
      let id = e.target.id;
      console.log(id);
      if (gameCtrl.turnObj.xTurn == true && gameCtrl.turnObj.oTurn == false) {
        playerX.makeMove(id);

      } else if (gameCtrl.turnObj.xTurn == false && gameCtrl.turnObj.oTurn == true) {
        playerO.makeMove(id);
      }
    })
  });

  DOMstrings.buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (e.target.innerHTML == 'X') {
        startingPlayer('x');
        gameCtrl.turnObj.xTurn = true;
      } else if (e.target.innerHTML == 'O') {
        startingPlayer('o');
        gameCtrl.turnObj.oTurn = true;
      }
    })
  })

  const startingPlayer = (value) => {
    if (value == 'x') {
      console.log(playerX.marker)
      removeModal()
    } else if (value == 'o') {
      console.log(playerO.marker)
      removeModal()
    }
  }

  const whoStartsModal = () => {
    document.querySelector('.modal').style.display = 'block';
  }

  const removeModal = () => {
    document.querySelector('.modal').style.display = 'none';
  }



  const clearBoard = () => {
    DOMstrings.squares.forEach(square => {
      square.innerHTML = '';
    })
  }

  return {
    whoStartsModal,
    removeModal,
    startingPlayer,
    DOMstrings,
    clearBoard,

  }

})(game);


game.init();