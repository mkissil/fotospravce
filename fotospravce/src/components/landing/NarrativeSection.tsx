'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionIntro } from './SectionIntro';
import { audiences, flowPanels, productSignals, transformation } from './landing-data';

const viewport = { once: true, amount: 0.18 } as const;

export function NarrativeSection() {
  return (
    <>
      <section className="border-y border-white/50 bg-white/42 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {productSignals.map(item => (
            <motion.div
              key={item[0]}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="border-l border-[var(--border)] pl-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{item[0]}</p>
              <p className="mt-3 text-base leading-7 text-[var(--text)] sm:text-lg">{item[1]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="problem" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            kicker="Problém cílovky"
            title="Fotograf nehledá další appku. Hledá způsob, jak neztrácet klienty, detaily a peníze."
            description="Když se studio skládá z chatu, kalendáře, tabulek a poznámek, ztrácí se rychlost, jistota i profesionální dojem. Tohle je provozní problém, ne dekorativní."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {transformation.map(column => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className={`rounded-[34px] border p-7 sm:p-8 ${column.eyebrow === 'Dnes' ? 'border-[var(--border)] bg-white/55' : 'border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,245,236,0.84))] shadow-[0_30px_80px_-42px_rgba(34,21,15,0.28)]'}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{column.eyebrow}</p>
                <h3 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)]">{column.title}</h3>
                <div className="mt-6 space-y-4">
                  {column.points.map(point => (
                    <div key={point} className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
                        <Check size={14} />
                      </div>
                      <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y border-white/50 bg-white/44 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <SectionIntro
              kicker="Workflow"
              title="Člověk má bez textu chápat, že tohle je produkt pro fotografa."
              description="Proto hlavní stránka nestojí na obecných slibech. Stojí na objektech, které fotograf opravdu řeší každý týden: poptávka, zakázka, termín, faktura a přehled peněz."
            />

            <div className="mt-8 space-y-4">
              {[
                'rychlejší reakce na poptávku',
                'menší mentální chaos před focením',
                'vyšší jistota po odevzdání',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                    <Check size={13} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {flowPanels.map(panel => (
              <motion.div
                key={panel.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className="surface-panel-strong rounded-[34px] p-6 sm:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[0.32fr_0.68fr] md:items-start">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Krok {panel.step}</p>
                    <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
                      <panel.icon size={22} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)]">{panel.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">{panel.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {panel.meta.map(item => (
                        <span key={item} className="rounded-full border border-white/70 bg-white/74 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            kicker="Pro koho"
            title="Různé typy focení. Stejné jádro problému."
            description="Ať fotíš svatby, rodiny nebo brand, pořád řešíš stejné napětí: rychlá reakce, jasný termín, jistota ceny a klid po odevzdání."
            centered
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {audiences.map(item => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className="border-t border-[var(--border)] pt-6"
              >
                <h3 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--text)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
