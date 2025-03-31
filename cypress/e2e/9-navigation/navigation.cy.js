describe('Navegação', () => {
    beforeEach(() => {
      cy.login('usuario@empresa.com', 'senha123')
    })
  
    it('Usuário deve navegar entre páginas principais', () => {
      cy.visit('/dashboard')
      cy.get('nav').contains('Chatbot').click()
      cy.url().should('include', '/chat')
      cy.get('nav').contains('Onboarding').click()
      cy.url().should('include', '/onboarding')
    })
  })