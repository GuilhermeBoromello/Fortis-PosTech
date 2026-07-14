import { z } from "zod"

export const transactionSchema = z.object({
    description: z
        .string({ message: "Campo obrigatório!" })
        .min(1, "Descrição é obrigatória")
        .min(3, "Descrição deve ter no mínimo 3 caracteres")
        .max(100, "Descrição deve ter no máximo 100 caracteres"),

    amount: z.coerce
        .number({ message: "Campo obrigatório!" })
        .positive("O valor deve ser maior que zero")
        .max(999999.99, "Valor máximo excedido"),

    date: z
        .string("Campo obrigatório!")
        .min(1, "Data é obrigatória")
        .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
        .refine(
            (val) => new Date(val) <= new Date(),
            "A data não pode ser futura"
        ),

    type: z.enum(["deposit", "transfer", "withdrawal", "payment"]),

    status: z.enum(["completed", "pending", "failed"]),
    file: z.any().optional(),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
