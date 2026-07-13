"use client"
import React, { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge/Badge"
import { useTransactions } from "@/context/TransactionContext"
import TransactionModal from "@/components/ui/TransactionModal/TransactionModal"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Transaction } from "@/types/transaction"
import TransactionGrid from "@/components/transactions/TransactionGrid"

export default () => {
    const { transactions, loading, error, getTransactions, deleteTransaction } =
        useTransactions()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
    const [selectedTransaction, setSelectedTransaction] = useState<
        Transaction | undefined
    >(undefined)

    useEffect(() => {
        getTransactions()
    }, [getTransactions])

    const handleView = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        setModalMode("view")
        setIsModalOpen(true)
    }

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        setModalMode("edit")
        setIsModalOpen(true)
    }

    const handleDelete = async (transaction: Transaction) => {
        await deleteTransaction(transaction.id)
        getTransactions()
    }

    const handleOpenAdd = () => {
        setSelectedTransaction(undefined)
        setModalMode("add")
        setIsModalOpen(true)
    }

    const renderContent = () => {
        if (loading) return <p>Carregando últimas transações...</p>
        if (error) return <p>Erro ao carregar transações: {error}</p>

        return (
            <TransactionGrid
                transactions={transactions}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
            />
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <div className="flex items-center gap-4">
                    <h3>Minhas transações</h3>
                    <Button variant="default" onClick={handleOpenAdd}>
                        Adicionar
                    </Button>
                </div>

                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mode={modalMode}
                    transaction={selectedTransaction}
                />

                {renderContent()}
            </div>
        </div>
    )
}
