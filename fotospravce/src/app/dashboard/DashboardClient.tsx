'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { JOB_STATUSES, formatDate, formatMoney } from '@/lib/utils';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

interface Props {
  userName: string;
  greeting: string;
  today: string;
  stats: { monthJobsCount: number; monthRevenue: number; unpaidCount: number; unpaidTotal: number; clientCount: number };
  upcomingJobs: { id: string; title: string; clientName: string; type: string; shootDate: string | null; status: string; location: string | null }[];
  recentJobs: { id: string; title: string; clientName: string; status: string; createdAt: string }[];
}

const statCards = [
  { key: 'monthJobsCount', label: 'Zakázky tento měsíc', icon: Camera, bg: 'bg-[var(--accent-light)]', iconColor: 'text-[var(--accent)]' },
  { key: 'monthRevenue', label: 'Příjem tento měsíc', icon: TrendingUp, bg: 'bg-[var(--success-light)]', iconColor: 'text-[var(--success)]', isMoney: true },
  { key: 'unpaidCount', label: 'Nezaplacené faktury', icon: AlertCircle, bg: 'bg-[var(--danger-light)]', iconColor: 'text-[var(--danger)]', danger: true },
  { key: 'clientCount', label: 'Klientů celkem', icon: Users, bg: 'bg-[var(--purple-light)]', iconColor: 'text-[var(--purple)]' },
];

export default function DashboardClient({ userName, greeting, today, stats, upcomingJobs, recentJobs }: Props) {
  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-8">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-[var(--text)] font-serif">{greeting}, {userName}!</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{today}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => {
          const val = stats[card.key as keyof typeof stats];
          return (
            <motion.div key={card.key} variants={staggerItem}
              className="rounded-2xl border border-[var(--border)] bg-white p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{card.label}</p>
                <div className={`rounded-xl p-2.5 ${card.bg}`}>
                  <card.icon size={16} className={card.danger && val > 0 ? 'text-[var(--danger)]' : card.iconColor} />
                </div>
              </div>
              <p className={`mt-3 text-2xl font-bold font-mono ${card.danger && val > 0 ? 'text-[var(--danger)]' : 'text-[var(--text)]'}`}>
                {card.isMoney ? formatMoney(val) : val}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <h2 className="font-semibold text-[var(--text)] text-sm">Nadcházející focení</h2>
            <Link href="/dashboard/kalendar" className="text-xs text-[var(--accent)] hover:underline font-medium">Kalendář</Link>
          </div>
          <div className="divide-y divide-[var(--border-light)]">
            {upcomingJobs.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-[var(--text-muted)]">Žádné naplánované focení</p>
            ) : upcomingJobs.map(j => (
              <Link key={j.id} href={`/dashboard/zakazky/${j.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{j.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{j.clientName}{j.location ? ` · ${j.location}` : ''}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs text-[var(--text-secondary)]">{j.shootDate ? formatDate(j.shootDate) : '—'}</p>
                  <span className={`inline-block mt-1 rounded-lg px-2 py-0.5 text-[10px] font-medium text-white ${(JOB_STATUSES as any)[j.status]?.color || 'bg-gray-400'}`}>
                    {(JOB_STATUSES as any)[j.status]?.label || j.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <h2 className="font-semibold text-[var(--text)] text-sm">Poslední aktivita</h2>
            <Link href="/dashboard/zakazky" className="text-xs text-[var(--accent)] hover:underline font-medium">Všechny zakázky</Link>
          </div>
          <div className="divide-y divide-[var(--border-light)]">
            {recentJobs.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-[var(--text-muted)]">Zatím žádná aktivita</p>
            ) : recentJobs.map(j => (
              <Link key={j.id} href={`/dashboard/zakazky/${j.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--bg-hover)] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{j.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{j.clientName}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-medium text-white ${(JOB_STATUSES as any)[j.status]?.color || 'bg-gray-400'}`}>
                    {(JOB_STATUSES as any)[j.status]?.label || j.status}
                  </span>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1">{formatDate(j.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
