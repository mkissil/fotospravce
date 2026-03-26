'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Users, FileText, PenTool, Image, BarChart3, Check, ArrowRight, Play, Mail, CreditCard, Smartphone, ChevronRight } from 'lucide-react';

const stagger = { initial: {}, animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

const features = [
  { icon: Camera, title: 'Kanban zakázek', desc: 'Přetahuj zakázky od poptávky po odevzdání. Žádná ti neuteče.' },
  { icon: Users, title: 'Databáze klientů', desc: 'Všechny kontakty na jednom místě. Zadej IČO — zbytek doplníme z ARES.' },
  { icon: FileText, title: 'České faktury', desc: 'Faktura s QR kódem na 2 kliknutí. Automatické hlídání splatnosti.' },
  { icon: PenTool, title: 'Smlouvy s e-podpisem', desc: 'Pošli smlouvu klientovi. Podepíše z mobilu za 30 sekund.' },
  { icon: Image, title: 'Galerie s výběrem', desc: 'Nahraj fotky, pošli odkaz. Klient vybere své oblíbené.' },
  { icon: BarChart3, title: 'Přehled financí', desc: 'Kolik vyděláváš, kolik ti dluží, jaký máš konverzní poměr.' },
];

const plans = [
  { name: 'Začátečník', price: 249, priceYearly: 199, features: ['50 klientů, 10 zakázek/měs', 'Faktury s QR platbou', 'Základní kalendář', '2 GB úložiště'] },
  { name: 'Profesionál', price: 449, priceYearly: 359, popular: true, features: ['Neomezení klienti a zakázky', 'Smlouvy s e-podpisem', 'Galerie s výběrem fotek', 'Automatické emaily', 'Statistiky a reporty', '10 GB úložiště'] },
  { name: 'Studio', price: 799, priceYearly: 639, features: ['Vše z Profesionál', '50 GB úložiště', 'Vlastní branding na galeriích', 'Prioritní podpora', 'Export pro účetní'] },
];

const testimonials = [
  { quote: 'Od té doby co používám FotoSprávce, nechybí mi žádná zakázka.', name: 'Jana K.', role: 'svatební fotografka' },
  { quote: 'Faktury mám hotové za minutu místo hodiny.', name: 'Martin P.', role: 'portrétní fotograf' },
  { quote: 'Klienti jsou nadšení z online galerií.', name: 'Tereza S.', role: 'rodinná fotografka' },
];

export default function LandingPage() {
  const [yearly, setYearly] = useState(false);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* HEADER */}
      <motion.nav
        className="sticky top-0 z-50 border-b border-transparent bg-[var(--bg)]/80 backdrop-blur-lg transition-all"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold font-serif text-[var(--text)]">
            Foto<span className="text-[var(--accent)]">Správce</span>
          </span>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#funkce" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Funkce</a>
            <a href="#cenik" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Ceník</a>
            <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Přihlásit se</Link>
            <Link href="/register" className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98]">
              Začít zdarma <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-28">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-sm text-[var(--text-secondary)] mb-6 shadow-sm">
              <span>🇨🇿</span> Jediný CRM v češtině pro fotografy
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-bold leading-[1.1] tracking-tight font-serif md:text-6xl">
              Méně papírování.<br /><span className="text-[var(--accent)]">Více focení.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
              Klienti, zakázky, faktury, smlouvy a galerie — vše na jednom místě.
              Jediný CRM v češtině, vytvořený přímo pro české fotografy.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--accent)]/20">
                Vyzkoušej 14 dní zdarma <ArrowRight size={16} />
              </Link>
              <a href="#funkce"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-6 py-3.5 font-medium text-[var(--text)] transition-all hover:bg-[var(--bg-hover)]">
                <Play size={16} className="text-[var(--accent)]" /> Podívej se jak to funguje
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-sm text-[var(--text-muted)]">
              Bez kreditní karty · Zrušíš kdykoliv
            </motion.p>
          </motion.div>

          <motion.div style={{ y: mockupY }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.7 }}>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xl shadow-black/5">
              <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF6259]" /><div className="h-2.5 w-2.5 rounded-full bg-[#FFBF2E]" /><div className="h-2.5 w-2.5 rounded-full bg-[#29CE42]" />
                <span className="ml-3 text-[10px] text-[var(--text-muted)]">FotoSprávce — Přehled</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5 mb-4">
                {[{ v: '12', l: 'Zakázek' }, { v: '47 500', l: 'Příjem Kč' }, { v: '1', l: 'Neuhrazená' }, { v: '8', l: 'Klientů' }].map((s, i) => (
                  <div key={i} className="rounded-xl bg-[var(--bg)] p-2.5 text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">{s.l}</div>
                    <div className="mt-0.5 text-base font-bold text-[var(--text)] font-mono">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {['Poptávka', 'Nabídka', 'Potvrzeno', 'Focení'].map((s, i) => (
                  <div key={s} className="flex-1 rounded-xl bg-[var(--bg)] p-2">
                    <div className="text-[8px] font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">{s}</div>
                    {i < 3 && <div className="h-7 rounded-lg bg-[var(--accent-light)] border border-[var(--accent)]/10 mb-1.5" />}
                    {i < 2 && <div className="h-7 rounded-lg bg-[var(--purple-light)] border border-[var(--purple)]/10" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-white py-20 border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div className="grid gap-5 md:grid-cols-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: Mail, text: 'Poptávka přijde a ty ji najdeš až za týden v emailu' },
              { icon: CreditCard, text: 'Faktura po splatnosti, ale ty si ani nevšiml/a' },
              { icon: Smartphone, text: 'Excel na telefonu, Google kalendář, Fakturoid, WhatsApp... chaos' },
            ].map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl bg-[var(--bg)] border border-[var(--border-light)] p-6 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--danger-light)]">
                  <p.icon size={20} className="text-[var(--danger)]" />
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="mt-10 text-center text-xl font-semibold text-[var(--text)]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Přesně proto jsme vytvořili <span className="text-[var(--accent)]">FotoSprávce</span>.
          </motion.p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="funkce" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-serif md:text-4xl">Vše co potřebuješ, na jednom místě</h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">Přestaň přepínat mezi deseti nástroji. FotoSprávce spojuje vše do jednoho.</p>
          </motion.div>
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}
                className="group rounded-2xl border border-[var(--border)] bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--accent)]/20">
                <div className="mb-4 inline-flex rounded-xl bg-[var(--accent-light)] p-3 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                  <f.icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-[var(--text)]">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24 border-y border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2 className="text-3xl font-bold text-center font-serif mb-16 md:text-4xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Jak to funguje
          </motion.h2>
          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="hidden md:block absolute top-6 left-[16.7%] right-[16.7%] h-[2px] bg-[var(--border)]" />
            {[
              { num: '1', icon: Mail, title: 'Přijde ti poptávka', desc: 'Automaticky se vytvoří zakázka v kanban nástěnce' },
              { num: '2', icon: PenTool, title: 'Pošli nabídku', desc: 'Smlouva, faktura a záloha — vše na pár kliknutí' },
              { num: '3', icon: Camera, title: 'Foť a předávej', desc: 'Sdílej galerii, dostaň zaplaceno, archivuj' },
            ].map((step, i) => (
              <motion.div key={step.num} className="text-center relative z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white text-lg font-bold shadow-lg shadow-[var(--accent)]/20">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2 className="text-3xl font-bold text-center font-serif mb-10 md:text-4xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Kolik tě stojí současný chaos?
          </motion.h2>
          <motion.div className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['CRM systém (HoneyBook)', '900 Kč'],
                  ['Fakturační software (Fakturoid)', '400 Kč'],
                  ['E-podpisy (DocuSign)', '500 Kč'],
                  ['Galerie pro klienty (Pixieset)', '350 Kč'],
                  ['Emailový marketing', '250 Kč'],
                ].map(([name, price]) => (
                  <tr key={name} className="border-b border-[var(--border-light)]">
                    <td className="px-6 py-3.5 text-[var(--text-secondary)]">{name}</td>
                    <td className="px-6 py-3.5 text-right font-mono text-[var(--text)]">{price}</td>
                  </tr>
                ))}
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <td className="px-6 py-3.5 font-semibold text-[var(--text)]">Celkem samostatně</td>
                  <td className="px-6 py-3.5 text-right font-mono font-bold text-[var(--danger)]">2 400+ Kč/měs</td>
                </tr>
                <tr className="bg-[var(--accent-light)]">
                  <td className="px-6 py-4 font-semibold text-[var(--accent)]">FotoSprávce — vše v jednom</td>
                  <td className="px-6 py-4 text-right font-mono">
                    <span className="line-through text-[var(--text-muted)] mr-2">2 400 Kč</span>
                    <span className="font-bold text-lg text-[var(--accent)]">449 Kč/měs</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
          <motion.p className="mt-6 text-center text-lg font-semibold text-[var(--text)]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Ušetři přes <span className="text-[var(--accent)]">23 000 Kč ročně</span>. A to nepočítáme čas.
          </motion.p>
        </div>
      </section>

      {/* PRICING */}
      <section id="cenik" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-serif md:text-4xl">Jednoduchý a transparentní ceník</h2>
          </motion.div>
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3 rounded-xl bg-white border border-[var(--border)] p-1">
              <button onClick={() => setYearly(false)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${!yearly ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)]'}`}>Měsíčně</button>
              <button onClick={() => setYearly(true)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${yearly ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)]'}`}>Ročně <span className="text-[10px] ml-1 opacity-80">ušetři 20%</span></button>
            </div>
          </div>
          <motion.div className="grid gap-5 md:grid-cols-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={fadeUp}
                className={`relative rounded-2xl border bg-white p-7 transition-all hover:shadow-lg ${plan.popular ? 'border-[var(--accent)] shadow-xl scale-[1.02]' : 'border-[var(--border)]'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">Nejoblíbenější</span>
                )}
                <h3 className="text-base font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono">{yearly ? plan.priceYearly : plan.price}</span>
                  <span className="text-[var(--text-secondary)] text-sm">Kč/měs</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={15} className="text-[var(--success)] flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/register"
                  className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${plan.popular ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent)]/20' : 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-hover)]'}`}>
                  Vyzkoušej zdarma
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">Všechny plány začínají 14denní zkušební verzí zdarma. Bez kreditní karty.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div className="grid gap-5 md:grid-cols-3" initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="text-sm text-[var(--text)] leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-sm font-bold text-[var(--accent)]">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GARANCE */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--success-light)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">30denní garance vrácení peněz</h3>
            <p className="mt-3 text-[var(--text-secondary)]">
              Pokud ti FotoSprávce neušetří alespoň 5 hodin měsíčně, vrátíme ti peníze. Bez otázek.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div className="rounded-3xl bg-[var(--accent-bg)] border border-[var(--accent)]/10 p-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold font-serif md:text-3xl">Přestaň ztrácet zakázky. Začni fotit.</h2>
            <p className="mt-3 text-[var(--text-secondary)]">Prvních 200 fotografů získá founding member cenu — navždy.</p>
            <Link href="/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--accent)]/20 text-lg">
              Vyzkoušej 14 dní zdarma <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-sm font-mono text-[var(--accent)] font-semibold">Zbývá 127 ze 200 míst</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-4">
          <div>
            <span className="text-lg font-bold font-serif">Foto<span className="text-[var(--accent)]">Správce</span></span>
            <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">CRM pro české fotografy. Klienti, zakázky, faktury, smlouvy a galerie na jednom místě.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider mb-3">Produkt</h4>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <a href="#funkce" className="block hover:text-[var(--text)]">Funkce</a>
              <a href="#cenik" className="block hover:text-[var(--text)]">Ceník</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider mb-3">Podpora</h4>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <a href="#" className="block hover:text-[var(--text)]">Kontakt</a>
              <a href="#" className="block hover:text-[var(--text)]">Nápověda</a>
              <a href="#" className="block hover:text-[var(--text)]">Podmínky</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider mb-3">Komunita</h4>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <a href="#" className="block hover:text-[var(--text)]">Instagram</a>
              <a href="#" className="block hover:text-[var(--text)]">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-10 pt-6 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] text-center">&copy; 2026 FotoSprávce. Vytvořeno v Praze pro české fotografy.</p>
        </div>
      </footer>
    </div>
  );
}
