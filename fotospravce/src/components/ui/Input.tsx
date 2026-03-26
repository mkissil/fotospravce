'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div>
        {label && <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{label}</label>}
        <input
          ref={ref} id={id}
          className={`w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all ${error ? 'border-[var(--danger)]' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
