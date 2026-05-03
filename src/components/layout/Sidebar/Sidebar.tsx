'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/transactions', label: 'Transações', icon: '💳' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-primary-dark flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-text-inverse">Fortis</h1>
        <p className="text-xs text-text-tertiary mt-1">Gestão Financeira</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-text-inverse'
                    : 'text-text-inverse/70 hover:bg-white/10 hover:text-text-inverse'
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
