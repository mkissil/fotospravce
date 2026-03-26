
# FotoSprávce — CRM pro české fotografy
# Гайд для Claude Code

## Что строим

Веб-приложение для чешских фотографов: управление клиентами, заказами, договорами, счетами и галереями в одном месте. Замена связки Excel + Fakturoid + Google Calendar + email.

**Язык интерфейса:** чешский
**Технологии:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, Stripe
**Деплой:** Vercel (фронт) + Supabase (БД)

---

## Стек

```
Next.js 14          — App Router, SSR + клиентские компоненты
TypeScript          — строгая типизация
Tailwind CSS        — стили, никаких UI-библиотек
Prisma              — ORM
PostgreSQL          — Supabase free tier
NextAuth.js         — аутентификация (email magic link)
Stripe              — оплата подписок
Resend              — отправка email (бесплатно до 3000/мес)
Uploadthing         — загрузка фото (бесплатно до 2GB)
React PDF / Puppeteer — генерация PDF счетов и договоров
date-fns            — работа с датами (cs locale)
```

---

## Структура проекта

```
fotospravce/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx              # Sidebar + header
│   │   │   ├── page.tsx               # Přehled (dashboard)
│   │   │   ├── klienti/
│   │   │   │   ├── page.tsx           # Seznam klientů
│   │   │   │   └── [id]/page.tsx      # Detail klienta
│   │   │   ├── zakazky/
│   │   │   │   ├── page.tsx           # Seznam zakázek (pipeline)
│   │   │   │   ├── nova/page.tsx      # Nová zakázka
│   │   │   │   └── [id]/page.tsx      # Detail zakázky
│   │   │   ├── kalendar/
│   │   │   │   └── page.tsx           # Kalendář focení
│   │   │   ├── faktury/
│   │   │   │   ├── page.tsx           # Seznam faktur
│   │   │   │   └── [id]/page.tsx      # Detail faktury + PDF
│   │   │   ├── smlouvy/
│   │   │   │   ├── page.tsx           # Šablony smluv
│   │   │   │   └── [id]/page.tsx      # Smlouva k zakázce
│   │   │   ├── galerie/
│   │   │   │   ├── page.tsx           # Seznam galerií
│   │   │   │   └── [id]/page.tsx      # Galerie s výběrem fotek
│   │   │   ├── nastaveni/
│   │   │   │   └── page.tsx           # Profil, fakturační údaje, šablony
│   │   │   └── statistiky/
│   │   │       └── page.tsx           # Přehled příjmů, zakázek
│   │   ├── galerie/
│   │   │   └── [token]/page.tsx       # Veřejná galerie pro klienta (bez loginu)
│   │   ├── smlouva/
│   │   │   └── [token]/page.tsx       # Veřejná smlouva k podpisu
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── clients/route.ts
│   │       ├── jobs/route.ts
│   │       ├── invoices/
│   │       │   ├── route.ts
│   │       │   └── [id]/pdf/route.ts  # Generování PDF faktury
│   │       ├── contracts/
│   │       │   ├── route.ts
│   │       │   └── [id]/sign/route.ts # E-podpis
│   │       ├── galleries/
│   │       │   ├── route.ts
│   │       │   └── [id]/select/route.ts # Výběr fotek klientem
│   │       ├── upload/route.ts
│   │       ├── email/route.ts          # Odeslání emailu klientovi
│   │       └── stripe/webhook/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── clients/
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientForm.tsx
│   │   │   └── ClientList.tsx
│   │   ├── jobs/
│   │   │   ├── JobPipeline.tsx        # Kanban: Poptávka → Nabídka → Potvrzeno → Focení → Editace → Odevzdáno
│   │   │   ├── JobCard.tsx
│   │   │   └── JobForm.tsx
│   │   ├── calendar/
│   │   │   └── PhotoCalendar.tsx
│   │   ├── invoices/
│   │   │   ├── InvoiceForm.tsx
│   │   │   └── InvoicePreview.tsx
│   │   ├── contracts/
│   │   │   ├── ContractEditor.tsx
│   │   │   └── SignaturePad.tsx
│   │   ├── galleries/
│   │   │   ├── GalleryUpload.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── PhotoSelector.tsx      # Klient vybírá fotky
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Badge.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       ├── DatePicker.tsx
│   │       └── Toast.tsx
│   ├── lib/
│   │   ├── db.ts                      # Prisma client
│   │   ├── auth.ts                    # NextAuth config
│   │   ├── email.ts                   # Resend wrapper
│   │   ├── invoice-pdf.ts            # Generování české faktury PDF
│   │   ├── contract-pdf.ts           # Generování smlouvy PDF
│   │   ├── ares.ts                    # ARES API lookup (IČO → firma)
│   │   └── utils.ts                   # Helpers
│   └── types/
│       └── index.ts
├── public/
│   └── logo.svg
├── .env.local
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Databázová schéma (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== UŽIVATEL (FOTOGRAF) ====================

model User {
  id              String   @id @default(cuid())
  email           String   @unique
  name            String?
  businessName    String?                  // Název firmy / OSVČ
  ico             String?                  // IČO
  dic             String?                  // DIČ (pokud plátce DPH)
  address         String?                  // Fakturační adresa
  city            String?
  zip             String?
  phone           String?
  website         String?
  logo            String?                  // URL loga
  bankAccount     String?                  // Číslo účtu pro faktury
  iban            String?
  invoicePrefix   String   @default("F")   // Prefix čísla faktury
  invoiceCounter  Int      @default(1)     // Poslední číslo faktury
  
  // Nastavení
  defaultCurrency String  @default("CZK")
  vatPayer        Boolean @default(false)   // Plátce DPH?
  vatRate         Float   @default(21)      // Sazba DPH
  
  // Stripe
  stripeCustomerId    String?
  plan                String  @default("trial")  // trial | basic | pro
  trialEndsAt         DateTime?
  
  clients     Client[]
  jobs        Job[]
  invoices    Invoice[]
  contracts   ContractTemplate[]
  galleries   Gallery[]
  emailTemplates EmailTemplate[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ==================== KLIENT ====================

model Client {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  name        String                       // Jméno klienta
  email       String?
  phone       String?
  
  // Firemní údaje (pro B2B)
  companyName String?
  ico         String?
  dic         String?
  address     String?
  city        String?
  zip         String?
  
  notes       String?                      // Poznámky
  source      String?                      // Odkud přišel (Instagram, doporučení, web...)
  
  jobs        Job[]
  invoices    Invoice[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
}

// ==================== ZAKÁZKA ====================

model Job {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id])
  
  title       String                       // "Svatba Petra a Jana"
  type        String                       // svatba | portret | produkt | firemni | jine
  status      String   @default("poptavka") 
  // poptavka → nabidka → potvrzeno → foceni → editace → odevzdano → archiv
  
  // Termín
  shootDate   DateTime?                    // Datum focení
  shootEndDate DateTime?                   // Konec (vícedenní akce)
  location    String?                      // Místo focení
  
  // Finance
  price       Float?                       // Dohodnutá cena
  deposit     Float?                       // Záloha
  depositPaid Boolean @default(false)
  
  // Obsah
  description String?                      // Popis zakázky
  shotList    String?                      // Co fotit (checklist)
  
  // Galerie
  galleryId   String?
  gallery     Gallery? @relation(fields: [galleryId], references: [id])
  
  invoices    Invoice[]
  contract    Contract?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId, status])
  @@index([userId, shootDate])
}

// ==================== FAKTURA ====================

model Invoice {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  jobId           String?
  job             Job?     @relation(fields: [jobId], references: [id])
  
  invoiceNumber   String                   // "F2026-001"
  issueDate       DateTime @default(now()) // Datum vystavení
  dueDate         DateTime                 // Datum splatnosti
  taxDate         DateTime?                // DUZP
  
  status          String   @default("draft") // draft | sent | paid | overdue | cancelled
  
  // Položky faktury jako JSON
  items           Json                     // [{description, quantity, unitPrice, vatRate, total}]
  
  subtotal        Float                    // Celkem bez DPH
  vatAmount       Float    @default(0)     // DPH
  total           Float                    // Celkem s DPH
  
  currency        String   @default("CZK")
  variableSymbol  String?                  // Variabilní symbol
  note            String?                  // Poznámka na faktuře
  
  paidAt          DateTime?                // Kdy zaplaceno
  sentAt          DateTime?                // Kdy odesláno klientovi
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId, status])
}

// ==================== SMLOUVA ====================

model ContractTemplate {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  name        String                       // "Smlouva o dílo - svatba"
  content     String   @db.Text            // HTML/Markdown šablony s proměnnými
  type        String                       // svatba | portret | firemni | jine
  
  contracts   Contract[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Contract {
  id              String   @id @default(cuid())
  templateId      String?
  template        ContractTemplate? @relation(fields: [templateId], references: [id])
  jobId           String   @unique
  job             Job      @relation(fields: [jobId], references: [id])
  
  content         String   @db.Text         // Finální obsah smlouvy
  signToken       String   @unique @default(cuid()) // Token pro klienta k podpisu
  
  status          String   @default("draft") // draft | sent | signed
  clientSignature String?                    // Base64 podpisu klienta
  signedAt        DateTime?
  sentAt          DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ==================== GALERIE ====================

model Gallery {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  title       String                       // "Svatba Petra a Jana - výběr"
  shareToken  String   @unique @default(cuid()) // Token pro sdílení s klientem
  
  status      String   @default("draft")   // draft | shared | selecting | completed
  
  // Nastavení výběru
  maxSelections Int?                        // Max fotek k výběru (null = neomezeno)
  selectionDeadline DateTime?               // Deadline pro výběr
  
  photos      Photo[]
  jobs        Job[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
}

model Photo {
  id          String   @id @default(cuid())
  galleryId   String
  gallery     Gallery  @relation(fields: [galleryId], references: [id], onDelete: Cascade)
  
  url         String                       // URL fotky (Uploadthing/S3)
  thumbnailUrl String?                     // Thumbnail
  filename    String
  order       Int      @default(0)
  
  selected    Boolean  @default(false)      // Vybraná klientem
  
  createdAt   DateTime @default(now())

  @@index([galleryId, selected])
}

// ==================== EMAIL ŠABLONY ====================

model EmailTemplate {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  name        String                       // "Potvrzení zakázky"
  subject     String                       // Předmět emailu
  body        String   @db.Text            // HTML s proměnnými {{jmeno}}, {{datum}}, {{cena}}
  trigger     String?                      // manual | job_confirmed | invoice_sent | gallery_shared
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Klíčové funkce MVP (3-4 týdny)

### Týden 1: Základ
- [ ] Next.js projekt, Prisma, Supabase, NextAuth (magic link)
- [ ] Layout: sidebar, header, responsive
- [ ] Registrace / Login flow
- [ ] Nastavení profilu: jméno, IČO, adresa, účet, logo
- [ ] ARES API lookup: zadáš IČO → auto-fill názvu firmy a adresy

### Týden 2: Klienti + Zakázky
- [ ] CRUD klientů: seznam, detail, formulář
- [ ] ARES lookup i pro klienty (B2B)
- [ ] Pipeline zakázek: kanban board (drag & drop)
  - Stavy: Poptávka → Nabídka → Potvrzeno → Focení → Editace → Odevzdáno
- [ ] Detail zakázky: klient, typ, termín, cena, záloha, popis
- [ ] Kalendář: měsíční pohled se zakázkami

### Týden 3: Faktury + Smlouvy
- [ ] Generování české faktury z dat zakázky
  - Automatické číslo faktury (prefix + counter)
  - Variabilní symbol
  - QR platba (Czech QR Payment standard)
  - Položky s DPH
  - PDF export (české legislativní požadavky)
- [ ] Odeslání faktury emailem klientovi
- [ ] Šablony smluv s proměnnými ({{jmeno_klienta}}, {{datum_foceni}}, {{cena}})
- [ ] Klient podepíše smlouvu online (SignaturePad + token link)

### Týden 4: Galerie + Polish
- [ ] Upload fotek do galerie (drag & drop, bulk)
- [ ] Sdílení galerie klientovi přes odkaz (bez loginu)
- [ ] Klient vybírá fotky (checkbox + counter vs max)
- [ ] Fotograf vidí výběr klienta
- [ ] Dashboard: přehled měsíce (zakázky, příjmy, nadcházející focení)
- [ ] Email šablony: potvrzení, připomínka, sdílení galerie
- [ ] Stripe: trial 14 dní → 149/299/499 CZK/měs

---

## Česká faktura — povinné náležitosti

```typescript
// src/lib/invoice-pdf.ts
// Podle zákona č. 563/1991 Sb. o účetnictví a § 29 zákona o DPH

