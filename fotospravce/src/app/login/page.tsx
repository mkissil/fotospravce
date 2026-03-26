'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Eye, EyeOff, FileText, Image as ImageIcon, Users } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', { email, password, redirect: false });

    setLoading(false);

    if (res?.error) setError('Nesprávný e-mail nebo heslo');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="initial" animate="animate" variants={stagger} className="hidden lg:block">
          <motion.div variants={staggerItem} className="section-kicker">
            <span className="eyebrow-line" />
            Vítej zpět
          </motion.div>
          <motion.h1 variants={staggerItem} className="mt-7 max-w-2xl font-serif text-6xl font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text)]">
            Zpátky do prostoru, kde studio drží tvar.
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
            I po přihlášení je všechno čitelné na první pohled: klient, zakázka, faktura i galerie v jednom rytmu.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              { icon: Users, label: 'klienti', value: '84' },
              { icon: FileText, label: 'faktury', value: '12' },
              { icon: ImageIcon, label: 'galerie', value: '6' },
            ].map((item) => (
              <div key={item.label} className="surface-panel rounded-[30px] p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-[var(--accent-bg)] text-[var(--accent)]">
                  <item.icon size={20} />
                </div>
                <p className="mt-5 font-mono text-3xl font-bold text-[var(--text)]">{item.value}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="surface-panel-strong mx-auto w-full max-w-xl rounded-[28px] p-6 sm:rounded-[34px] sm:p-9">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff9c74)] text-base font-bold text-white shadow-[0_18px_40px_-24px_rgba(214,93,56,0.95)]">
              F
            </div>
            <div>
              <p className="font-serif text-xl font-semibold">Foto<span className="text-[var(--accent)]">Správce</span></p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Studio OS pro fotografy</p>
            </div>
          </Link>

          <div className="mt-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
              <Camera size={24} />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">Přihlásit se</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
              Dashboard, který i beze slov ukazuje, že patří fotografům.
            </p>
          </div>

          <div className="mt-6 rounded-[20px] border border-white/70 bg-white/60 p-4 text-sm text-[var(--text-secondary)] sm:rounded-[24px]">
            <p className="font-semibold text-[var(--text)]">Demo přístup</p>
            <p className="mt-2 font-mono">jan@foto.cz / demo1234</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && <div className="rounded-[22px] border border-[var(--danger)]/18 bg-[var(--danger-light)] px-4 py-3 text-sm text-[var(--danger)]">{error}</div>}
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/70 bg-white/72 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                placeholder="vas@email.cz"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Heslo</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/70 bg-white/72 px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                  placeholder="Vaše heslo"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--text-muted)] hover:bg-white hover:text-[var(--text)]">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_22px_50px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 disabled:opacity-60">
              {loading ? 'Přihlašuji…' : 'Přihlásit se'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Nemáš účet? <Link href="/register" className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">Založ si ho zdarma</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
