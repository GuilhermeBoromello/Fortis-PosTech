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

export default () => {
    const { transactions, loading, error, getTransactions, deleteTransaction } =
        useTransactions()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
    const [selectedTransaction, setSelectedTransaction] = useState<
        Transaction | undefined
    >(undefined)

    // Mapeamento de status para variante e label
    const statusConfig = {
        completed: { variant: "success" as const, label: "Concluída" },
        pending: { variant: "warning" as const, label: "Pendente" },
        failed: { variant: "danger" as const, label: "Falhou" },
    }

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

    const handleDelete = async (id: number) => {
        await deleteTransaction(id)
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
                    {transactions.map((transaction) => (
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
                                {new Date(transaction.date).toLocaleDateString(
                                    "pt-BR"
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        statusConfig[transaction.status].variant
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
                                        onClick={() => handleView(transaction)}
                                    >
                                        <Eye size={16} />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        title="Editar"
                                        onClick={() => handleEdit(transaction)}
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

                {!error && (
                    <p className="text-xs text-gray-400 mt-2">
                        Total de registros: {transactions.length}
                    </p>
                )}
            </div>
        </div>
    )
}
