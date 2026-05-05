'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Transaction } from '@/types/transaction'
import * as api from '@/services/api'

// Criação com os estados para controlar o loading e possiveis erros ao realizar as operações
interface TransactionContextType {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  getTransactions: () => Promise<void>
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>
  updateTransaction: (id: number, transaction: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getTransactions = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getTransactions()
      setTransactions(data)
    } catch (err) {
      setError('Erro ao carregar transações')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    setLoading(true)
    setError(null)
    try {
      const newTransaction = await api.addTransaction(transaction)
      setTransactions((prev) => [...prev, newTransaction])
    } catch (err) {
      setError('Erro ao adicionar transação')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateTransaction = useCallback(
    async (id: number, transaction: Partial<Transaction>) => {
      setLoading(true)
      setError(null)
      try {
        const updated = await api.updateTransaction(id, transaction)
        setTransactions((prev) =>
          prev.map((t) => (t.id === id ? updated : t))
        )
      } catch (err) {
        setError('Erro ao atualizar transação')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const deleteTransaction = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await api.deleteTransaction(id)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError('Erro ao deletar transação')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        getTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions deve ser utilizado dentro de um TransactionProvider')
  }
  return context
}
