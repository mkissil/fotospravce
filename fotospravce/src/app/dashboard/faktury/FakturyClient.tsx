'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { stagger, staggerItem } from '@/lib/animations';
import { INVOICE_STATUSES, formatDate, formatMoney } from '@/lib/utils';
import { FileText, Plus, X, CheckCircle } from 'lucide-react';

interface Inv {
  id: string; invoiceNumber: string; clientName: string; jobTitle: string | null;
  issueDate: string; dueDate: string; total: number; status: string; variableSymbol: string | null;
}

export default function FakturyClient({ invoices }: { invoices: Inv[] }) {
  const router = useRouter();
  const [detail, setDetail] = useState<Inv | null>(null);

  const totalUnpaid = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);

  const markPaid = async (id: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'paid' }),
    });
    setDetail(null);
    router.refresh();
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <motion.div variants={staggerItem} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]">Faktury</h1>
            <p className="text-sm text-[var(--text-secondary)]">{invoices.length} faktur</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Plus size={16} /> Nová faktura
          </button>
        </motion.div>

        <motion.div variants={staggerItem} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Celkem vyfakturováno</p>
            <p className="mt-2 text-2xl font-bold font-mono">{formatMoney(totalPaid + totalUnpaid)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Zaplaceno</p>
            <p className="mt-2 text-2xl font-bold font-mono text-[var(--success)]">{formatMoney(totalPaid)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">K úhradě</p>
            <p className="mt-2 text-2xl font-bold font-mono text-[var(--warning)]">{formatMoney(totalUnpaid)}</p>
          </div>
        </motion.div>

        {invoices.length === 0 ? (
          <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-16 text-center">
            <FileText size={40} className="mx-auto text-[var(--border)] mb-3" />
            <p className="text-[var(--text-secondary)]">Zatím nemáte žádné faktury</p>
          </motion.div>
        ) : (
          <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Číslo</th>
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Klient</th>
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Splatnost</th>
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Částka</th>
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Stav</th>
                  <th className="px-5 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => {
                  const st = INVOICE_STATUSES[inv.status];
                  return (
                    <tr key={inv.id} className="border-b border-[var(--border-light)] last:border-0 hover:bg-[var(--bg-hover)] transition-colors">
                      <td className="px-5 py-3.5 font-mono text-sm font-medium text-[var(--accent)]">{inv.invoiceNumber}</td>
                      <td className="px-5 py-3.5 text-[var(--text-secondary)] hidden sm:table-cell">{inv.clientName}</td>
                      <td className="px-5 py-3.5 text-[var(--text-secondary)] hidden md:table-cell">{formatDate(inv.dueDate)}</td>
                      <td className="px-5 py-3.5 font-mono font-semibold">{formatMoney(inv.total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${st?.color || 'bg-gray-400'}`}>
                          {st?.label || inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => setDetail(inv)} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-xs">Detail</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {detail && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
            <motion.div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Faktura {detail.invoiceNumber}</h2>
                <button onClick={() => setDetail(null)}><X size={18} className="text-[var(--text-muted)]" /></button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Klient</span><span className="font-medium">{detail.clientName}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Částka</span><span className="font-mono font-bold text-lg">{formatMoney(detail.total)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Vystaveno</span><span>{formatDate(detail.issueDate)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Splatnost</span><span>{formatDate(detail.dueDate)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">VS</span><span className="font-mono">{detail.variableSymbol || '—'}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Stav</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${INVOICE_STATUSES[detail.status]?.color || 'bg-gray-400'}`}>
                    {INVOICE_STATUSES[detail.status]?.label || detail.status}
                  </span>
                </div>
              </div>
              {detail.status !== 'paid' && (
                <button onClick={() => markPaid(detail.id)}
                  className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--success)] py-3 text-sm font-medium text-white hover:opacity-90 transition-all">
                  <CheckCircle size={16} /> Označit jako zaplaceno
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
