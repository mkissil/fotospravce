'use client';
import { motion } from 'framer-motion';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { Image as ImageIcon, Plus, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Gal {
  id: string; title: string; shareToken: string; status: string; photoCount: number; selectedCount: number; maxSelections: number | null;
  photos?: { id: string; url: string; selected: boolean }[];
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  draft: { label: 'Rozpracovaná', color: 'bg-gray-400' },
  shared: { label: 'Sdílená', color: 'bg-blue-500' },
  selecting: { label: 'Výběr', color: 'bg-yellow-500' },
  completed: { label: 'Dokončená', color: 'bg-green-500' },
};

export default function GalerieClient({ galleries }: { galleries: Gal[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/galerie/${token}`);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Galerie</h1>
            <p className="text-sm text-[var(--text-secondary)]">{galleries.length} galerií</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02]">
            <Plus size={16} /> Nová galerie
          </button>
        </div>

        {galleries.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-16 text-center">
            <ImageIcon size={40} className="mx-auto text-[var(--border)] mb-3" />
            <p className="text-[var(--text-secondary)]">Zatím nemáte žádné galerie</p>
          </div>
        ) : (
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map(g => {
              const st = STATUS_MAP[g.status] || STATUS_MAP.draft;
              return (
                <motion.div variants={staggerItem} key={g.id}>
                  <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden hover:shadow-md transition-all">
                    <div className="h-32 grid grid-cols-4 gap-0.5 overflow-hidden">
                      {(g.photos || []).slice(0, 4).map((p, i) => (
                        <img key={i} src={p.url} alt="" className="h-32 w-full object-cover" loading="lazy" />
                      ))}
                      {(!g.photos || g.photos.length === 0) && (
                        <div className="col-span-4 bg-gradient-to-br from-[var(--accent-light)] to-purple-50 flex items-center justify-center">
                          <ImageIcon size={32} className="text-[var(--accent)]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm text-[var(--text)]">{g.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${st.color}`}>{st.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span>{g.photoCount} fotek</span>
                        {g.maxSelections && <span>Výběr: {g.selectedCount}/{g.maxSelections}</span>}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => copyLink(g.shareToken)}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)] transition-colors">
                          <Copy size={12} /> {copied === g.shareToken ? 'Zkopírováno!' : 'Kopírovat odkaz'}
                        </button>
                        <a href={`/galerie/${g.shareToken}`} target="_blank"
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)] transition-colors">
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
