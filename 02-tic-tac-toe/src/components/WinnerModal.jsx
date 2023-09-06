import Square from "./Square";
import PropTypes from 'prop-types';

// WinnerModal is a component that will be used to display the winner of the game
export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null

    // winnerText is a string that will be used to display the winner of the game
  const winnerText = winner === false ? "It's a tie!" : "The winner is"
  return (
    // The winner modal will be displayed when the winner is not null
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        {/* The winner will be displayed in a square */}
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          {/* The play again button will call the resetGame function when clicked */}
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  );
}

WinnerModal.propTypes = {
    winner: PropTypes.string,
    resetGame: PropTypes.func.isRequired
}
