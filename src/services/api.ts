import { Transaction } from '@/types/transaction'

const BASE_URL = 'http://localhost:3001'

export async function getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${BASE_URL}/transactions`)
    if (!response.ok) throw new Error('Failed to fetch transactions')
    return response.json()
}

// Omit<Transaction, id> utilizado para ignorar o id - json-server gera automaticamente
export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  })
  if (!response.ok) throw new Error('Falha ao salvar transação')
  return response.json()
}

// Partial<Transation> - utilizado no update pois pode ser que nem todos os campos sejam alterados
// Trata todos os campos como opcionais
export async function updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
    })
    if (!response.ok) throw new Error('Falha ao atualizar transação')
    return response.json()
}

export async function deleteTransaction(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/transactions/${id}`, {method: 'DELETE'})
    if (!response.ok) throw new Error('Erro ao deletar transação')
}