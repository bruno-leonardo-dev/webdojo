# 🧪 Testes Automatizados - Webdojo (Cypress)

Este repositório contém os testes automatizados de interface para a aplicação **Webdojo**, utilizando o framework **[Cypress](https://www.cypress.io/)**.

---

## 📁 Estrutura do Projeto

A estrutura da pasta `cypress/` está organizada da seguinte forma:

```
cypress/
│
├── e2e/                      # Especificações de testes (arquivos *.cy.js)
│
├── fixtures/                 # Massa de dados utilizada nos testes
│   ├── 1.pdf                 # Arquivo utilizado em testes de upload
│   ├── cep.json              # Dados de exemplo de CEP
│   └── consultancy.json      # Dados de exemplo para testes de consultoria
│
├── support/                  # Suporte e configurações globais
│   ├── actions/              # Ações reutilizáveis encapsuladas
│   │   └── consultancy.actions.js
│   ├── commands.js           # Comandos customizados do Cypress
│   ├── e2e.js                # Configuração global dos testes E2E
│   └── utils.js              # Funções utilitárias usadas nos testes
```

---

## 🚀 Executando o Projeto

O repositório contém **a aplicação Webdojo** e **os testes automatizados Cypress** no mesmo diretório.

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar a aplicação Webdojo

```bash
npm run dev
```

A aplicação será servida localmente (por padrão na porta **3000**).

### 3. Executar os testes

Existem diferentes modos de execução dos testes Cypress:

| Script | Descrição |
|--------|------------|
| `npm run test` | Executa todos os testes no modo headless (sem interface). |
| `npm run test:ui` | Abre a interface gráfica do Cypress (modo interativo). |
| `npm run test:login` | Executa apenas os testes do arquivo `login.cy.js` no modo desktop. |
| `npm run test:login:mobile` | Executa apenas os testes de login simulando viewport mobile (414x896). |

---

## 🧱 Dependências Importantes

| Pacote | Função |
|--------|---------|
| **cypress** | Framework principal de testes E2E. |
| **serve** | Utilitário para servir a build da aplicação localmente (modo `dev`). |

---

## 🧩 Organização dos Testes

Os testes seguem uma estrutura modular para facilitar a manutenção e reutilização de código:

- **Fixtures** → Armazenam dados de entrada e respostas esperadas.
- **Support/actions** → Contém funções de ações reutilizáveis (como preenchimento de formulários, login etc.).
- **Support/commands.js** → Define comandos customizados com `Cypress.Commands.add`.
- **Support/utils.js** → Centraliza funções auxiliares genéricas.
- **E2E Tests (`cypress/e2e/`)** → Contém os cenários de teste principais divididos por funcionalidade.

---

## 🧠 Boas Práticas

- Manter ações reutilizáveis dentro da pasta `support/actions`.
- Centralizar massa de dados em `fixtures`.
- Utilizar `beforeEach()` para configurar o estado inicial de cada teste.
- Separar testes por funcionalidade (login, cadastro, etc).

---

## 👨‍💻 Autor

**Bruno Leonardo**  
📍 QA Automation  
📧 **[LinkedIn](https://www.linkedin.com/in/bruno-leonardo-26053b287/)**

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para utilizar e modificar conforme necessário.
