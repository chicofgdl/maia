describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Deve fazer login com credenciais corretas", () => {
    cy.get('[type="text"]').type("chico");
    cy.get('[type="password"]').type("123");
    cy.get('[data-test=login-button-entrar]').click();
    cy.get('[data-test=sidebar-button-profile]').should('be.visible').click();
    cy.url().should("include", "/profile");
  });

//   it("Deve exibir erro ao tentar login com credenciais erradas", () => {
//     cy.get("#email").type("usuario@empresa.com");
//     cy.get("#password").type("senhaerrada");
//     cy.get('.bg-\[\#629E44\]').click();
//     cy.get(".error-message").should("contain", "Credenciais inválidas");
//   });
});
