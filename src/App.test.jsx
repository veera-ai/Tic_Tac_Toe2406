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
  // X O X
  // X O O
  // O X X
  const cells = screen.getAllByRole("gridcell");
  [0,1,3,2,4,5,7,6,8].forEach(idx => fireEvent.click(cells[idx]));
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
