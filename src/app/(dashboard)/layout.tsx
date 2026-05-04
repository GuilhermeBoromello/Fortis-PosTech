// app/(dashboard)/layout.tsx
import Header from "@/components/layout/Header/Header"
import Sidebar from "@/components/layout/SideBar/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 px-6 py-4 space-y-4">
                    <Header />
                    {children}
                </main>
            </div>
        </div>
    )
}

{/* <body
    className={`${inter.className} bg-background text-text-primary flex max-w-dvw max-h-dvh`}
>
    <Sidebar />

    <div className="flex-1 flex flex-col px-6 py-4 space-y-4">
        <Header />
        <main className="flex-1">{children}</main>
    </div>
</body> */}
