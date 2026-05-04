import React from 'react'
import { Landmark } from "lucide-react"
import { Input } from "@/components/ui/Input/Input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default () => {
    return (
        <div className="flex flex-1 p-4">
            <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                <div>
                    <h1 className="text-center text-4xl">
                        Bem-vindo(a) ao Fortis
                    </h1>
                    <p className="text-center text-sm">
                        Gerencie suas finanças com segurança e simplicidade
                    </p>
                </div>

                {/* Formulário */}
                <div className="flex flex-col gap-4 w-1/2">
                    <Input
                        label="Informe o seu CPF"
                        placeholder="Somente números"
                    />

                    <Button variant="default">
                        <Link href="/">Entrar</Link>
                    </Button>
                </div>
            </div>

            <div className="bg-primary-dark flex-1 flex flex-col gap-2 rounded-md items-center justify-center text-text-inverse">
                <div className="flex items-center gap-2">
                    <Landmark size={48} className="text-text-inverse" />
                    <span className="text-3xl">Fortis</span>
                </div>
                <p className="text-xl">Solidez que você pode confiar.</p>
            </div>
        </div>
    )
}