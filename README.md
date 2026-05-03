# Fortis - Gestão Financeira

Sistema de gestão de transações financeiras construído com Next.js 14, TypeScript, Tailwind CSS e shadcn/ui.

## Tecnologias

- **Next.js 14** com App Router e TypeScript
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes de UI
- **Storybook** para documentação de componentes
- **json-server** como API REST mock

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
npm install
```

## Como rodar o projeto

### Desenvolvimento (Next.js + json-server simultaneamente)

```bash
npm run dev:full
```

Isso inicia:
- Next.js em http://localhost:3000
- json-server em http://localhost:3001

### Apenas o Next.js

```bash
npm run dev
```

### Apenas o json-server (API mock)

```bash
npm run server
```

A API ficará disponível em http://localhost:3001/transactions

### Storybook

```bash
npm run storybook
```

O Storybook ficará disponível em http://localhost:6006

## Estrutura do projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx          # Layout raiz com fonte Inter
│   ├── page.tsx            # Dashboard principal
│   ├── transactions/       # Página de transações
│   └── globals.css         # Estilos globais
├── components/
│   ├── ui/                 # Componentes de UI reutilizáveis
│   │   ├── Button/         # Botão com variantes e stories
│   │   ├── Badge/          # Badge de status com stories
│   │   └── Input/          # Input com label e validação
│   └── layout/             # Componentes de layout
│       ├── Header/         # Header com navegação
│       └── Sidebar/        # Sidebar com menu lateral
├── context/
│   └── TransactionContext.tsx  # Context API para transações
├── types/
│   └── transaction.ts      # Interface Transaction
├── services/
│   └── api.ts              # Funções de API tipadas
└── data/
    └── transactions.json   # Dados mock para json-server
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o Next.js em modo desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run server` | Inicia o json-server na porta 3001 |
| `npm run dev:full` | Inicia Next.js e json-server simultaneamente |
| `npm run storybook` | Inicia o Storybook na porta 6006 |
| `npm run build-storybook` | Gera o build do Storybook |

## API Endpoints (json-server)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /transactions | Lista todas as transações |
| GET | /transactions/:id | Busca uma transação por ID |
| POST | /transactions | Cria uma nova transação |
| PATCH | /transactions/:id | Atualiza uma transação |
| DELETE | /transactions/:id | Remove uma transação |
