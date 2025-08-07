describe('Fluxo de Checkout Simples', () => {
  beforeEach(() => {
    cy.login('usuario@teste.com', 'senha123');
  });

  it('deve completar o fluxo de checkout com pagamento via crédito', () => {
    // Formulário de cadastro
    cy.preencheFormsCadastro('João da Silva', '12345678900', '1990', 'masculino', '11999999999', 'joao@teste.com', 'joao@teste.com')
    cy.contains('Avançar').click();

    // Adição de produtos
    cy.contains('Produto A').parent().contains('Adicionar ao carrinho').click();
    cy.contains('Produto B').parent().contains('Adicionar ao carrinho').click();

    // Verificação dos itens no carrinho
    cy.get('#cart').should('contain', 'Produto A');
    cy.get('#cart').should('contain', 'Produto B');

    // Pagamento com crédito
    cy.get('#payment-method').select('credito');

    cy.preencheFormsCartaoCred('4111111111111111', 'João da Silva', '12/30', '123')

    // Finalizar compra
    cy.contains('Finalizar').click();

    // Verificar mensagem de sucesso
    cy.get('#success-message').should('be.visible');
    cy.contains('✅ Compra efetuada com sucesso!');
  });
});
