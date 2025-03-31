describe('Chatbot', () => {
    beforeEach(() => {
      cy.login('usuario@empresa.com', 'senha123')
      cy.visit('/chat')
    })
  
    it('Usuário deve enviar uma mensagem e receber resposta', () => {
      cy.get('#chat-input').type('Como usar Git?{enter}')
      cy.get('.chat-response').should('contain', 'Git é um sistema de controle de versão...')
    })
  })