'use client';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Kanban, List, Plus, X } from 'lucide-react';
import { JOB_STATUSES, JOB_TYPES, formatDate, formatMoney } from '@/lib/utils';
import Link from 'next/link';

interface JobData {
  id: string; title: string; type: string; status: string;
  clientId: string; clientName: string; shootDate: string | null;
  location: string | null; price: number | null; deposit: number | null;
  description: string | null;
}

const COLUMNS = ['poptavka', 'nabidka', 'potvrzeno', 'foceni', 'editace', 'odevzdano'] as const;

export default function ZakazkyClient({ jobs: initial, clients }: { jobs: JobData[]; clients: { id: string; name: string }[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initial);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', clientId: '', type: 'svatba', shootDate: '', location: '', price: '', deposit: '', description: '' });

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId;
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    await fetch(`/api/jobs/${jobId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleCreate = async () => {
    if (!form.title || !form.clientId) return;
    await fetch('/api/jobs', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    setForm({ title: '', clientId: '', type: 'svatba', shootDate: '', location: '', price: '', deposit: '', description: '' });
    router.refresh();
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Zakázky</h1>
            <p className="text-sm text-[var(--text-secondary)]">{jobs.length} zakázek</p>
          </div>
          <div className="flex gap-3">
            <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
              <button onClick={() => setView('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === 'kanban' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg)]'}`}>
                <Kanban size={14} /> Kanban
              </button>
              <button onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === 'list' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg)]'}`}>
                <List size={14} /> Seznam
              </button>
            </div>
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02]">
              <Plus size={16} /> Nová zakázka
            </button>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-16 text-center">
            <p className="text-[var(--text-secondary)]">Zatím nemáte žádné zakázky</p>
          </div>
        ) : view === 'kanban' ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {COLUMNS.map(status => {
                const info = JOB_STATUSES[status];
                const colJobs = jobs.filter(j => j.status === status);
                return (
                  <div key={status} className="min-w-[240px] flex-shrink-0 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${info.color}`} />
                        <span className="text-xs font-semibold text-[var(--text)]">{info.label}</span>
                      </div>
                      <span className="text-xs text-[var(--text-secondary)] bg-white rounded-full px-2 py-0.5">{colJobs.length}</span>
                    </div>
                    <Droppable droppableId={status}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}
                          className={`min-h-[60px] p-2 space-y-2 transition-colors ${snapshot.isDraggingOver ? 'bg-[var(--accent-light)]' : ''}`}>
                          {colJobs.map((job, i) => (
                            <Draggable key={job.id} draggableId={job.id} index={i}>
                              {(prov, snap) => (
                                <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}
                                  className={`rounded-lg border border-[var(--border)] bg-white p-3 transition-shadow ${snap.isDragging ? 'shadow-lg' : 'hover:shadow-sm'}`}>
                                  <Link href={`/dashboard/zakazky/${job.id}`} className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)]">{job.title}</Link>
                                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{job.clientName}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] text-[var(--text-secondary)]">
                                      {(JOB_TYPES as any)[job.type] || job.type}
                                      {job.shootDate ? ` · ${formatDate(job.shootDate)}` : ''}
                                    </span>
                                    {job.price && <span className="text-[10px] font-semibold" style={{ fontFamily: 'JetBrains Mono' }}>{formatMoney(job.price)}</span>}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Zakázka</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase hidden sm:table-cell">Klient</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase hidden md:table-cell">Typ</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase hidden md:table-cell">Datum</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Cena</th>
                  <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Stav</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(j => (
                  <tr key={j.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]/50 transition-colors">
                    <td className="px-4 py-3"><Link href={`/dashboard/zakazky/${j.id}`} className="font-medium text-[var(--text)] hover:text-[var(--accent)]">{j.title}</Link></td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] hidden sm:table-cell">{j.clientName}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] hidden md:table-cell">{(JOB_TYPES as any)[j.type] || j.type}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] hidden md:table-cell">{j.shootDate ? formatDate(j.shootDate) : '—'}</td>
                    <td className="px-4 py-3 font-medium" style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>{j.price ? formatMoney(j.price) : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${(JOB_STATUSES as any)[j.status]?.color || 'bg-gray-400'}`}>
                        {(JOB_STATUSES as any)[j.status]?.label || j.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* NEW JOB MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}>
            <motion.div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Nová zakázka</h2>
                <button onClick={() => setShowModal(false)}><X size={18} className="text-[var(--text-secondary)]" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Název zakázky *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" placeholder='Např. "Svatba Petra a Jana"' />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Klient *</label>
                    <select value={form.clientId} onChange={e => setForm({...form, clientId: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] bg-white">
                      <option value="">Vyberte klienta</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Typ</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] bg-white">
                      {Object.entries(JOB_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Datum focení</label>
                    <input type="date" value={form.shootDate} onChange={e => setForm({...form, shootDate: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Místo</label>
                    <input value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Cena (Kč)</label>
                    <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Záloha (Kč)</label>
                    <input type="number" value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Popis</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)] min-h-[60px] resize-y" />
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)}
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)]">Zrušit</button>
                <button onClick={handleCreate}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]">Vytvořit zakázku</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
