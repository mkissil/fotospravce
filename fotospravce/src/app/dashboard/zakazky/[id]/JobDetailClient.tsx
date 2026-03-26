'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarDays, CreditCard, MapPin, Pencil, Trash2, UserRound, X } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';
import { formatDate, formatMoney, INVOICE_STATUSES, JOB_STATUSES, JOB_TYPES } from '@/lib/utils';

interface JobForm {
  title: string;
  type: string;
  status: string;
  clientId: string;
  shootDate: string;
  location: string;
  price: string;
  deposit: string;
  description: string;
}

interface Props {
  job: {
    id: string;
    title: string;
    type: string;
    status: string;
    clientId: string;
    clientName: string;
    shootDate: string | null;
    location: string | null;
    price: number | null;
    deposit: number | null;
    description: string | null;
    createdAt: string;
  };
  clients: { id: string; name: string }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    total: number;
    status: string;
    dueDate: string;
  }[];
}

function toInputDate(value: string | null) {
  return value ? value.slice(0, 10) : '';
}

export default function JobDetailClient({ job, clients, invoices }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<JobForm>({
    title: job.title,
    type: job.type,
    status: job.status,
    clientId: job.clientId,
    shootDate: toInputDate(job.shootDate),
    location: job.location || '',
    price: job.price?.toString() || '',
    deposit: job.deposit?.toString() || '',
    description: job.description || '',
  });

  const statusInfo = JOB_STATUSES[job.status as keyof typeof JOB_STATUSES];
  const paidTotal = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.total, 0);

  const updateField = (key: keyof JobForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          shootDate: form.shootDate || null,
          price: form.price || null,
          deposit: form.deposit || null,
          location: form.location || null,
          description: form.description || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      setIsEditing(false);
      router.refresh();
    } catch {
      alert('Nepodařilo se uložit změny zakázky.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Opravdu chcete tuto zakázku smazat?')) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      router.push('/dashboard/zakazky');
      router.refresh();
    } catch {
      alert('Zakázku se nepodařilo smazat.');
      setIsDeleting(false);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-6">
      <motion.div variants={staggerItem}>
        <Link
          href="/dashboard/zakazky"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={14} /> Zpět na zakázky
        </Link>
      </motion.div>

      <motion.div variants={staggerItem} className="surface-panel-strong rounded-[28px] p-5 sm:rounded-[34px] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                  statusInfo?.color || 'bg-gray-400'
                }`}
              >
                {statusInfo?.label || job.status}
              </span>
              <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {JOB_TYPES[job.type] ?? job.type}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">
                {job.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                Zakázka napojená na klienta, termín a fakturaci na jednom místě. Vše důležité máš po ruce bez přepínání.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                  <UserRound size={18} />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Klient</p>
                <p className="mt-2 text-base font-semibold text-[var(--text)]">{job.clientName}</p>
              </div>

              <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--purple-light)] text-[var(--purple)]">
                  <CalendarDays size={18} />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Termín</p>
                <p className="mt-2 text-base font-semibold text-[var(--text)]">
                  {job.shootDate ? formatDate(job.shootDate) : 'Neurčeno'}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--success-light)] text-[var(--success)]">
                  <CreditCard size={18} />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Cena zakázky</p>
                <p className="mt-2 text-base font-semibold text-[var(--text)]">
                  {job.price ? formatMoney(job.price) : 'Nezadáno'}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/70 bg-white/65 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--warning-light)] text-[var(--warning)]">
                  <MapPin size={18} />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Místo</p>
                <p className="mt-2 text-base font-semibold text-[var(--text)]">
                  {job.location || 'Bez lokace'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_48px_-30px_rgba(214,93,56,0.95)]"
            >
              <Pencil size={16} /> Upravit zakázku
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--danger)]/18 bg-[var(--danger-light)] px-5 py-3 text-sm font-semibold text-[var(--danger)] disabled:opacity-60"
            >
              <Trash2 size={16} /> {isDeleting ? 'Mažu…' : 'Smazat'}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.section variants={staggerItem} className="surface-panel rounded-[26px] p-5 sm:rounded-[32px] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Poznámky a finance</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Detaily zakázky</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] border border-white/70 bg-white/68 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Záloha</p>
              <p className="mt-2 font-mono text-2xl font-bold text-[var(--text)]">
                {job.deposit ? formatMoney(job.deposit) : '0 Kč'}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/70 bg-white/68 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Zaplaceno na fakturách</p>
              <p className="mt-2 font-mono text-2xl font-bold text-[var(--success)]">{formatMoney(paidTotal)}</p>
            </div>

            <div className="rounded-[24px] border border-white/70 bg-white/68 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Popis</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {job.description || 'Zakázka zatím nemá doplněný interní popis.'}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/70 bg-white/68 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Vytvořeno</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text)]">{formatDate(job.createdAt)}</p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={staggerItem} className="surface-panel overflow-hidden rounded-[26px] sm:rounded-[32px]">
          <div className="flex items-center justify-between border-b border-white/55 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Navázané faktury</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Finanční návaznost</h2>
            </div>
            <Link href="/dashboard/faktury" className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Všechny faktury
            </Link>
          </div>

          <div className="divide-y divide-white/55">
            {invoices.length === 0 ? (
              <p className="px-6 py-12 text-center text-sm text-[var(--text-muted)]">K této zakázce zatím není vystavená žádná faktura.</p>
            ) : (
              invoices.map(invoice => {
                const invoiceStatus = INVOICE_STATUSES[invoice.status];

                return (
                  <div key={invoice.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <p className="font-mono text-base font-semibold text-[var(--text)]">{invoice.invoiceNumber}</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">Splatnost {formatDate(invoice.dueDate)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-sm font-semibold text-[var(--text)]">{formatMoney(invoice.total)}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                          invoiceStatus?.color || 'bg-gray-400'
                        }`}
                      >
                        {invoiceStatus?.label || invoice.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-7"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Úprava</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">Upravit zakázku</h2>
                </div>
                <button onClick={() => setIsEditing(false)} className="rounded-2xl bg-[var(--bg)] p-2 text-[var(--text-muted)]">
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Název zakázky *</label>
                  <input
                    value={form.title}
                    onChange={event => updateField('title', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Klient *</label>
                  <select
                    value={form.clientId}
                    onChange={event => updateField('clientId', event.target.value)}
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
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Stav</label>
                  <select
                    value={form.status}
                    onChange={event => updateField('status', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  >
                    {Object.entries(JOB_STATUSES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Typ</label>
                  <select
                    value={form.type}
                    onChange={event => updateField('type', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  >
                    {Object.entries(JOB_TYPES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Datum focení</label>
                  <input
                    type="date"
                    value={form.shootDate}
                    onChange={event => updateField('shootDate', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Místo</label>
                  <input
                    value={form.location}
                    onChange={event => updateField('location', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Cena (Kč)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={event => updateField('price', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Záloha (Kč)</label>
                  <input
                    type="number"
                    value={form.deposit}
                    onChange={event => updateField('deposit', event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Popis</label>
                  <textarea
                    value={form.description}
                    onChange={event => updateField('description', event.target.value)}
                    className="mt-1 min-h-[120px] w-full resize-y rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-2xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)]"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Ukládám…' : 'Uložit změny'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
