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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    type TransactionFormData,
    transactionSchema,
} from "@/schemas/transaction.schema"
import type { Resolver } from "react-hook-form"

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<TransactionFormData>({
        resolver: zodResolver(
            transactionSchema
        ) as Resolver<TransactionFormData>,
    })

    const typeValue = watch("type")
    const statusValue = watch("status")

    // Preenche os campos quando for editar ou visualizar
    useEffect(() => {
        if (transaction) {
            const { id, ...fields } = transaction
            reset(fields)
            setValue("type", transaction.type)
            setValue("status", transaction.status)
        } else {
            reset()
        }
    }, [transaction, isOpen, reset, setValue])

    const isDisabled = mode === "view"

    const titles = {
        add: "Nova transação",
        edit: "Editar transação",
        view: "Detalhes da transação",
    }

    const onSubmit = async (fields: TransactionFormData) => {
        const { file, ...transactionData } = fields

        if (mode === "add") {
            await addTransaction(transactionData as Omit<Transaction, "id">)
        }

        if (mode === "edit" && transaction) {
            await updateTransaction(
                transaction.id,
                transactionData as Partial<Transaction>
            )
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
                            disabled={isDisabled}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-xs text-danger">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Valor (R$)
                        </label>
                        <Input
                            type="number"
                            placeholder="0,00"
                            disabled={isDisabled}
                            {...register("amount")}
                        />
                        {errors.amount && (
                            <p className="text-xs text-danger">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Data</label>
                        <Input
                            type="date"
                            disabled={isDisabled}
                            {...register("date")}
                        />
                        {errors.date && (
                            <p className="text-xs text-danger">
                                {errors.date.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Tipo</label>
                        <select
                            {...register("type")}
                            value={typeValue}
                            disabled={isDisabled}
                            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Selecione um tipo
                            </option>
                            <option value="deposit">Depósito</option>
                            <option value="transfer">Transferência</option>
                            <option value="withdrawal">Saque</option>
                            <option value="payment">Pagamento</option>
                        </select>
                        {errors.type && (
                            <p className="text-xs text-danger">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Status</label>
                        <select
                            {...register("status")}
                            value={statusValue}
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
                        {errors.status && (
                            <p className="text-xs text-danger">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="anexo" className="text-sm font-medium">
                            Recibo / Anexo
                        </label>
                        <input
                            id="anexo"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            disabled={isDisabled}
                            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("file")}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {mode === "view" ? "Fechar" : "Cancelar"}
                    </Button>
                    {mode !== "view" && (
                        <Button
                            variant="default"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Salvar
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
