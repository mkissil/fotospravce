'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Image as ImageIcon, Plus } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';

interface Gal {
  id: string;
  title: string;
  shareToken: string;
  status: string;
  photoCount: number;
  selectedCount: number;
  maxSelections: number | null;
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
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
              Galerie
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">{galleries.length} galerií</p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)]">
            <Plus size={16} /> Nová galerie
          </button>
        </div>

        {galleries.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-16 text-center">
            <ImageIcon size={40} className="mx-auto mb-3 text-[var(--border)]" />
            <p className="text-[var(--text-secondary)]">Zatím nemáte žádné galerie</p>
          </div>
        ) : (
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map(gallery => {
              const statusInfo = STATUS_MAP[gallery.status] || STATUS_MAP.draft;

              return (
                <motion.div variants={staggerItem} key={gallery.id}>
                  <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all hover:shadow-md">
                    <div className="grid h-32 grid-cols-4 gap-0.5 overflow-hidden">
                      {(gallery.photos || []).slice(0, 4).map((photo, index) => (
                        <div key={photo.id ?? index} className="relative h-32">
                          <Image
                            src={photo.url}
                            alt={`Náhled fotografie ${index + 1} z galerie ${gallery.title}`}
                            fill
                            sizes="(max-width: 640px) 25vw, 120px"
                            className="object-cover"
                          />
                        </div>
                      ))}

                      {(!gallery.photos || gallery.photos.length === 0) && (
                        <div className="col-span-4 flex items-center justify-center bg-gradient-to-br from-[var(--accent-light)] to-purple-50">
                          <ImageIcon size={32} className="text-[var(--accent)]" />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-[var(--text)]">{gallery.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span>{gallery.photoCount} fotek</span>
                        {gallery.maxSelections && (
                          <span>
                            Výběr: {gallery.selectedCount}/{gallery.maxSelections}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => copyLink(gallery.shareToken)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg)]"
                        >
                          <Copy size={12} />
                          {copied === gallery.shareToken ? 'Zkopírováno!' : 'Kopírovat odkaz'}
                        </button>

                        <a
                          href={`/galerie/${gallery.shareToken}`}
                          target="_blank"
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg)]"
                        >
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
