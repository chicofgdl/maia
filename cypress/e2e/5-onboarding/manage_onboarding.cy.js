describe('Gerenciamento de Onboarding', () => {
    beforeEach(() => {
      cy.login('admin@empresa.com', 'admin123')
      cy.visit('/onboarding')
    })
  
    it('Deve adicionar um novo título ao onboarding', () => {
      cy.get('#new-title').type('Git e GitHub')
      cy.get('#add-title-btn').click()
      cy.get('.onboarding-list').should('contain', 'Git e GitHub')
    })
  
    it('Deve remover um título do onboarding', () => {
      cy.get('.remove-title-btn').first().click()
      cy.get('.onboarding-list').should('not.contain', 'Git e GitHub')
    })
  })