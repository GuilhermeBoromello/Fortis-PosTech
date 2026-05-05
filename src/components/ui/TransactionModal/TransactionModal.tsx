"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTransactions } from "@/context/TransactionContext"
import { Transaction } from "@/types/transaction"

type ModalMode = "add" | "edit" | "view"

interface TransactionModalProps {
    isOpen: boolean
    onClose: () => void
    mode: ModalMode
    transaction?: Transaction
}

export default function TransactionModal({
    isOpen,
    onClose,
    mode,
    transaction,
}: TransactionModalProps) {
    const { addTransaction, updateTransaction } = useTransactions()

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")

    // Preenche os campos quando for editar ou visualizar
    useEffect(() => {
        if (transaction) {
            setDescription(transaction.description)
            setAmount(String(transaction.amount))
            setDate(transaction.date.split("T")[0]) // formata para yyyy-mm-dd
            setType(transaction.type)
            setStatus(transaction.status)
        } else {
            setDescription("")
            setAmount("")
            setDate("")
            setType("")
            setStatus("")
        }
    }, [transaction, isOpen])

    const isDisabled = mode === "view"

    const titles = {
        add: "Nova transação",
        edit: "Editar transação",
        view: "Detalhes da transação",
    }

    const handleSubmit = async () => {
        if (mode === "add") {
            await addTransaction({
                description,
                amount: parseFloat(amount),
                date,
                type: type as Transaction["type"],
                status: status as Transaction["status"],
            })
        }

        if (mode === "edit" && transaction) {
            await updateTransaction(transaction.id, {
                description,
                amount: parseFloat(amount),
                date,
                type: type as Transaction["type"],
                status: status as Transaction["status"],
            })
        }

        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/60" />
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{titles[mode]}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Descrição</label>
                        <Input
                            placeholder="Descrição da transação"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Valor (R$)
                        </label>
                        <Input
                            type="number"
                            placeholder="0,00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Data</label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={isDisabled}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Tipo</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={isDisabled}
                            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Selecione um tipo
                            </option>
                            <option value="deposit">Depósito</option>
                            <option value="transfer">Transferência</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled={isDisabled}
                            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Selecione um status
                            </option>
                            <option value="completed">Concluída</option>
                            <option value="pending">Pendente</option>
                            <option value="failed">Falhou</option>
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {mode === "view" ? "Fechar" : "Cancelar"}
                    </Button>
                    {mode !== "view" && (
                        <Button variant="default" onClick={handleSubmit}>
                            Salvar
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
