'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SignOutButton } from '@/components/admin/sign-out-button'
import {
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  FileText,
  Settings,
  Leaf,
  ExternalLink,
} from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="flex w-full flex-col gap-1 border-b border-border bg-card p-4 md:h-svh md:w-64 md:border-b-0 md:border-r">
      <Link href="/admin" className="mb-4 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Leaf className="h-5 w-5 text-primary" />
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Admin Panel</span>
          <span className="text-xs text-muted-foreground">Garlic Export Co.</span>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          View website
        </Link>
        <div className="truncate px-3 py-1 text-xs text-muted-foreground">
          {email}
        </div>
        <SignOutButton />
      </div>
    </aside>
  )
}
