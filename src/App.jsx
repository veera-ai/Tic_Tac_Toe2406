import React, { useState, useRef, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * The main App component renders and manages the entire Tic Tac Toe game, including
 * state controls, user interface, accessibility, and turn-based interactions.
 */
function App() {
  // Constants for players
  const PLAYER_X = "X";
  const PLAYER_O = "O";

  // Game State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [lastMoveIdx, setLastMoveIdx] = useState(null);

  // Accessibility: Focus refs for each cell
  const cellRefs = useRef([...Array(9)].map(() => React.createRef()));

  useEffect(() => {
    // After move or board reset, check for winner/draw
    const res = calculateWinner(board);
    setWinner(res);
    setIsDraw(!res && board.every(cell => cell !== null));
  }, [board]);

  // PUBLIC_INTERFACE
  /**
   * Handles a click or keyboard select on a square.
   * @param {number} idx The index of the cell.
   */
  function handleSelect(idx) {
    if (board[idx] || winner) return;
    const updatedBoard = board.slice();
    updatedBoard[idx] = xIsNext ? PLAYER_X : PLAYER_O;
    setBoard(updatedBoard);
    setXIsNext(!xIsNext);
    setLastMoveIdx(idx);
  }

  // PUBLIC_INTERFACE
  /**
   * Keyboard navigation for accessibility.
   * @param {React.KeyboardEvent} e Keyboard event
   * @param {Number} idx The index of the cell
   */
  function handleKeyDown(e, idx) {
    let targetIdx = idx;
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    switch (e.key) {
      case "ArrowUp":
        targetIdx = (row + 2) % 3 * 3 + col;
        cellRefs.current[targetIdx].current.focus();
        e.preventDefault();
        break;
      case "ArrowDown":
        targetIdx = (row + 1) % 3 * 3 + col;
        cellRefs.current[targetIdx].current.focus();
        e.preventDefault();
        break;
      case "ArrowLeft":
        targetIdx = row * 3 + (col + 2) % 3;
        cellRefs.current[targetIdx].current.focus();
        e.preventDefault();
        break;
      case "ArrowRight":
        targetIdx = row * 3 + (col + 1) % 3;
        cellRefs.current[targetIdx].current.focus();
        e.preventDefault();
        break;
      case " ":
      case "Enter":
        handleSelect(idx);
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Restarts the game to the initial state.
   */
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
    setLastMoveIdx(null);
    cellRefs.current[0].current && cellRefs.current[0].current.focus();
  }

  // PUBLIC_INTERFACE
  /**
   * Compute the winner of the current board.
   * @param {Array} board The board state.
   * @returns {"X"|"O"|null} Winner or null.
   */
  function calculateWinner(board) {
    // All possible winning lines
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // Rows
      [0,3,6],[1,4,7],[2,5,8], // Cols
      [0,4,8],[2,4,6]          // Diags
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  /**
   * Get the status message of the game.
   * @returns {string}
   */
  function getStatusText() {
    if (winner) return `Winner: Player ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next turn: Player ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="container" role="main" aria-labelledby="gameTitle">
      <h1 id="gameTitle">Tic Tac Toe</h1>
      <Board
        board={board}
        onSelect={handleSelect}
        cellRefs={cellRefs.current}
        onKeyDown={handleKeyDown}
        lastMoveIdx={lastMoveIdx}
        winner={winner}
      />
      <Status
        status={getStatusText()}
      />
      <button onClick={handleRestart} className="restart-btn" aria-label="Restart game">
        Restart Game
      </button>
      <AccessibilityHints />
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board component renders the Tic Tac Toe game grid and handles a11y and click/select.
 */
function Board({ board, onSelect, cellRefs, onKeyDown, lastMoveIdx, winner }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          ref={cellRefs[idx]}
          className={`cell${lastMoveIdx === idx ? " last-move" : ""}${cell ? " played" : ""}${winner ? " disabled" : ""}`}
          role="gridcell"
          aria-label={`Cell ${Math.floor(idx/3)+1},${(idx%3)+1} ${cell ? cell : ''}`}
          aria-pressed={!!cell}
          disabled={!!cell || winner}
          tabIndex={idx === 0 ? 0 : -1}
          onClick={() => onSelect(idx)}
          onKeyDown={(e) => onKeyDown(e, idx)}
        >
          <span aria-live="polite">{cell}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Shows the current game status (whose turn, win, or draw)
 */
function Status({ status }) {
  return (
    <div className="status" aria-live="polite" tabIndex={0}>
      {status}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * AccessibilityHints provides screen-reader and keyboard navigation guidance.
 */
function AccessibilityHints() {
  return (
    <section aria-labelledby="accessTitle" className="accessibility-section">
      <h2 id="accessTitle" style={{fontSize:"1.1em"}}>Accessibility & Keyboard Controls</h2>
      <ul>
        <li>Tab between cells, Enter/Space to place mark.</li>
        <li>Use arrow keys to move around the board.</li>
        <li>Status updates via screen reader-friendly region.</li>
      </ul>
    </section>
  );
}

export default App;
