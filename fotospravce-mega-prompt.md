# МЕГА-ПРОМПТ для Claude Code — FotoSprávce

Скопируй ВСЁ ниже и вставь в Claude Code одним сообщением:

---

Перестрой проект FotoSprávce с нуля. Это CRM для чешских фотографов. Нужен ПОЛНЫЙ рабочий продукт с красивым дизайном, анимациями, лендингом, регистрацией и всем функционалом. Делай ВСЁ сразу, не останавливайся, пока не будет готово.

## ТЕХНОЛОГИИ
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Prisma + SQLite (для простоты, потом можно заменить на PostgreSQL)
- NextAuth.js с credentials provider (email + пароль)
- Framer Motion для анимаций
- lucide-react для иконок
- @hello-pangea/dnd для drag & drop канбана
- recharts для графиков
- date-fns с чешской локализацией
- react-signature-canvas для подписей
- qrcode для QR платеб

Установи все зависимости: npm install framer-motion @hello-pangea/dnd recharts date-fns react-signature-canvas qrcode lucide-react next-auth @auth/prisma-adapter prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs @types/qrcode @types/react-signature-canvas

## ДИЗАЙН — PREMIUM МИНИМАЛИЗМ

Стиль: утончённый, светлый, как Stripe Dashboard или Linear. НЕ generic AI дизайн.

### Цвета (CSS variables в globals.css):
--bg-primary: #FFFFFF
--bg-secondary: #F7F7F5 (тёплый серый как Notion)
--bg-card: #FFFFFF
--border: #E8E5E0
--text-primary: #1A1A1A
--text-secondary: #6B6B6B
--accent: #D4763A (тёплый оранжевый — фото-тематика)
--accent-hover: #C06830
--accent-light: #FFF3EC
--success: #2D8A4E
--warning: #D4A72C
--danger: #D44A4A
--purple: #7C5CFC (для акцентов)

### Шрифты (Google Fonts):
- Заголовки: "Playfair Display" (serif, элегантный)
- Тело: "DM Sans" (sans-serif, чистый)
- Моноширинный для цифр: "JetBrains Mono"

### Анимации (Framer Motion):
- Каждая страница: fade in + slide up (y: 20 → 0, opacity: 0 → 1, duration: 0.4s)
- Карточки: stagger children (каждая появляется с задержкой 0.05s)
- Sidebar: при hover на пунктах — плавное подсвечивание
- Кнопки: scale на hover (1 → 1.02), мягкий transition
- Модальные окна: backdrop fade + scale from 0.95
- Канбан карточки: плавное перемещение при drag
- Числа на дашборде: анимированный счётчик от 0 до значения
- Загрузка: skeleton shimmer (не спиннер)

### Layout:
- Sidebar слева: 240px, светло-серый фон, лого сверху, навигация с иконками, профиль внизу
- Основной контент: максимум 1200px, padding 32px
- Карточки: border-radius 12px, border 1px solid var(--border), shadow-sm
- Таблицы: чистые, без лишних бордеров, hover на строках

## СТРАНИЦЫ И ФУНКЦИОНАЛ

### 1. LANDING PAGE (route: /)
Красивая маркетинговая страница на ЧЕШСКОМ для привлечения фотографов.

Hero секция:
- Большой заголовок: "Správa zakázek pro fotografy, kteří fotí — ne administrativují"
- Подзаголовок: "Klienti, zakázky, faktury, smlouvy a galerie — vše na jednom místě. Vyzkoušejte 14 dní zdarma."
- CTA кнопка: "Začít zdarma" → ссылка на /register
- Справа или внизу — скриншот/мокап приложения (сделай красивый div с тенью имитирующий интерфейс)
- Анимация: элементы появляются с stagger при загрузке

Секция "Funkce":
- 6 карточек в сетке 3x2:
  1. 📋 Zakázky — "Kanban nástěnka pro přehled všech zakázek od poptávky po odevzdání"
  2. 👥 Klienti — "Databáze klientů s historií zakázek a automatickým doplněním z ARES"
  3. 🧾 Faktury — "České faktury s QR platbou, PDF export, hlídání splatnosti"
  4. 📝 Smlouvy — "Šablony smluv s online podpisem od klienta"
  5. 🖼️ Galerie — "Sdílení fotek s klientem, výběr fotek online"
  6. 📊 Statistiky — "Přehled příjmů, zakázek a konverzí"
- Každá karta s ikonou, nadpisem a popisem
- Scroll-triggered animace (fade in při scrollu)

