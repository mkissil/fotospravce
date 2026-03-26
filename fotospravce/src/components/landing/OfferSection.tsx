'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { SectionIntro } from './SectionIntro';
import { faqItems, offerRows, plans, valueCards } from './landing-data';

const viewport = { once: true, amount: 0.18 } as const;

export function OfferSection({
  yearly,
  onToggleYearly,
}: {
  yearly: boolean;
  onToggleYearly: (value: boolean) => void;
}) {
  return (
    <>
      <section id="offer" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="surface-panel-dark relative overflow-hidden rounded-[40px] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute -right-14 top-0 h-52 w-52 rounded-full bg-[var(--accent)]/22 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
              <div>
                <div className="section-kicker border-white/10 bg-white/10 text-white/75">
                  <span className="eyebrow-line bg-white/24" />
                  Hlavní nabídka
                </div>
                <h2 className="mt-7 max-w-3xl font-serif text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl md:text-5xl">
                  14 dní zdarma. Celý workflow k dispozici. Minimum tření na startu.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
                  To je nabídka, která dává fotografovi smysl. Může si osahat celý provoz studia bez karty, bez agentury a bez pocitu, že kupuje další vrstvu chaosu.
                </p>

                <div className="mt-8 space-y-3">
                  {offerRows.map(item => (
                    <div key={item} className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-6 text-white/78">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--text)]">
                        <Check size={13} />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-panel rounded-[32px] p-5 text-[var(--text)] sm:p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {valueCards.map(item => (
                    <div key={item[0]} className="rounded-[24px] border border-white/70 bg-white/76 p-5">
                      <p className="text-base font-semibold text-[var(--text)]">{item[0]}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item[1]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff956f)] px-5 py-4 text-base font-semibold text-white shadow-[0_24px_48px_-28px_rgba(214,93,56,0.95)]"
                  >
                    Spustit 14 dní zdarma <ArrowRight size={18} />
                  </Link>
                  <div className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-secondary)]">
                    <ShieldCheck size={17} className="text-[var(--success)]" />
                    Bez karty. Bez složitého nastavování. Bez dalšího balastu.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cenik" className="border-y border-white/50 bg-white/42 px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            kicker="Ceník"
            title="Cenově malé rozhodnutí. Provozně velký rozdíl každý týden."
            description="Nekupuješ další náklad. Kupuješ rychlost, přehled a menší provozní ztráty."
            centered
          />

          <div className="mt-10 flex justify-center">
            <div className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-full p-1.5 sm:w-auto">
              <button
                onClick={() => onToggleYearly(false)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${!yearly ? 'bg-[var(--text)] text-white' : 'text-[var(--text-secondary)]'}`}
              >
                Měsíčně
              </button>
              <button
                onClick={() => onToggleYearly(true)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${yearly ? 'bg-[var(--text)] text-white' : 'text-[var(--text-secondary)]'}`}
              >
                Ročně
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map(plan => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className={`relative rounded-[34px] p-[1px] ${plan.popular ? 'bg-[linear-gradient(180deg,rgba(214,93,56,0.76),rgba(255,255,255,0.46))]' : 'bg-white/44'}`}
              >
                <div className="surface-panel h-full rounded-[33px] p-7">
                  {plan.popular ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff956f)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      Nejsilnější volba
                    </span>
                  ) : null}

                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{plan.name}</p>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="font-mono text-5xl font-bold text-[var(--text)]">{yearly ? plan.yearlyPrice : plan.price}</span>
                    <span className="pb-1 text-sm text-[var(--text-secondary)]">Kč / měsíc</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{plan.desc}</p>

                  <div className="mt-7 space-y-3">
                    {plan.features.map(feature => (
                      <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                          <Check size={13} />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/register"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold ${plan.popular ? 'bg-[linear-gradient(135deg,var(--accent),#ff956f)] text-white shadow-[0_24px_48px_-28px_rgba(214,93,56,0.95)]' : 'surface-panel text-[var(--text)]'}`}
                  >
                    Vyzkoušet zdarma <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionIntro
            kicker="FAQ"
            title="Námitky, které má landing page vyřešit dřív, než člověk klikne na registraci."
            centered
          />

          <div className="mt-12 space-y-4">
            {faqItems.map(item => (
              <motion.details
                key={item[0]}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                className="surface-panel group rounded-[30px] p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold tracking-[-0.02em] text-[var(--text)] [&::-webkit-details-marker]:hidden">
                  <span>{item[0]}</span>
                  <span className="rounded-full bg-[var(--accent-bg)] px-3 py-1 text-sm font-semibold text-[var(--accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{item[1]}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="surface-panel-dark relative overflow-hidden rounded-[40px] p-6 text-white sm:p-10">
            <div className="absolute -right-8 top-0 h-44 w-44 rounded-full bg-[var(--accent)]/22 blur-3xl" />
            <div className="relative">
              <div className="section-kicker border-white/10 bg-white/10 text-white/75">
                <span className="eyebrow-line bg-white/24" />
                Poslední call
              </div>
              <h2 className="mt-7 max-w-4xl font-serif text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl md:text-5xl">
                Jestli stačí jediná ztracená poptávka nebo opožděná faktura, aby tě chaos stál víc než software, je čas to zjednodušit.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                Teď už je z první stránky jasné, co produkt je, pro koho je a proč dává ekonomický i provozní smysl právě fotografům.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/register"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[var(--text)] shadow-[0_24px_50px_-30px_rgba(255,255,255,0.55)] hover:-translate-y-0.5 sm:w-auto"
                >
                  Založit workspace zdarma <ArrowRight size={18} />
                </Link>
                <Link href="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm text-white/78 sm:w-auto">
                  Přihlásit se do dashboardu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
