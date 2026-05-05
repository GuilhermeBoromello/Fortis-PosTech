// Interface Transação (id gerado automaticamente pelo json-server)
export interface Transaction {
  id: number
  type: 'deposit' | 'transfer'
  amount: number
  date: string
  description: string
  status: 'completed' | 'pending' | 'failed'
}