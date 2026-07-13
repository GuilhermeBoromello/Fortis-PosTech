import React from "react"
import { Landmark } from "lucide-react"

export default function Header() {
    return (
        <header className="bg-primary flex px-6 py-3 w-full justify-between items-center min-h-12">
            <div className="flex gap-2 items-center">
                <Landmark size={36} color="#FFF" />
                <h1 className="font-bold text-white tracking-wide">Fortis</h1>
            </div>

            <input
                className="bg-background/15 p-2 rounded-sm flex-1 max-w-lg outline-0  border border-background/20 text-white placeholder:text-white/80"
                type="search"
                placeholder="Buscar transação por código, descrição..."
            />

            <div className="w-10 h-10 bg-background/15 rounded-full flex items-center justify-center border border-background/20">
                <p className="text-white text-lg">FI</p>
            </div>
        </header>
    )
}
