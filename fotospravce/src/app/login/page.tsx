'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Camera, CreditCard, Eye, EyeOff, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { stagger, staggerItem } from '@/lib/animations';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('registered') === '1';
  });
  const [registeredEmail] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('email');
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      setLoading(false);

      if (response?.error) {
        setError('Nesprávný e-mail nebo heslo');
        return;
      }

      router.push('/dashboard');
    } catch {
      setLoading(false);
      setError('Přihlášení se teď nepodařilo. Zkus to prosím znovu.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial="initial" animate="animate" variants={stagger} className="hidden lg:block">
          <motion.div variants={staggerItem} className="section-kicker">
            <span className="eyebrow-line" />
            Studio access
          </motion.div>
          <motion.h1 variants={staggerItem} className="mt-7 max-w-3xl font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--text)] xl:text-[5.6rem]">
            Vrať se do workspace, kde je klient, termín i faktura v jednom rytmu.
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Login nemá být jen formulář. Má připomenout, že po vstupu vidíš celý provoz fotografa bez přepínání mezi
            chatem, kalendářem a tabulkami.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10 grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="surface-panel-dark rounded-[34px] p-6 text-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">Studio overview</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Co je dnes důležité</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                  live workflow
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Users, value: '84', label: 'aktivní klienti' },
                  { icon: Calendar, value: '07', label: 'termíny tento týden' },
                  { icon: CreditCard, value: '12', label: 'faktury v pohybu' },
                ].map(item => (
                  <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <item.icon size={18} />
                    </div>
                    <p className="mt-5 font-mono text-3xl font-bold">{item.value}</p>
                    <p className="mt-2 text-sm text-white/62">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                ['Poptávka', 'Rychlá odpověď rozhoduje, jestli zakázka skončí u tebe nebo jinde.'],
                ['Focení', 'Kalendář a detail zakázky musí držet pohromadě i na telefonu.'],
                ['Úhrada', 'Po odevzdání potřebuješ vidět, co je zaplacené a co ještě visí.'],
              ].map(item => (
                <div key={item[0]} className="surface-panel rounded-[30px] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">{item[0]}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="surface-panel-strong mx-auto w-full max-w-xl rounded-[30px] p-6 sm:rounded-[38px] sm:p-10"
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

          <div className="mt-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
              <Camera size={24} />
            </div>
            <h1 className="mt-6 font-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-5xl">
              Přihlásit se
            </h1>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Vstup do dashboardu, kde workflow fotografa konečně působí jako systém a ne jako slepenec nástrojů.
            </p>
          </div>

          <div className="mt-7 rounded-[24px] border border-white/70 bg-white/64 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--success-light)] text-[var(--success)]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Po přihlášení pokračuješ tam, kde studio právě je</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  klienti, zakázky, kalendář, faktury a přehled dne bez dalšího nastavování
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {registered ? (
              <div className="rounded-[22px] border border-[var(--success)]/18 bg-[var(--success-light)] px-4 py-3 text-sm text-[var(--success)]">
                Účet je vytvořený. Přihlas se{registeredEmail ? ` jako ${registeredEmail}` : ''}.
              </div>
            ) : null}

            {error ? (
              <div aria-live="polite" className="rounded-[22px] border border-[var(--danger)]/18 bg-[var(--danger-light)] px-4 py-3 text-sm text-[var(--danger)]">
                {error}
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">E-mail</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-white/70 bg-white/76 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                placeholder="vas@email.cz"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Heslo</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/70 bg-white/76 px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                  placeholder="Vaše heslo"
                />
                <button
                  type="button"
                  aria-label={showPw ? 'Skrýt heslo' : 'Zobrazit heslo'}
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--text-muted)] hover:bg-white hover:text-[var(--text)]"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_24px_54px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Přihlašuji…' : 'Vstoupit do dashboardu'}
              {!loading ? <ArrowRight size={16} /> : null}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Nemáš účet?{' '}
            <Link href="/register" className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Založ si ho zdarma
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
