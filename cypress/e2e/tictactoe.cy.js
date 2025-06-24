// PUBLIC_INTERFACE
describe("Tic Tac Toe E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders game and plays basic X/O turns", () => {
    cy.get('[role="gridcell"]').should("have.length", 9);
    cy.contains("Next turn: Player X");
    cy.get('[role="gridcell"]').eq(0).click();
    cy.get('[role="gridcell"]').eq(0).should("contain", "X");
    cy.contains("Next turn: Player O");
    cy.get('[role="gridcell"]').eq(1).click();
    cy.get('[role="gridcell"]').eq(1).should("contain", "O");
  });

  it("detects win", () => {
    // Player X: 0,1,2
    cy.get('[role="gridcell"]').eq(0).click();
    cy.get('[role="gridcell"]').eq(3).click();
    cy.get('[role="gridcell"]').eq(1).click();
    cy.get('[role="gridcell"]').eq(4).click();
    cy.get('[role="gridcell"]').eq(2).click();
    cy.contains("Winner: Player X");
  });

  it("can restart game", () => {
    cy.get('[role="gridcell"]').eq(0).click();
    cy.get("button").contains(/restart/i).click();
    cy.get('[role="gridcell"]').each($cell => cy.wrap($cell).should("not.contain", "X").and("not.contain", "O"));
    cy.contains("Next turn: Player X");
  });

  it("supports keyboard navigation and accessibility", () => {
    cy.get('[role="gridcell"]').eq(0).focus().type("{rightarrow}");
    cy.focused().should("have.attr", "aria-label").and("include", "Cell 1,2");
    cy.get('[role="gridcell"]').eq(1).type("{enter}");
    cy.get('[role="gridcell"]').eq(1).should("contain", "X");
  });
});
