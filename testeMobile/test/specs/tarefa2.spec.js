// Automatizar um cenário onde o usuário preenche um formulário e envia os dados em um aplicativo móvel de exemplo.

describe('Envio de formulário no app', () => {
  it('deve preencher e enviar um formulário com sucesso', async () => {
    const nomeInput = await $('~input-nome');
    await nomeInput.waitForDisplayed({ timeout: 5000 });
    await nomeInput.setValue('João da Silva');

    const cpfInput = await $('~input-cpf');
    await cpfInput.setValue('12345678900');

    const anoNascimentoInput = await $('~input-ano-nascimento');
    await anoNascimentoInput.setValue('1990');

    const sexoInput = await $('~input-sexo');
    await sexoInput.setValue('Masculino');

    const celularInput = await $('~input-celular');
    await celularInput.setValue('11999999999');

    const emailInput = await $('~input-email');
    await emailInput.setValue('joao@email.com');

    const enviarBtn = await $('~btn-enviar-formulario');
    await enviarBtn.click();

    const mensagemSucesso = await $('~mensagem-sucesso');
    await mensagemSucesso.waitForDisplayed({ timeout: 5000 });
    expect(await mensagemSucesso.getText()).toContain('Formulário enviado com sucesso');
  });
});