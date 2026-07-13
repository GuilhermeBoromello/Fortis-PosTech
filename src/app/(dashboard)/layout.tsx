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
            {/* <div className="flex flex-col min-h-screen overflow-hidden"> */}
            <div className="flex flex-col h-screen">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />

                    <main className="w-full overflow-y-auto py-4 px-8">
                        {children}
                    </main>
                </div>
            </div>
        </TransactionProvider>
    )
}