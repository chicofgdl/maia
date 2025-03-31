describe('Upload de Banco de Dados', () => {
    beforeEach(() => {
      cy.login('admin@empresa.com', 'admin123')
      cy.visit('/upload')
    })
  
    it('Deve permitir upload de arquivo JSON válido', () => {
      cy.get('input[type="file"]').attachFile('database.json')
      cy.get('#upload-btn').click()
      cy.get('.success-message').should('contain', 'Upload concluído')
    })
  })