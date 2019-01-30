const gameboard = (() => {
  // sample data for now
  let gameboardArr = ['x', 'o', 'x',
                      'o', 'x', 'x',
                      'x', 'o', 'o'];

  return { gameboardArr };

})();

const displayController = ((gameboardCtrl) => {
  
  const DOMstrings = {
    app: document.querySelector('div#app'),
    squares: document.querySelectorAll('.square')
  }

  // adds click listeners to each square and shows ID
  DOMstrings.squares.forEach(square => {
    square.addEventListener('click', function(e) {
      console.log(`ID : ${this.id}`)
      console.log(gameboardCtrl.gameboardArr[e.target.id])
      e.target.innerHTML = gameboardCtrl.gameboardArr[e.target.id]
    })
  });

  
})(gameboard);

const Player = (symbol, name = 'Player 1') => {
  this.name = name
  this.symbol = symbol
  return { name, symbol } // object shorthand notation
}

const player1 = Player('x');
const player2 = Player('o', 'Player 2');

console.log(player1, player2);
