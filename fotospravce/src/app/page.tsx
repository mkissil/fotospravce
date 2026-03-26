'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Camera,
  Check,
  Clock3,
  CreditCard,
  FileText,
  Mail,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { scaleIn, stagger, staggerItem } from '@/lib/animations';

type Card = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const viewport = { once: true, amount: 0.22 } as const;
const promisePills = ['14 dní zdarma', 'bez karty', 'v češtině', 'funguje i na mobilu'];

const painCards: Card[] = [
  {
    icon: Mail,
    title: 'Poptávka přijde do DM, e-mailu nebo WhatsAppu a ty už nevíš, kde je poslední verze.',
    desc: 'Každá minuta zpoždění snižuje šanci, že klient potvrdí právě tebe.',
  },
  {
    icon: Calendar,
    title: 'Termín je v kalendáři, cena v chatu, záloha v hlavě a detail zakázky v poznámkách.',
    desc: 'Před focením znovu skládáš celé studio dohromady místo toho, abys byl připravený.',
  },
  {
    icon: CreditCard,
    title: 'Po focení začíná druhý chaos: faktury, doplatky a přehled peněz žijí bokem.',
    desc: 'Hotová práce ještě neznamená zaplacená práce, a právě tady utíkají peníze i energie.',
  },
];

const valueCards: Card[] = [
  {
    icon: Target,
    title: 'Kupuješ výsledek, ne další dashboard',
    desc: 'Fotograf chce působit profesionálně, reagovat rychleji a mít víc zaplacených zakázek pod kontrolou.',
  },
  {
    icon: Sparkles,
    title: 'Vyšší jistota, že to zvládneš bez chaosu',
    desc: 'Na první obrazovce vidíš leady, potvrzené focení, dnešní termíny i faktury čekající na úhradu.',
  },
  {
    icon: Clock3,
    title: 'Nižší časová daň za každou zakázku',
    desc: 'Nehledáš v pěti nástrojích. Jednou zapisuješ klienta, zakázku, termín i finance a máš hotovo.',
  },
  {
    icon: Smartphone,
    title: 'Menší úsilí, větší klid',
    desc: 'Studio držíš pohromadě i z telefonu, takže nejsi odkázaný na večerní dohledávání detailů.',
  },
];

const modules: Card[] = [
  { icon: Users, title: 'Klientská karta', desc: 'Kontakty, poznámky, firma i historie spolupráce na jednom místě.' },
  { icon: Camera, title: 'Zakázkový pipeline', desc: 'Vidíš, co je poptávka, co je potvrzené a co čeká na focení.' },
  { icon: Calendar, title: 'Kalendář focení', desc: 'Nejbližší termíny a kapacitu studia čteš bez přepínání do další aplikace.' },
  { icon: CreditCard, title: 'Faktury a úhrady', desc: 'Fakturu navážeš na klienta i zakázku a okamžitě víš, co je paid a co ne.' },
  { icon: FileText, title: 'Detail zakázky', desc: 'Cena, záloha, lokalita, termín i stav zakázky drží pohromadě.' },
  { icon: BarChart3, title: 'Přehled studia', desc: 'Revenue, unpaid faktury a aktivní klienti máš v jedné vrstvě.' },
];

const audience = [
  {
    title: 'Svatební fotograf',
    desc: 'Potřebuješ rychle odpovědět na poptávku, držet termíny a neztratit kontrolu nad zálohami a doplatky.',
    bullets: ['poptávka → potvrzení → termín', 'záloha i doplatek pod kontrolou', 'rychlý přehled sezóny'],
  },
  {
    title: 'Portrétní a rodinný fotograf',
    desc: 'Máš víc menších zakázek, které musí běžet rychle, bez zdržení a bez zbytečné administrativy.',
    bullets: ['rychlé zakládání klientů', 'kalendář focení na první pohled', 'méně ručního dohledávání'],
  },
  {
    title: 'Brand a komerční focení',
    desc: 'Potřebuješ působit jistě před firmou, mít pořádek v kontaktech, termínech a vystavených fakturách.',
    bullets: ['firmy i kontakty v jedné kartě', 'přehled zakázek podle stavu', 'finance bez chaosu'],
  },
];

