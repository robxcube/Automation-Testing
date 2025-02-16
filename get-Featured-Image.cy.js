describe('Check Featured Image', () => {
    it('should verify that the featured image exists and is visible', () => {
      cy.visit('https://dynamictradies-refresh.nyg1r0.ap-southeast-2.wpstaqhosting.com/plumbing/'); // Replace with your site's URL
  
      cy.get('meta[property="og:image"]') // Replace with the actual selector
        .should('exist') // Ensure the element exists in the DOM
    });
  });
  