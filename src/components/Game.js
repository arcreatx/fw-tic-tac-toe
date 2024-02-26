import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([<div className="history">Go to game start</div>]);

  //Declaring a Winner
  useEffect(() => {
      setWinner(calculateWinner(squares));
  }, [squares, history.length]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares,move) => {
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
  };

  //Handle player
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    else { 
      if (!squares[i]) {
        const a = history.length;
        const b = <div className="game history">Go to move #{a}</div>
        setHistory([...history, b])
        squares[i] = xIsNext ? "X" : "O";
        setXIsNext(!xIsNext);
        setSquares([...squares]);
      }
    }
  };

  //Restart game
  const handlRestart = () => {
    setSquares(Array(9).fill(null));
    setHistory([<div className="history">Go to game start</div>]);
  };

  return (
  <div className="flex">
  <div className="main">
      <h2 className="result">Winner is {winner ? winner : "unknown"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
      </div>
      <div className="game">

      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
    <div className="history">{history}</div>
    
  </div> 
  );
}

export default Game;
