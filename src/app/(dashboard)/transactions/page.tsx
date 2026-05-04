import React from "react"
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

export default () => {
    // Mapeamento de status para variante e label
    const statusConfig = {
        completed: { variant: "success" as const, label: "Concluída" },
        pending: { variant: "warning" as const, label: "Pendente" },
        failed: { variant: "danger" as const, label: "Falhou" },
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-2">
                <div className="flex items-center gap-4">
                    <h3>Minhas transações</h3>
                    <Button variant="default">Adicionar</Button>
                </div>

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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {transactions.map((transaction) => ( */}
                        <TableRow key={"transaction.id"}>
                            <TableCell>{"transaction.description"}</TableCell>
                            <TableCell>{"transaction.type"}</TableCell>
                            <TableCell>
                                {/* {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(transaction.amount)} */}
                                R$ 1.000,99
                            </TableCell>
                            <TableCell>
                                {/* {new Date(
                                        transaction.date
                                    ).toLocaleDateString("pt-BR")} */}
                                01/01/2026
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={statusConfig["completed"].variant}
                                >
                                    {statusConfig["completed"].label}
                                </Badge>
                            </TableCell>
                        </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>

                <p className="text-xs text-gray-400 mt-2">
                    {/* Total de registros: {transactions.length} */}
                    Total de registros: 5
                </p>
            </div>
        </div>
    )
}
