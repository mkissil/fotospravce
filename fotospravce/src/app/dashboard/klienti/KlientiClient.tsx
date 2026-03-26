'use client';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Users, X } from 'lucide-react';
import { formatMoney } from '@/lib/utils';
import Link from 'next/link';

interface ClientData {
  id: string; name: string; email: string | null; phone: string | null;
  companyName: string | null; ico: string | null;
  notes: string | null; source: string | null; jobCount: number; totalPaid: number;
}

export default function KlientiClient({ clients: initial }: { clients: ClientData[] }) {
  const router = useRouter();
  const [clients, setClients] = useState(initial);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', companyName: '', ico: '', source: '', notes: '' });

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.companyName || '').toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', companyName: '', ico: '', source: '', notes: '' });
    setEditId(null);
  };

  const lookupAres = async () => {
    if (!form.ico || form.ico.length < 8) return;
    try {
      const res = await fetch(`/api/ares?ico=${form.ico}`);
      const data = await res.json();
      if (data.obchodniJmeno) {
        setForm(prev => ({
          ...prev,
          companyName: data.obchodniJmeno || prev.companyName,
          name: prev.name || data.obchodniJmeno,
        }));
      }
    } catch {}
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const body = {
      name: form.name, email: form.email || null, phone: form.phone || null,
      companyName: form.companyName || null, ico: form.ico || null,
      source: form.source || null, notes: form.notes || null,
    };
    if (editId) {
      await fetch(`/api/clients/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } else {
      await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setShowModal(false);
    resetForm();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu smazat klienta?')) return;
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  const openEdit = (c: ClientData) => {
    setEditId(c.id);
    setForm({ name: c.name, email: c.email || '', phone: c.phone || '', companyName: c.companyName || '', ico: c.ico || '', source: c.source || '', notes: c.notes || '' });
    setShowModal(true);
  };

  const sources: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', doporuceni: 'Doporučení', web: 'Web', jine: 'Jiné' };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]" style={{ fontFamily: 'var(--font-serif)' }}>Klienti</h1>
            <p className="text-sm text-[var(--text-secondary)]">{clients.length} klientů celkem</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02]"
          >
            <Plus size={16} /> Nový klient
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)]"
            placeholder="Hledat klienty..."
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-16 text-center">
            <Users size={40} className="mx-auto text-[var(--border)] mb-3" />
            <p className="text-[var(--text-secondary)]">{clients.length === 0 ? 'Zatím nemáte žádné klienty' : 'Žádné výsledky'}</p>
          </div>
        ) : (
          <motion.div variants={stagger} className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Jméno</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide hidden md:table-cell">Telefon</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide hidden lg:table-cell">Zdroj</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">Zakázky</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide hidden sm:table-cell">Zaplaceno</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <motion.div variants={staggerItem} key={c.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]/50 transition-colors">
                    <tr>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/klienti/${c.id}`} className="font-medium text-[var(--text)] hover:text-[var(--accent)]">
                          {c.name}
                        </Link>
                        {c.companyName && <p className="text-xs text-[var(--text-secondary)]">{c.companyName}</p>}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-secondary)] hidden sm:table-cell">{c.email || '—'}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)] hidden md:table-cell">{c.phone || '—'}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)] hidden lg:table-cell">{c.source ? sources[c.source] || c.source : '—'}</td>
                      <td className="px-4 py-3 text-[var(--text)] font-medium">{c.jobCount}</td>
                      <td className="px-4 py-3 text-[var(--text)] hidden sm:table-cell" style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{formatMoney(c.totalPaid)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(c)} className="rounded p-1 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors" title="Upravit">&#9998;</button>
                          <button onClick={() => handleDelete(c.id)} className="rounded p-1 text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-red-50 transition-colors" title="Smazat">&#128465;</button>
                        </div>
                      </td>
                    </tr>
                  </motion.div>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowModal(false); resetForm(); }}
          >
            <motion.div
              className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-serif)' }}>{editId ? 'Upravit klienta' : 'Nový klient'}</h2>
                <button onClick={() => { setShowModal(false); resetForm(); }}><X size={18} className="text-[var(--text-secondary)]" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Jméno *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="Jan Novák" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Email</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="email@priklad.cz" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Telefon</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="+420 ..." />
                </div>
                <div className="col-span-2 border-t border-[var(--border)] pt-3 mt-1">
                  <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Firemní údaje</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">IČO</label>
                    <input value={form.ico} onChange={e => setForm({...form, ico: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder="12345678" />
                  </div>
                  <button onClick={lookupAres} className="mt-6 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)] transition-colors">ARES</button>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Firma</label>
                  <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Zdroj</label>
                  <select value={form.source} onChange={e => setForm({...form, source: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] bg-white">
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
                  <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] min-h-[60px] resize-y" />
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button onClick={() => { setShowModal(false); resetForm(); }}
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)] transition-colors">Zrušit</button>
                <button onClick={handleSave}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">{editId ? 'Uložit' : 'Vytvořit'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
