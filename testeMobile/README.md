# Projeto de Teste Mobile com Appium e WebDriverIO

## Pré-requisitos

- Node.js v14+ instalado
- Android SDK e emulador configurado
- Appium instalado globalmente (`npm install -g appium`)
- APK do aplicativo para teste

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Ajuste o caminho do seu APK em `wdio.conf.js` na propriedade `app`:

```js
app: '/path/to/your/app.apk'
```

3. Inicie o Appium (caso não use o serviço do WDIO para iniciar automaticamente):

```bash
appium
```

4. Execute os testes:

```bash
npm test
```

Este é um exemplo básico de teste que realiza:

- Login no app
- Navegação por telas
- Validação de elementos