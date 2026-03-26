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
  default: 'bg-[var(--bg-hover)] text-[var(--text-secondary)]',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
}
