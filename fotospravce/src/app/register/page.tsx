'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Check, CreditCard, Eye, EyeOff, Calendar } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreed) {
      setError('Musíte souhlasit s podmínkami');
      return;
    }

    setLoading(true);
    setError('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Registrace selhala');
      setLoading(false);
      return;
    }

    await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial="initial" animate="animate" variants={stagger} className="hidden lg:block">
          <motion.div variants={staggerItem} className="section-kicker">
            <span className="eyebrow-line" />
            Nové studio
          </motion.div>
          <motion.h1 variants={staggerItem} className="mt-7 max-w-2xl font-serif text-6xl font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text)]">
            Založ si workspace, který zvládne každodenní provoz bez zmatku.
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
            Hned po vstupu poznáš, že jde o nástroj pro fotografy: kontakty, termíny, zakázky a faktury mají jasné místo i logiku.
          </motion.p>
          <motion.div variants={staggerItem} className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              { icon: Calendar, label: 'kalendář', hint: 'termíny po ruce' },
              { icon: CreditCard, label: 'faktury', hint: 'rychlé vystavení' },
              { icon: Check, label: 'přehled', hint: 'workflow na očích' },
            ].map(item => (
              <div key={item.label} className="surface-panel rounded-[30px] p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-[var(--accent-bg)] text-[var(--accent)]">
                  <item.icon size={20} />
                </div>
                <p className="mt-5 text-base font-semibold text-[var(--text)]">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.hint}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="surface-panel-strong mx-auto w-full max-w-xl rounded-[28px] p-6 sm:rounded-[34px] sm:p-9"
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff9c74)] text-base font-bold text-white shadow-[0_18px_40px_-24px_rgba(214,93,56,0.95)]">
              F
            </div>
            <div>
              <p className="font-serif text-xl font-semibold">
                Foto<span className="text-[var(--accent)]">Správce</span>
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">CRM pro fotografy</p>
            </div>
          </Link>

          <div className="mt-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
              <Camera size={24} />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl">
              Vytvořit účet zdarma
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
              Po registraci se rovnou přihlásíš a můžeš začít s klienty, zakázkami a fakturami bez dalšího nastavování.
            </p>
          </div>

          <div className="mt-6 rounded-[20px] border border-white/70 bg-white/60 p-4 sm:rounded-[24px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--success-light)] text-[var(--success)]">
                <Check size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Připraveno za pár minut</p>
                <p className="text-sm text-[var(--text-secondary)]">Registrace je krátká a bez platební karty.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-[22px] border border-[var(--danger)]/18 bg-[var(--danger-light)] px-4 py-3 text-sm text-[var(--danger)]">
                {error}
              </div>
            )}
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Jméno</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={event => setForm({ ...form, name: event.target.value })}
                className="w-full rounded-2xl border border-white/70 bg-white/72 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                placeholder="Jan Novák"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">E-mail</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={event => setForm({ ...form, email: event.target.value })}
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
                  minLength={6}
                  value={form.password}
                  onChange={event => setForm({ ...form, password: event.target.value })}
                  className="w-full rounded-2xl border border-white/70 bg-white/72 px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                  placeholder="Minimálně 6 znaků"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--text-muted)] hover:bg-white hover:text-[var(--text)]"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-[22px] border border-white/65 bg-white/58 px-4 py-3 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={event => setAgreed(event.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              Souhlasím s podmínkami služby
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_22px_50px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Vytvářím účet…' : 'Vytvořit účet'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Už účet máš?{' '}
            <Link href="/login" className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Přihlásit se
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
