

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://www.honeycombagency.com.au/')
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
  })
  it('passes', () => {

    const values = [];
    cy.get('.menu-item > a')
      .each(($el) => {
        const href = $el.attr('href');
        if(href) {
          values.push(href);

        }
      })
      .then(() => {
        cy.log(JSON.stringify(values));
      })
  })
})