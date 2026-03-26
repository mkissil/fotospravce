interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'accent' | 'purple' | 'default';
  className?: string;
}

const colors = {
  success: 'bg-[var(--success-light)] text-[var(--success)]',
  warning: 'bg-[var(--warning-light)] text-[var(--warning)]',
  danger: 'bg-[var(--danger-light)] text-[var(--danger)]',
  accent: 'bg-[var(--accent-light)] text-[var(--accent)]',
  purple: 'bg-[var(--purple-light)] text-[var(--purple)]',
  default: 'bg-white/70 text-[var(--text-secondary)]',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border border-white/40 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
}
