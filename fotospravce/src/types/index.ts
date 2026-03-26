export type JobStatus = 'poptavka' | 'nabidka' | 'potvrzeno' | 'foceni' | 'editace' | 'odevzdano' | 'archiv';
export type JobType = 'svatba' | 'portret' | 'produkt' | 'firemni' | 'jine';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type ContractStatus = 'draft' | 'sent' | 'signed';
export type GalleryStatus = 'draft' | 'shared' | 'selecting' | 'completed';
export type UserPlan = 'trial' | 'basic' | 'pro' | 'studio';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  vatRate: number;
  totalWithoutVat: number;
  vatAmount: number;
  totalWithVat: number;
}
