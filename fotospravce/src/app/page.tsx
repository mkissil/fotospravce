'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  Check,
  CreditCard,
  FileText,
  Mail,
  Play,
  ShieldCheck,
  Smartphone,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { scaleIn, stagger, staggerItem } from '@/lib/animations';

const features = [
  {
    icon: Camera,
    title: 'Zakázky v pohybu',
    desc: 'Pipeline, který ukazuje, co je poptávka, co čeká na potvrzení a co už míří k focení.',
  },
  {
    icon: Users,
    title: 'Klienti po ruce',
    desc: 'Kontakty, poznámky, firmy i historie spolupráce bez přepínání do dalších nástrojů.',
  },
  {
    icon: CreditCard,
    title: 'Faktury bez chaosu',
    desc: 'Přímo navázané na klienta a zakázku, takže okamžitě víš, co je vystavené a co čeká na úhradu.',
  },
  {
    icon: Calendar,
    title: 'Kalendář a přehled',
    desc: 'Termíny, finanční puls a poslední aktivita v jednom rytmu, který je čitelný na první pohled.',
  },
];

const proof = [
  { value: '1', label: 'systém místo pěti různých nástrojů' },
  { value: 'CZ', label: 'prostředí a logika pro české fotografy' },
  { value: '14 dnů', label: 'na vyzkoušení zdarma bez karty' },
  { value: '5h+', label: 'měsíčně zpět díky menšímu chaosu' },
];

const painPoints = [
  { icon: Mail, title: 'Poptávka zapadne v e-mailu' },
  { icon: CreditCard, title: 'Faktura po splatnosti uteče' },
  { icon: Smartphone, title: 'Kalendář a finance žijí jinde' },
];

const plans = [
  {
    name: 'Začátečník',
    price: 249,
    yearlyPrice: 199,
    features: ['50 klientů', '10 zakázek / měsíc', 'QR faktury', 'Kalendář focení'],
  },
  {
    name: 'Profesionál',
    price: 449,
    yearlyPrice: 359,
    popular: true,
    features: ['Neomezené zakázky', 'Faktury bez limitu', 'Detail klienta a zakázky', 'Automatizace a reporty'],
  },
  {
    name: 'Studio',
    price: 799,
    yearlyPrice: 639,
    features: ['Rozšířený přehled týmu', 'Prioritní podpora', 'Pokročilé statistiky', 'Pokročilé exporty'],
  },
];

