'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Hash, Mail, Phone } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';
import { formatDate, formatMoney, INVOICE_STATUSES, JOB_STATUSES, JOB_TYPES } from '@/lib/utils';

interface Props {
  client: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    companyName: string | null;
    ico: string | null;
    notes: string | null;
    source: string | null;
  };
  jobs: {
    id: string;
    title: string;
    type: string;
    status: string;
    shootDate: string | null;
    price: number | null;
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    total: number;
    status: string;
    dueDate: string;
  }[];
}

const sources: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  doporuceni: 'Doporučení',
  web: 'Web',
  jine: 'Jiné',
};

export default function ClientDetailClient({ client, jobs, invoices }: Props) {
  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-6">
      <motion.div variants={staggerItem}>
        <Link
          href="/dashboard/klienti"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={14} /> Zpět na klienty
        </Link>
      </motion.div>

      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-xl font-bold text-white">
          {client.name[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">{client.name}</h1>
          {client.companyName && <p className="text-sm text-[var(--text-secondary)]">{client.companyName}</p>}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={staggerItem} className="space-y-3 rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-sm font-semibold text-[var(--text)]">Kontaktní údaje</h2>
          {client.email && (
            <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
              <Mail size={14} /> {client.email}
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
              <Phone size={14} /> {client.phone}
            </div>
          )}
          {client.ico && (
            <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
              <Hash size={14} /> IČO: {client.ico}
            </div>
          )}
          {client.source && (
            <div className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
              <Building2 size={14} /> {sources[client.source] || client.source}
            </div>
          )}
          {client.notes && (
            <div className="border-t border-[var(--border-light)] pt-2 text-sm text-[var(--text-secondary)]">
              {client.notes}
            </div>
          )}
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Zakázek</p>
          <p className="mt-1 font-mono text-3xl font-bold text-[var(--text)]">{jobs.length}</p>
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Zaplaceno</p>
          <p className="mt-1 font-mono text-3xl font-bold text-[var(--success)]">{formatMoney(totalPaid)}</p>
        </motion.div>
      </div>

      <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
        <div className="border-b border-[var(--border)] px-5 py-4">
          <h2 className="text-sm font-semibold text-[var(--text)]">Zakázky</h2>
        </div>

        {jobs.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">Žádné zakázky</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {jobs.map(job => {
                const statusInfo = JOB_STATUSES[job.status as keyof typeof JOB_STATUSES];

                return (
                  <tr
                    key={job.id}
                    className="border-b border-[var(--border-light)] transition-colors last:border-0 hover:bg-[var(--bg-hover)]"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/dashboard/zakazky/${job.id}`}
                        className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        {job.title}
                      </Link>
                      <p className="text-xs text-[var(--text-muted)]">{JOB_TYPES[job.type] ?? job.type}</p>
                    </td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">
                      {job.shootDate ? formatDate(job.shootDate) : '—'}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm">
                      {job.price ? formatMoney(job.price) : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${
                          statusInfo?.color || 'bg-gray-400'
                        }`}
                      >
                        {statusInfo?.label || job.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </motion.div>

      {invoices.length > 0 && (
        <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white">
          <div className="border-b border-[var(--border)] px-5 py-4">
            <h2 className="text-sm font-semibold text-[var(--text)]">Faktury</h2>
          </div>

          <table className="w-full text-sm">
            <tbody>
              {invoices.map(invoice => {
                const statusInfo = INVOICE_STATUSES[invoice.status];

                return (
                  <tr
                    key={invoice.id}
                    className="border-b border-[var(--border-light)] transition-colors last:border-0 hover:bg-[var(--bg-hover)]"
                  >
                    <td className="px-5 py-3 font-mono font-medium text-[var(--accent)]">{invoice.invoiceNumber}</td>
                    <td className="px-5 py-3 text-[var(--text-secondary)]">{formatDate(invoice.dueDate)}</td>
                    <td className="px-5 py-3 font-mono font-semibold">{formatMoney(invoice.total)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${
                          statusInfo?.color || 'bg-gray-400'
                        }`}
                      >
                        {statusInfo?.label || invoice.status}
                      </span>
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
