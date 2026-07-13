'use client'
import { Transaction } from "@/types/transaction"
import React, { useMemo } from "react"
import {
    Legend,
    Pie,
    PieChart,
    PieLabelRenderProps,
    Tooltip,
    Cell
} from "recharts"

interface ExpenseTypeChartProps {
    transactions: Transaction[]
}

const COLORS = ["#1E3A5F", "#2563EB", "#D97706", "#DC2626"]

const typeLabels: Record<string, string> = {
    deposit: "Depósito",
    transfer: "Transferência",
    withdrawal: "Saque",
    payment: "Pagamento",
}

const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180
    const cxNum = Number(cx)
    const cyNum = Number(cy)
    const innerNum = Number(innerRadius)
    const outerNum = Number(outerRadius)
    const percentNum = Number(percent)

    const radius = innerNum + (outerNum - innerNum) * 0.5
    const x = cxNum + radius * Math.cos(-Number(midAngle) * RADIAN)
    const y = cyNum + radius * Math.sin(-Number(midAngle) * RADIAN)

    if (percentNum < 0.05) return null

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={500}
        >
            {`${(percentNum * 100).toFixed(0)}%`}
        </text>
    )
}

const ExpenseByTypeChart = ({ transactions }: ExpenseTypeChartProps) => {
    const data = useMemo(() => {
        const grouped: Record<string, number> = {}

        transactions.forEach((t) => {
            const label = typeLabels[t.type] ?? t.type // ← usa o typeLabels
            if (!grouped[label]) grouped[label] = 0
            grouped[label] += t.amount
        })

        return Object.entries(grouped).map(([name, value]) => ({ name, value }))
    }, [transactions])

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-text-secondary">
                Distribuição por tipo
            </p>
            <PieChart height={300} width={500}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
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
            </PieChart>
        </div>
    )
}

export default ExpenseByTypeChart