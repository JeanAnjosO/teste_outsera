describe('Fluxo de Checkout Simples', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('deve completar o fluxo de checkout com pagamento via crédito', () => {
    // Login
    cy.get('#login-email').type('usuario@teste.com');
    cy.get('#login-password').type('senha123');
    cy.contains('Logar').click();

    // Formulário de cadastro
    cy.get('#full-name').type('João da Silva');
    cy.get('#cpf').type('12345678900');
    cy.get('#birth-year').type('1990');
    cy.get('#gender').select('masculino');
    cy.get('#cellphone').type('11999999999');
    cy.get('#form-email').type('joao@teste.com');
    cy.contains('Avançar').click();

    // Adição de produtos
    cy.contains('Produto A').parent().contains('Adicionar ao carrinho').click();
    cy.contains('Produto B').parent().contains('Adicionar ao carrinho').click();

    // Verificação dos itens no carrinho
    cy.get('#cart').should('contain', 'Produto A');
    cy.get('#cart').should('contain', 'Produto B');

    // Pagamento com crédito
    cy.get('#payment-method').select('credito');

    cy.get('#credit-card-fields').should('be.visible');
    cy.get('#credit-card-fields input').eq(0).type('4111111111111111'); // número
    cy.get('#credit-card-fields input').eq(1).type('João da Silva'); // nome
    cy.get('#credit-card-fields input').eq(2).type('12/30'); // validade
    cy.get('#credit-card-fields input').eq(3).type('123'); // cvv

    // Finalizar compra
    cy.contains('Finalizar').click();

    // Verificar mensagem de sucesso
    cy.get('#success-message').should('be.visible');
    cy.contains('✅ Compra efetuada com sucesso!');
  });
});
