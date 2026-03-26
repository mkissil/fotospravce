'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', label, error, id, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={id} className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">{label}</label>}
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-2xl border border-white/55 bg-[rgba(255,255,255,0.74)] px-4 py-3 text-sm text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(214,93,56,0.12)] ${error ? 'border-[var(--danger)]' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
