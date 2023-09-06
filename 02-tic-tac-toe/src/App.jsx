import { useState } from "react";
import Square from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { turns, WINNER_COMBINATIONS } from "./constants";
import "./App.css";

function App() {
  // resetGame is a function that will reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  // checkEndGame is a function that will check if the game is over

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };

  // board is an array that will contain the state of the board
  const [board, setBoard] = useState(() => {
    // get the board from the local storage
    const savedBoard = window.localStorage.getItem("board");
    // if the board is not null, return it
    if (savedBoard) return JSON.parse(savedBoard);
    // else return an array of 9 nulls
    return Array(9).fill(null);
  });

  // turn is a string that will contain the current turn
  const [turn, setTurn] = useState(() => {
    // get the turn from the local storage
    const savedTurn = window.localStorage.getItem("turn");
    // if the turn is not null, return it
    if (savedTurn) return savedTurn;
    // else return X
    return turns.X;
  });
  // winner is a string that will contain the winner of the game
  const [winner, setWinner] = useState(null);

  // checkWinner is a function that will check if there is a winner
  const checkWinner = (boardToCheck) => {
    // check if there is a winner
    for (const combo of WINNER_COMBINATIONS) {
      // combo is an array that contains the indexes of the squares that will be checked
      const [a, b, c] = combo;
      // check if the squares are not null and if they are equal
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        // return the winner
        return boardToCheck[a];
      }
    }
    // return null if there is no winner
    return null;
  };

  // updateBoard is a function that will update the board
  const updateBoard = (index) => {
    // check if the square is already filled or if there is a winner
    if (board[index] || winner) return;

    // update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // update the turn
    const newTurn = turn == turns.X ? turns.O : turns.X;
    setTurn(newTurn);

    // save the board in the local storage
    window.localStorage.setItem("board", JSON.stringify(newBoard));

    // save the turn in the local storage
    window.localStorage.setItem("turn", newTurn);

    // check if there is a winner or if the game is over
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    
    <main className="board">{/* The winner modal will be displayed when the winner is not null */}
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      {/* The turn will be displayed in a square */}
      <section className="turn">
        <Square isSelected={turn == turns.X}>{turns.X}</Square>
        <Square isSelected={turn == turns.O}>{turns.O}</Square>
      </section>
      {/* The winner will be displayed in a square */}
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
