describe('Criação de Conta', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('Deve criar uma conta com dados válidos', () => {
      cy.get('#name').type('Novo Usuário')
      cy.get('#email').type('novo@empresa.com')
      cy.get('#password').type('senha123')
      cy.get('#confirm-password').type('senha123')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/dashboard')
    })
  })