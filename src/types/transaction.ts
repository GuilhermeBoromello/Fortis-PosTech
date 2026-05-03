export interface Transaction {
  id: string
  type: 'deposit' | 'transfer' | 'withdrawal' | 'payment'
  amount: number
  date: string
  description: string
  status: 'completed' | 'pending' | 'failed'
}
