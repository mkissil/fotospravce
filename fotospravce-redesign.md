# FotoSprávce — ПОЛНЫЙ РЕДИЗАЙН + ФУНКЦИОНАЛ

Скопируй и вставь в Claude Code:

---

Полностью переделай дизайн и функционал FotoSprávce. Текущий дизайн выглядит как шаблон — нужен PREMIUM продукт уровня Linear.app, Stripe Dashboard, Notion. Всё должно быть анимировано, интерактивно и работать.

## УСТАНОВИ ЗАВИСИМОСТИ

```bash
npm install framer-motion @hello-pangea/dnd recharts date-fns react-signature-canvas qrcode lucide-react bcryptjs
npm install -D @types/bcryptjs @types/qrcode @types/react-signature-canvas
```

## ДИЗАЙН — СВЕТЛАЯ PREMIUM ТЕМА

НЕ ИСПОЛЬЗУЙ тёмную тему. Светлый фон, тёплые акценты, как Stripe/Linear/Notion.

### CSS Variables (globals.css):
```css
:root {
  --bg: #FAFAF7;
  --bg-card: #FFFFFF;
  --bg-sidebar: #F5F3EF;
  --bg-hover: #F0EDE8;
  --border: #E8E5E0;
  --border-light: #F0EDE8;
  --text: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-muted: #9B9B9B;
  --accent: #D4845A;
  --accent-hover: #C06830;
  --accent-light: #FFF3EC;
  --accent-bg: #FEF7F0;
  --success: #2D8A4E;
  --success-light: #ECFDF3;
  --warning: #D4A72C;
  --warning-light: #FFFBEB;
  --danger: #D44A4A;
  --danger-light: #FEF2F2;
  --purple: #7C5CFC;
  --purple-light: #F5F3FF;
}
```

### Шрифты (Google Fonts — подключи через next/font/google):
```typescript
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-playfair', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-dm-sans', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
```
- Playfair Display — только для hero заголовков на лендинге
- DM Sans — всё остальное (body, UI, кнопки, навигация)
- JetBrains Mono — цифры в статистиках, суммы в CZK

### Анимации (Framer Motion — обязательно!):

Создай файл src/lib/animations.ts:
```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 }
};

export const counterAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};
```

КАЖДАЯ страница обёрнута в:
```tsx
<motion.div initial="initial" animate="animate" variants={staggerContainer}>
  <motion.div variants={fadeInUp}>...content...</motion.div>
</motion.div>
```

### Компоненты UI (создай все в src/components/ui/):

**Button.tsx** — 3 варианта:
- primary: bg-accent, text-white, hover:scale-[1.02], active:scale-[0.98], transition-all duration-200
- secondary: bg-white, border, text-text, hover:bg-bg-hover
- ghost: bg-transparent, text-text-secondary, hover:bg-bg-hover
- Все с rounded-xl, px-5 py-2.5, font-medium

**Card.tsx** — bg-white, rounded-2xl, border border-[var(--border)], shadow-sm, hover:shadow-md transition-shadow duration-300

**Badge.tsx** — маленький pill с цветовыми вариантами:
- success: bg-success-light text-success
- warning: bg-warning-light text-warning
- danger: bg-danger-light text-danger
- accent: bg-accent-light text-accent
- purple: bg-purple-light text-purple

**Input.tsx** — bg-white border border-[var(--border)] rounded-xl px-4 py-3, focus:ring-2 ring-accent/20 ring-offset-0, placeholder:text-muted

**Modal.tsx** — AnimatePresence + motion.div с backdrop blur, scale from 0.95, overlay bg-black/40

**Skeleton.tsx** — shimmer animation для loading состояний (НЕ спиннер)

**EmptyState.tsx** — красивый пустой стейт с иконкой, текстом и CTA кнопкой

**AnimatedNumber.tsx** — число анимированно считается от 0 до значения при появлении на экране (useInView + motion)

---

## ЛЕНДИНГ (route: /)

Полная маркетинговая страница. НЕ тёмная тема — светлый фон #FAFAF7.

### Header (sticky, backdrop-blur)
```
Logo "FotoSprávce" (Playfair Display, акцент на "Správce")
Навигация: Funkce | Ceník | Blog | Přihlásit se | [Začít zdarma →] (кнопка accent)
```
При скролле: header получает border-bottom и shadow-sm.

