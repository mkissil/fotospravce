import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Calendar,
  Camera,
  CreditCard,
  Mail,
  Users,
} from 'lucide-react';

export type FlowPanel = {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  meta: string[];
};

export type PricingPlan = {
  name: string;
  price: number;
  yearlyPrice: number;
  desc: string;
  popular?: boolean;
  features: string[];
};

export const promisePills = ['14 dní zdarma', 'bez karty', 'česky', 'funguje i na mobilu'];

export const transformation = [
  {
    title: 'Bez FotoSprávce',
    eyebrow: 'Dnes',
    points: [
      'Poptávka přijde do DM, e-mailu nebo WhatsAppu a poslední verzi hledáš po paměti.',
      'Cena, termín a záloha žijí odděleně, takže se před focením skládá celá zakázka znovu.',
      'Po odevzdání nastává druhý chaos: faktura je jinde, doplatek v hlavě a cashflow bez rytmu.',
    ],
  },
  {
    title: 'S FotoSprávcem',
    eyebrow: 'Potom',
    points: [
      'Klient, zakázka, kalendář a faktura jsou v jedné linii, kterou přečteš během pár sekund.',
      'Každý další krok je jasný: kdo čeká na odpověď, kdo je potvrzený a co potřebuje tvoji pozornost.',
      'Studio působí profesionálně navenek a klidněji uvnitř, protože už nestojí na improvizaci.',
    ],
  },
] as const;

export const flowPanels: FlowPanel[] = [
  {
    step: '01',
    title: 'Poptávka a klient',
    desc: 'Jakmile někdo napíše, víš, kam ten kontakt patří. Ne do dalšího vlákna. Do systému.',
    icon: Mail,
    meta: ['kontakt', 'zdroj poptávky', 'poznámky'],
  },
  {
    step: '02',
    title: 'Zakázka a cena',
    desc: 'Cena, typ focení, lokalita, záloha a stav zakázky drží pohromadě místo toho, aby žily v chatu.',
    icon: Camera,
    meta: ['stav', 'cena', 'záloha'],
  },
  {
    step: '03',
    title: 'Termín a den focení',
    desc: 'Kalendář už není paralelní vesmír. Každý termín je napojený na konkrétního klienta a konkrétní práci.',
    icon: Calendar,
    meta: ['termín', 'lokalita', 'další krok'],
  },
  {
    step: '04',
    title: 'Faktura a cashflow',
    desc: 'Po odevzdání okamžitě víš, co je vystavené, co je zaplacené a co studio ještě čeká.',
    icon: CreditCard,
    meta: ['faktura', 'úhrada', 'cashflow'],
  },
];

export const productSignals = [
  ['Jeden workflow', 'klient → zakázka → kalendář → faktura'],
  ['Pro české fotografy', 'jazyk, logika a struktura bez generického SaaS balastu'],
  ['Smysl ceny', 'jedna zachráněná poptávka nebo včasná faktura často obhájí celý měsíc'],
  ['Na desktopu i telefonu', 'studio držíš pohromadě i mimo kancelář'],
] as const;

export const audiences = [
  {
    title: 'Svatební fotograf',
    desc: 'Potřebuje rychle reagovat, hlídat termíny, zálohy a doplatky napříč delším procesem.',
  },
  {
    title: 'Portréty a rodiny',
    desc: 'Potřebuje svižný provoz menších zakázek bez ručního dohledávání detailů a plateb.',
  },
  {
    title: 'Brand a obsah',
    desc: 'Potřebuje působit jistě před firmou a mít workflow i finance pod kontrolou v profesionální vrstvě.',
  },
] as const;

export const offerRows = [
  'Celý workflow klient → zakázka → kalendář → faktura → přehled',
  'České prostředí navržené pro fotografy a malá studia',
  'Silná první obrazovka, která sama vysvětlí, co produkt řeší',
  '14 dní zdarma bez karty a bez složitého onboardingu',
];

export const plans: PricingPlan[] = [
  {
    name: 'Začátečník',
    price: 249,
    yearlyPrice: 199,
    desc: 'Pro jednotlivce, kteří chtějí dostat klienty, termíny a faktury pod kontrolu.',
    features: ['50 klientů', '10 zakázek měsíčně', 'kalendář focení', 'QR faktury'],
  },
  {
    name: 'Profesionál',
    price: 449,
    yearlyPrice: 359,
    desc: 'Nejsilnější poměr hodnoty a ceny pro aktivního fotografa nebo menší studio.',
    popular: true,
    features: ['neomezené zakázky', 'faktury bez limitu', 'detail klienta a zakázky', 'přehled revenue a unpaid'],
  },
  {
    name: 'Studio',
    price: 799,
    yearlyPrice: 639,
    desc: 'Pro vyšší objem práce a hlubší přehled nad výkonem studia.',
    features: ['rozšířený přehled', 'prioritní podpora', 'pokročilé statistiky', 'pokročilé exporty'],
  },
] as const;

