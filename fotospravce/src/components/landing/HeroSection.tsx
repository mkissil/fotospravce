'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Play } from 'lucide-react';
import { scaleIn, stagger, staggerItem } from '@/lib/animations';
import {
  heroBars,
  heroMetrics,
  heroPipeline,
  heroTimeline,
  promisePills,
} from './landing-data';

export function HeroSection() {
  const { scrollY } = useScroll();
  const stageY = useTransform(scrollY, [0, 900], [0, -56]);
  const orbitY = useTransform(scrollY, [0, 900], [0, -24]);

  return (
    <section className="poster-stage relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-20 md:pt-16 lg:min-h-[calc(100svh-5rem)] lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,186,135,0.24),transparent_32%),radial-gradient(circle_at_78%_14%,rgba(71,99,243,0.18),transparent_24%),linear-gradient(180deg,#fbf6ef_0%,#f4ece2_55%,#efe4d4_100%)]" />
      <div className="aurora-orb absolute -left-16 top-32 h-56 w-56 rounded-full bg-[rgba(214,93,56,0.18)] blur-3xl" />
      <div className="aurora-orb absolute right-[-3rem] top-10 h-64 w-64 rounded-full bg-[rgba(71,99,243,0.14)] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.div variants={staggerItem} className="section-kicker">
            <span className="eyebrow-line" />
            český operating system pro fotografy
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="mt-7 max-w-4xl text-balance font-serif text-[3.2rem] font-semibold leading-[0.88] tracking-[-0.06em] text-[var(--text)] sm:text-6xl xl:text-[6.2rem]"
          >
            Poptávka v DM. Termín v kalendáři. Faktura v systému. Ne v hlavě.
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-xl sm:leading-8">
            FotoSprávce spojuje klienty, zakázky, termíny a peníze do jedné vrstvy, která je čitelná během pár sekund.
            Neprodává další software. Prodává klid, rychlost a profesionální proces.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-2.5">
            {promisePills.map(item => (
              <span
                key={item}
                className="rounded-full border border-white/70 bg-white/65 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-[0_16px_32px_-24px_rgba(34,21,15,0.3)]"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={staggerItem} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-7 py-4 text-base font-semibold text-white shadow-[0_28px_60px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 sm:w-auto"
            >
              Spustit 14 dní zdarma <ArrowRight size={18} />
            </Link>
            <a
              href="#workflow"
              className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-[var(--text)] hover:-translate-y-0.5 sm:w-auto"
            >
              <Play size={17} className="text-[var(--accent)]" />
              Podívat se na workflow
            </a>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-9 max-w-2xl border-t border-[var(--border)] pt-6">
            <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Stačí jedna zachráněná poptávka nebo jedna včas vystavená faktura a nástroj se často obhájí sám.
            </p>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: stageY }} initial="initial" animate="animate" variants={scaleIn} className="relative">
          <div className="surface-panel-dark relative overflow-hidden rounded-[36px] p-5 text-white sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,93,56,0.2),transparent_34%)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">Studio cockpit</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">První obrazovka, která sama vysvětlí produkt</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/70">
                  svatby · portréty · brand
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
                <div className="rounded-[30px] border border-white/10 bg-white/8 p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {heroMetrics.map(item => (
                      <div key={item[0]} className="rounded-[22px] border border-white/10 bg-black/10 p-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">{item[0]}</p>
                        <p className="mt-3 font-mono text-2xl font-bold">{item[1]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-4">
                    {heroPipeline.map(item => (
                      <div key={item[0]} className="rounded-[22px] border border-white/10 bg-black/10 p-4">
                        <div className={`h-2 w-10 rounded-full ${item[2]}`} />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">{item[0]}</p>
                        <p className="mt-2 font-mono text-2xl font-bold">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[30px] border border-white/10 bg-white/8 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">Dnešní rytmus</p>
                    <div className="mt-4 space-y-3">
                      {heroTimeline.map(item => (
                        <div key={item[0]} className="flex items-start gap-4 rounded-[22px] border border-white/10 bg-black/10 p-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-mono text-sm font-bold text-white">
                            {item[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item[1]}</p>
                            <p className="mt-1 text-sm text-white/64">{item[2]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[30px] border border-white/10 bg-white/8 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">Cashflow</p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">Víš, co je vydělané a co ještě visí ve vzduchu</p>
                    <div className="mt-5 flex h-28 items-end gap-2">
                      {heroBars.map((height, index) => (
                        <div
                          key={height}
                          className="flex-1 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.72))]"
                          style={{ height: `${height}%`, opacity: index === heroBars.length - 1 ? 1 : 0.45 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.18em] text-white/54">
                <span>lead</span>
                <span>zakázka</span>
                <span>kalendář</span>
                <span>faktura</span>
                <span>přehled</span>
              </div>
            </div>
          </div>

          <motion.div
            className="float-slow absolute -left-5 top-16 hidden w-44 rounded-[24px] border border-white/70 bg-white/86 p-4 shadow-[0_28px_70px_-36px_rgba(34,21,15,0.34)] lg:block"
            style={{ y: orbitY }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Klient</p>
            <p className="mt-3 text-base font-semibold text-[var(--text)]">Brand content / Novák Studio</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">kontakt, termín, nabídka i poznámka v jedné kartě</p>
          </motion.div>

          <motion.div
            className="float-slow-alt absolute -bottom-6 right-4 hidden w-48 rounded-[24px] border border-white/70 bg-white/88 p-4 shadow-[0_28px_70px_-36px_rgba(34,21,15,0.34)] lg:block"
            style={{ y: orbitY }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Faktura</p>
            <p className="mt-3 font-mono text-2xl font-bold text-[var(--text)]">18 000 Kč</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">navázaná na zakázku a hned viditelná v cashflow</p>
          </motion.div>

          <motion.div
            className="float-slow-alt absolute -right-2 top-10 hidden w-44 rounded-[24px] border border-white/70 bg-white/88 p-4 shadow-[0_28px_70px_-36px_rgba(34,21,15,0.34)] xl:block"
            style={{ y: orbitY }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
              <Calendar size={18} />
            </div>
            <p className="mt-4 text-base font-semibold text-[var(--text)]">23. června / 15:30</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">brand focení napojené na klienta, lokaci i cenu</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
