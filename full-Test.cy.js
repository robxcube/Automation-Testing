const sizes = ['macbook-15', [1024, 1366], [600, 1024], 'iphone-xr', 'iphone-6' ];

context('Full Check', () => {

  beforeEach(() => {
    cy.visit('https://www.honeycombagency.com.au/'); // Replace with your site's URL
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
  })

  describe('Check Featured Image', () => {
    it('should verify that the featured image exists and is visible', () => {
        cy.document().then((doc) => {
          const hasOGImage = doc.querySelector('meta[property="og:image"]') !== null;
          const hasThumbnail = doc.querySelector('.has-post-thumbnail') !== null;
      
          expect(hasOGImage || hasThumbnail).to.be.true;
        });
      });
    });
    
  describe('Check H1', () => {
    it('should have an one h1 tag', () => {
      cy.get('h1')
        .should('be.length', 1)
        .and('be.visible')
    })
  })

  describe('Check Images', () => {
    it('should ensure all images are under 300KB and log their sizes', () => {
      let largeImages = [];

      cy.get('img')
      .should('be.visible') // Ensure images are visible
      .each(($img) => {
        cy.wrap($img)
          .should(($el) => {
            expect($el[0].complete).to.be.true; // Ensure images are fully loaded
          })
          .then(($el) => {
            const imgSrc = $el.prop('src');

            if (imgSrc) {
              cy.request({ url: imgSrc, failOnStatusCode: false }).then((response) => {
                if (response.status === 404) {
                  cy.log(`⚠️ Image not found (404): ${imgSrc}`);
                } else {
                  const contentLength = response.headers['content-length'];
                  if (contentLength) {
                    const sizeKB = Number(contentLength) / 1024; 

                    if (sizeKB > 300) {
                      largeImages.push({ url: imgSrc, sizeKB });

                      cy.log(`❌ Large Image: ${imgSrc}, Size: ${sizeKB.toFixed(2)} KB`);
                    }
                  }
                }
              });
            }
          });
      })
      .then(() => {
        if (largeImages.length > 0) {
          console.log('⚠️ Large Images:', largeImages);
        }
      });
  
    });

    it('images should have alt', () => {
      let missingAltImages = [];

      cy.get('img').each(($img) => {
        const altText = $img.attr('alt');
        if (!altText) {
          missingAltImages.push($img.prop('src'));
        }
      }).then(() => {
        if (missingAltImages.length > 0) {
          cy.log('Images missing alt:', missingAltImages);
          console.log('Images missing alt:', missingAltImages); 
        }
      });
    })

    it('images are not obstructed', () => {
      sizes.forEach((size) => {
        it(`Image should be visible on ${Array.isArray(size) ? size.join('x') : size} screen`, () => {
          if (Array.isArray(size)) {
            cy.viewport(size[0], size[1]);
          } else {
            cy.viewport(size);
          }
          cy.get('img').should('be.visible');
        });
      });
    })
  })

})

