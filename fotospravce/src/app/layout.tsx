import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-serif', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'FotoSprávce | CRM pro české fotografy',
  description:
    'Klienti, zakázky, kalendář, faktury a přehled v jednom rytmu. Český workspace pro fotografy a malá studia, která chtějí působit profesionálně.',
  keywords: ['crm pro fotografy', 'software pro fotografy', 'správa zakázek fotograf', 'faktury pro fotografy'],
  openGraph: {
    title: 'FotoSprávce | CRM pro české fotografy',
    description: 'Od prvního kontaktu po zaplacenou fakturu. Přehledné workflow pro fotografy v jednom systému.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${manrope.variable} ${fraunces.variable} ${jetbrains.variable} h-full scroll-smooth`}>
      <body className="min-h-full font-sans text-[var(--text)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'FotoSprávce',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              audience: {
                '@type': 'Audience',
                audienceType: 'Fotografové a kreativní studia',
              },
              offers: [
                { '@type': 'Offer', price: '249', priceCurrency: 'CZK', name: 'Začátečník' },
                { '@type': 'Offer', price: '449', priceCurrency: 'CZK', name: 'Profesionál' },
                { '@type': 'Offer', price: '799', priceCurrency: 'CZK', name: 'Studio' },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
