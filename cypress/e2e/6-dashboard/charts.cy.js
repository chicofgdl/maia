describe('Dashboard', () => {
    beforeEach(() => {
      cy.login('usuario@empresa.com', 'senha123')
      cy.visit('/dashboard')
    })
  
    it('Deve exibir gráficos corretamente', () => {
      cy.get('.chart').should('be.visible')
    })
  })