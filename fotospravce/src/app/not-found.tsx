import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--text-muted)] font-mono">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[var(--text)]">Tato stránka neexistuje</h2>
        <p className="mt-2 text-[var(--text-secondary)]">Stránka, kterou hledáte, nebyla nalezena.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
