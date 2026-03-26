'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError('Musíte souhlasit s podmínkami'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'Registrace selhala'); setLoading(false); return; }
    await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-light)]">
              <Camera className="text-[var(--accent)]" size={22} />
            </div>
            <h1 className="text-2xl font-bold font-serif">Vytvořte si účet zdarma</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">14 dní plný přístup. Bez kreditní karty.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-xl bg-[var(--danger-light)] border border-[var(--danger)]/20 p-3 text-sm text-[var(--danger)]">{error}</div>}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Jméno</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="Jan Novák" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="vas@email.cz" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Heslo</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] placeholder:text-[var(--text-muted)] transition-all"
                  placeholder="Min. 6 znaků" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]" />
              Souhlasím s podmínkami služby
            </label>
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-sm">
              {loading ? 'Vytvářím účet...' : 'Vytvořit účet'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Již máte účet? <Link href="/login" className="font-semibold text-[var(--accent)] hover:underline">Přihlaste se</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
