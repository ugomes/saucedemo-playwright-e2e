# Testes E2E com Playwright - Sauce Demo

Projeto de automacao de testes end-to-end (E2E) no site [Sauce Demo](https://www.saucedemo.com), usando:

- Playwright Test
- TypeScript
- Padrao Page Object Model (POM)

O objetivo deste repositorio e validar fluxos criticos da aplicacao: login, ordenacao de produtos e fluxo de compra.

## Sumario

1. Visao geral
2. Tecnologias e versoes
3. Estrutura do projeto
4. Cenarios cobertos
5. Pre-requisitos
6. Setup completo (maquina nova)
7. Como executar os testes
8. Relatorios e evidencias
9. Dados de teste
10. Boas praticas aplicadas
11. Solucao de problemas


## 1) Visao geral

Este projeto testa a aplicacao web Sauce Demo a partir da perspectiva do usuario final.

Cobertura atual:

- Autenticacao (sucesso e falhas)
- Ordenacao de produtos por nome e preco
- Fluxo de compra completo
- Remocao de item no carrinho

Configuracao atual em `playwright.config.ts`:

- `baseURL`: `https://www.saucedemo.com`
- execucao em paralelo habilitada (`fullyParallel: true`)
- trace em primeira retentativa (`trace: 'on-first-retry'`)
- browser ativo: `chromium`
- reporter: `html`

## 2) Tecnologias e versoes

Dependencias do projeto:

- `@playwright/test`: `1.58.2`
- `@types/node`: `25.3.0`

Requisito de Node.js (Playwright 1.58.2):

- Node.js `>= 18`

Sugestao:

- usar Node.js 18 LTS ou 20 LTS

## 3) Estrutura do projeto

```text
.
|-- pages/
|   |-- LoginPage.ts
|   |-- ProductsPage.ts
|   |-- YourCartPage.ts
|   |-- CheckoutYourInformation.ts
|   |-- CheckoutOverview.ts
|   `-- CheckoutComplete.ts
|-- tests/
|   |-- login.spec.ts
|   |-- filtro.spec.ts
|   `-- fluxo_compra.spec.ts
|-- playwright.config.ts
|-- package.json
`-- package-lock.json
```

Descricao rapida:

- `pages/`: objetos de pagina (POM), com seletores e acoes reutilizaveis
- `tests/`: suites com cenarios E2E
- `playwright.config.ts`: configuracoes globais da execucao

## 4) Cenarios cobertos

### 4.1 Login (`tests/login.spec.ts`)

- Login com credenciais validas
- Validacao de mensagens de erro:
  - campos em branco
  - senha invalida
  - usuario bloqueado (`locked_out_user`)
- Logout do sistema

### 4.2 Ordenacao de produtos (`tests/filtro.spec.ts`)

- Ordenar por nome A-Z
- Ordenar por nome Z-A
- Ordenar por preco menor-maior
- Ordenar por preco maior-menor

### 4.3 Fluxo de compra (`tests/fluxo_compra.spec.ts`)

- Adicionar produto ao carrinho
- Validar quantidade no badge do carrinho
- Checkout com preenchimento de dados
- Validar informacoes da tela de overview
- Finalizar compra com mensagem de sucesso
- Remover produto do carrinho

## 5) Pre-requisitos

Antes de executar, garanta:

1. Node.js instalado (18+)
2. npm instalado
3. Conexao com internet (para acessar Sauce Demo e baixar browsers Playwright)

Comandos para verificar:

```powershell
node -v
npm -v
```

## 6) Setup completo (maquina nova)

No diretorio raiz do projeto (`test_sauce_demo_pw`), execute:

```powershell
npm install
npx playwright install
```

Opcional (Linux):

```bash
npx playwright install-deps
```

## 7) Como executar os testes

Como o `package.json` nao possui scripts customizados, use `npx` diretamente.

### 7.1 Rodar tudo

```powershell
npx playwright test
```

### 7.2 Rodar apenas 1 arquivo de teste

```powershell
npx playwright test tests/login.spec.ts
npx playwright test tests/filtro.spec.ts
npx playwright test tests/fluxo_compra.spec.ts
```

### 7.3 Rodar por titulo de teste

```powershell
npx playwright test -g "Login com credenciais validas"
```

### 7.4 Executar em modo debug

```powershell
npx playwright test --debug
```

### 7.5 Abrir UI Mode do Playwright

```powershell
npx playwright test --ui
```

### 7.6 Escolher browser/projeto

O projeto configurado e `chromium`.

```powershell
npx playwright test --project=chromium
```

## 8) Relatorios e evidencias

Apos a execucao:

- resultados tecnicos: `test-results/`
- relatorio HTML: `playwright-report/`

Para abrir o relatorio:

```powershell
npx playwright show-report
```

Quando ocorre falha com retentativa, traces sao gerados e podem ser abertos para analise detalhada.

## 9) Dados de teste

Credenciais usadas nos cenarios:

- Usuario valido:
  - `standard_user / secret_sauce`
- Usuario bloqueado:
  - `locked_out_user / secret_sauce`
- Senha invalida:
  - `standard_user / invalid_password`

Produto usado no fluxo de compra:

- `Sauce Labs Backpack`

Dados de checkout usados no teste:

- Primeiro nome: `John`
- Sobrenome: `Doe`
- CEP: `12345`

## 10) Boas praticas aplicadas

- Uso de Page Object Model para reduzir duplicacao
- Separacao clara entre testes (`tests/`) e interacoes de UI (`pages/`)
- Uso de `beforeEach` para preparar contexto
- Assercoes com `expect` para validar comportamento funcional

## 11) Solucao de problemas

### Erro: `npx: command not found` ou `node` nao reconhecido

- Node.js nao esta instalado corretamente ou nao esta no `PATH`

### Erro ao abrir browser Playwright

- Execute novamente:

```powershell
npx playwright install
```

### Falhas intermitentes de rede no Sauce Demo

- Rode novamente com trace/debug:

```powershell
npx playwright test --debug
```

### Relatorio nao abre

- Gere nova execucao e depois:

```powershell
npx playwright show-report
```

## Reproducao rapida (resumo em 5 passos)

```powershell
git clone <url-do-repositorio>
cd test_sauce_demo_pw
npm install
npx playwright install
npx playwright test
```

Depois, para analisar resultados:

```powershell
npx playwright show-report
```