### Hero секция
Заголовок (Playfair Display, 56-64px):
**"Méně papírování.**
**Více focení."**

Подзаголовок (DM Sans, 20px, text-secondary):
"Klienti, zakázky, faktury, smlouvy a galerie — vše na jednom místě. Jediný CRM v češtině, vytvořený přímo pro české fotografy."

CTA: Две кнопки рядом:
[Vyzkoušej 14 dní zdarma →] (primary, большая)
[Podívej se jak to funguje] (secondary, с иконой Play)

Под кнопками: "Bez kreditní karty · Zrušíš kdykoliv" (text-muted, text-sm)

Справа: ИНТЕРАКТИВНЫЙ мокап дашборду (не скриншот — живой HTML див с тенью, border-radius 16px, имитирующий интерфейс с данными). Он должен слегка подниматься при scroll (parallax effect на 20-30px).

Анимация: заголовок появляется первым (0ms), подзаголовок (200ms), кнопки (400ms), мокап справа (600ms) — всё через stagger.

### "Znáš to?" секция (pain points)
bg-white секция, 3 карточки в ряд:

1. 📧 "Poptávka přijde a ty ji najdeš až za týden v emailu"
2. 💸 "Faktura po splatnosti, ale ty si ani nevšiml/a"  
3. 📱 "Excel na telefonu, Google kalendář, Fakturoid, WhatsApp... chaos"

Каждая карточка: иконка сверху, текст, subtle bg, rounded-2xl. Scroll-triggered fade in.

Pod tím velký text: **"Přesně proto jsme vytvořili FotoSprávce."**

### Funkce sekce
6 feature bloků v gridu 3×2, каждый с:
- Иконка из lucide-react (большая, accent цвет)
- Nadpis (bold, 18px)
- Popis (text-secondary, 2-3 řádky)
- Hover: карточка слегка поднимается (translateY -4px), shadow увеличивается

Карточки:
1. 📋 **Kanban zakázek** — "Přetahuj zakázky od poptávky po odevzdání. Žádná ti neuteče."
2. 👥 **Databáze klientů** — "Všechny kontakty na jednom místě. Zadej IČO — zbytek doplníme z ARES."
3. 🧾 **České faktury** — "Faktura s QR kódem na 2 kliknutí. Automatické hlídání splatnosti."
4. 📝 **Smlouvy s e-podpisem** — "Pošli smlouvu klientovi. Podepíše z mobilu za 30 sekund."
5. 🖼️ **Galerie s výběrem** — "Nahraj fotky, pošli odkaz. Klient vybere své oblíbené."
6. 📊 **Přehled financí** — "Kolik vyděláváš, kolik ti dluží, jaký máš konverzní poměr."

### "Jak to funguje" sekция
3 kroky horizontálně s connecting line mezi nimi:

Krok 1: 📩 "Přijde ti poptávka" — "Automaticky se vytvoří zakázka v kanban nástěnce"
Krok 2: ✍️ "Pošli nabídku" — "Smlouva, faktura a záloha — vše na pár kliknutí"  
Krok 3: 📸 "Foť a předávej" — "Sdílej galerii, dostaň zaplaceno, archivuj"

Každý krok: číslo v kruhu (accent bg), ikona, nadpis, popis. Animace: kroky se postupně objevují při scroll.

### Ceník sekция (id="cenik")
3 cenové karty, prostřední zvýrazněná:

**Začátečník — 249 Kč/měs**
- 50 klientů, 10 zakázek/měs
- Faktury s QR platbou
- Základní kalendář
- 2 GB úložiště
- CTA: "Vyzkoušej zdarma"

**Profesionál — 449 Kč/měs** ⭐ badge "Nejoblíbenější"
- border-accent, shadow-lg, scale slighly larger
- Neomezení klienti a zakázky
- Smlouvy s e-podpisem
- Galerie s výběrem fotek
- Automatické emaily
- Statistiky a reporty
- 10 GB úložiště
- CTA: "Vyzkoušej zdarma" (primary button)

**Studio — 799 Kč/měs**
- Vše z Profesionál
- 50 GB úložiště  
- Vlastní branding na galeriích
- Prioritní podpora
- Export pro účetní
- CTA: "Vyzkoušej zdarma"

