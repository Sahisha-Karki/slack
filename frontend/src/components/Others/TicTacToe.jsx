import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import { FaTimes } from 'react-icons/fa'; // Import cross icon

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner || isTie) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const calculateWinner = (board) => {
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
      for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowPopup(true);
    } else if (board.every(cell => cell)) {
      setIsTie(true);
      setShowPopup(true);
    }
  }, [board]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsTie(false);
    setShowPopup(false);
  };

  const closePopup = () => {
    handleReset(); // Reset game when popup is closed
    setShowPopup(false);
  };

  return (
    <div className="tic-tac-toe-container">
      <div className="tic-tac-toe">
        <div className="status">
          {!winner && !isTie
            ? `Next player: ${isXNext ? 'X' : 'O'}`
            : winner
            ? `Winner: ${winner}`
            : 'It\'s a tie!'}
        </div>
        <div className="board">
          {board.map((value, index) => (
            <button key={index} className="square" onClick={() => handleClick(index)}>
              {value}
            </button>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="winner-popup">
          <div className="popup-content">
            <FaTimes className="popup-close-icon" onClick={closePopup} />
            <h2>{winner ? 'Congratulations!' : 'Game Over!'}</h2>
            <p>{winner ? `Player ${winner} wins! 🎉` : 'It\'s a tie! 🤝'}</p>
            <div className="popup-buttons">
              <button onClick={handleReset} className="popup-restart-button">
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
