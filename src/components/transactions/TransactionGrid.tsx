import React, { useCallback, useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import {
    AllCommunityModule,
    ModuleRegistry,
    type ColDef,
    type ICellRendererParams,
    type RowSelectionOptions,
    type SelectionChangedEvent,
    type SelectionColumnDef,
} from "ag-grid-community"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, EyeClosed, Pencil, Trash2 } from "lucide-react"
import { StatusType, Transaction, TransferType } from "@/types/transaction"
import transactions from "@/data/transactions.json"

type HandleFunction = (transaction: Transaction) => void

interface TransactionGridProps {
    transactions: Transaction[]
    onView: HandleFunction
    onEdit: HandleFunction
    onDelete: HandleFunction
}

const STATUS_BADGE: Record<StatusType, { label: string; className: string }> = {
    completed: {
        label: "Concluído",
        className: "text-success bg-success-light border-success/25",
    },
    failed: {
        label: "Falhou",
        className: "text-danger bg-danger-light border-danger/25",
    },
    pending: {
        label: "Pendente",
        className: "text-warning bg-warning-light border-warning/25",
    },
}

const TYPE_BADGE: Record<TransferType, { label: string; className: string }> = {
    deposit: {
        label: "Depósito",
        className: "text-success bg-success-light border-success/25",
    },
    transfer: {
        label: "Transferência",
        className: "text-danger bg-danger-light border-danger/25",
    },
}

const statusCell = ({
    value,
}: ICellRendererParams<Transaction, StatusType>) => {
    if (!value) return null
    const { label, className } = STATUS_BADGE[value]
    return (
        <div className="flex h-full items-center">
            <span
                className={`rounded-lg border px-2 py-0.5 text-xs ${className}`}
            >
                {label}
            </span>
        </div>
    )
}

const typeCell = ({
    value,
}: ICellRendererParams<Transaction, TransferType>) => {
    if (!value) return null
    const { label, className } = TYPE_BADGE[value]
    return (
        <div className="flex h-full items-center">
            <span
                className={`rounded-lg border px-2 py-0.5 text-xs ${className}`}
            >
                {label}
            </span>
        </div>
    )
}

const TransactionGrid = ({
    transactions,
    onView,
    onEdit,
    onDelete,
}: TransactionGridProps) => {
    function formatDate(isoDate: string): string {
        const [year, month, day] = isoDate.slice(0, 10).split("-")
        return `${day}/${month}/${year}`
    }

    const columnDefs = useMemo<ColDef<Transaction>[]>(
        () => [
            {
                field: "id",
                headerName: "Código",
                width: 90,
                resizable: false,
            },
            {
                field: "description",
                headerName: "Descrição",
                flex: 1,
                minWidth: 220,
            },
            {
                field: "type",
                headerName: "Tipo",
                width: 120,
                cellRenderer: typeCell,
            },
            {
                field: "status",
                headerName: "Status",
                width: 120,
                cellRenderer: statusCell,
            },
            {
                field: "date",
                headerName: "Data",
                width: 110,
                valueFormatter: ({ value }) => (value ? formatDate(value) : ""),
            },
            {
                field: "amount",
                headerName: "Valor Total (R$)",
                width: 160,
                valueFormatter: ({ value }) =>
                    value
                        ? new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                          }).format(value)
                        : "",
            },
            {
                colId: "acoes",
                headerName: "Ações",
                width: 160,
                resizable: false,
                sortable: false,
                cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
                    data ? (
                        <div className="flex h-full items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Visualizar detalhes"
                                onClick={() => onView(data)}
                            >
                                <Eye size={16} />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                title="Editar"
                                onClick={() => onEdit(data)}
                            >
                                <Pencil size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Deletar"
                                onClick={() => onDelete(data)}
                            >
                                <Trash2 size={16} className="text-danger" />
                            </Button>
                        </div>
                    ) : null,
            },
        ],
        [onView, onEdit]
    )

    const defaultColDef = useMemo<ColDef<Transaction>>(
        () => ({
            sortable: true,
            resizable: true,
        }),
        []
    )

    return (
        <div className="ag-theme-alpine w-full">
            <AgGridReact<Transaction>
                theme="legacy"
                rowData={transactions}
                getRowId={({ data }) => String(data.id)}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
                suppressMovableColumns
                domLayout="autoHeight"
            />
        </div>
    )
}

export default TransactionGrid
