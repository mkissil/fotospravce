import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

export function formatDate(date: Date | string, fmt: string = 'd. M. yyyy'): string {
  return format(new Date(date), fmt, { locale: cs });
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('cs-CZ', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount) + ' Kč';
}

export const JOB_STATUSES = {
  poptavka: { label: 'Poptávka', color: 'bg-gray-400' },
  nabidka: { label: 'Nabídka', color: 'bg-blue-500' },
  potvrzeno: { label: 'Potvrzeno', color: 'bg-[#D4845A]' },
  foceni: { label: 'Focení', color: 'bg-[#7C5CFC]' },
  editace: { label: 'Editace', color: 'bg-[#D4A72C]' },
  odevzdano: { label: 'Odevzdáno', color: 'bg-[#2D8A4E]' },
  archiv: { label: 'Archiv', color: 'bg-gray-300' },
} as const;

export const JOB_TYPES: Record<string, string> = {
  svatba: 'Svatba', portret: 'Portrét', produkt: 'Produkt', firemni: 'Firemní', jine: 'Jiné',
};

export const INVOICE_STATUSES: Record<string, { label: string; color: string }> = {
  draft: { label: 'Koncept', color: 'bg-gray-400' },
  sent: { label: 'Odesláno', color: 'bg-blue-500' },
  paid: { label: 'Zaplaceno', color: 'bg-[#2D8A4E]' },
  overdue: { label: 'Po splatnosti', color: 'bg-[#D44A4A]' },
  cancelled: { label: 'Stornováno', color: 'bg-gray-300' },
};
