'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { stagger, staggerItem } from '@/lib/animations';
import { ArrowLeft, Mail, Phone, Building2, Hash } from 'lucide-react';
import { JOB_STATUSES, JOB_TYPES, INVOICE_STATUSES, formatDate, formatMoney } from '@/lib/utils';

interface Props {
  client: { id: string; name: string; email: string | null; phone: string | null; companyName: string | null; ico: string | null; notes: string | null; source: string | null };
  jobs: { id: string; title: string; type: string; status: string; shootDate: string | null; price: number | null }[];
  invoices: { id: string; invoiceNumber: string; total: number; status: string; dueDate: string }[];
}

const sources: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', doporuceni: 'Doporučení', web: 'Web', jine: 'Jiné' };

export default function ClientDetailClient({ client, jobs, invoices }: Props) {
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-6">
      <motion.div variants={staggerItem}>
        <Link href="/dashboard/klienti" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors mb-4">
          <ArrowLeft size={14} /> Zpět na klienty
        </Link>
      </motion.div>

      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-white text-xl font-bold">{client.name[0]}</div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">{client.name}</h1>
          {client.companyName && <p className="text-sm text-[var(--text-secondary)]">{client.companyName}</p>}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-5 space-y-3">
          <h2 className="text-sm font-semibold text-[var(--text)]">Kontaktní údaje</h2>
          {client.email && <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"><Mail size={14} /> {client.email}</div>}
          {client.phone && <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"><Phone size={14} /> {client.phone}</div>}
          {client.ico && <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"><Hash size={14} /> IČO: {client.ico}</div>}
          {client.source && <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"><Building2 size={14} /> {sources[client.source] || client.source}</div>}
          {client.notes && <div className="pt-2 border-t border-[var(--border-light)] text-sm text-[var(--text-secondary)]">{client.notes}</div>}
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Zakázek</p>
          <p className="text-3xl font-bold font-mono text-[var(--text)] mt-1">{jobs.length}</p>
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Zaplaceno</p>
          <p className="text-3xl font-bold font-mono text-[var(--success)] mt-1">{formatMoney(totalPaid)}</p>
        </motion.div>
      </div>

      {/* JOBS */}
      <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
        <div className="px-5 py-4 border-b border-[var(--border)]"><h2 className="font-semibold text-sm text-[var(--text)]">Zakázky</h2></div>
        {jobs.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">Žádné zakázky</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {jobs.map(j => (
                <tr key={j.id} className="border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/dashboard/zakazky/${j.id}`} className="font-medium text-[var(--text)] hover:text-[var(--accent)]">{j.title}</Link>
                    <p className="text-xs text-[var(--text-muted)]">{JOB_TYPES[j.type] || j.type}</p>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">{j.shootDate ? formatDate(j.shootDate) : '—'}</td>
                  <td className="px-5 py-3 font-mono text-sm">{j.price ? formatMoney(j.price) : '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${(JOB_STATUSES as any)[j.status]?.color || 'bg-gray-400'}`}>
                      {(JOB_STATUSES as any)[j.status]?.label || j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* INVOICES */}
      {invoices.length > 0 && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
          <div className="px-5 py-4 border-b border-[var(--border)]"><h2 className="font-semibold text-sm text-[var(--text)]">Faktury</h2></div>
          <table className="w-full text-sm">
            <tbody>
              {invoices.map(i => {
                const st = INVOICE_STATUSES[i.status];
                return (
                  <tr key={i.id} className="border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-hover)] transition-colors">
                    <td className="px-5 py-3 font-mono text-[var(--accent)] font-medium">{i.invoiceNumber}</td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">{formatDate(i.dueDate)}</td>
                    <td className="px-5 py-3 font-mono font-semibold">{formatMoney(i.total)}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${st?.color || 'bg-gray-400'}`}>{st?.label || i.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}
