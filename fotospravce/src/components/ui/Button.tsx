'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50';
    const variants = {
      primary: 'bg-[linear-gradient(135deg,var(--accent),#ff9a71)] text-white shadow-[0_22px_50px_-28px_rgba(214,93,56,0.95)] hover:-translate-y-0.5 hover:shadow-[0_26px_58px_-28px_rgba(214,93,56,0.75)] active:translate-y-0',
      secondary: 'surface-panel text-[var(--text)] hover:-translate-y-0.5 hover:border-white/80',
      ghost: 'text-[var(--text-secondary)] hover:bg-white/55 hover:text-[var(--text)]',
    };
    const sizes = {
      sm: 'px-3.5 py-2 text-xs gap-1.5',
      md: 'px-5 py-3 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
