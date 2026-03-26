'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, FileText, Plus, X } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';
import { formatDate, formatMoney, INVOICE_STATUSES } from '@/lib/utils';

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  clientName: string;
  jobTitle: string | null;
  issueDate: string;
  dueDate: string;
  total: number;
  status: string;
  variableSymbol: string | null;
}

interface InvoiceForm {
  clientId: string;
  jobId: string;
  dueDate: string;
  amount: string;
  description: string;
}

export default function FakturyClient({
  invoices,
  clients,
  jobs,
}: {
  invoices: InvoiceRow[];
  clients: { id: string; name: string }[];
  jobs: { id: string; title: string; clientId: string }[];
}) {
  const router = useRouter();
  const [detail, setDetail] = useState<InvoiceRow | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<InvoiceForm>({
    clientId: clients[0]?.id || '',
    jobId: '',
    dueDate: '',
    amount: '',
    description: '',
  });

  const totalUnpaid = invoices
    .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const filteredJobs = jobs.filter(job => !form.clientId || job.clientId === form.clientId);

  const updateForm = (key: keyof InvoiceForm, value: string) => {
    setForm(prev => {
      if (key === 'clientId') {
        return { ...prev, clientId: value, jobId: '' };
      }

      if (key === 'jobId') {
        const selectedJob = jobs.find(job => job.id === value);
        return {
          ...prev,
          jobId: value,
          clientId: selectedJob?.clientId || prev.clientId,
        };
      }

      return { ...prev, [key]: value };
    });
  };

  const resetForm = () => {
    setForm({
      clientId: clients[0]?.id || '',
      jobId: '',
      dueDate: '',
      amount: '',
      description: '',
    });
  };

  const markPaid = async (id: string) => {
    const response = await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'paid' }),
    });

    if (!response.ok) {
      alert('Nepodařilo se změnit stav faktury.');
      return;
    }

    setDetail(null);
    router.refresh();
  };

  const handleCreate = async () => {
    if (!form.clientId || !form.dueDate || !form.amount) return;

    setSaving(true);

    try {
      const amount = Number(form.amount);
      const description = form.description.trim() || 'Fotografické služby';

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: form.clientId,
          jobId: form.jobId || null,
          dueDate: form.dueDate,
          subtotal: amount,
          vatAmount: 0,
          total: amount,
          items: [{ description, quantity: 1, unitPrice: amount }],
        }),
      });

      if (!response.ok) {
        throw new Error('Create failed');
      }

      setShowCreate(false);
      resetForm();
      router.refresh();
    } catch {
      alert('Fakturu se nepodařilo vytvořit.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <motion.div variants={staggerItem} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]">Faktury</h1>
            <p className="text-sm text-[var(--text-secondary)]">{invoices.length} faktur</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            disabled={clients.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
          >
            <Plus size={16} /> Nová faktura
          </button>
        </motion.div>

        {clients.length === 0 && (
          <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--warning)]/20 bg-[var(--warning-light)] px-5 py-4 text-sm text-[var(--text)]">
            Nejprve přidejte klienta. Fakturu lze vystavit až po vytvoření kontaktu v sekci klientů.
          </motion.div>
        )}

        <motion.div variants={staggerItem} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Celkem vyfakturováno</p>
            <p className="mt-2 font-mono text-2xl font-bold">{formatMoney(totalPaid + totalUnpaid)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Zaplaceno</p>
            <p className="mt-2 font-mono text-2xl font-bold text-[var(--success)]">{formatMoney(totalPaid)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">K úhradě</p>
            <p className="mt-2 font-mono text-2xl font-bold text-[var(--warning)]">{formatMoney(totalUnpaid)}</p>
          </div>
        </motion.div>

        {invoices.length === 0 ? (
          <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-16 text-center">
            <FileText size={40} className="mx-auto mb-3 text-[var(--border)]" />
            <p className="text-[var(--text-secondary)]">Zatím nemáte žádné faktury</p>
          </motion.div>
        ) : (
          <motion.div variants={staggerItem} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Číslo</th>
                  <th className="hidden px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] sm:table-cell">Klient</th>
                  <th className="hidden px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] md:table-cell">Splatnost</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Částka</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Stav</th>
                  <th className="w-16 px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]" />
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => {
                  const statusInfo = INVOICE_STATUSES[invoice.status];

                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-[var(--border-light)] transition-colors last:border-0 hover:bg-[var(--bg-hover)]"
                    >
                      <td className="px-5 py-3.5 font-mono text-sm font-medium text-[var(--accent)]">{invoice.invoiceNumber}</td>
                      <td className="hidden px-5 py-3.5 text-[var(--text-secondary)] sm:table-cell">{invoice.clientName}</td>
                      <td className="hidden px-5 py-3.5 text-[var(--text-secondary)] md:table-cell">{formatDate(invoice.dueDate)}</td>
                      <td className="px-5 py-3.5 font-mono font-semibold">{formatMoney(invoice.total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${statusInfo?.color || 'bg-gray-400'}`}>
                          {statusInfo?.label || invoice.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setDetail(invoice)}
                          className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {detail && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
            <motion.div
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Faktura {detail.invoiceNumber}</h2>
                <button onClick={() => setDetail(null)}>
                  <X size={18} className="text-[var(--text-muted)]" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Klient</span><span className="font-medium">{detail.clientName}</span></div>
                {detail.jobTitle && <div className="flex justify-between"><span className="text-[var(--text-muted)]">Zakázka</span><span>{detail.jobTitle}</span></div>}
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Částka</span><span className="font-mono text-lg font-bold">{formatMoney(detail.total)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Vystaveno</span><span>{formatDate(detail.issueDate)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Splatnost</span><span>{formatDate(detail.dueDate)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">VS</span><span className="font-mono">{detail.variableSymbol || '—'}</span></div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Stav</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${INVOICE_STATUSES[detail.status]?.color || 'bg-gray-400'}`}>
                    {INVOICE_STATUSES[detail.status]?.label || detail.status}
                  </span>
                </div>
              </div>
              {detail.status !== 'paid' && (
                <button
                  onClick={() => markPaid(detail.id)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--success)] py-3 text-sm font-medium text-white transition-all hover:opacity-90"
                >
                  <CheckCircle size={16} /> Označit jako zaplaceno
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowCreate(false);
              resetForm();
            }}
          >
            <motion.div
              className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-xl sm:p-7"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Nová faktura</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">Vystavit fakturu</h2>
                </div>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    resetForm();
                  }}
                  className="rounded-2xl bg-[var(--bg)] p-2 text-[var(--text-muted)]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Klient *</label>
                  <select
                    value={form.clientId}
                    onChange={event => updateForm('clientId', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  >
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Zakázka</label>
                  <select
                    value={form.jobId}
                    onChange={event => updateForm('jobId', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  >
                    <option value="">Bez návaznosti</option>
                    {filteredJobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Splatnost *</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={event => updateForm('dueDate', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Částka (Kč) *</label>
                  <input
                    type="number"
                    min="0"
                    value={form.amount}
                    onChange={event => updateForm('amount', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Popis položky</label>
                  <textarea
                    value={form.description}
                    onChange={event => updateForm('description', event.target.value)}
                    className="mt-1 min-h-[110px] w-full resize-y rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                    placeholder="Např. reportáž ze svatebního dne"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => {
                    setShowCreate(false);
                    resetForm();
                  }}
                  className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)]"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleCreate}
                  disabled={saving}
                  className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Vytvářím…' : 'Vystavit fakturu'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