Toggle: Měsíčně | Ročně (ušetři 20%)
Pod ceníkem: "Všechny plány začínají 14denní zkušební verzí zdarma. Bez kreditní karty."

### Testimonials (zatím s placeholder daty)
3 karty s citací, jménem, typem focení:
- "Od té doby co používám FotoSprávce, nechybí mi žádná zakázka." — Jana K., svatební fotografka
- "Faktury mám hotové za minutu místo hodiny." — Martin P., portrétní fotograf
- "Klienti jsou nadšení z online galerií." — Tereza S., rodinná fotografka

### Final CTA sekce
Velký text na accent-bg pozadí:
"Začni spravovat zakázky profesionálně"
"Prvních 200 fotografů získá doživotní přístup za zvýhodněnou cenu."
[Vyzkoušej 14 dní zdarma →] velký CTA button

### Footer
4 sloupce:
- **FotoSprávce** — logo + krátký popis
- **Produkt** — Funkce, Ceník, Blog  
- **Podpora** — Kontakt, Nápověda, Podmínky
- **Komunita** — Instagram, Facebook

Pod tím: "© 2026 FotoSprávce. Vytvořeno v Praze pro české fotografy."

---

## REGISTRACE (/register) A PŘIHLÁŠENÍ (/login)

Dvě čisté stránky, centrovaný formulář na bílém pozadí:

### Registrace:
- Nadpis: "Vytvořte si účet zdarma"
- Pod nadpisem: "14 dní plný přístup. Bez kreditní karty."
- Formulář: Jméno, Email, Heslo (s toggle viditelnosti), checkbox "Souhlasím s podmínkami"
- Tlačítko: "Vytvořit účet" (primary, full-width)
- Pod formulářem: "Již máte účet? Přihlaste se" (odkaz)
- Animated fade in

### Přihlášení:
- Nadpis: "Vítej zpět"
- Formulář: Email, Heslo
- Tlačítko: "Přihlásit se"
- "Nemáte účet? Zaregistrujte se"

Po přihlášení → redirect na /dashboard.

---

## ADMIN PANEL / DASHBOARD

Layout: Sidebar vlevo (240px) + hlavní obsah.

### Sidebar:
- bg: var(--bg-sidebar) = #F5F3EF
- Nahoře: logo "FotoSprávce" (menší verze)
- Navigace s ikonami z lucide-react:
  - 📊 Přehled (LayoutDashboard)
  - 👥 Klienti (Users)
  - 📋 Zakázky (Briefcase)
  - 📅 Kalendář (Calendar)
  - 🧾 Faktury (FileText)
  - 📝 Smlouvy (FileSignature)
  - 🖼️ Galerie (Image)
  - 📈 Statistiky (BarChart3)
- Aktivní položka: bg-white, shadow-sm, rounded-xl, text-accent, font-medium
- Hover: bg-white/50
- Dole: Nastavení (Settings ikona) + avatar uživatele s jménem

Na mobilu: sidebar se skryje, hamburger menu vlevo nahoře, sidebar vyjedou jako overlay s backdrop blur.

### Dashboard (/dashboard):
Přivítání: "Dobrý den, Jene!" (dynamicky ráno/odpoledne/večer + jméno uživatele)
Datum: "Úterý, 25. března 2026" (české formátování)

4 stat karty v řadě (AnimatedNumber + ikona + trend):
1. **Zakázky tento měsíc: 8** — ikona Camera, accent barva
2. **Příjem: 47 500 Kč** — ikona TrendingUp, success barva, "+12% oproti minulému měsíci"
3. **Nezaplacené faktury: 1** — ikona AlertCircle, danger barva pokud > 0
4. **Klientů celkem: 12** — ikona Users, purple barva

Sekce "Nadcházející focení" — karty s: datum, název zakázky, jméno klienta, místo, badge typu (svatba/portrét/produkt)

Sekce "Poslední aktivita" — timeline: "Nová poptávka od Jany K.", "Faktura F2026-003 zaplacena", "Galerie 'Svatba P+J' sdílena"

