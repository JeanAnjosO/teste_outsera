// comandos customizados e que podem ser reutilizaveis// comandos customizados e que podem ser reutilizaveis

Cypress.Commands.add('login', (email, senha) => {
  cy.visit('index.html');

  cy.get('#login-email').type(email);
  cy.get('#login-password').type(senha);

  cy.contains('Logar').click();
})

Cypress.Commands.add('preencheFormsCadastro', (nome, cpf, anoNascimento, sexo, celular, email) => {
  cy.get('#full-name').type(nome);
  cy.get('#cpf').type(cpf);
  cy.get('#birth-year').type(anoNascimento);
  cy.get('#gender').select(sexo);
  cy.get('#cellphone').type(celular);
  cy.get('#form-email').type(email);
})

Cypress.Commands.add('preencheFormsCartaoCred', (numCartao, nome, validade, cvv) => {
  cy.get('#credit-card-fields').should('be.visible');
  cy.get('#credit-card-fields input').eq(0).type(numCartao);
  cy.get('#credit-card-fields input').eq(1).type(nome);
  cy.get('#credit-card-fields input').eq(2).type(validade);
  cy.get('#credit-card-fields input').eq(3).type(cvv);
})
