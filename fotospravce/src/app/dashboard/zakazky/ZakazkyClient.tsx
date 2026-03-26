'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import { Kanban, List, Plus, X } from 'lucide-react';
import { stagger } from '@/lib/animations';
import { formatDate, formatMoney, JOB_STATUSES, JOB_TYPES } from '@/lib/utils';

interface JobData {
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
}

const COLUMNS = ['poptavka', 'nabidka', 'potvrzeno', 'foceni', 'editace', 'odevzdano'] as const;

export default function ZakazkyClient({
  jobs: initialJobs,
  clients,
}: {
  jobs: JobData[];
  clients: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    clientId: '',
    type: 'svatba',
    shootDate: '',
    location: '',
    price: '',
    deposit: '',
    description: '',
  });

  const getStatusInfo = (status: string) => JOB_STATUSES[status as keyof typeof JOB_STATUSES];
  const getTypeLabel = (type: string) => JOB_TYPES[type] ?? type;

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId;
    const previousJobs = jobs;

    setJobs(prevJobs => prevJobs.map(job => (job.id === jobId ? { ...job, status: newStatus } : job)));

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job status');
      }
    } catch {
      setJobs(previousJobs);
      router.refresh();
    }
  };

  const handleCreate = async () => {
    if (!form.title || !form.clientId) return;

    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) return;

    setShowModal(false);
    setForm({
      title: '',
      clientId: '',
      type: 'svatba',
      shootDate: '',
      location: '',
      price: '',
      deposit: '',
      description: '',
    });
    router.refresh();
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
              Zakázky
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">{jobs.length} zakázek</p>
          </div>

          <div className="flex gap-3">
            <div className="overflow-hidden rounded-lg border border-[var(--border)]">
              <button
                onClick={() => setView('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  view === 'kanban'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg)]'
                }`}
              >
                <Kanban size={14} /> Kanban
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  view === 'list'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg)]'
                }`}
              >
                <List size={14} /> Seznam
              </button>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)]"
            >
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
                const columnJobs = jobs.filter(job => job.status === status);

                return (
                  <div
                    key={status}
                    className="min-w-[240px] flex-shrink-0 rounded-xl border border-[var(--border)] bg-[var(--bg)]"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--border)] p-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${info.color}`} />
                        <span className="text-xs font-semibold text-[var(--text)]">{info.label}</span>
                      </div>
                      <span className="rounded-full bg-white px-2 py-0.5 text-xs text-[var(--text-secondary)]">
                        {columnJobs.length}
                      </span>
                    </div>

                    <Droppable droppableId={status}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[60px] space-y-2 p-2 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-[var(--accent-light)]' : ''
                          }`}
                        >
                          {columnJobs.map((job, index) => (
                            <Draggable key={job.id} draggableId={job.id} index={index}>
                              {(draggableProvided, draggableSnapshot) => (
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  className={`rounded-lg border border-[var(--border)] bg-white p-3 transition-shadow ${
                                    draggableSnapshot.isDragging ? 'shadow-lg' : 'hover:shadow-sm'
                                  }`}
                                >
                                  <Link
                                    href={`/dashboard/zakazky/${job.id}`}
                                    className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)]"
                                  >
                                    {job.title}
                                  </Link>
                                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{job.clientName}</p>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[10px] text-[var(--text-secondary)]">
                                      {getTypeLabel(job.type)}
                                      {job.shootDate ? ` · ${formatDate(job.shootDate)}` : ''}
                                    </span>
                                    {job.price && (
                                      <span className="text-[10px] font-semibold" style={{ fontFamily: 'JetBrains Mono' }}>
                                        {formatMoney(job.price)}
                                      </span>
                                    )}
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
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)]">Zakázka</th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)] sm:table-cell">
                    Klient
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)] md:table-cell">
                    Typ
                  </th>
                  <th className="hidden px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)] md:table-cell">
                    Datum
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)]">Cena</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase text-[var(--text-secondary)]">Stav</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => {
                  const statusInfo = getStatusInfo(job.status);

                  return (
                    <tr
                      key={job.id}
                      className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--bg)]/50"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/zakazky/${job.id}`}
                          className="font-medium text-[var(--text)] hover:text-[var(--accent)]"
                        >
                          {job.title}
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 text-[var(--text-secondary)] sm:table-cell">{job.clientName}</td>
                      <td className="hidden px-4 py-3 text-[var(--text-secondary)] md:table-cell">
                        {getTypeLabel(job.type)}
                      </td>
                      <td className="hidden px-4 py-3 text-[var(--text-secondary)] md:table-cell">
                        {job.shootDate ? formatDate(job.shootDate) : '—'}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                        {job.price ? formatMoney(job.price) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${
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
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                  Nová zakázka
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={18} className="text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Název zakázky *</label>
                  <input
                    value={form.title}
                    onChange={event => setForm({ ...form, title: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    placeholder='Např. "Svatba Petra a Jana"'
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Klient *</label>
                    <select
                      value={form.clientId}
                      onChange={event => setForm({ ...form, clientId: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    >
                      <option value="">Vyberte klienta</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Typ</label>
                    <select
                      value={form.type}
                      onChange={event => setForm({ ...form, type: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
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
                      onChange={event => setForm({ ...form, shootDate: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Místo</label>
                    <input
                      value={form.location}
                      onChange={event => setForm({ ...form, location: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Cena (Kč)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={event => setForm({ ...form, price: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Záloha (Kč)</label>
                    <input
                      type="number"
                      value={form.deposit}
                      onChange={event => setForm({ ...form, deposit: event.target.value })}
                      className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">Popis</label>
                  <textarea
                    value={form.description}
                    onChange={event => setForm({ ...form, description: event.target.value })}
                    className="mt-1 min-h-[60px] w-full resize-y rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)]"
                >
                  Zrušit
                </button>
                <button
                  onClick={handleCreate}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
                >
                  Vytvořit zakázku
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
