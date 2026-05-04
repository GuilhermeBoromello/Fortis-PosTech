import React from "react"
import { Landmark } from "lucide-react"

export default function Header() {
    return (
        <header className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Landmark size={24} color="#000" />
                <h1 className="text-lg">Fortis</h1>
            </div>

            <p className="text-xs">01/01/2026</p>
        </header>
    )
}
