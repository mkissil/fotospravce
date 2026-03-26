'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Camera, CreditCard, Eye, EyeOff, ShieldCheck, Sparkles, Users } from 'lucide-react';
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

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({ error: 'Registrace selhala' }));

      if (!response.ok) {
        setError(data.error || 'Registrace selhala');
        setLoading(false);
        return;
      }

      const loginResult = await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });

      setLoading(false);

      if (loginResult?.error) {
        router.push(`/login?registered=1&email=${encodeURIComponent(payload.email)}`);
        return;
      }

      router.push('/dashboard');
    } catch {
      setLoading(false);
      setError('Registrace se teď nepodařila. Zkus to prosím znovu.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial="initial" animate="animate" variants={stagger} className="hidden lg:block">
          <motion.div variants={staggerItem} className="section-kicker">
            <span className="eyebrow-line" />
            Studio launch
          </motion.div>
          <motion.h1 variants={staggerItem} className="mt-7 max-w-3xl font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--text)] xl:text-[5.7rem]">
            Založ si workspace, který prodává klid dřív, než přidáš první zakázku.
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Registrace má okamžitě ukázat, pro koho ten produkt je. Proto tady nejsou generické dashboard řeči, ale
            skutečné části fotografického provozu, které po vstupu dostaneš pod kontrolu.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10 grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="surface-panel-dark rounded-[34px] p-6 text-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">First minute inside</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Co studio uvidí hned po vstupu</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                  bez složitého setupu
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ['Klienti', 'kontakty, zdroje a historie spolupráce'],
                  ['Zakázky', 'stav, cena, lokalita, termín i další krok'],
                  ['Faktury', 'co je vystavené, co čeká a co je uhrazené'],
                ].map(item => (
                  <div key={item[0]} className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                    <p className="text-sm font-semibold text-white">{item[0]}</p>
                    <p className="mt-1 text-sm leading-6 text-white/62">{item[1]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Users, title: 'Klienti', desc: 'máš po ruce bez lovení ve zprávách' },
                { icon: Calendar, title: 'Kalendář', desc: 'udrží rytmus focení a nejbližší priority' },
                { icon: CreditCard, title: 'Faktury', desc: 'navážou peníze na konkrétní práci' },
              ].map(item => (
                <div key={item.title} className="surface-panel rounded-[30px] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.desc}</p>
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
              Vytvořit účet zdarma
            </h1>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              14 dní plného přístupu. Bez karty. Bez agentury. Bez nesmyslného setupu před prvním výsledkem.
            </p>
          </div>

          <div className="mt-7 rounded-[24px] border border-white/70 bg-white/64 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--success-light)] text-[var(--success)]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Připraveno během pár minut</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  po registraci můžeš rovnou vytvořit klienta, zakázku a první fakturu
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Users, label: 'klienti', value: 'kontakt + historie' },
              { icon: Calendar, label: 'zakázky', value: 'termín + stav' },
              { icon: CreditCard, label: 'finance', value: 'faktura + úhrada' },
            ].map(item => (
              <div key={item.label} className="rounded-[24px] border border-white/70 bg-white/58 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                  <item.icon size={16} />
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--text)]">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{item.value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error ? (
              <div aria-live="polite" className="rounded-[22px] border border-[var(--danger)]/18 bg-[var(--danger-light)] px-4 py-3 text-sm text-[var(--danger)]">
                {error}
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Jméno</label>
              <input
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={event => setForm({ ...form, name: event.target.value })}
                className="w-full rounded-2xl border border-white/70 bg-white/76 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                placeholder="Jan Novák"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">E-mail</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={event => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-2xl border border-white/70 bg-white/76 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                placeholder="vas@email.cz"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Heslo</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={event => setForm({ ...form, password: event.target.value })}
                  className="w-full rounded-2xl border border-white/70 bg-white/76 px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)]"
                  placeholder="Minimálně 6 znaků"
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

            <label className="flex cursor-pointer items-center gap-3 rounded-[22px] border border-white/65 bg-white/60 px-4 py-3 text-sm text-[var(--text-secondary)]">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_24px_54px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Vytvářím účet…' : 'Spustit workspace zdarma'}
              {!loading ? <ArrowRight size={16} /> : null}
            </button>
          </form>

          <div className="mt-6 rounded-[24px] border border-white/70 bg-white/60 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Po registraci tě buď rovnou přihlásíme</p>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  nebo tě bezpečně pošleme na login s už připraveným účtem
                </p>
              </div>
            </div>
          </div>

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