Sekce "Ceník" (id="cenik"):
- 3 karty: Základ (199 Kč/měs), Profesionál (449 Kč/měs), Studio (899 Kč/měs)
- Prostřední zvýrazněná (border-accent, badge "Nejoblíbenější")
- Základ: 50 klientů, 20 zakázek/měs, faktury, 2GB
- Profesionál: neomezeno, smlouvy, galerie, statistiky, 10GB  
- Studio: vše + 50GB, vlastní doména, prioritní podpora
- CTA: "Vyzkoušet 14 dní zdarma"

Sekce "Jak to funguje":
- 3 kroky: 1. Zaregistrujte se → 2. Přidejte klienty a zakázky → 3. Fakturujte a sdílejte galerie
- Horizontální timeline s čísly a ikonami

Footer:
- Logo, copyright, odkazy: Funkce, Ceník, Kontakt, Přihlásit se

### 2. REGISTRACE (/register)
- Formulář: Jméno, Email, Heslo, checkbox "Souhlasím s podmínkami"
- Tlačítko "Vytvořit účet zdarma"
- Pod formulářem: "Již máte účet? Přihlaste se"
- Po registraci → redirect na /dashboard
- Animace: form fade in

### 3. PŘIHLÁŠENÍ (/login)  
- Email + Heslo
- "Zapomenuté heslo?" (zatím bez funkce)
- "Nemáte účet? Zaregistrujte se"
- Po přihlášení → redirect na /dashboard

### 4. DASHBOARD (/dashboard)
- Přivítání: "Dobrý den, {{jméno}}!" (ranо/odpoledne/večer)
- 4 stat karty s animovanými čísly:
  - Zakázky tento měsíc (ikona Camera)
  - Příjem tento měsíc v Kč (ikona TrendingUp)  
  - Nezaplacené faktury (ikona AlertCircle, červená pokud > 0)
  - Klientů celkem (ikona Users)
- Sekce "Nadcházející focení" — seznam nejbližších zakázek s datem a klientem
- Sekce "Poslední aktivita" — timeline posledních akcí (nová zakázka, faktura zaplacena, galerie sdílena)

### 5. KLIENTI (/dashboard/klienti)
- Horní bar: nadpis "Klienti", počet, tlačítko "+ Nový klient"
- Vyhledávání a filtrování
- Tabulka/karty: jméno, email, telefon, počet zakázek, celkem zaplaceno
- Klik → detail klienta (/dashboard/klienti/[id])
- Detail: info klienta, seznam jeho zakázek, faktury, poznámky
- Formulář nového klienta: modal s polem IČO — po zadání auto-fill z ARES API (https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/{ico})

### 6. ZAKÁZKY (/dashboard/zakazky)
- Přepínač: Kanban / Seznam
- KANBAN s drag & drop:
  Sloupce: Poptávka | Nabídka | Potvrzeno | Focení | Editace | Odevzdáno
  Každý sloupec má barvu a počet zakázek
  Karty: název zakázky, jméno klienta, datum, cena, barevný badge statusu
  Drag & drop mění status
- Nová zakázka: modal formulář — klient (select), typ (svatba/portrét/produkt/firemní/jiné), název, datum focení, místo, cena, záloha, popis
- Detail zakázky (/dashboard/zakazky/[id]): všechny info + timeline akcí + tlačítka "Vytvořit fakturu", "Vytvořit smlouvu", "Vytvořit galerii"

### 7. KALENDÁŘ (/dashboard/kalendar)
- Měsíční kalendář grid (Po-Ne, české názvy dnů a měsíců)
- Dny s focením mají tečku/badge s počtem
- Klik na den → seznam zakázek toho dne
- Navigace: šipky měsíc dopředu/dozadu + dnes
- Barevné rozlišení typů focení

### 8. FAKTURY (/dashboard/faktury)
- Seznam faktur: tabulka s číslem, klientem, částkou, datem splatnosti, stavem (badge: Koncept/Odesláno/Zaplaceno/Po splatnosti)
- Nová faktura: automaticky vyplněná z zakázky nebo manuální
  - Dodavatel (z profilu uživatele)
  - Odběratel (z klienta)
  - Položky (popis, množství, jednotka, cena za jednotku, sazba DPH)
  - Variabilní symbol (auto-generovaný)
  - Datum vystavení, splatnosti, DUZP
  - Poznámka ("Nejsem plátce DPH" — automaticky pokud uživatel není plátce)
- Detail faktury: náhled jak bude vypadat + tlačítka "Stáhnout PDF", "Odeslat emailem", "Označit jako zaplaceno"
- PDF generování: česky vypadající faktura s QR kódem pro platbu (SPD formát)

