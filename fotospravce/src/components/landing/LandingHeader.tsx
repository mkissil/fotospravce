import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingHeader() {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-white/40 bg-[rgba(251,246,239,0.72)] backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] text-sm font-bold text-white shadow-[0_18px_40px_-24px_rgba(214,93,56,0.95)] sm:h-11 sm:w-11 sm:text-base">
            F
          </div>
          <div>
            <p className="truncate font-serif text-lg font-semibold sm:text-xl">
              Foto<span className="text-[var(--accent)]">Správce</span>
            </p>
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)] sm:block">
              studio os pro fotografy
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/login" className="rounded-full border border-white/70 bg-white/65 px-3 py-2 text-xs font-semibold text-[var(--text)]">
            Login
          </Link>
          <Link href="/register" className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-3 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_-22px_rgba(214,93,56,0.95)]">
            Start <ArrowRight size={13} />
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#problem" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
            Problém
          </a>
          <a href="#workflow" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
            Workflow
          </a>
          <a href="#offer" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
            Nabídka
          </a>
          <a href="#cenik" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
            Ceník
          </a>
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
            Přihlásit se
          </Link>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_22px_48px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5">
            Začít zdarma <ArrowRight size={15} />
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
