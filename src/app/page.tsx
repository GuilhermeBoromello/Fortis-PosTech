// Dashboard principal
// Renderiza: resumo do saldo, cards de métricas (receitas, despesas, saldo),
// gráfico de transações recentes e atalhos para as principais ações

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-text-primary">
        Bem-vindo ao Fortis
      </h1>
      <p className="text-text-secondary mt-2">
        Seu painel de gestão financeira
      </p>
    </main>
  )
}
