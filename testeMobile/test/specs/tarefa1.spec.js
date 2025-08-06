// Usando uma ferramenta de automação de testes para mobile (como Appium ou Espresso), crie um teste para um aplicativo de exemplo que execute o login, 
// navegue por algumas telas e valide um elemento (como uma mensagem ou um botão).

describe('Teste básico de app móvel', () => {
  it('deve executar login, navegar e validar elemento', async () => {
    const emailInput = await $('~input-email');
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue('usuario@exemplo.com');

    const passwordInput = await $('~input-senha');
    await passwordInput.setValue('senha123');

    const loginBtn = await $('~btn-login');
    await loginBtn.click();

    const menuBtn = await $('~btn-menu');
    await menuBtn.waitForDisplayed({ timeout: 10000 });
    expect(await menuBtn.isDisplayed()).toBe(true);

    const settingsBtn = await $('~btn-configuracoes');
    await settingsBtn.click();

    const settingsTitle = await $('~titulo-configuracoes');
    await settingsTitle.waitForDisplayed({ timeout: 5000 });
    expect(await settingsTitle.getText()).toContain('Configurações');

    await driver.back();
  });
});