interface CzechInvoice {
  // Dodavatel (fotograf)
  supplierName: string;        // Jméno / název firmy
  supplierIco: string;         // IČO
  supplierDic?: string;        // DIČ (pokud plátce DPH)
  supplierAddress: string;     // Sídlo
  supplierBankAccount: string; // Číslo účtu
  supplierIban?: string;
  
  // Odběratel (klient)
  clientName: string;
  clientIco?: string;
  clientDic?: string;
  clientAddress: string;
  
  // Faktura
  invoiceNumber: string;       // Číslo faktury (unikátní řada)
  issueDate: Date;             // Datum vystavení
  dueDate: Date;               // Datum splatnosti
  taxDate?: Date;              // DUZP (datum uskutečnění zdanitelného plnění)
  variableSymbol: string;      // Variabilní symbol
  
  // Položky
  items: Array<{
    description: string;       // Popis (např. "Svatební fotografie - celý den")
    quantity: number;
    unit: string;              // "ks", "hod", "komplet"
    unitPrice: number;         // Cena za jednotku
    vatRate: number;           // 0 | 12 | 21
    totalWithoutVat: number;
    vatAmount: number;
    totalWithVat: number;
  }>;
  
  // Součty
  subtotal: number;            // Celkem bez DPH
  vatAmount: number;           // DPH celkem
  total: number;               // Celkem k úhradě
  currency: 'CZK' | 'EUR';
  