export const faqItems = [
  [
    'Je FotoSprávce jen pro svatební fotografy?',
    'Ne. Funguje pro svatby, portréty, rodiny i brand focení. Pořád řeší stejné jádro: klienta, termín, zakázku a peníze.',
  ],
  [
    'Musím zadávat kartu hned na začátku?',
    'Nemusíš. Hlavní nabídka je 14 dní zdarma bez karty, takže si můžeš projít celý workflow bez tlaku.',
  ],
  [
    'Funguje to i na telefonu?',
    'Ano. Landing i dashboard jsou navržené responzivně, aby šly používat v terénu i mezi foceními.',
  ],
  [
    'Co když už část klientů vedu jinde?',
    'Nejrychlejší cesta je začít novými zakázkami a stávající klienty doplňovat postupně. Důležité je, že nové věci už neskončí v chaosu.',
  ],
] as const;

export const heroMetrics = [
  ['Aktivní klienti', '84'],
  ['Zakázky tento měsíc', '17'],
  ['Čeká na úhradu', '31 500 Kč'],
] as const;

export const heroPipeline = [
  ['Poptávka', '08', 'bg-white/28'],
  ['Nabídka', '05', 'bg-white/38'],
  ['Potvrzeno', '09', 'bg-[var(--accent)]'],
  ['Focení', '03', 'bg-[var(--purple)]'],
] as const;

export const heroTimeline = [
  ['09:00', 'Rodinné focení', 'Stromovka · klient potvrzený'],
  ['13:30', 'Brand content', 'Praha 7 · čeká finální brief'],
  ['18:00', 'Doplatek za svatbu', '12 500 Kč · čeká na úhradu'],
] as const;

export const heroBars = [34, 48, 44, 67, 61, 86] as const;

export const valueCards = [
  ['Vyšší profesionalita', 'Klient rychleji cítí, že máš proces a že se na tebe dá spolehnout.'],
  ['Rychlejší reakce', 'Méně přepínání znamená menší zpoždění mezi poptávkou a odpovědí.'],
  ['Nižší mentální daň', 'Víš, co se děje s každou zakázkou, aniž bys skládal studio z pěti oken.'],
  ['Jasnější návrat ceny', 'Stačí zachráněná poptávka nebo včasný doplatek a produkt dává ekonomický smysl.'],
] as const;

export const heroSignals = [
  { icon: Users, value: '84', label: 'aktivní klienti' },
  { icon: Calendar, value: '07', label: 'termíny tento týden' },
  { icon: CreditCard, value: '12', label: 'faktury v pohybu' },
] as const;

export const authProductTiles = [
  { icon: Users, label: 'klienti', value: 'kontakt + historie' },
  { icon: Calendar, label: 'zakázky', value: 'termín + stav' },
  { icon: CreditCard, label: 'finance', value: 'faktura + úhrada' },
] as const;

export const authStudioPreview = [
  ['Klienti', 'kontakty, zdroje a historie spolupráce'],
  ['Zakázky', 'stav, cena, lokalita, termín i další krok'],
  ['Faktury', 'co je vystavené, co čeká a co je uhrazené'],
] as const;

export const authFeatureNotes = [
  { icon: Users, title: 'Klienti', desc: 'máš po ruce bez lovení ve zprávách' },
  { icon: Calendar, title: 'Kalendář', desc: 'udrží rytmus focení a nejbližší priority' },
  { icon: CreditCard, title: 'Faktury', desc: 'navážou peníze na konkrétní práci' },
] as const;

export const dashboardPromises = [
  ['Poptávka', 'Rychlá odpověď rozhoduje, jestli zakázka skončí u tebe nebo jinde.'],
  ['Focení', 'Kalendář a detail zakázky musí držet pohromadě i na telefonu.'],
  ['Úhrada', 'Po odevzdání potřebuješ vidět, co je zaplacené a co ještě visí.'],
] as const;

export const registerHighlights = [
  ['Klienti', 'máš po ruce bez lovení ve zprávách'],
  ['Kalendář', 'udrží rytmus focení a nejbližší priority'],
  ['Faktury', 'navážou peníze na konkrétní práci'],
] as const;

export const metadataSignals = [
  { icon: Users, title: 'Klientská karta', desc: 'kontakty, firma, historie a poznámky v jedné vrstvě' },
  { icon: Camera, title: 'Zakázka', desc: 'stav, cena, typ focení a konkrétní další krok' },
  { icon: BarChart3, title: 'Přehled', desc: 'revenue, unpaid a aktivní zakázky bez přepínání' },
] as const;
