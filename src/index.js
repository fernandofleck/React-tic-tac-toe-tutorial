import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function Square(props) {

    return (
        <button
            className="square"
            onClick={props.onClick}
        >
          {props.value}
        </button>
    );
};
  
class Board extends React.Component {

    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }
  
    render() {
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
};
  
class Game extends React.Component {

    constructor(props){
        super (props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: Array(9).fill(Array(2).fill(null)),
            }],
            stepNumber: 0,
            xIsNext: true,
            //position: [null, null],
        };
    };

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const position = current.position.slice();
        
        if (i===0||i===3||i===6) {
            position[0] = 1;
        } else if (i===1||i===4||i===7) {
            position[0] = 2;
        } else if (i===2||i===5||i===8) {
            position[0] = 3;
        };

        if (i===0||i===1||i===2) {
            position[1] = 1;
        } else if (i===3||i===4||i===5) {
            position[1] = 2;
        } else if (i===6||i===7||i===8) {
            position[1] = 3;
        };

        if (calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                position: position,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    };

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move +' (' + history[move].position[0] + ', ' + history[move].position[1]+')':
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        };

        return (
            <div className="game">
            <div className="game-board">
                <Board
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
};

function calculateWinner(squares){
      const lines = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6]
      ];

      for (let i=0; i < lines.length; i++){
          const [a,b,c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
              return squares[a]
          }
      };

      return null;
};
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);  