'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home,
  MessageCircle,
  ShoppingBag,
  ListChecks,
  CalendarDays,
  Menu,
  X,
  Code2,
  Rss,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { profile } from '@/lib/data'

const nav = [
  { href: '/', label: '首页', desc: '文章', icon: Home },
  { href: '/moments', label: '动态', desc: '碎碎念', icon: MessageCircle },
  { href: '/goods', label: '好物', desc: '分享', icon: ShoppingBag },
  { href: '/life', label: '生活管理', desc: '待办习惯', icon: ListChecks },
  { href: '/schedule', label: '课表', desc: '每周', icon: CalendarDays },
]

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-serif text-lg">
            片
          </span>
          <span className="font-serif text-lg">片刻</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg border border-border"
          aria-label="切换菜单"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-6 md:px-6 md:py-10">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-x-0 top-[57px] z-30 border-b border-border bg-sidebar px-4 pb-6 md:static md:inset-auto md:top-auto md:block md:w-60 md:shrink-0 md:border-0 md:bg-transparent md:px-0 md:pb-0',
            open ? 'block' : 'hidden',
          )}
        >
          <div className="md:sticky md:top-10 md:flex md:flex-col md:gap-8">
            <Link
              href="/"
              className="hidden items-center gap-3 md:flex"
              onClick={() => setOpen(false)}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-serif text-2xl shadow-sm">
                片
              </span>
              <div>
                <p className="font-serif text-xl leading-tight">片刻</p>
                <p className="text-xs text-muted-foreground">{profile.bio}</p>
              </div>
            </Link>

            <nav className="mt-4 flex flex-col gap-1 md:mt-0">
              {nav.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    <Icon className="size-4.5" />
                    <span className="font-medium">{item.label}</span>
                    <span
                      className={cn(
                        'ml-auto text-xs',
                        active
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground',
                      )}
                    >
                      {item.desc}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4 md:mt-0">
              <div className="flex items-center gap-3">
                <Image
                  src={profile.avatar || '/placeholder.svg'}
                  alt={profile.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{profile.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {profile.role}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="GitHub"
                >
                  <Code2 className="size-4" />
                </a>
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="RSS"
                >
                  <Rss className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
