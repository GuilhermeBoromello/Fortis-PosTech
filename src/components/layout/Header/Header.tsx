import Link from 'next/link'

export function Header() {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">Fortis</span>
        <span className="text-text-tertiary text-sm">Gestão Financeira</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm text-text-secondary hover:text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className="text-sm text-text-secondary hover:text-primary transition-colors"
        >
          Transações
        </Link>
      </nav>
    </header>
  )
}
