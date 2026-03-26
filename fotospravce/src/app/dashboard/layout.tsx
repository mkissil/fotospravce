'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Providers from '@/components/Providers';
import {
  LayoutDashboard, Users, Briefcase, Calendar, FileText, FileSignature,
  Image, BarChart3, Settings, LogOut, Menu, X,
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

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = session?.user?.name?.[0]?.toUpperCase() || 'F';

  const NavContent = ({ onNav }: { onNav?: () => void }) => (
    <>
      <div className="flex h-16 items-center px-5 border-b border-[var(--border)]">
        <Link href="/dashboard" className="text-lg font-bold font-serif" onClick={onNav}>
          Foto<span className="text-[var(--accent)]">Správce</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={onNav}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                active
                  ? 'bg-white text-[var(--accent)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-white/50 hover:text-[var(--text)]'
              }`}>
              <item.icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--border)] p-3 space-y-0.5">
        <Link href="/dashboard/nastaveni" onClick={onNav}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
            pathname.startsWith('/dashboard/nastaveni')
              ? 'bg-white text-[var(--accent)] shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-white/50'
          }`}>
          <Settings size={17} /> Nastavení
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--danger-light)] hover:text-[var(--danger)] transition-all">
          <LogOut size={17} /> Odhlásit se
        </button>
      </div>
      <div className="border-t border-[var(--border)] p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{initial}</div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[var(--text)] truncate">{session?.user?.name || 'Fotograf'}</p>
            <p className="text-[11px] text-[var(--text-muted)] truncate">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border)] fixed h-screen">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-white/80 backdrop-blur-lg px-4">
        <button onClick={() => setMobileOpen(true)} className="text-[var(--text-secondary)]"><Menu size={22} /></button>
        <span className="text-base font-bold font-serif">Foto<span className="text-[var(--accent)]">Správce</span></span>
        <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">{initial}</div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside className="lg:hidden fixed left-0 top-0 z-50 h-screen w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col"
              initial={{ x: -264 }} animate={{ x: 0 }} exit={{ x: -264 }} transition={{ type: 'tween', duration: 0.25 }}>
              <NavContent onNav={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
        <div className="mx-auto max-w-[1200px] p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Providers><Shell>{children}</Shell></Providers>;
}
