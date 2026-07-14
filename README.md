# Fortis — Gestão Financeira

Sistema de gestão de transações financeiras desenvolvido como Tech Challenge Fase 2 da Pós-Tech Front-End Engineering (FIAP).

🔗 **Deploy:** [https://fortis-pos-tech.vercel.app](https://fortis-pos-tech.vercel.app)  
📦 **Repositório:** [https://github.com/GuilhermeBoromello/Fortis-PosTech](https://github.com/GuilhermeBoromello/Fortis-PosTech)

---

## Tecnologias

- **Next.js 14** com App Router e TypeScript
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes de UI
- **AG Grid** para listagem de transações com paginação e filtros
- **Recharts** para gráficos e análises financeiras
- **React Hook Form + Zod** para validação avançada de formulários
- **Storybook** para documentação de componentes
- **json-server** como API REST mock
- **Docker + Docker Compose** para containerização
- **Vercel** para deploy em cloud
- **Railway** para hospedagem da API mock

---

## Funcionalidades

### Home
- Exibição do saldo atual com toggle de visibilidade
- Gráfico de barras — entradas e saídas por mês
- Gráfico de pizza — distribuição por tipo de transação
- Listagem das últimas 5 transações

### Transações
- Listagem completa com paginação (AG Grid)
- Filtro e busca em tempo real via header
- Adicionar nova transação com validação avançada
- Editar transação existente
- Visualizar detalhes da transação
- Deletar transação
- Upload de recibo/anexo (demonstrativo — em produção seria enviado para Vercel Blob)

### Segurança
- Autenticação por CPF com sessão via cookie
- Rotas protegidas com redirecionamento automático para login
- Logout com limpeza de sessão
- Variáveis de ambiente para URLs sensíveis
- HTTPS via Vercel
- Rede interna Docker isolando a API

---

## Pré-requisitos

- Node.js 18+
- npm
- Docker e Docker Compose (para rodar com containers)

---

## Instalação

```bash
git clone https://github.com/GuilhermeBoromello/Fortis-PosTech.git
cd Fortis-PosTech
npm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
API_URL=http://localhost:3001
```

Consulte o `.env.example` para referência.

---

## Como rodar

### Desenvolvimento local

```bash
# Terminal 1 — API mock
npm run server

# Terminal 2 — Next.js
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Desenvolvimento completo (Next.js + json-server simultaneamente)

```bash
npm run dev:full
```

### Storybook

```bash
npm run storybook
```

Acesse: [http://localhost:6006](http://localhost:6006)

---

## Como rodar com Docker

```bash
docker compose up --build
```

Isso inicia:
- **Next.js** em [http://localhost:3000](http://localhost:3000)
- **json-server** na rede interna Docker (não exposto externamente)

Para parar:

```bash
docker compose down
```

### Variáveis de ambiente Docker

Crie um arquivo `.env.docker` na raiz do projeto:

```
API_URL=http://api:3001
```

---

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o Next.js em modo desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run server` | Inicia o json-server na porta 3001 |
| `npm run dev:full` | Inicia Next.js e json-server simultaneamente |
| `npm run storybook` | Inicia o Storybook na porta 6006 |

---

## API Endpoints (json-server)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /transactions | Lista todas as transações |
| GET | /transactions/:id | Busca uma transação por ID |
| POST | /transactions | Cria uma nova transação |
| PATCH | /transactions/:id | Atualiza uma transação |
| DELETE | /transactions/:id | Remove uma transação |

API mock hospedada em: [https://fortis-postech-production.up.railway.app](https://fortis-postech-production.up.railway.app)

---

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx                    # Layout raiz
│   ├── globals.css                   # Estilos globais
│   ├── (auth)/
│   │   └── login/                    # Tela de login
│   └── (dashboard)/
│       ├── layout.tsx                # Layout com Header e Sidebar
│       ├── page.tsx                  # Home — saldo e gráficos
│       └── transactions/             # Listagem de transações
├── components/
│   ├── ui/                           # Componentes de UI reutilizáveis
│   │   ├── Badge/                    # Badge de status
│   │   ├── Button/                   # Botão com variantes
│   │   ├── Input/                    # Input com label e validação
│   │   ├── Charts/                   # Gráficos com Recharts
│   │   │   ├── MonthlyChart/         # Gráfico de barras mensal
│   │   │   └── ExpenseByTypeChart/   # Gráfico de pizza por tipo
│   │   └── TransactionModal/         # Modal de adicionar/editar/visualizar
│   └── layout/
│       ├── Header/                   # Header com busca e avatar
│       └── Sidebar/                  # Sidebar com navegação
├── context/
│   └── TransactionContext.tsx        # Context API para transações
├── schemas/
│   └── transaction.schema.ts         # Schema Zod para validação
├── services/
│   └── api.ts                        # Funções de API tipadas
├── types/
│   └── transaction.ts                # Interface Transaction
└── data/
    └── transactions.json             # Dados mock para json-server
```

---

## Arquitetura de Microfrontend

A arquitetura de microfrontend foi planejada utilizando **Single SPA** e **Module Federation do Next.js**, com o objetivo de dividir a aplicação em módulos independentes:

```
Root Config (orquestrador)
  ├── fortis-shell      → Header, Sidebar e autenticação
  └── fortis-transactions → Módulo de transações independente
```

Durante o desenvolvimento foram encontrados problemas de compatibilidade entre as versões mais recentes do Node.js e os pacotes do Single SPA (`webpack-config-single-spa`) e do Module Federation (`@module-federation/nextjs-mf`) com Next.js 14, o que impediu a implementação completa no prazo da entrega.

A arquitetura planejada e os conceitos aplicados estão documentados acima como referência para implementação futura.

---

## Deploy

- **Frontend:** [https://fortis-pos-tech.vercel.app](https://fortis-pos-tech.vercel.app)
- **API mock:** [https://fortis-postech-production.up.railway.app](https://fortis-postech-production.up.railway.app)
