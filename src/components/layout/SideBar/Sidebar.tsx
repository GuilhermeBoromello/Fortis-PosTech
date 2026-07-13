'use client'
import { HomeIcon, ListTodoIcon, DoorOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MenuOption {
    title: string
    icon: React.ElementType
    path: string
}

export default function Sidebar() {
    const menuOptions: MenuOption[] = [
        { title: "Início", icon: HomeIcon, path: "/" },
        { title: "Transações", icon: ListTodoIcon, path: "/transactions" },
    ]

    const pathname = usePathname()

    return (
        <nav className="bg-primary-dark px-2 py-6 flex flex-col justify-between items-center">
            <ul className="space-y-4">
                {menuOptions.map((item, index) => {
                    const isActive =
                        item.path === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.path)
                    const Icon = item.icon
                    return (
                        <li key={index}>
                            <Link
                                href={item.path}
                                title={item.title}
                                className={`relative flex items-center gap-3 px-3.5 py-2 cursor-pointer transition-colors duration-200 ${
                                    isActive
                                        ? "text-text-primary bg-primary/20"
                                        : "text-white/45 hover:bg-white/5 hover:text-white/75"
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-primary rounded-r-sm" />
                                )}
                                <Icon size={18} color="#FFF" />
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <Link href={"/login"}>
                <DoorOpen size={18} color="#FFF" />
            </Link>
        </nav>
    )
}