### Klienti (/dashboard/klienti):
- Horní bar: H1 "Klienti" + počet + tlačítko [+ Nový klient] (accent)
- Vyhledávací pole s ikonou Search
- Tabulka: Jméno (bold) | Email | Telefon | Zakázek | Celkem zaplaceno | Akce
- Řádky: hover bg-hover, klik → detail
- Detail klienta: záložky Info | Zakázky | Faktury | Poznámky
- Modal "Nový klient": jméno, email, telefon, IČO (s ARES auto-fill), odkud přišel (select: Instagram/Web/Doporučení/Jiné), poznámky

### Zakázky (/dashboard/zakazky):
- Toggle: Kanban | Seznam
- KANBAN (výchozí): 6 sloupců s barvami:
  - Poptávka (šedá) | Nabídka (modrá) | Potvrzeno (accent) | Focení (purple) | Editace (warning) | Odevzdáno (success)
  - Drag & drop přesun mění status v databázi
  - Karty: rounded-xl bg-white shadow-sm, název (bold), klient, datum, cena (JetBrains Mono), badge typu
  - Hover: shadow-md, subtle lift
- Tlačítko [+ Nová zakázka] → modal: klient (select z existujících), typ (select: svatba/portrét/produkt/firemní/jiné), název, datum, místo, cena, záloha, popis

### Kalendář (/dashboard/kalendar):
- Měsíční grid, české názvy (Po-Ne, Leden-Prosinec)
- Dny s focením: tečka/badge, barva podle typu
- Klik na den: popup se zakázkami
- Navigace: ← → + "Dnes" tlačítko
- Dnešek: zvýrazněný ring

### Faktury (/dashboard/faktury):
- Tabulka: Číslo | Klient | Částka (JetBrains Mono) | Splatnost | Stav (badge)
- Stav badges: Koncept (šedý), Odesláno (modrý), Zaplaceno (zelený), Po splatnosti (červený + pulse animace)
- [+ Nová faktura] → formulář: odběratel z klienta, položky (dynamické přidávání), DPH, datum splatnosti
- Detail faktury: preview + tlačítka Stáhnout PDF | Odeslat emailem | Označit zaplaceno

### Smlouvy (/dashboard/smlouvy):
- Seznam šablon + vytvořené smlouvy
- Editor šablony s proměnnými
- Detail smlouvy: obsah + stav (Koncept/Odesláno/Podepsáno)

### Galerie (/dashboard/galerie):
- Karty galerií: náhledová fotka, název, počet fotek, stav
- Upload: drag & drop zóna
- Pro demo: použij picsum.photos placeholder obrázky

### Statistiky (/dashboard/statistiky):
- Bar chart příjmů po měsících (recharts, accent barva)
- Donut chart typů zakázek
- Čísla: celkový příjem, průměrná cena, konverzní poměr
- AnimatedNumber na všech číslech

### Nastavení (/dashboard/nastaveni):
- Záložky: Profil | Fakturační údaje | Šablony emailů
- Formuláře pro editaci všech údajů

---

## DATABÁZE A SEED DATA

Použij SQLite s Prisma. Vytvoř seed s demo daty:
- User: Jan Novák, jan@foto.cz, heslo "demo1234", IČO 12345678
- 8 klientů s českými jmény
- 12 zakázek v různých stavech kanbanu
- 5 faktur (2 zaplacené, 1 odeslaná, 1 po splatnosti, 1 koncept)
- 2 galerie s picsum placeholder fotkami
- 2 šablony smluv (svatba, portrét)

## DŮLEŽITÉ

1. Vše v ČEŠTINĚ
2. SVĚTLÁ tema (NE tmavá)
3. Framer Motion animace na KAŽDÉ stránce — stagger, fade in, slide up
4. Sidebar musí být SVĚTLÝ (#F5F3EF)
5. Všechny formuláře MUSÍ ukládat do databáze
6. Kanban MUSÍ mít drag & drop
7. Responsive — funguje na mobilu
8. Přihlášení: email jan@foto.cz, heslo demo1234
9. Po npm run dev vše musí fungovat bez dalších konfigurací
10. Nepouživej ŽÁDNÉ placené služby

Začni implementací, nedělej placeholder stránky. Implementuj vše postupně: layout → landing → auth → dashboard → klienti → zakázky → kalendář → faktury → smlouvy → galerie → statistiky → nastavení.
