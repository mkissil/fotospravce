# FotoSpravce

CRM a prezentační web pro fotografy postavený na `Next.js 14`, `Prisma`, `NextAuth` a `Framer Motion`.

## Lokální spuštění

1. Nastavte `.env.local` s platným `DATABASE_URL`, `NEXTAUTH_SECRET` a dalšími klíči, které projekt používá.
2. Vygenerujte Prisma client:

```bash
node_modules/.bin/prisma.cmd generate
```

3. Spusťte development server:

```bash
npm run dev
```

## Kontrola kvality

```bash
npm run lint
npm run build
```

## Databáze

Projekt je nastavený na `PostgreSQL` přes `DATABASE_URL`.

- Pro lokální vývoj musí být databáze dostupná z vašeho počítače.
- Pro Vercel nasaďte produkční `DATABASE_URL` do Project Environment Variables.
- Po připojení nové databáze nezapomeňte aplikovat Prisma schema do cílového prostředí.

## Důležité poznámky

- Autentizace běží přes `next-auth` s credentials providerem.
- API vrací korektní `401`, `404` a `400` odpovědi pro běžné chybové stavy.
- Galerie a smlouvy mají zatím UI vrstvu, ale jejich data nejsou napojená na samostatné Prisma modely.
