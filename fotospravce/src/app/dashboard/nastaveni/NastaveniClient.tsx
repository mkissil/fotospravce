'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { stagger, staggerItem } from '@/lib/animations';
import { Save } from 'lucide-react';

interface UserData {
  name: string; email: string; phone: string;
  businessName: string; ico: string; dic: string; address: string;
  vatPayer: boolean;
}

export default function NastaveniClient({ user }: { user: UserData }) {
  const router = useRouter();
  const [form, setForm] = useState(user);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key: string, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));

  const lookupAres = async () => {
    if (!form.ico || form.ico.length < 8) return;
    try {
      const res = await fetch(`/api/ares?ico=${form.ico}`);
      const data = await res.json();
      if (data.obchodniJmeno) {
        setForm(prev => ({
          ...prev,
          businessName: data.obchodniJmeno || prev.businessName,
          address: data.sidlo?.textovaAdresa || prev.address,
          dic: data.dic || prev.dic,
        }));
      }
    } catch {}
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/user', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  const inputCls = "mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:ring-2 ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all";
  const labelCls = "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider";

  return (
    <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-2xl space-y-6">
      <motion.div variants={staggerItem} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text)]">Nastavení</h1>
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
          <Save size={16} /> {saved ? 'Uloženo!' : saving ? 'Ukládám...' : 'Uložit'}
        </button>
      </motion.div>

      <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-6 space-y-4">
        <h2 className="font-semibold text-[var(--text)]">Osobní údaje</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Jméno</label><input value={form.name} onChange={e => update('name', e.target.value)} className={inputCls} /></div>
          <div><label className={labelCls}>Email</label><input value={form.email} disabled className={`${inputCls} bg-[var(--bg)] cursor-not-allowed`} /></div>
          <div><label className={labelCls}>Telefon</label><input value={form.phone} onChange={e => update('phone', e.target.value)} className={inputCls} /></div>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="rounded-2xl border border-[var(--border)] bg-white p-6 space-y-4">
        <h2 className="font-semibold text-[var(--text)]">Fakturační údaje</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1"><label className={labelCls}>IČO</label><input value={form.ico} onChange={e => update('ico', e.target.value)} className={inputCls} /></div>
            <button onClick={lookupAres} className="mt-6 rounded-xl border border-[var(--border)] px-3 py-3 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">ARES</button>
          </div>
          <div><label className={labelCls}>DIČ</label><input value={form.dic} onChange={e => update('dic', e.target.value)} className={inputCls} /></div>
          <div className="col-span-2"><label className={labelCls}>Název firmy / OSVČ</label><input value={form.businessName} onChange={e => update('businessName', e.target.value)} className={inputCls} /></div>
          <div className="col-span-2"><label className={labelCls}>Adresa</label><input value={form.address} onChange={e => update('address', e.target.value)} className={inputCls} /></div>
          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="vatPayer" checked={form.vatPayer} onChange={e => update('vatPayer', e.target.checked)} className="rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]" />
            <label htmlFor="vatPayer" className="text-sm text-[var(--text)]">Plátce DPH</label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
