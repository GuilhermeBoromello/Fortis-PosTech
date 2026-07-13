// Interface Transação (id gerado automaticamente pelo json-server)

export type StatusType = "completed" | "pending" | "failed"
export type TransferType = "deposit" | "transfer" | "withdrawal" | "payment"

export interface Transaction {
    id: number
    type: TransferType
    amount: number
    date: string
    description: string
    status: StatusType
}