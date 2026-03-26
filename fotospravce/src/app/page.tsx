'use client';

import { useState } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { NarrativeSection } from '@/components/landing/NarrativeSection';
import { OfferSection } from '@/components/landing/OfferSection';

export default function LandingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden">
      <LandingHeader />
      <main>
        <HeroSection />
        <NarrativeSection />
        <OfferSection yearly={yearly} onToggleYearly={setYearly} />
      </main>

      <footer className="border-t border-white/45 bg-white/40 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl font-semibold text-[var(--text)]">
              Foto<span className="text-[var(--accent)]">Správce</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[var(--text-secondary)]">
              Studio OS pro české fotografy. Klienti, zakázky, kalendář a faktury v jednom čitelném systému.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Obsah</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <a href="#problem" className="block hover:text-[var(--text)]">
                Problém
              </a>
              <a href="#workflow" className="block hover:text-[var(--text)]">
                Workflow
              </a>
              <a href="#offer" className="block hover:text-[var(--text)]">
                Nabídka
              </a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Co fotograf kupuje</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <p>rychlejší reakci</p>
              <p>menší chaos</p>
              <p>větší jistotu nad penězi</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Akce</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <a href="/register" className="block hover:text-[var(--text)]">
                Začít zdarma
              </a>
              <a href="/login" className="block hover:text-[var(--text)]">
                Přihlásit se
              </a>
              <p>14 dní zdarma bez karty</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
