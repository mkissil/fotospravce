import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-playfair", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "FotoSprávce — CRM pro české fotografy | Zakázky, faktury, galerie",
  description: "Jediný CRM v češtině pro fotografy. Správa zakázek, fakturace s QR, smlouvy s e-podpisem, galerie. 14 dní zdarma.",
  keywords: ["crm pro fotografy", "software pro fotografy", "fakturace fotograf"],
  openGraph: {
    title: "FotoSprávce — CRM pro české fotografy",
    description: "Zakázky, faktury, smlouvy a galerie na jednom místě.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "FotoSprávce",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: [
                { "@type": "Offer", price: "249", priceCurrency: "CZK", name: "Začátečník" },
                { "@type": "Offer", price: "449", priceCurrency: "CZK", name: "Profesionál" },
                { "@type": "Offer", price: "799", priceCurrency: "CZK", name: "Studio" },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
