'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { AlertCircle, ArrowRight, Camera, CreditCard, FileText, Sparkles, TrendingUp, Users } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';
import { formatDate, formatMoney, JOB_STATUSES } from '@/lib/utils';

interface Props {
  userName: string;
  greeting: string;
  today: string;
  stats: {
    monthJobsCount: number;
    monthRevenue: number;
    unpaidCount: number;
    unpaidTotal: number;
    clientCount: number;
  };
  upcomingJobs: {
    id: string;
    title: string;
    clientName: string;
    type: string;
    shootDate: string | null;
    status: string;
    location: string | null;
  }[];
  recentJobs: {
    id: string;
    title: string;
    clientName: string;
    status: string;
    createdAt: string;
  }[];
}

type StatCard = {
  key: keyof Props['stats'];
  label: string;
  helper: string;
  icon: LucideIcon;
  tone: string;
  isMoney?: boolean;
  danger?: boolean;
};

const statCards: StatCard[] = [
  {
    key: 'monthJobsCount',
    label: 'Zakázky tento měsíc',
    helper: 'co právě hýbe studiem',
    icon: Camera,
    tone: 'bg-[var(--accent-bg)] text-[var(--accent)]',
  },
  {
    key: 'monthRevenue',
    label: 'Příjem tohoto měsíce',
    helper: 'rychlý finanční puls',
    icon: TrendingUp,
    tone: 'bg-[var(--success-light)] text-[var(--success)]',
    isMoney: true,
  },
  {
    key: 'unpaidCount',
    label: 'Neuhrazené faktury',
    helper: 'co potřebuje pozornost',
    icon: AlertCircle,
    tone: 'bg-[var(--danger-light)] text-[var(--danger)]',
    danger: true,
  },
  {
    key: 'clientCount',
    label: 'Klienti v databázi',
    helper: 'kontakty, které máš po ruce',
    icon: Users,
    tone: 'bg-[var(--purple-light)] text-[var(--purple)]',
  },
] as const;