### 9. SMLOUVY (/dashboard/smlouvy)
- Šablony smluv (výchozí: "Smlouva o dílo — svatba", "Smlouva o dílo — portrét")
- Editor šablony: textarea s proměnnými {{jmeno_klienta}}, {{datum_foceni}}, {{cena}}, {{fotograf_jmeno}}
- Vytvoření smlouvy z šablony pro konkrétní zakázku → automatické nahrazení proměnných
- Odeslání klientovi emailem s odkazem
- Veřejná stránka smlouvy (/smlouva/[token]): klient čte smlouvu a podepisuje (SignaturePad canvas)
- Stav: Koncept → Odesláno → Podepsáno

### 10. GALERIE (/dashboard/galerie)
- Seznam galerií: název, počet fotek, stav (Rozpracovaná/Sdílená/Výběr dokončen)
- Nová galerie: název, připojení k zakázce, maximální počet fotek k výběru
- Upload fotek: drag & drop zóna, bulk upload, preview thumbnailů
- Pro demo: ukládej fotky jako URL placeholder obrázky (https://picsum.photos/400/300?random=N) — upload implementuj později
- Sdílení: tlačítko "Sdílet s klientem" → zkopíruje odkaz
- Veřejná galerie (/galerie/[token]): masonry grid fotek, klient zaškrtává fotky, vidí counter "Vybráno X z Y", tlačítko "Odeslat výběr"
- Fotograf vidí výběr klienta v admin

### 11. STATISTIKY (/dashboard/statistiky)
- Bar chart: příjmy po měsících (recharts)
- Čísla: celkový příjem za rok, průměrná cena zakázky, konverzní poměr (potvrzeno / poptávky)
- Kruhový graf: rozdělení zakázek podle typu (svatba, portrét, produkt...)
- Vše animované

### 12. NASTAVENÍ (/dashboard/nastaveni)
- Osobní údaje: jméno, email, telefon, web
- Fakturační údaje: IČO (s ARES lookup), DIČ, adresa, číslo účtu, IBAN
- Logo upload
- Plátce DPH toggle + sazba
- Prefix čísla faktury

## DATABÁZE (Prisma + SQLite)

Použij SQLite (file: ./dev.db) pro jednoduchost. Modely:
- User (fotograf): jméno, email, heslo, IČO, DIČ, adresa, účet, logo, nastavení
- Client: jméno, email, telefon, IČO, DIČ, adresa, poznámky, odkud přišel
- Job: název, typ, status, klient, datum focení, místo, cena, záloha, popis
- Invoice: číslo, dodavatel, odběratel, položky (JSON), DPH, celkem, stav, variabilní symbol
- ContractTemplate: název, obsah s proměnnými
- Contract: šablona, zakázka, obsah, token pro podpis, podpis klienta, stav
- Gallery: název, zakázka, share token, max výběr, stav
- Photo: galerie, URL, pořadí, vybraná (boolean)

Seedni databázi demo daty: 
- 1 user (fotograf Jan Novák, IČO 12345678)
- 5 klientů
- 8 zakázek v různých stavech
- 3 faktury (1 zaplacená, 1 odeslaná, 1 po splatnosti)
- 2 galerie s placeholder fotkami

## AUTH
- Registrace: email + heslo (bcrypt hash)
- Login: email + heslo
- Session: NextAuth s JWT strategy
- Middleware: /dashboard/* vyžaduje přihlášení, / a /login a /register jsou veřejné

## DŮLEŽITÉ POKYNY
1. Vše v ČEŠTINĚ — veškerý UI text, nadpisy, tlačítka, placeholder texty
2. Všechny stránky MUSÍ být funkční — ne placeholder "připravujeme"
3. Formuláře MUSÍ ukládat do databáze a načítat data
4. Animace na KAŽDÉ stránce — page transition, stagger karty, hover efekty
5. Responsive design — funguje na mobilu i desktopu
6. Použij Framer Motion pro animace (ne jen CSS)
7. Sidebar na mobilu se skryje → hamburger menu
8. Při vytváření zakázky, faktury, smlouvy, galerie — data se propojují (zakázka → klient, faktura → zakázka atd.)
9. Nepouživej žádné placené služby — vše lokálně (SQLite, lokální soubory)
10. Stránka MUSÍ fungovat po npm run dev bez dalších konfigurací

Začni od instalace závislostí, pak databáze a seed, pak layout a design, pak postupně každou stránku. Nedělej placeholder — dělej HOTOVÉ funkční stránky.
