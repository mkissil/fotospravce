'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError('Nesprávný email nebo heslo');
    else router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-light)]">
              <Camera className="text-[var(--accent)]" size={22} />
            </div>
            <h1 className="text-2xl font-bold font-serif">Vítej zpět</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Přihlaste se do FotoSprávce</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-xl bg-[var(--danger-light)] border border-[var(--danger)]/20 p-3 text-sm text-[var(--danger)]">{error}</div>}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] placeholder:text-[var(--text-muted)] transition-all"
                placeholder="vas@email.cz" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">Heslo</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] placeholder:text-[var(--text-muted)] transition-all"
                  placeholder="Vaše heslo" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-sm">
              {loading ? 'Přihlašuji...' : 'Přihlásit se'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Nemáte účet? <Link href="/register" className="font-semibold text-[var(--accent)] hover:underline">Zaregistrujte se</Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">Demo: jan@foto.cz / demo1234</p>
      </motion.div>
    </div>
  );
}