const offerItems = [
  'Celý workflow klient → zakázka → kalendář → faktura → přehled',
  'České prostředí pro fotografy a malá studia',
  'Vizuálně čitelný dashboard bez složitého nastavování',
  'Použitelné na desktopu i telefonu',
  '14 dní zdarma bez karty',
  'Okamžitý start bez agentury a bez technického člověka',
];

const plans = [
  {
    name: 'Začátečník',
    price: 249,
    yearlyPrice: 199,
    desc: 'Pro jednotlivce, kteří chtějí dostat poptávky, termíny a faktury pod kontrolu.',
    features: ['50 klientů', '10 zakázek / měsíc', 'kalendář focení', 'QR faktury'],
  },
  {
    name: 'Profesionál',
    price: 449,
    yearlyPrice: 359,
    desc: 'Nejsilnější poměr hodnoty a ceny pro aktivního fotografa nebo studio.',
    popular: true,
    features: ['neomezené zakázky', 'faktury bez limitu', 'detail klienta a zakázky', 'přehled revenue a unpaid'],
  },
  {
    name: 'Studio',
    price: 799,
    yearlyPrice: 639,
    desc: 'Pro vyšší objem zakázek a hlubší přehled nad výkonem studia.',
    features: ['rozšířený přehled týmu', 'prioritní podpora', 'pokročilé statistiky', 'pokročilé exporty'],
  },
];

const faqItems = [
  ['Je FotoSprávce jen pro svatební fotografy?', 'Ne. Funguje pro svatby, portréty, rodiny i brand focení. Pořád řešíš stejné jádro: klienta, termín, zakázku a peníze.'],
  ['Musím zadávat kartu hned na začátku?', 'Nemusíš. Hlavní nabídka je 14 dní zdarma bez karty, takže si můžeš projít celé workflow bez tlaku.'],
  ['Funguje to i na telefonu?', 'Ano. Landing i dashboard jsou navržené responzivně, aby šly používat v terénu i mezi foceními.'],
  ['Co když už mám část klientů jinde?', 'Nejrychlejší cesta je začít novými zakázkami a stávající klienty doplňovat postupně. Důležité je, že nové věci už neskončí v chaosu.'],
];

function SectionIntro({
  kicker,
  title,
  description,
  centered = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`section-kicker ${centered ? 'justify-center' : ''}`}>
        <span className="eyebrow-line" />
        {kicker}
      </div>
      <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.045em] text-[var(--text)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">{description}</p> : null}
    </div>
  );
}