export default function DashboardClient({ userName, greeting, today, stats, upcomingJobs, recentJobs }: Props) {
  const heroSignals = [
    {
      label: 'Zakázky v pohybu',
      value: `${stats.monthJobsCount}`,
      icon: Camera,
      tone: 'bg-[var(--accent-bg)] text-[var(--accent)]',
    },
    {
      label: 'Čeká na úhradu',
      value: stats.unpaidCount > 0 ? formatMoney(stats.unpaidTotal) : '0 Kč',
      icon: CreditCard,
      tone:
        stats.unpaidCount > 0
          ? 'bg-[var(--danger-light)] text-[var(--danger)]'
          : 'bg-[var(--success-light)] text-[var(--success)]',
    },
    {
      label: 'Aktivní kontakty',
      value: `${stats.clientCount}`,
      icon: Users,
      tone: 'bg-[var(--purple-light)] text-[var(--purple)]',
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-7">
      <motion.section variants={staggerItem} className="surface-panel-strong relative overflow-hidden rounded-[28px] p-5 sm:rounded-[34px] sm:p-8">
        <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[var(--purple)]/8 blur-3xl" />
        <div className="relative grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="section-kicker">
              <span className="eyebrow-line" />
              Studio heartbeat
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:mt-6 sm:text-5xl">
              {greeting}, {userName}.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {today}. Tvoje studio je dnes čitelné na první pohled: klienti, zakázky, faktury i to, co následuje po focení.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/dashboard/zakazky" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_50px_-30px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 sm:w-auto">
                Přehled zakázek <ArrowRight size={15} />
              </Link>
              <Link href="/dashboard/klienti" className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-[var(--text)] hover:-translate-y-0.5 sm:w-auto">
                Správa klientů
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroSignals.map(item => (
                <div key={item.label} className="rounded-[24px] border border-white/70 bg-white/58 p-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.tone}`}>
                    <item.icon size={18} />
                  </div>
                  <p className="mt-5 font-mono text-2xl font-bold text-[var(--text)]">{item.value}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-[24px] p-4 sm:rounded-[30px] sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Rychlý obraz dne</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Co držet v očích</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                <Sparkles size={18} />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-[24px] border border-white/70 bg-white/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Měsíční revenue</p>
                <p className="mt-3 font-mono text-3xl font-bold text-[var(--text)]">{formatMoney(stats.monthRevenue)}</p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-white/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Neuhrazeno</p>
                <p className={`mt-3 font-mono text-3xl font-bold ${stats.unpaidCount > 0 ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                  {stats.unpaidCount > 0 ? formatMoney(stats.unpaidTotal) : '0 Kč'}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/70 bg-[var(--accent-bg)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--accent)]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">Fotografický workflow</p>
                    <p className="text-sm text-[var(--text-secondary)]">klient → zakázka → faktura → přehled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(card => {
          const value = stats[card.key as keyof typeof stats];

          return (
            <motion.div key={card.key} variants={staggerItem} className="surface-panel rounded-[24px] p-4 sm:rounded-[30px] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{card.label}</p>
                  <p className={`mt-4 font-mono text-3xl font-bold ${card.danger && value > 0 ? 'text-[var(--danger)]' : 'text-[var(--text)]'}`}>
                    {card.isMoney ? formatMoney(value) : value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{card.helper}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone}`}>
                  <card.icon size={19} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <motion.section variants={staggerItem} className="surface-panel overflow-hidden rounded-[26px] sm:rounded-[32px]">
          <div className="flex items-center justify-between border-b border-white/55 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Nadcházející focení</p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Co tě čeká nejdřív</h3>
            </div>
            <Link href="/dashboard/kalendar" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Kalendář
            </Link>
          </div>
          <div className="divide-y divide-white/55">
            {upcomingJobs.length === 0 ? (
              <p className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">Zatím nemáš žádné naplánované focení.</p>
            ) : (
              upcomingJobs.map(job => {
                const statusInfo = JOB_STATUSES[job.status as keyof typeof JOB_STATUSES];

                return (
                  <Link key={job.id} href={`/dashboard/zakazky/${job.id}`} className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-center">
                        <span className="text-xs font-semibold text-[var(--text)]">{job.shootDate ? formatDate(job.shootDate).slice(0, 6) : 'TBD'}</span>
                      </div>
                      <div>
                        <p className="text-base font-semibold tracking-[-0.02em] text-[var(--text)]">{job.title}</p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {job.clientName}
                          {job.location ? ` · ${job.location}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white ${statusInfo?.color || 'bg-gray-400'}`}>
                      {statusInfo?.label || job.status}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </motion.section>

        <motion.section variants={staggerItem} className="surface-panel overflow-hidden rounded-[26px] sm:rounded-[32px]">
          <div className="flex items-center justify-between border-b border-white/55 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Poslední pohyb</p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Naposledy upravené zakázky</h3>
            </div>
            <Link href="/dashboard/zakazky" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Všechny
            </Link>
          </div>
          <div className="divide-y divide-white/55">
            {recentJobs.length === 0 ? (
              <p className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">Zatím tu není žádná aktivita.</p>
            ) : (
              recentJobs.map(job => {
                const statusInfo = JOB_STATUSES[job.status as keyof typeof JOB_STATUSES];

                return (
                  <Link key={job.id} href={`/dashboard/zakazky/${job.id}`} className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-white/50 sm:px-6">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--purple-light)] text-[var(--purple)]">
                      <Sparkles size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-base font-semibold tracking-[-0.02em] text-[var(--text)]">{job.title}</p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">{job.clientName}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white ${statusInfo?.color || 'bg-gray-400'}`}>
                            {statusInfo?.label || job.status}
                          </span>
                          <p className="mt-2 text-xs text-[var(--text-muted)]">{formatDate(job.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
