import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// PUBLIC_INTERFACE
test("renders board, initial status, and restart", () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByText(/Next turn: Player X/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Restart game/i })).toBeInTheDocument();
});

test("players can make moves and alternate turns", () => {
  render(<App />);
  const cells = screen.getAllByRole("gridcell");
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent("X");
  expect(screen.getByText(/Next turn: Player O/i)).toBeInTheDocument();
  fireEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent("O");
  expect(screen.getByText(/Next turn: Player X/i)).toBeInTheDocument();
});

test("game detects win and draw", () => {
  render(<App />);
  // Testing draw sequence: no winner, all cells filled.
  // X O X
  // X O O
  // O X X
  //
  // Indices:  0 | 1 | 2
  //           3 | 4 | 5
  //           6 | 7 | 8
  //
  // Sequence explained:
  // 0: X, 1: O, 2: X, 4: O, 3: X, 5: O, 7: X, 6: O, 8: X
  // - No player completes a winning line.
  //
  const cells = screen.getAllByRole("gridcell");
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(idx => fireEvent.click(cells[idx]));
  expect(screen.getByText(/It's a draw/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Restart game/i }));
  expect(screen.getByText(/Next turn: Player X/i)).toBeInTheDocument();
});

test("cannot make move on filled or after win", () => {
  render(<App />);
  const cells = screen.getAllByRole("gridcell");
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(cells[3]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[6]); // X wins
  expect(screen.getByText(/Winner: Player X/)).toBeInTheDocument();
  fireEvent.click(cells[2]);
  expect(cells[2]).toHaveTextContent(""); // No change after win
});