export default function LandingPage() {
  const [yearly, setYearly] = useState(false);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <div className="min-h-screen overflow-hidden">
      <motion.header
        className="sticky top-0 z-50 border-b border-white/45 bg-[rgba(251,246,239,0.74)] backdrop-blur-xl"
        initial={{ y: -16, opacity: 0 }}
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
                CRM a workflow pro fotografy
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/login" className="rounded-full border border-white/70 bg-white/65 px-3 py-2 text-xs font-semibold text-[var(--text)]">
              Login
            </Link>
            <Link href="/register" className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff946b)] px-3 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_-22px_rgba(214,93,56,0.95)]">
              Start <ArrowRight size={13} />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#problem" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Problém
            </a>
            <a href="#produkt" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Produkt
            </a>
            <a href="#offer" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)]">
              Nabídka
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
        <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 md:pt-20 lg:pb-24">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
              <motion.div variants={staggerItem} className="section-kicker">
                <span className="eyebrow-line" />
                Český systém pro fotografy a malá studia
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="mt-6 max-w-4xl text-balance font-serif text-[3rem] font-semibold leading-[0.9] tracking-[-0.055em] text-[var(--text)] sm:text-6xl xl:text-[5.5rem]"
              >
                Více zakázek pod kontrolou. Méně chaosu mezi Instagramem, e-mailem a Excelem.
              </motion.h1>
              <motion.p variants={staggerItem} className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-xl sm:leading-8">
                FotoSprávce je CRM a studio workflow pro fotografy, kteří chtějí reagovat rychle, působit profesionálně a mít klienty,
                termíny i faktury konečně v jednom systému. Neprodává další software. Prodává klid, rychlost a přehled.
              </motion.p>
              <motion.div variants={staggerItem} className="mt-7 flex flex-wrap gap-2.5">
                {promisePills.map(item => (
                  <span key={item} className="rounded-full border border-white/70 bg-white/65 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-[0_16px_32px_-24px_rgba(34,21,15,0.3)]">
                    {item}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff9369)] px-7 py-4 text-base font-semibold text-white shadow-[0_28px_58px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 sm:w-auto">
                  Začít 14 dní zdarma <ArrowRight size={18} />
                </Link>
                <a href="#produkt" className="surface-panel inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-[var(--text)] hover:-translate-y-0.5 sm:w-auto">
                  <Play size={17} className="text-[var(--accent)]" />
                  Podívat se na produkt
                </a>
              </motion.div>
              <motion.div variants={staggerItem} className="mt-10 grid gap-3">
                {[
                  ['V jednom místě', 'klient → zakázka → faktura'],
                  ['Pro koho', 'svatby, portréty, rodiny, brand'],
                  ['Hlavní výsledek', 'víc klidu a víc kontroly nad studiem'],
                ].map(item => (
                  <div key={item[0]} className="surface-panel rounded-[22px] p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{item[0]}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text)] sm:text-base">{item[1]}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: mockupY }}
              variants={scaleIn}
              initial="initial"
              animate="animate"
              className="surface-panel-strong ambient-grid relative overflow-hidden rounded-[30px] p-4 sm:rounded-[38px] sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,93,56,0.14),transparent_34%)]" />
              <div className="relative space-y-4">
                <div className="surface-panel-dark rounded-[24px] p-4 text-white sm:rounded-[30px] sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Studio cockpit</p>
                      <p className="mt-2 text-xl font-semibold tracking-[-0.02em]">Všechno důležité na jednom místě</p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/72">svatba · portrét · brand</div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      ['Aktivní klienti', '84'],
                      ['Zakázky tento měsíc', '17'],
                      ['Čeká na úhradu', '31 500 Kč'],
                    ].map(item => (
                      <div key={item[0]} className="rounded-[20px] border border-white/10 bg-white/6 p-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/52">{item[0]}</p>
                        <p className="mt-3 font-mono text-2xl font-bold">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
                  <div className="surface-panel rounded-[24px] p-4 sm:rounded-[30px] sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Zakázkový pipeline</p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--text)]">Kdo poptal, kdo potvrdil, kdo čeká</p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)]">
                        <Camera size={18} />
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-4">
                      {[
                        ['Poptávka', '08', 'bg-[rgba(22,18,15,0.08)]'],
                        ['Nabídka', '05', 'bg-[rgba(22,18,15,0.12)]'],
                        ['Potvrzeno', '09', 'bg-[var(--accent)]'],
                        ['Focení', '03', 'bg-[var(--purple)]'],
                      ].map(item => (
                        <div key={item[0]} className="rounded-[20px] border border-white/70 bg-white/78 p-4">
                          <div className={`h-2 w-10 rounded-full ${item[2]}`} />
                          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{item[0]}</p>
                          <p className="mt-2 font-mono text-2xl font-bold text-[var(--text)]">{item[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="surface-panel rounded-[24px] p-4 sm:rounded-[30px] sm:p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Dnešní rytmus</p>
                      <div className="mt-4 space-y-3">
                        {[
                          ['09:00', 'Rodinné focení', 'Stromovka · klient potvrzený'],
                          ['13:30', 'Brand content', 'Praha 7 · čeká finální brief'],
                          ['18:00', 'Zkontrolovat fakturu', 'doplatek za svatbu · 12 500 Kč'],
                        ].map(item => (
                          <div key={item[0]} className="flex items-start gap-4 rounded-[20px] border border-white/70 bg-white/80 p-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-bg)] font-mono text-sm font-bold text-[var(--accent)]">
                              {item[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[var(--text)]">{item[1]}</p>
                              <p className="mt-1 text-sm text-[var(--text-secondary)]">{item[2]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="surface-panel-dark rounded-[24px] p-4 text-white sm:rounded-[30px] sm:p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">Přehled cashflow</p>
                      <p className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Víš, co studio vydělalo a co ještě visí ve vzduchu</p>
                      <div className="mt-5 flex h-28 items-end gap-2">
                        {[36, 52, 47, 68, 64, 88].map((height, index) => (
                          <div key={height} className="flex-1 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.72))]" style={{ height: `${height}%`, opacity: index === 5 ? 1 : 0.42 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Jedna vrstva pro studio', '1 místo', 'kam patří klient, zakázka, termín i faktura'],
              ['Bez onboardingového tření', '14 dní', 'zdarma bez karty a bez složitého startu'],
              ['Jasné pro cílovku', 'CZ', 'jazyk, struktura a logika pro české fotografy'],
              ['Hlavní přínos', 'méně chaosu', 'více času na focení, editaci a klientský servis'],
            ].map((item, index) => (
              <motion.div key={item[0]} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={viewport} className="surface-panel rounded-[30px] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{item[0]}</p>
                <p className="mt-4 font-mono text-4xl font-bold text-[var(--text)]">{item[1]}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item[2]}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="problem" className="border-y border-white/50 bg-white/45 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              kicker="Problém cílovky"
              title="Fotograf nehledá další appku. Hledá způsob, jak neztrácet klienty, detaily a peníze."
              description="Tohle není problém designu. Tohle je problém provozu. Když se studio skládá z chatu, kalendáře, Excelu a poznámek, ztrácí se rychlost, jistota i profesionální dojem."
              centered
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {painCards.map(card => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="surface-panel rounded-[32px] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--danger-light)] text-[var(--danger)]">
                    <card.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              kicker="Hormozi logika"
              title="Dobrá nabídka zvyšuje vnímaný výsledek a snižuje čas, nejistotu i námahu."
              description="Proto je landing postavený na tom, co fotograf opravdu chce koupit: více klidu, rychlejší reakci, lepší organizaci studia a jasný přehled nad penězi."
              centered
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {valueCards.map(card => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="surface-panel rounded-[30px] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
                    <card.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="produkt" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              kicker="Produkt"
              title="Na první obrazovce musí být jasné, že tohle je systém pro fotografa, ne generický CRM nástroj."
              description="Proto jsou v produktu vidět skutečné objekty fotografického provozu: klient, zakázka, termín, faktura, přehled výnosu a práce po splatnosti."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map(module => (
                <motion.div key={module.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="surface-panel rounded-[30px] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--accent-bg)] text-[var(--accent)]">
                    <module.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">{module.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{module.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/50 bg-white/45 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              kicker="Pro koho"
              title="Tvoje cílovka je různá jen navenek. Uvnitř ale chtějí všichni totéž: přehled, rychlost a profesionální proces."
              description="Ať fotíš svatby, rodiny nebo brand, pořád řešíš ten stejný provozní problém. Jen v jiném tempu a s jiným objemem zakázek."
              centered
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {audience.map(item => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="surface-panel rounded-[32px] p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text)]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.desc}</p>
                  <div className="mt-6 space-y-3">
                    {item.bullets.map(point => (
                      <div key={point} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--success-light)] text-[var(--success)]">
                          <Check size={13} />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="surface-panel-dark relative overflow-hidden rounded-[34px] p-6 text-white sm:rounded-[44px] sm:p-10">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[var(--accent)]/24 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
                <div>
                  <div className="section-kicker border-white/10 bg-white/10 text-white/75">
                    <span className="eyebrow-line bg-white/24" />
                    Hlavní nabídka
                  </div>
                  <h2 className="mt-7 max-w-3xl font-serif text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl md:text-5xl">
                    14 dní zdarma, celý workflow k dispozici a nulové tření na startu.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                    To je nabídka, která má pro fotografa smysl: může si osahat celý provoz studia bez karty, bez složité implementace a bez pocitu,
                    že si kupuje další vrstvu chaosu.
                  </p>
                  <div className="mt-8 space-y-3">
                    {offerItems.map(item => (
                      <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-6 text-white/78">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--text)]">
                          <Check size={13} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-panel rounded-[28px] p-5 text-[var(--text)] sm:rounded-[34px] sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Proč to prodává</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Protože fotograf okamžitě chápe, co získá</h3>
                  <div className="mt-6 space-y-4">
                    {[
                      ['Vyšší vnímaná profesionalita', 'Klient rychleji cítí, že tvoje studio má proces a že jsi spolehlivý.'],
                      ['Méně mentálního chaosu', 'Víš, co se děje s každou zakázkou, aniž bys přepínal mezi pěti okny.'],
                      ['Jasnější návrat z ceny', 'Stačí zachráněná poptávka nebo včas vystavená faktura a nástroj obhajuje sám sebe.'],
                    ].map(item => (
                      <div key={item[0]} className="rounded-[24px] border border-white/70 bg-white/74 p-5">
                        <p className="text-base font-semibold text-[var(--text)]">{item[0]}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item[1]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,var(--accent),#ff956f)] px-5 py-4 text-base font-semibold text-white shadow-[0_24px_48px_-28px_rgba(214,93,56,0.95)]">
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

        <section id="cenik" className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              kicker="Ceník"
              title="Cenově malé rozhodnutí. Provozní rozdíl každý týden."
              description="Tady nekupuješ další náklad. Kupuješ rychlost, přehled a menší provozní ztráty."
              centered
            />
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
                <div key={plan.name} className={`relative rounded-[32px] p-[1px] ${plan.popular ? 'bg-[linear-gradient(180deg,rgba(214,93,56,0.72),rgba(255,255,255,0.44))]' : 'bg-white/44'}`}>
                  <div className="surface-panel h-full rounded-[31px] p-7">
                    {plan.popular ? <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,var(--accent),#ff956f)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Nejlepší poměr hodnoty</span> : null}
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
                    <Link href="/register" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold ${plan.popular ? 'bg-[linear-gradient(135deg,var(--accent),#ff956f)] text-white shadow-[0_24px_48px_-28px_rgba(214,93,56,0.95)]' : 'surface-panel text-[var(--text)]'}`}>
                      Vyzkoušet zdarma <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionIntro kicker="FAQ" title="Námitky, které musí landing page vyřešit dřív, než se člověk proklikne na registraci." centered />
            <div className="mt-12 space-y-4">
              {faqItems.map(item => (
                <motion.details key={item[0]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} className="surface-panel group rounded-[28px] p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold tracking-[-0.02em] text-[var(--text)] [&::-webkit-details-marker]:hidden">
                    <span>{item[0]}</span>
                    <span className="rounded-full bg-[var(--accent-bg)] px-3 py-1 text-sm font-semibold text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{item[1]}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="surface-panel-dark relative overflow-hidden rounded-[34px] p-6 text-white sm:rounded-[44px] sm:p-12">
              <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-[var(--accent)]/22 blur-3xl" />
              <div className="relative">
                <div className="section-kicker border-white/10 bg-white/10 text-white/75">
                  <span className="eyebrow-line bg-white/24" />
                  Poslední call
                </div>
                <h2 className="mt-7 max-w-3xl font-serif text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl md:text-5xl">
                  Jestli ti stačí jediná ztracená poptávka nebo opožděná faktura, aby tě chaos stál víc než software, je čas to zjednodušit.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  Stránka teď říká jasně: co to je, pro koho to je, co cílovka získá a proč má smysl začít právě teď.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[var(--text)] shadow-[0_24px_50px_-30px_rgba(255,255,255,0.55)] hover:-translate-y-0.5 sm:w-auto">
                    Začít zdarma <ArrowRight size={18} />
                  </Link>
                  <Link href="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm text-white/78 sm:w-auto">
                    Přihlásit se do dashboardu
                  </Link>
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
              Studio OS pro české fotografy. Klienti, zakázky, kalendář a faktury v jednom jasně čitelném systému.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Obsah</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <a href="#problem" className="block hover:text-[var(--text)]">Problém</a>
              <a href="#produkt" className="block hover:text-[var(--text)]">Produkt</a>
              <a href="#offer" className="block hover:text-[var(--text)]">Nabídka</a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Co fotograf chce</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p>rychle reagovat</p>
              <p>mít pořádek v termínech</p>
              <p>vidět peníze a faktury</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Akce</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <Link href="/register" className="block hover:text-[var(--text)]">Začít zdarma</Link>
              <Link href="/login" className="block hover:text-[var(--text)]">Přihlásit se</Link>
              <p>14 dní zdarma bez karty</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
