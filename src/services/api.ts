import { Transaction } from '@/types/transaction'

const BASE_URL = 'http://localhost:3001'

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}/transactions`)
  if (!response.ok) throw new Error('Failed to fetch transactions')
  return response.json()
}

export async function addTransaction(
  transaction: Omit<Transaction, 'id'>
): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  })
  if (!response.ok) throw new Error('Failed to add transaction')
  return response.json()
}

export async function updateTransaction(
  id: string,
  transaction: Partial<Transaction>
): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  })
  if (!response.ok) throw new Error('Failed to update transaction')
  return response.json()
}

export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete transaction')
}