  // QR kód pro platbu
  qrPayment: {
    iban: string;
    amount: number;
    currency: string;
    variableSymbol: string;
    message?: string;
  };
  
  note?: string;               // "Nejsem plátce DPH" nebo jiná poznámka
}

// QR platba podle standardu Česká bankovní asociace (SPD formát)
function generateQRPaymentString(data: {
  iban: string;
  amount: number;
  currency: string;
  vs: string;
  message?: string;
}): string {
  const parts = [
    'SPD*1.0',
    `ACC:${data.iban}`,
    `AM:${data.amount.toFixed(2)}`,
    `CC:${data.currency}`,
    `X-VS:${data.vs}`,
  ];
  if (data.message) {
    parts.push(`MSG:${data.message}`);
  }
  return parts.join('*');
}
```

---

## ARES API (lookup IČO)

```typescript
// src/lib/ares.ts
// ARES = Administrativní registr ekonomických subjektů
// API: https://ares.gov.cz/ekonomicke-subjekty-v-be/rest

interface AresResult {
  ico: string;
  obchodniJmeno: string;       // Název firmy
  sidlo: {
    textovaAdresa: string;     // Celá adresa
  };
  dic?: string;
  pravniForma?: string;
}

export async function lookupIco(ico: string): Promise<AresResult | null> {
  try {
    const res = await fetch(
      `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      ico: data.ico,
      obchodniJmeno: data.obchodniJmeno,
      sidlo: { textovaAdresa: data.sidlo?.textovaAdresa || '' },
      dic: data.dic,
    };
  } catch {
    return null;
  }
}
```

---

## Pipeline zakázek (Kanban)

```
Stavy zakázky a co se děje v každém:

POPTÁVKA     → Nový lead přišel (email/Instagram/telefon)
               Akce: odpovědět, poslat cenovou nabídku

NABÍDKA      → Cenová nabídka odeslána
               Akce: čekat na odpověď, follow-up email

POTVRZENO    → Klient souhlasí, smlouva podepsána
               Akce: vygenerovat smlouvu, poslat k podpisu, vystavit zálohovou fakturu

FOCENÍ       → Termín focení se blíží/probíhá
               Akce: připomínka klientovi, checklist focení

EDITACE      → Fotky se upravují
               Akce: upload do galerie, sdílet s klientem k výběru

ODEVZDÁNO    → Finální fotky dodány
               Akce: vystavit finální fakturu, poděkování klientovi

ARCHIV       → Vše hotovo a zaplaceno
```

---

## Email šablony (výchozí)

```typescript
// Výchozí email šablony v češtině

const defaultTemplates = [
  {
    name: 'Potvrzení poptávky',
    subject: 'Děkuji za poptávku — {{typ_foceni}}',
    body: `Dobrý den, {{jmeno}},

děkuji za Váš zájem o {{typ_foceni}}. Rád/a bych Vám nabídl/a své služby.

Moje cena za {{typ_foceni}} je {{cena}} Kč. V ceně je zahrnuto:
- [doplňte]

Pokud máte zájem, rád/a Vám pošlu smlouvu a domluvíme se na detailech.

S pozdravem,
{{fotograf_jmeno}}
{{fotograf_telefon}}`,
    trigger: 'manual',
  },
  {
    name: 'Odeslání smlouvy',
    subject: 'Smlouva k podpisu — {{nazev_zakazky}}',
    body: `Dobrý den, {{jmeno}},

v příloze zasílám smlouvu k naší spolupráci na {{nazev_zakazky}}.

Smlouvu můžete podepsat online na tomto odkazu:
{{odkaz_smlouva}}

Po podpisu Vám zašlu zálohovou fakturu.

S pozdravem,
{{fotograf_jmeno}}`,
    trigger: 'manual',
  },
  {
    name: 'Sdílení galerie',
    subject: 'Vaše fotky jsou připraveny! — {{nazev_zakazky}}',
    body: `Dobrý den, {{jmeno}},

Vaše fotografie z {{nazev_zakazky}} jsou připraveny k prohlédnutí!

Galerii si můžete prohlédnout zde:
{{odkaz_galerie}}

{{#if max_vyber}}Vyberte prosím {{max_vyber}} fotek k finální úpravě do {{deadline}}.{{/if}}

Těším se na Vaši zpětnou vazbu!

S pozdravem,
{{fotograf_jmeno}}`,
    trigger: 'gallery_shared',
  },
  {
    name: 'Připomínka platby',
    subject: 'Připomínka — faktura {{cislo_faktury}} po splatnosti',
    body: `Dobrý den, {{jmeno}},

dovoluji si Vás upozornit, že faktura č. {{cislo_faktury}} na částku {{castka}} Kč je po splatnosti (splatnost byla {{datum_splatnosti}}).

Prosím o úhradu na účet {{cislo_uctu}}, VS: {{variabilni_symbol}}.

Pokud jste již platbu odeslali, považujte tento email za bezpředmětný.

Děkuji,
{{fotograf_jmeno}}`,
    trigger: 'manual',
  },
];
```

---

## Cenové tarify

```
TRIAL (14 dní zdarma)
  - Vše neomezeně na 14 dní
  - 1 GB úložiště pro galerie

ZÁKLAD — 149 Kč/měs (placeno ročně) nebo 199 Kč/měs
  - 50 klientů
  - 20 zakázek/měs
  - 5 galerií (100 fotek)
  - Faktury + QR platby
  - Email šablony
  - 2 GB úložiště

PROFESIONÁL — 349 Kč/měs (placeno ročně) nebo 449 Kč/měs
  - Neomezení klienti
  - Neomezené zakázky
  - Neomezené galerie
  - Smlouvy s e-podpisem
  - Automatické emaily
  - Statistiky
  - 10 GB úložiště
  - Vlastní logo na galeriích

STUDIO — 699 Kč/měs (placeno ročně) nebo 899 Kč/měs
  - Vše z Profesionál
  - 50 GB úložiště
  - Vlastní doména pro galerie
  - Prioritní podpora
  - Export dat
```

---

## Go-to-market (tvoje práce jako маrkетолога)

### Kde jsou čeští fotografové:
- **Facebook skupiny:** "Svatební fotografové CZ/SK" (~5000 členů), "Fotografové — podnikání" (~3000), "Miluji focení" komunita
- **Instagram:** české svatební fotografy (taguj #svatba, #svatebnifotograf)
- **Web milujifoceni.cz** — komunita a vzdělávání pro české fotografy
- **Megapixel.cz** — fórum a články
- **Fotoškola Online** — kurzy, webináře

### Strategie spuštění:
1. **Beta:** 10 fotografů zdarma na 3 měsíce za feedback → osobně oslov v FB skupinách
2. **Obsah:** Blog — "Jak správně fakturovat jako fotograf OSVČ", "5 věcí které vám ukradnou čas"
3. **Reference:** Po beta požádej o recenze a case studies
4. **SEO:** "CRM pro fotografy", "software pro fotografy", "fakturace fotograf", "smlouva svatební fotograf vzor"
5. **Partnerství:** Spolupráce s milujifoceni.cz, fotoškoly, dodavatelé techniky

---

## Proměnné prostředí (.env.local)

```env
# Database
DATABASE_URL=postgresql://...@db.supabase.co:5432/postgres

# Auth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=re_...

# File upload
UPLOADTHING_SECRET=sk_...
UPLOADTHING_APP_ID=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=FotoSprávce
```

---

## Příkazy pro start

```bash
# 1. Init
npx create-next-app@latest fotospravce \
  --typescript --tailwind --eslint --app --src-dir

cd fotospravce

# 2. Dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install resend uploadthing @uploadthing/react
npm install stripe @stripe/stripe-js
npm install date-fns qrcode react-signature-canvas
npm install @hello-pangea/dnd    # drag & drop pro kanban
npm install @react-pdf/renderer   # PDF generování

npm install -D @types/qrcode @types/react-signature-canvas

# 3. Prisma
npx prisma init
# Zkopíruj schema.prisma
npx prisma generate
npx prisma db push

# 4. Run
npm run dev
```

---

## Co NEdělat v MVP

- ❌ Žádná mobilní aplikace — web stačí (responsive)
- ❌ Žádné AI funkce — přidáš později (AI návrhy textů emailů, auto-editing)
- ❌ Žádná integrace s účetními systémy — export CSV stačí
- ❌ Žádný marketplace / hledání fotografa — to je jiný produkt
- ❌ Žádné platby přes platformu — jen generování faktur, platba převodem
- ❌ Žádný multi-user / tým — jeden fotograf = jeden účet
- ❌ Žádný vlastní hosting fotek — použij Uploadthing/S3

---

## Pořadí vývoje (co dělat NEJDŘÍVE)

```
1. Auth + profil (den 1-2)
2. Klienti CRUD (den 3-4)  
3. Zakázky + pipeline kanban (den 5-7)
4. Kalendář (den 8)
5. Faktury + PDF + QR (den 9-11)
6. Smlouvy + e-podpis (den 12-13)
7. Galerie + upload + sdílení (den 14-16)
8. Email šablony + odesílání (den 17-18)
9. Dashboard statistiky (den 19)
10. Stripe billing (den 20-21)
11. Landing page (den 22-23)
12. Testing + deploy (den 24-25)
```
