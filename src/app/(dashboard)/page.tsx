"use client"

import React, { ReactElement, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeClosed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge/Badge"
import { useTransactions } from "@/context/TransactionContext"
import TransactionModal from "@/components/ui/TransactionModal/TransactionModal"
import { Transaction } from "@/types/transaction"
import TransactionGrid from "@/components/transactions/TransactionGrid"
import MonthlyChart from "@/components/ui/Charts/MonthlyChart/MonthlyChart"
import ExpenseByTypeChart from "@/components/ui/Charts/ExpenseByTypeChart/ExpenseByTypeChart"

export default function Home() {
    const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true)
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

    // últimos 5 registros
    const lastFive = transactions.slice(-5).reverse()
    // Saldo total (apenas transações do tipo depósito)
    const totalDeposits = transactions
        .filter((t) => t.type === "deposit")
        .reduce((acc, t) => acc + t.amount, 0)
    const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(totalDeposits)

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

    const renderContent = (): ReactElement => {
        if (loading) return <p>Carregando últimas transações...</p>
        if (error) return <p>Erro ao carregar transações: {error}</p>

        return (
            <TransactionGrid
                transactions={lastFive}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
            />
        )
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {/* CARD DO SALDO */}
            <div className="bg-primary-dark flex flex-col gap-8 rounded-md p-8 text-text-inverse">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Olá, FIAP!</h1>

                    <Link
                        href={"/transactions"}
                        className="flex items-center gap-2 text-xs underline"
                    >
                        Ver extrato
                        <ArrowRight size={16} className="text-text-inverse" />
                    </Link>
                </div>

                <div className="space-y-2">
                    {/* SALDO ATUAL + EYE ICON */}
                    <div className="flex items-center gap-4">
                        <p className="text-lg">Saldo atual</p>

                        {isBalanceVisible ? (
                            <Eye
                                size={24}
                                className="text-text-inverse hover:cursor-pointer"
                                onClick={() =>
                                    setIsBalanceVisible(!isBalanceVisible)
                                }
                            />
                        ) : (
                            <EyeClosed
                                size={24}
                                className="text-text-inverse hover:cursor-pointer"
                                onClick={() =>
                                    setIsBalanceVisible(!isBalanceVisible)
                                }
                            />
                        )}
                    </div>

                    {/* R$ SALDO DO BANCO */}
                    <div>
                        <h2 className="text-3xl">
                            {isBalanceVisible ? formattedTotal : "******"}
                        </h2>
                        <p className="text-xs">Rendendo 102% do CDI</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center gap-8">
                <MonthlyChart transactions={transactions} />

                <ExpenseByTypeChart transactions={transactions} />
            </div>

            {/* TABELA */}
            <div className="space-y-2 w-full">
                <div className="flex items-center gap-4">
                    <h3>Últimas transações</h3>
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
