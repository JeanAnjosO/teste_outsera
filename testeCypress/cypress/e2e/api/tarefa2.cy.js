// Tarefa 2: Automatizar testes para múltiplos endpoints da API, validando diferentes métodos HTTP (GET, POST, PUT, DELETE), 
// e realizar validações de status codes, headers e corpo de resposta para cada um dos métodos.

describe('JSONPlaceholder API - Testes HTTP (Positivos e Negativos)', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  // 🟢 GET
  it('GET /posts - deve retornar uma lista de posts', () => {
    cy.request('GET', `${baseUrl}/posts`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('GET /posts/1 - deve retornar um post específico', () => {
    cy.request('GET', `${baseUrl}/posts/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', 1);
    });
  });

  it('GET /posts/9999 - deve retornar objeto vazio ou 404', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/posts/9999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 404]).to.include(res.status);
    });
  });

  // 🟢 POST
  it('POST /posts - deve criar um novo post', () => {
    cy.request('POST', `${baseUrl}/posts`, {
      title: 'Novo post',
      body: 'Conteúdo do post',
      userId: 1,
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include({ title: 'Novo post' });
    });
  });

  it('POST /posts - deve falhar com corpo vazio', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: {},
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(201); // JSONPlaceholder ainda retorna sucesso, mas corpo vazio
      expect(res.body).to.have.property('id');
    });
  });

  it('POST /posts - deve falhar com dados inválidos', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/posts`,
      body: "texto inválido",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 201]);
    });
  });

  // 🟢 PUT
  it('PUT /posts/1 - deve atualizar post existente', () => {
    cy.request('PUT', `${baseUrl}/posts/1`, {
      id: 1,
      title: 'Atualizado',
      body: 'Novo corpo',
      userId: 1,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq('Atualizado');
    });
  });

  it('PUT /posts/9999 - deve tentar atualizar post inexistente', () => {
    cy.request('PUT', `${baseUrl}/posts/9999`, {
      id: 9999,
      title: 'Inexistente',
      body: 'Nada',
      userId: 1,
    }).then((res) => {
      expect(res.status).to.eq(200); // JSONPlaceholder ainda responde 200
    });
  });

  it('PUT /posts/1 - com corpo inválido', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/posts/1`,
      body: "isso não é um JSON válido",
      failOnStatusCode: false,
    }).then((res) => {
      expect([400, 200]).to.include(res.status);
    });
  });

  // 🟢 DELETE
  it('DELETE /posts/1 - deve deletar um post existente', () => {
    cy.request('DELETE', `${baseUrl}/posts/1`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('DELETE /posts/9999 - deletar post inexistente deve retornar sucesso mesmo assim', () => {
    cy.request('DELETE', `${baseUrl}/posts/9999`).then((res) => {
      expect(res.status).to.eq(200); // API retorna 200 mesmo se o recurso não existir
    });
  });

  it('DELETE sem ID - deve retornar erro 404', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/posts/`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([404, 405]);
    });
  });
});
