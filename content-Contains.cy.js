let text = "Experience tennis like never before at premier centres that inspire players of every skill level."

context('page-Scan', () => {
  beforeEach(() => {
    cy.visit('https://www.tennisbrisbane.com.au/')
  })

  it("Has text", () => {
    cy.contains(text);
  })
})