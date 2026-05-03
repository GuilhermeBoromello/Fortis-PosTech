import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/SideBar/Sidebar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fortis - Gestão Financeira",
  description: "Sistema de gestão de transações financeiras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background text-text-primary flex`}>
        <Sidebar />

        <main>{children}</main>
      </body>
    </html>
  );
}
