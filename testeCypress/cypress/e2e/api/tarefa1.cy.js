// Tarefa 1: Usando ferramentas como Rest Assured, Cypress ou Playwright, crie um teste para validar endpoints de uma API de exemplo. 
// O teste deve incluir verificações de resposta (status codes, headers e corpo)

describe('Fun Translations API - Testes funcionais', () => {
  const baseUrl = 'https://api.funtranslations.com/translate';
  const headers = {
    'Content-Type': 'application/json',
    'X-Funtranslations-Api-Secret': Cypress.env('API_KEY') // use variável de ambiente
  };

  // ✅ Cenário positivo: tradução para Yoda
  it('Deve traduzir texto para o estilo Yoda com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/yoda.json`,
      headers,
      body: { text: 'Master Yoda is wise and powerful.' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type').and.include('application/json');
      expect(response.body).to.have.property('contents');
      expect(response.body.contents.translated).to.include('Yoda');
    });
  });

  // ❌ Cenário negativo: sem body (erro 400 esperado)
  it('Deve retornar erro 400 ao não enviar o corpo da requisição', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/yoda.json`,
      headers,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  // ❌ Cenário negativo: chave de API inválida (erro 401)
  it('Deve retornar erro 401 com chave de API inválida', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/yoda.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Funtranslations-Api-Secret': 'chave_invalida'
      },
      body: { text: 'This should fail.' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error');
    });
  });

  // ✅ Cenário positivo: tradução para Shakespeare
  it('Deve traduzir texto para o estilo Shakespeare', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/shakespeare.json`,
      headers,
      body: { text: 'You are amazing!' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.contents).to.have.property('translated');
    });
  });

  // ❌ Cenário negativo: método GET não permitido (erro 404)
  it('Deve retornar erro 404 ao usar método GET', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/yoda.json`,
      headers,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});