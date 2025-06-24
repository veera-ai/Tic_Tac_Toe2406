# Tic Tac Toe Application

This project implements a fully accessible, user-friendly web-based Tic Tac Toe game.  
It is developed with React and comes with core game logic, keyboard/screenreader accessibility, state management, Cypress E2E, and Jest/RTL unit tests.

---

## Features

- **Two-player interface:** Local play for X and O, alternates player turns.
- **Game logic:** Correctly enforces Tic Tac Toe rules, detects wins and draws, blocks invalid moves.
- **State management:** Board, turn, win/draw status persist during a session.
- **Accessibility:**  
  - All interactions can be performed with keyboard.
  - Screen reader friendly: polite live regions, clear button labels and focus states.
- **Visual cues:** Last-move highlighting and clear board/status display.
- **Game restart:** Button to reset the board and start a new match.
- **Self-contained:** No backend or external API.

---

## Getting Started

### Prerequisites

- Node.js (>=18 recommended)
- npm (>=9 recommended)

### Installation

```sh
npm install
```

### Running the App

```sh
npm start
```

This runs the React application at [http://localhost:3000](http://localhost:3000).

---

## Running Tests

### Unit Tests

```sh
npm test
```

Runs Jest + React Testing Library checks (`src/App.test.jsx`).

### End-to-End (Cypress) Tests

In one terminal, run:

```sh
npm start
```
In another terminal:

```sh
npx cypress open
```

Or to run headless:

```sh
npx cypress run
```

---

## Accessibility Guide

- Tab to focus cells and the restart button.
- Use arrow keys (←,→,↑,↓) to move cell focus.
- Press Enter/Space to place your mark.
- Screen readers announce game status and control titles.

---

## File Structure

```
/
├── public/
│   └── index.html         # Root HTML entry
├── src/
│   ├── App.jsx            # Main app/component with all UI and logic
│   ├── App.test.jsx       # Unit/integration tests (Jest/RTL)
│   ├── index.jsx          # React SPA entry point
│   └── index.css          # Styling, a11y/visuals
├── cypress/
│   ├── e2e/
│   │   └── tictactoe.cy.js # Cypress E2E/acceptance tests
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── README.md
├── package.json
└── cypress.config.js
```

---

## Developer Notes

- All state and logic are held client-side; UI can be extended for AI or enhanced styling.
- To collaborate/extend: open `src/App.jsx` – all public interface functions are documented.
- Accessibility and a11y regions are integrated for easy expansion and compliance.
- Test cases (Cypress/Jest) cover smoke/edge flows; for more, add files under `cypress/e2e/` and `src/`.

---

## License

MIT