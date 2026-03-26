'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Providers from '@/components/Providers';
import {
  BarChart3,
  Briefcase,
  Calendar,
  FileSignature,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Přehled', icon: LayoutDashboard },
  { href: '/dashboard/klienti', label: 'Klienti', icon: Users },
  { href: '/dashboard/zakazky', label: 'Zakázky', icon: Briefcase },
  { href: '/dashboard/kalendar', label: 'Kalendář', icon: Calendar },
  { href: '/dashboard/faktury', label: 'Faktury', icon: FileText },
  { href: '/dashboard/smlouvy', label: 'Smlouvy', icon: FileSignature },
  { href: '/dashboard/galerie', label: 'Galerie', icon: Image },
  { href: '/dashboard/statistiky', label: 'Statistiky', icon: BarChart3 },
];

interface DashboardNavContentProps {
  email?: string | null;
  initial: string;
  onNav?: () => void;
  pathname: string;
}

function DashboardNavContent({ email, initial, onNav, pathname }: DashboardNavContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-5">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={onNav}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff956d)] text-base font-bold text-white shadow-[0_18px_38px_-24px_rgba(214,93,56,0.95)]">
            F
          </div>
          <div>
            <p className="font-serif text-xl font-semibold text-white">Foto<span className="text-[var(--accent)]">Správce</span></p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Studio OS</p>
          </div>
        </Link>
      </div>

      <div className="dashboard-divider mx-5" />

      <nav className="flex-1 space-y-1 px-3 py-5">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={`group flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-medium transition-all ${
                active ? 'bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_32px_-24px_rgba(0,0,0,0.7)]' : 'text-white/66 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${active ? 'bg-white/12 text-white' : 'bg-transparent text-white/66 group-hover:bg-white/8 group-hover:text-white'}`}>
                <item.icon size={18} strokeWidth={active ? 2.2 : 1.85} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 p-3">
        <Link href="/dashboard/nastaveni" onClick={onNav} className={`flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-medium transition-all ${pathname.startsWith('/dashboard/nastaveni') ? 'bg-white/12 text-white' : 'text-white/66 hover:bg-white/8 hover:text-white'}`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8">
            <Settings size={18} />
          </span>
          Nastavení
        </Link>

        <div className="rounded-[28px] border border-white/10 bg-white/8 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff956d)] text-sm font-bold text-white">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{email ? email.split('@')[0] : 'Fotograf'}</p>
              <p className="truncate text-xs text-white/50">{email}</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/72 hover:bg-white/12 hover:text-white">
            <LogOut size={16} />
            Odhlásit se
          </button>
        </div>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = session?.user?.name?.[0]?.toUpperCase() || 'F';
  const activeItem = nav.find((item) => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) ?? nav[0];

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-4 left-4 z-30 hidden w-[292px] lg:block">
        <div className="surface-panel-dark h-full rounded-[34px]">
          <DashboardNavContent email={session?.user?.email} initial={initial} pathname={pathname} />
        </div>
      </aside>

      <div className="fixed left-3 right-3 top-3 z-40 lg:hidden">
        <div className="surface-panel flex items-center justify-between rounded-[22px] px-3 py-3">
          <button onClick={() => setMobileOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-[var(--text)]">
            <Menu size={22} />
          </button>
          <div className="text-center">
            <p className="font-serif text-lg font-semibold text-[var(--text)]">Foto<span className="text-[var(--accent)]">Správce</span></p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{activeItem.label}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff956d)] text-sm font-bold text-white">
            {initial}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-[rgba(12,10,9,0.42)] backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside className="fixed inset-y-3 left-3 z-50 w-[286px] rounded-[32px] lg:hidden" initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'tween', duration: 0.25 }}>
              <div className="surface-panel-dark relative h-full rounded-[32px]">
                <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <X size={18} />
                </button>
                <DashboardNavContent email={session?.user?.email} initial={initial} onNav={() => setMobileOpen(false)} pathname={pathname} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="px-3 pb-8 pt-24 sm:px-4 lg:ml-[316px] lg:px-8 lg:pt-4">
        <div className="mx-auto max-w-[1360px]">
          <div className="surface-panel sticky top-[5.25rem] z-20 mb-5 rounded-[24px] px-4 py-4 sm:top-4 sm:mb-6 sm:rounded-[30px] sm:px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  {activeItem.href === '/dashboard' ? 'Studio heartbeat' : 'Workspace'}
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[var(--text)]">{activeItem.label}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full bg-[var(--accent-bg)] px-4 py-2 text-xs font-semibold text-[var(--accent)] sm:inline-flex">
                  <Sparkles size={14} />
                  klient · zakázka · faktura · galerie
                </div>
                <div className="rounded-full border border-white/70 bg-white/68 px-3 py-2 text-xs text-[var(--text-secondary)] sm:px-4 sm:text-sm">
                  {session?.user?.email || 'studio@foto.cz'}
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Shell>{children}</Shell>
    </Providers>
  );
}
