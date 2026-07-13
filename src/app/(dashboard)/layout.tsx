// app/(dashboard)/layout.tsx
import Header from "@/components/layout/Header/Header"
import Sidebar from "@/components/layout/SideBar/Sidebar"
import { TransactionProvider } from "@/context/TransactionContext"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TransactionProvider>
            <div className="flex min-h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 h-screen overflow-hidden px-6 py-4 space-y-4">
                    <Header />
                    <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </TransactionProvider>
    )
}