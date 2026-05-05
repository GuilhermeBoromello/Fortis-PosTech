"use client"

import React, { ReactElement, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { ArrowRight, Eye, EyeClosed, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge/Badge"
import { useTransactions } from "@/context/TransactionContext"
import TransactionModal from "@/components/ui/TransactionModal/TransactionModal"
import { Transaction } from "@/types/transaction"

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

    // Mapeamento de status para variante e label
    const statusConfig = {
        completed: { variant: "success" as const, label: "Concluída" },
        pending: { variant: "warning" as const, label: "Pendente" },
        failed: { variant: "danger" as const, label: "Falhou" },
    }

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

    const handleDelete = async (id: number) => {
        await deleteTransaction(id)
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
            <div className="overflow-auto">
                <Table>
                    <TableHeader className="bg-primary-dark">
                        <TableRow>
                            <TableHead className="text-text-inverse">
                                Descrição
                            </TableHead>
                            <TableHead className="text-text-inverse">
                                Tipo
                            </TableHead>
                            <TableHead className="text-text-inverse">
                                Valor
                            </TableHead>
                            <TableHead className="text-text-inverse">
                                Data
                            </TableHead>
                            <TableHead className="text-text-inverse">
                                Status
                            </TableHead>
                            <TableHead className="w-[120px] text-text-inverse">
                                Ações
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lastFive.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(transaction.amount)}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        transaction.date
                                    ).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            statusConfig[transaction.status]
                                                .variant
                                        }
                                    >
                                        {statusConfig[transaction.status].label}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="Visualizar detalhes"
                                            onClick={() =>
                                                handleView(transaction)
                                            }
                                        >
                                            <Eye size={16} />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="Editar"
                                            onClick={() =>
                                                handleEdit(transaction)
                                            }
                                        >
                                            <Pencil size={16} />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="Deletar"
                                            onClick={() =>
                                                handleDelete(transaction.id)
                                            }
                                        >
                                            <Trash2
                                                size={16}
                                                className="text-danger"
                                            />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <p className="text-xs text-gray-400 mt-2">
                    Total de registros: {lastFive.length}
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 flex-1 overflow-hidden">
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

            {/* TABELA */}
            <div className="space-y-2 overflow-auto">
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
