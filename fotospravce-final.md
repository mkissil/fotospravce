# FotoSprávce — ФИНАЛЬНЫЙ ПРОМПТ (всё в одном)

Скопируй ВЕСЬ текст ниже и вставь в Claude Code:

---

Проект FotoSprávce сломан — 404 на страницах, логин не работает, тёмная тема выглядит плохо. Нужно ПОЛНОСТЬЮ перестроить проект с нуля. Удали всё что есть и начни заново. Вот полное ТЗ.

## ТЕХНОЛОГИИ

```bash
# Удали старый проект и создай новый
rm -rf .next node_modules prisma/dev.db
npm install next@14 react react-dom typescript @types/react @types/node tailwindcss postcss autoprefixer
npm install prisma @prisma/client next-auth bcryptjs
npm install framer-motion lucide-react recharts date-fns
npm install @hello-pangea/dnd react-signature-canvas qrcode
npm install -D @types/bcryptjs @types/react-signature-canvas @types/qrcode
npx prisma generate
```

Стек: Next.js 14 App Router, TypeScript, Tailwind, Prisma + SQLite, NextAuth (credentials), Framer Motion.

## КРИТИЧНЫЕ ФИКСЫ

1. NextAuth ДОЛЖЕН работать. Используй credentials provider с email + пароль (bcrypt). JWT strategy. Demo логин: jan@foto.cz / demo1234
2. Middleware: /dashboard/* требует auth, остальное публичное
3. SQLite файл: prisma/dev.db — создай через prisma db push + seed
4. Все routes ДОЛЖНЫ существовать — никаких 404
5. npm run dev → всё работает на localhost:3000 без ошибок

## ДИЗАЙН — СВЕТЛАЯ ТЕМА, PREMIUM

НЕ тёмная тема. Светлый фон как Stripe/Notion/Linear.

### globals.css:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #FAFAF7;
  --bg-card: #FFFFFF;
  --bg-sidebar: #F5F3EF;
  --bg-hover: #F0EDE8;
  --border: #E8E5E0;
  --text: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-muted: #9B9B9B;
  --accent: #D4845A;
  --accent-hover: #C06830;
  --accent-light: #FFF3EC;
  --success: #2D8A4E;
  --success-light: #ECFDF3;
  --warning: #D4A72C;
  --warning-light: #FFFBEB;
  --danger: #D44A4A;
  --danger-light: #FEF2F2;
  --purple: #7C5CFC;
  --purple-light: #F5F3FF;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}
```

### Шрифты:
- Inter — всё UI (body, кнопки, навигация, таблицы)
- Playfair Display — ТОЛЬКО hero заголовки на лендинге
- JetBrains Mono — суммы в CZK, числа в статистиках

### Анимации (Framer Motion на КАЖДОЙ странице):
```typescript
// src/lib/animations.ts
export const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
export const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
```
Каждая страница: motion.div с stagger + fadeIn на дочерних элементах.

### UI компоненты:
- Button: rounded-xl, px-5 py-2.5, hover:scale-[1.02], transition-all
- Card: bg-white rounded-2xl border border-[#E8E5E0] shadow-sm hover:shadow-md transition
- Badge: pill-shaped, цветные варианты (success/warning/danger/accent)
- Input: rounded-xl border px-4 py-3, focus:ring-2 ring-[#D4845A]/20
- Modal: AnimatePresence + backdrop blur + scale animation

---

## СТРАНИЦА 1: ЛЕНДИНГ (route: /)

Маркетинговая страница-воронка. Цель: регистрация.

### Header (sticky, backdrop-blur-md при скролле):
```
Logo: "Foto" (Inter bold) + "Správce" (Inter medium, цвет #D4845A)
Nav: Funkce | Ceník | Přihlásit se | [Vyzkoušej zdarma →] (accent кнопка)
```

### HERO:
Левая сторона:
- Маленький badge сверху: "🇨🇿 Jediný CRM v češtině pro fotografy"
- Заголовок (Playfair Display, 56px, font-bold):
  "Méně papírování.
   Více focení."
- Подзаголовок (Inter, 20px, text-secondary):
  "Klienti, zakázky, faktury, smlouvy a galerie — vše na jednom místě. Nastav si to za 5 minut a už nikdy neztrať zakázku."
- Два CTA:
  [Vyzkoušej 14 dní zdarma →] (bg-accent text-white, velký)
  [Podívej se jak to funguje ↓] (border, ghost)
- Pod CTA: "✓ Bez kreditní karty · ✓ Zrušíš kdykoliv · ✓ 30denní garance"

Pravá strana:
- Div imitující dashboard (bg-white, rounded-2xl, shadow-xl, border) s mock daty:
  4 stat karty (Zakázek: 8, Příjem: 47 500 Kč, Nezaplacené: 1, Klientů: 12)
  Mini kanban se 3 kartami v sloupcích

Animace: stagger reveal — badge (0ms), nadpis (100ms), podnadpis (200ms), CTA (300ms), mockup (500ms s slide-in zprava)

### SEKCE "ZNÁŠ TO?" (pain points):
Nadpis: "Znáš to?"
3 karty v řadě (bg-white, rounded-2xl, p-8):
1. 📧 "Poptávka přijde a ty ji najdeš až za týden v emailech"
2. 💸 "Faktura po splatnosti, ale ty si ani nevšiml"
3. 🗂️ "Excel, Fakturoid, Google Kalendář, WhatsApp — a v tom všem chaos"

Pod kartami velký text: "Přesně proto existuje FotoSprávce."
Scroll-triggered fade-in animace.

### SEKCE "CO ZÍSKÁŠ" (features):
Nadpis: "Vše co potřebuješ. Na jednom místě."
6 karet v gridu 3×2:
1. 📋 Kanban zakázek — "Od poptávky po odevzdání. Přetáhni a máš přehled."
2. 👥 Databáze klientů — "Zadej IČO — jméno, adresu i DIČ doplníme z ARES."
3. 🧾 České faktury s QR — "Faktura za 30 sekund. S QR kódem na platbu. Automatické hlídání splatnosti."
4. 📝 Smlouvy s e-podpisem — "Klient podepíše z mobilu za 30 sekund. Žádný tisk, žádná pošta."
5. 🖼️ Galerie s výběrem — "Nahraj fotky, pošli odkaz. Klient vybere oblíbené online."
6. 📊 Přehled financí — "Kolik vyděláváš, kolik ti dluží, jak se ti daří."

Hover: karta se zvedne o 4px, shadow-lg.

### SEKCE "JAK TO FUNGUJE":
3 kroky s čísly v kruzích a connecting lines:
1️⃣ "Přijde poptávka" → "Automaticky se vytvoří zakázka"
2️⃣ "Pošli nabídku" → "Smlouva + faktura + záloha na pár kliknutí"
3️⃣ "Foť a předávej" → "Galerie pro klienta, zaplacená faktura, archiv"

### SEKCE "VALUE STACK" (Hormozi styl):
Nadpis: "Kolik tě stojí současný chaos?"

Tabulka srovnání:
| Nástroj | Měsíční cena |
|---------|-------------|
| CRM systém (HoneyBook) | 900 Kč |
| Fakturační software (Fakturoid) | 400 Kč |
| E-podpisy (DocuSign) | 500 Kč |
| Galerie pro klienty (Pixieset) | 350 Kč |
| Emailový marketing | 250 Kč |
| **Celkem samostatně** | **2 400+ Kč/měs** |
| **FotoSprávce — vše v jednom** | **~~2 400 Kč~~ 449 Kč/měs** |

Velký text pod tabulkou: "Ušetři přes 23 000 Kč ročně. A to nepočítáme čas."

### SEKCE CENÍK (id="cenik"):
Toggle: Měsíčně | Ročně (ušetři 20%)

3 karty:
**Začátečník — 249 Kč/měs:**
50 klientů · 10 zakázek/měs · Faktury s QR · Kalendář · 2 GB
[Vyzkoušej zdarma]

**Profesionál — 449 Kč/měs:** ← badge "Nejoblíbenější", border-accent, shadow-lg
Neomezení klienti · Neomezené zakázky · Smlouvy s podpisem · Galerie · Auto emaily · Statistiky · 10 GB
[Vyzkoušej zdarma] (accent button)

**Studio — 799 Kč/měs:**
Vše z Profesionál · 50 GB · Vlastní branding · Prioritní podpora · Export pro účetní
[Vyzkoušej zdarma]

Pod ceníkem: "Všechny plány: 14 dní zdarma. Bez kreditní karty. Zrušíš kdykoliv."

### SEKCE TESTIMONIALS:
3 karty s citací:
"Od té doby co používám FotoSprávce, žádná zakázka mi neuteče." — Jana K., svatební fotografka
"Faktury dělám za minutu místo hodiny. A klienti platí rychleji díky QR." — Martin P., portrétní fotograf
"Klienti jsou nadšení z online galerií. Vypadám mnohem profesionálněji." — Tereza S., rodinná fotografka

### SEKCE GARANCE:
Ikona štítu. Text:
"30denní garance vrácení peněz"
"Pokud ti FotoSprávce neušetří alespoň 5 hodin měsíčně, vrátíme ti peníze. Bez otázek."

### FINAL CTA:
bg-accent/10 sekce, velký text:
"Přestaň ztrácet zakázky. Začni fotit."
"Prvních 200 fotografů získá founding member cenu — navždy."
[Vyzkoušej 14 dní zdarma →] velký button
Counter: "Zbývá X ze 200 míst"

### FOOTER:
4 sloupce: FotoSprávce (logo + "Vytvořeno v Praze pro české fotografy") | Produkt (Funkce, Ceník) | Podpora (Kontakt, Nápověda) | Komunita (Instagram, Facebook)
© 2026 FotoSprávce

---

## STRÁNKA 2: REGISTRACE (/register)
Centrovaný formulář na bg FAFAF7:
- Nadpis: "Začni spravovat zakázky profesionálně"
- Pod: "14 dní plný přístup. Bez kreditní karty."
- Pole: Jméno, Email, Heslo (s toggle visibility)
- Checkbox: "Souhlasím s podmínkami používání"
- Button: [Vytvořit účet zdarma] full-width accent
- "Již máš účet? Přihlásit se" link
- Po registraci: uloží do DB (bcrypt heslo), přihlásí, redirect na /dashboard

## STRÁNKA 3: PŘIHLÁŠENÍ (/login)
- Nadpis: "Vítej zpět"
- Pole: Email, Heslo
- Button: [Přihlásit se]
- "Nemáš účet? Zaregistruj se"
- Po přihlášení: redirect na /dashboard
- MUSÍ FUNGOVAT s demo účtem jan@foto.cz / demo1234

---

## ADMIN PANEL (chráněno middleware — jen přihlášení uživatelé)

### Layout: Sidebar (240px vlevo) + Main content
Sidebar: bg #F5F3EF, light theme
- Logo nahoře
- Nav s lucide-react ikonami:
  📊 Přehled (LayoutDashboard)
  👥 Klienti (Users)
  📋 Zakázky (Briefcase)
  📅 Kalendář (Calendar)
  🧾 Faktury (FileText)
  📝 Smlouvy (PenTool)
  🖼️ Galerie (Image)
  📈 Statistiky (BarChart3)
- Aktivní: bg-white shadow-sm rounded-xl text-accent
- Dole: ⚙️ Nastavení + avatar s jménem uživatele
- Mobile: hamburger → overlay sidebar

### /dashboard — Přehled
- "Dobrý den, Jene!" (dynamicky: dobré ráno/odpoledne/večer)
- 4 stat karty s animovanými čísly:
  Zakázky tento měsíc: 8 (Camera ikona, accent)
  Příjem: 47 500 Kč (TrendingUp, success)
  Nezaplacené: 12 500 Kč (AlertCircle, danger)
  Klientů: 12 (Users, purple)
- "Nadcházející focení" — 3 nejbližší zakázky
- "Poslední aktivita" — 5 posledních událostí

### /dashboard/klienti
- Header: "Klienti" + počet + [+ Nový klient]
- Search bar
- Tabulka: Jméno | Email | Telefon | Zakázek | Celkem Kč
- Click → /dashboard/klienti/[id] detail
- Modal nový klient: jméno, email, telefon, IČO (s ARES fetch), odkud přišel, poznámky

ARES API: GET https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/{ico}
Po zadání IČO → auto-fill obchodní jméno + adresa

### /dashboard/zakazky
- Toggle: Kanban | Seznam
- KANBAN (default): 6 sloupců s drag & drop (@hello-pangea/dnd)
  Poptávka (gray) | Nabídka (blue) | Potvrzeno (accent) | Focení (purple) | Editace (warning) | Odevzdáno (success)
- Karty: název, klient, datum, cena (JetBrains Mono), badge typu
- Drag mění status v DB
- [+ Nová zakázka] modal: klient (select), typ (svatba/portrét/produkt/firemní/jiné), název, datum, místo, cena, záloha, popis

### /dashboard/kalendar
- Měsíční grid (Po–Ne, české názvy)
- Dny s focením: tečka + počet
- Klik na den → popup se zakázkami
- Navigace: ← dnes →

### /dashboard/faktury
- Tabulka: Číslo | Klient | Částka | Splatnost | Stav (badge)
- [+ Nová faktura] → formulář s položkami, DPH, VS
- Detail: náhled + Stáhnout PDF + Označit zaplaceno

### /dashboard/smlouvy
- Seznam šablon + vytvořené smlouvy
- Šablona s proměnnými {{jmeno}}, {{datum}}, {{cena}}

### /dashboard/galerie
- Karty galerií: název, počet fotek, stav
- Upload zóna (pro demo: picsum.photos placeholders)
- Sdílení: link pro klienta

### /dashboard/statistiky
- Bar chart příjmů po měsících (recharts)
- Donut chart typů zakázek
- Čísla s animací

### /dashboard/nastaveni
- Profil: jméno, email, telefon, web
- Fakturační: IČO, DIČ, adresa, účet, IBAN
- Plátce DPH toggle

---

## PRISMA SCHEMA + SEED

SQLite: file:./dev.db

Modely: User, Client, Job, Invoice, ContractTemplate, Contract, Gallery, Photo

Seed data:
- User: Jan Novák, jan@foto.cz, heslo "demo1234" (bcrypt), IČO 12345678
- 8 klientů s českými jmény (Petra Dvořáková, Tomáš Horák, Lucie Svobodová...)
- 12 zakázek v různých stavech
- 5 faktur (2 zaplacené, 1 odeslaná, 1 po splatnosti, 1 koncept)
- 2 šablony smluv
- 2 galerie s picsum.photos fotkami

---

## SEO (implementuj rovnou)

### Meta tagy v layout.tsx:
title: "FotoSprávce — CRM pro české fotografy | Zakázky, faktury, galerie"
description: "Jediný CRM v češtině pro fotografy. Správa zakázek, fakturace s QR, smlouvy s e-podpisem, galerie. 14 dní zdarma."
keywords: ["crm pro fotografy", "software pro fotografy", "fakturace fotograf"]
og:image, twitter:card

### JSON-LD v layout.tsx:
SoftwareApplication schema s cenami 249-799 CZK

### sitemap.ts + robots.ts:
Automatická generace

### 404 stránka (not-found.tsx):
Česky: "Tato stránka neexistuje" + odkaz na hlavní stránku

---

## KRITICKÉ POŽADAVKY

1. **VŠE V ČEŠTINĚ** — každý text, placeholder, button, error message
2. **SVĚTLÁ TÉMA** — bg #FAFAF7, NIKDY tmavá
3. **FRAMER MOTION** na každé stránce — stagger, fadeIn, slideIn
4. **AUTH MUSÍ FUNGOVAT** — registrace ukládá do DB, login ověřuje, session funguje
5. **KANBAN MUSÍ MÍT DRAG & DROP** — @hello-pangea/dnd
6. **RESPONSIVE** — sidebar na mobilu = hamburger menu
7. **SEED DATA** — po npm run dev jsou v DB demo data
8. **ZERO CONFIG** — npm run dev a vše funguje, žádné env proměnné potřeba (SQLite, ne Postgres)
9. **FORMULÁŘE UKLÁDAJÍ DO DB** — ne placeholder
10. **ŽÁDNÉ PLACENÉ SLUŽBY** — vše lokálně

## POŘADÍ IMPLEMENTACE

1. Prisma schema + seed script + prisma db push
2. NextAuth config (credentials, JWT, SQLite session)
3. Middleware (chránit /dashboard/*)
4. Layout: sidebar + header (light theme)
5. Landing page (/) — kompletní se všemi sekcemi
6. Register + Login — funkční s DB
7. Dashboard — se seed daty
8. Klienti CRUD
9. Zakázky + Kanban
10. Kalendář
11. Faktury
12. Smlouvy
13. Galerie
14. Statistiky
15. Nastavení
16. SEO meta + sitemap + 404

Začni HNED. Nedělej placeholder stránky — implementuj vše kompletně. Pokud něco nefunguje, oprav to hned.
