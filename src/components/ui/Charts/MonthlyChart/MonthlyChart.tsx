"use client"
import { Transaction } from "@/types/transaction"
import React, { useMemo } from "react"
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts"

interface ChartProps {
    transactions: Transaction[]
}

const MonthlyChart = ({ transactions }: ChartProps) => {
    const data = useMemo(() => {
        const grouped: Record<
            string,
            { name: string; entradas: number; saidas: number }
        > = {}

        transactions.forEach((t) => {
            const month = new Date(t.date).toLocaleDateString("pt-BR", {
                month: "short",
                year: "2-digit",
            })

            if (!grouped[month]) {
                grouped[month] = { name: month, entradas: 0, saidas: 0 }
            }

            if (t.type === "deposit") {
                grouped[month].entradas += t.amount
            } else {
                grouped[month].saidas += t.amount
            }
        })

        return Object.values(grouped)
    }, [transactions])

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-text-secondary">
                Distribuição por entrada/saída
            </p>
            <BarChart data={data} height={300} width={500}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                    formatter={(value: unknown) => {
                        const numValue = Number(value)
                        if (isNaN(numValue)) return "0"
                        return new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(numValue)
                    }}
                />
                <Legend />
                <Bar dataKey="entradas" fill="#2563EB" name="Entradas" />
                <Bar dataKey="saidas" fill="#1E3A5F" name="Saídas" />
            </BarChart>
        </div>
    )
}

export default MonthlyChart
