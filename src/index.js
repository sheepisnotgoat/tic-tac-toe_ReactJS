import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Square extends React.Component {
  onClickSquare() {}
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      counter: 1,
      player: "X",
      winner: null,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] == null) {
      if (this.state.counter % 2 !== 0) {
        squares[i] = "X";
        this.setState({ counter: this.state.counter + 1 });
        this.setState({ player: "O" });
      } else {
        squares[i] = "O";
        this.setState({ counter: this.state.counter + 1 });
        this.setState({ player: "X" });
      }
    } else {
      console.log("Already marked!");
    }

    this.setState({
      squares: squares,
    });

    let whoWon = this.calculateWinner(squares);
    if (whoWon !== null) {
      this.setState({ winner: whoWon });
      console.log(whoWon + " WINS!");
      alert(whoWon + " Wins the game");
      for (let i = 0; i < squares.length; i++) {
        squares[i] = null;
      }
      this.setState({
        squares: squares,
      });
    }
  }
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">Next Player : {this.state.player}</div>
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
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