export default function LandingPage() {
  const [yearly, setYearly] = useState(false);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 700], [0, -34]);

  return (
    <div className="min-h-screen overflow-hidden">
      <motion.header
        className="sticky top-0 z-50 border-b border-white/45 bg-[rgba(251,246,239,0.7)] backdrop-blur-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] text-sm font-bold text-white shadow-[0_18px_40px_-24px_rgba(214,93,56,0.95)] sm:h-11 sm:w-11 sm:text-base">
              F
            </div>
            <div>
              <p className="truncate font-serif text-lg font-semibold sm:text-xl">
                Foto<span className="text-[var(--accent)]">Správce</span>
              </p>
              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)] sm:block">
                CRM pro fotografy
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/login" className="rounded-full border border-white/70 bg-white/60 px-3 py-2 text-xs font-semibold text-[var(--text)]">
              Login
            </Link>
            <Link href="/register" className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-3 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_-22px_rgba(214,93,56,0.95)]">
              Start <ArrowRight size={13} />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#produkt" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Produkt
            </a>
            <a href="#cenik" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Ceník
            </a>
            <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Přihlásit se
            </Link>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_22px_48px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5">
              Začít zdarma <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      </motion.header>

      <main>
        <section className="px-4 pb-20 pt-14 sm:px-6 md:pt-24">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
              <motion.div variants={staggerItem} className="section-kicker">
                <span className="eyebrow-line" />
                Pro fotografy a malá studia
              </motion.div>
              <motion.h1 variants={staggerItem} className="mt-6 max-w-3xl text-balance font-serif text-[2.85rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text)] sm:mt-7 sm:text-6xl lg:text-[5.3rem]">
                O čem je web, pochopíš i bez čtení.
              </motion.h1>
              <motion.p variants={staggerItem} className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-xl sm:leading-8">
                Klient, termín, zakázka, faktura, přehled. FotoSprávce skládá každodenní workflow fotografa do jedné silné vrstvy, která je čitelná na první pohled.
              </motion.p>
              <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff9369)] px-7 py-4 text-base font-semibold text-white shadow-[0_26px_58px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 sm:w-auto">
                  Vyzkoušet 14 dnů zdarma <ArrowRight size={18} />
                </Link>
                <a href="#produkt" className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-[var(--text)] hover:-translate-y-0.5 sm:w-auto">
                  <Play size={17} className="text-[var(--accent)]" />
                  Podívat se, jak vypadá
                </a>
              </motion.div>
              <motion.div variants={staggerItem} className="mt-7 flex gap-3 overflow-x-auto pb-1 sm:mt-8 sm:flex-wrap">
                {['Klienti', 'Zakázky', 'Kalendář', 'Faktury', 'Přehled'].map(chip => (
                  <span key={chip} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-[0_16px_34px_-28px_rgba(36,24,17,0.42)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {chip}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div style={{ y: mockupY }} variants={scaleIn} initial="initial" animate="animate" className="surface-panel-strong ambient-grid relative overflow-hidden rounded-[28px] p-4 sm:rounded-[34px] sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,93,56,0.1),transparent_36%)]" />
              <div className="relative">
                <div className="surface-panel-dark rounded-[24px] p-4 text-white sm:rounded-[28px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">FotoSprávce</p>
                      <p className="mt-2 text-lg font-semibold">Přehled studia</p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/75">svatby · portréty</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: 'Klienti', value: '84' },
                      { label: 'Faktury', value: '12' },
                      { label: 'Termíny', value: '6' },
                    ].map(item => (
                      <div key={item.label} className="rounded-[18px] border border-white/10 bg-white/6 p-3 sm:rounded-2xl">
                        <p className="text-[11px] text-white/55">{item.label}</p>
                        <p className="mt-2 font-mono text-2xl font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <div className="surface-panel rounded-[24px] p-4 sm:rounded-[28px]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Kalendář dne</p>
                          <p className="mt-1 text-sm font-semibold text-[var(--text)]">Co tě čeká nejdřív</p>
                        </div>
                        <Calendar size={18} className="text-[var(--accent)]" />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {['09:00', '13:00', '18:00'].map((slot, index) => (
                          <div key={slot} className="overflow-hidden rounded-[18px] border border-white/70 bg-white/80 p-3 sm:rounded-[22px]">
                            <div className={`h-16 rounded-[14px] ${index === 0 ? 'bg-[linear-gradient(160deg,#2a211e,#9d6b55)]' : index === 1 ? 'bg-[linear-gradient(160deg,#3c425b,#c9ad95)]' : 'bg-[linear-gradient(160deg,#5a3828,#f0cfb6)]'}`} />
                            <p className="mt-3 text-xs font-semibold text-[var(--text)]">{slot}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="surface-panel rounded-[24px] p-4 sm:rounded-[28px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Workflow</p>
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                        {['Poptávka', 'Nabídka', 'Potvrzení', 'Focení', 'Faktura'].map((stage, index) => (
                          <div key={stage} className="min-w-[98px] rounded-[18px] border border-white/70 bg-white/72 px-3 py-3 sm:rounded-[22px]">
                            <div className={`h-2 w-8 rounded-full ${index === 2 ? 'bg-[var(--accent)]' : index === 3 ? 'bg-[var(--purple)]' : 'bg-[rgba(22,18,15,0.12)]'}`} />
                            <p className="mt-3 text-xs font-semibold text-[var(--text)]">{stage}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Camera, label: 'Svatba · 17. 6.', status: 'Potvrzeno', tone: 'bg-[var(--accent)]' },
                      { icon: FileText, label: 'Faktura · 12 500 Kč', status: 'Odesláno', tone: 'bg-[var(--purple)]' },
                      { icon: BarChart3, label: 'Přehled · měsíc', status: '47 500 Kč', tone: 'bg-[var(--success)]' },
                    ].map(item => (
                      <div key={item.label} className="surface-panel rounded-[24px] p-4 sm:rounded-[28px]">
                        <div className="flex items-start gap-3">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.tone} text-white shadow-[0_18px_34px_-22px_rgba(22,18,15,0.55)]`}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--text)]">{item.label}</p>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">{item.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="surface-panel-dark rounded-[24px] p-4 text-white sm:rounded-[28px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Příjem měsíce</p>
                      <p className="mt-2 font-mono text-3xl font-bold">47 500 Kč</p>
                      <div className="mt-4 flex h-24 items-end gap-2">
                        {[42, 56, 54, 74, 68, 92].map((height, index) => (
                          <div key={height} className="flex-1 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.72))]" style={{ height: `${height}%`, opacity: index === 5 ? 1 : 0.48 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            {proof.map((item, index) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="surface-panel rounded-[30px] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Na první pohled</p>
                <p className="mt-4 font-mono text-4xl font-bold text-[var(--text)]">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/50 bg-white/45 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="section-kicker justify-center">
                <span className="eyebrow-line" />
                Znáš ten chaos
              </div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl md:text-5xl">
                Problém je často vidět dřív, než ho stihneš pojmenovat.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {painPoints.map(item => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="surface-panel rounded-[32px] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--danger-light)] text-[var(--danger)]">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="produkt" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="section-kicker justify-center">
                <span className="eyebrow-line" />
                Produkt
              </div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl md:text-5xl">
                Už z rozložení je jasné, že jde o nástroj pro fotografické studio.
              </h2>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {features.map(feature => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="surface-panel rounded-[30px] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="cenik" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="section-kicker justify-center">
                <span className="eyebrow-line" />
                Ceník
              </div>
              <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-4xl md:text-5xl">
                Jednoduché plány. Výrazný rozdíl v tom, jak studio působí.
              </h2>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-full p-1.5 sm:w-auto">
                <button onClick={() => setYearly(false)} className={`rounded-full px-4 py-2 text-sm font-semibold ${!yearly ? 'bg-[var(--text)] text-white' : 'text-[var(--text-secondary)]'}`}>
                  Měsíčně
                </button>
                <button onClick={() => setYearly(true)} className={`rounded-full px-4 py-2 text-sm font-semibold ${yearly ? 'bg-[var(--text)] text-white' : 'text-[var(--text-secondary)]'}`}>
                  Ročně
                </button>
              </div>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map(plan => (
                <div key={plan.name} className={`relative rounded-[32px] p-[1px] ${plan.popular ? 'bg-[linear-gradient(180deg,rgba(214,93,56,0.65),rgba(255,255,255,0.45))]' : 'bg-white/40'}`}>
                  <div className="surface-panel h-full rounded-[31px] p-7">
                    {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff956f)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Nejoblíbenější</span>}
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{plan.name}</p>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="font-mono text-5xl font-bold text-[var(--text)]">{yearly ? plan.yearlyPrice : plan.price}</span>
                      <span className="pb-1 text-sm text-[var(--text-secondary)]">Kč / měsíc</span>
                    </div>
                    <ul className="mt-7 space-y-3">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                          <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                            <Check size={13} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold ${plan.popular ? 'bg-[linear-gradient(135deg,var(--accent),#ff956f)] text-white shadow-[0_24px_48px_-28px_rgba(214,93,56,0.95)]' : 'surface-panel text-[var(--text)]'}`}>
                      Vyzkoušet zdarma <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="surface-panel-dark relative overflow-hidden rounded-[30px] p-6 text-white sm:rounded-[40px] sm:p-12">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--accent)]/25 blur-3xl" />
              <div className="relative">
                <div className="section-kicker border-white/10 bg-white/10 text-white/72">
                  <span className="eyebrow-line bg-white/20" />
                  Poslední krok
                </div>
                <h2 className="mt-7 max-w-3xl font-serif text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                  Působit profesionálně ještě před první schůzkou by měla být samozřejmost.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
                  FotoSprávce je navržený tak, aby i člověk bez kontextu okamžitě poznal: tenhle nástroj patří fotografům.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[var(--text)] shadow-[0_24px_50px_-30px_rgba(255,255,255,0.55)] hover:-translate-y-0.5 sm:w-auto">
                    Vyzkoušet 14 dnů zdarma <ArrowRight size={18} />
                  </Link>
                  <div className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm text-white/74 sm:w-auto">
                    <ShieldCheck size={18} />
                    Bez karty. Bez složitého nastavování.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/45 bg-white/40 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl font-semibold text-[var(--text)]">
              Foto<span className="text-[var(--accent)]">Správce</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-secondary)]">
              Studio OS pro české fotografy. Klienti, zakázky, kalendář a faktury v jednom čitelném systému.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Produkt</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <a href="#produkt" className="block hover:text-[var(--text)]">Produkt</a>
              <a href="#cenik" className="block hover:text-[var(--text)]">Ceník</a>
              <p>Workflow pro fotografy</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Vizualita</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p>Klient → zakázka</p>
              <p>Kalendář → focení</p>
              <p>Faktura → úhrada</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Kontakt</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p>Instagram</p>
              <p>Facebook</p>
              <p>Vytvořeno v Praze pro české fotografy</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
