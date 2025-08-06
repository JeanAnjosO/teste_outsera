
# 🔥 Teste de Carga com K6 - Fun Translations API (Windows)

Este projeto executa um teste de carga na [Fun Translations API](https://api.funtranslations.com/) utilizando o [K6](https://k6.io/), simulando **500 usuários simultâneos por 5 minutos**.

---

## 📦 Pré-requisitos

- Sistema operacional: **Windows 10 ou superior**
- Terminal: **CMD** ou **PowerShell**
- [Chocolatey](https://chocolatey.org/install) instalado (para facilitar a instalação do K6)

---

## ⚙️ Instalação do K6 (via Chocolatey)

1. Abra o **PowerShell como administrador**
2. Execute:

```powershell
choco install k6
```

3. Aguarde a instalação ser concluída. Você pode testar com:

```powershell
k6 version
```

---

## 📁 Estrutura do Projeto

```
.
├── load-test.js        # Script de teste de carga
└── README.md           # Este arquivo
```

---

## 🔐 Configurando a chave da API

A Fun Translations exige uma API Key para autenticação. Após obtê-la no site oficial, defina-a como variável de ambiente **temporária** no terminal antes de rodar o teste.

### 👉 CMD

```cmd
set API_KEY=SUA_CHAVE_AQUI
k6 run load-test.js
```

### 👉 PowerShell

```powershell
$env:API_KEY="SUA_CHAVE_AQUI"
k6 run load-test.js
```

> 💡 Substitua `SUA_CHAVE_AQUI` pela sua chave real.

---

## ▶️ Executando o teste

1. Baixe ou clone este repositório.
2. Navegue até a pasta do projeto:

```powershell
cd caminho\para\a\pasta
```

3. Defina a variável de ambiente como explicado acima.
4. Execute o teste:

```powershell
k6 run load-test.js
```

---

## 📜 O que o script faz

O script (`load-test.js`):

- Envia requisições POST para o endpoint Yoda (`/translate/yoda.json`)
- Simula 500 usuários simultâneos durante 5 minutos
- Envia o seguinte payload JSON:

```json
{
  "text": "Train yourself to let go of everything you fear to lose."
}
```

---

## 📊 Resultado do teste

O K6 exibirá métricas como:

- Quantidade de requisições/segundo
- Tempo de resposta médio
- Taxas de erro
- Percentis de latência

---

## ❗ Observações

- A API gratuita da Fun Translations tem limite de **5 requisições por hora**.
- É recomendável usar uma conta paga para testes de carga mais intensos.

---

## ✅ Segurança

Evite salvar sua chave da API diretamente no código. Use sempre variáveis de ambiente para proteger dados sensíveis.
