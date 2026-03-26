export function SectionIntro({
  kicker,
  title,
  description,
  centered = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div className={`section-kicker ${centered ? 'justify-center' : ''}`}>
        <span className="eyebrow-line" />
        {kicker}
      </div>
      <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
