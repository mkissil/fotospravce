'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search, Users, X } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';
import { formatMoney } from '@/lib/utils';

interface ClientData {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  ico: string | null;
  notes: string | null;
  source: string | null;
  jobCount: number;
  totalPaid: number;
}

const sources: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  doporuceni: 'Doporučení',
  web: 'Web',
  jine: 'Jiné',
};

export default function KlientiClient({ clients }: { clients: ClientData[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    ico: '',
    source: '',
    notes: '',
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    (client.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (client.companyName || '').toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      ico: '',
      source: '',
      notes: '',
    });
    setEditId(null);
  };

  const lookupAres = async () => {
    if (!form.ico || form.ico.length < 8) return;

    try {
      const response = await fetch(`/api/ares?ico=${form.ico}`);
      if (!response.ok) return;

      const data = await response.json();
      if (data.obchodniJmeno) {
        setForm(prevForm => ({
          ...prevForm,
          companyName: data.obchodniJmeno || prevForm.companyName,
          name: prevForm.name || data.obchodniJmeno,
        }));
      }
    } catch {}
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    const body = {
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      companyName: form.companyName || null,
      ico: form.ico || null,
      source: form.source || null,
      notes: form.notes || null,
    };

    const response = editId
      ? await fetch(`/api/clients/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      : await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

    if (!response.ok) return;

    setShowModal(false);
    resetForm();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu smazat klienta?')) return;

    const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    if (!response.ok) return;

    router.refresh();
  };

  const openEdit = (client: ClientData) => {
    setEditId(client.id);
    setForm({
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      companyName: client.companyName || '',
      ico: client.ico || '',
      source: client.source || '',
      notes: client.notes || '',
    });
    setShowModal(true);
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-serif)' }}>
              Klienti
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">{clients.length} klientů celkem</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)]"
          >
            <Plus size={16} /> Nový klient
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)]"
            placeholder="Hledat klienty..."
          />
        </div>

        {filteredClients.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-16 text-center">
            <Users size={40} className="mx-auto mb-3 text-[var(--border)]" />
            <p className="text-[var(--text-secondary)]">
              {clients.length === 0 ? 'Zatím nemáte žádné klienty' : 'Žádné výsledky'}
            </p>
          </div>
        ) : (
          <motion.div variants={stagger} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Jméno
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)] sm:table-cell">
                    Email
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)] md:table-cell">
                    Telefon
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)] lg:table-cell">
                    Zdroj
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Zakázky
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)] sm:table-cell">
                    Zaplaceno
                  </th>
                  <th className="w-20 px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]" />
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <motion.tr
                    variants={staggerItem}
                    key={client.id}
                    className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--bg)]/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/klienti/${client.id}`}
                        className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        {client.name}
                      </Link>
                      {client.companyName && <p className="text-xs text-[var(--text-secondary)]">{client.companyName}</p>}
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--text-secondary)] sm:table-cell">
                      {client.email || '—'}
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--text-secondary)] md:table-cell">
                      {client.phone || '—'}
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--text-secondary)] lg:table-cell">
                      {client.source ? sources[client.source] || client.source : '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--text)]">{client.jobCount}</td>
                    <td
                      className="hidden px-4 py-3 text-[var(--text)] sm:table-cell"
                      style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}
                    >
                      {formatMoney(client.totalPaid)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(client)}
                          className="rounded p-1 text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                          title="Upravit"
                        >
                          &#9998;
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="rounded p-1 text-[var(--text-secondary)] transition-colors hover:bg-red-50 hover:text-[var(--danger)]"
                          title="Smazat"
                        >
                          &#128465;
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          >
            <motion.div
              className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                  {editId ? 'Upravit klienta' : 'Nový klient'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  <X size={18} className="text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Jméno *</label>
                  <input
                    value={form.name}
                    onChange={event => setForm({ ...form, name: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Email</label>
                  <input
                    value={form.email}
                    onChange={event => setForm({ ...form, email: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    placeholder="email@priklad.cz"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Telefon</label>
                  <input
                    value={form.phone}
                    onChange={event => setForm({ ...form, phone: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    placeholder="+420 ..."
                  />
                </div>

                <div className="col-span-2 mt-1 border-t border-[var(--border)] pt-3">
                  <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">Firemní údaje</p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">IČO</label>
                    <input
                      value={form.ico}
                      onChange={event => setForm({ ...form, ico: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                      placeholder="12345678"
                    />
                  </div>
                  <button
                    onClick={lookupAres}
                    className="mt-6 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg)]"
                  >
                    ARES
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Firma</label>
                  <input
                    value={form.companyName}
                    onChange={event => setForm({ ...form, companyName: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Zdroj</label>
                  <select
                    value={form.source}
                    onChange={event => setForm({ ...form, source: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                  >
                    <option value="">Vyberte...</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="doporuceni">Doporučení</option>
                    <option value="web">Web</option>
                    <option value="jine">Jiné</option>
                  </select>
                </div>

                <div />

                <div className="col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Poznámky</label>
                  <textarea
                    value={form.notes}
                    onChange={event => setForm({ ...form, notes: event.target.value })}
                    className="mt-1 min-h-[60px] w-full resize-y rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg)]"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
                >
                  {editId ? 'Uložit' : 'Vytvořit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
