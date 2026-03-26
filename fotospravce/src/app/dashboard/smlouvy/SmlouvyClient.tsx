'use client';
import { motion } from 'framer-motion';
import { stagger, staggerItem } from '@/lib/animations';
import { PenTool, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Template { id: string; name: string; type: string; contractCount: number }
interface Contract { id: string; jobTitle: string; clientName: string; status: string; signToken: string; signedAt: string | null }

const CONTRACT_STATUS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Koncept', color: 'bg-gray-400' },
  sent: { label: 'Odesláno', color: 'bg-blue-500' },
  signed: { label: 'Podepsáno', color: 'bg-green-500' },
};

export default function SmlouvyClient({ templates, contracts }: { templates: Template[]; contracts: Contract[] }) {
  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Smlouvy</h1>

        <div>
          <h2 className="text-lg font-semibold mb-4">Šablony smluv</h2>
          {templates.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-white p-12 text-center">
              <PenTool size={32} className="mx-auto text-[var(--border)] mb-3" />
              <p className="text-[var(--text-secondary)]">Zatím nemáte žádné šablony</p>
            </div>
          ) : (
            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map(t => (
                <motion.div variants={staggerItem} key={t.id}>
                  <div className="rounded-xl border border-[var(--border)] bg-white p-5 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-lg bg-[var(--accent-light)] p-2"><FileText size={16} className="text-[var(--accent)]" /></div>
                      <div>
                        <p className="font-medium text-sm text-[var(--text)]">{t.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{t.contractCount} smluv vytvořeno</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {contracts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Vytvořené smlouvy</h2>
            <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Zakázka</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Klient</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Stav</th>
                    <th className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] uppercase">Podepsáno</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map(c => {
                    const st = CONTRACT_STATUS[c.status] || CONTRACT_STATUS.draft;
                    return (
                      <tr key={c.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]/50">
                        <td className="px-4 py-3 font-medium">{c.jobTitle}</td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">{c.clientName}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${st.color}`}>{st.label}</span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">{c.signedAt ? formatDate(c.signedAt) : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
