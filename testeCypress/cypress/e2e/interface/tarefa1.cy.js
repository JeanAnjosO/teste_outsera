// Tarefa 1: Usando Cucumber em conjunto com ferramentas como Selenium, Cypress ou Playwright, crie um teste simples que abra uma aplicação web, faça login e navegue até uma página específica (ex.: um formulário). 
// O teste deve incluir assertivas para validar que a navegação foi bem-sucedida.

// Justificativa do candidato: Não foi utilizado o Cucumber e nem Page Objects por um motivo: não é necessário fazer uso de tais recursos utilizando o Cypress tendo em vista que
// a ferramenta já nos dá possibilidade de codificar teste de forma mais direta utilizando seus patterns

describe('Teste de Login e Navegação para Formulário', () => {
  beforeEach(() => {
    cy.login('usuario@teste.com', 'senha123');
  });

  it('Deve logar com sucesso e acessar o formulário', () => {
    // Valida que a tela de login desapareceu
    cy.get('#login-container').should('not.be.visible');

    // Valida que a tela do formulário apareceu
    cy.get('#form-container').should('be.visible');

    // Verifica que o título "Formulário" está visível
    cy.contains('h2', 'Formulário').should('be.visible');

    // Valida os campos do formulário (exemplo)
    cy.get('#full-name').should('exist').and('be.visible');
    cy.get('#cpf').should('exist').and('be.visible');
    cy.get('#birth-year').should('exist').and('be.visible');
    cy.get('#gender').should('exist').and('be.visible');
    cy.get('#cellphone').should('exist').and('be.visible');
    cy.get('#form-email').should('exist').and('be.visible');
  });
});
