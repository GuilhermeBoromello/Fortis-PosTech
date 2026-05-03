// Página de transações
// Renderiza: tabela completa de transações com colunas (data, descrição, tipo, valor, status),
// filtros por tipo e status, botão para adicionar nova transação (abre Dialog),
// paginação e busca por descrição

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-text-primary">Transações</h1>
      <p className="text-text-secondary mt-2">
        Gerencie todas as suas transações financeiras
      </p>
    </main>
  )
}
