import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import GalerieClient from './GalerieClient';

// Demo data (model Gallery neexistuje v zjednodušeném schema)
const demoGalleries = [
  { id: '1', title: 'Svatba Petra & Jan — výběr', shareToken: 'abc123', status: 'shared', photoCount: 12, selectedCount: 5, maxSelections: 50,
    photos: Array.from({ length: 12 }, (_, i) => ({ id: String(i), url: `https://picsum.photos/400/300?random=${i + 100}`, selected: i < 5 })) },
  { id: '2', title: 'Firemní fotky Horák Design', shareToken: 'def456', status: 'draft', photoCount: 8, selectedCount: 0, maxSelections: null,
    photos: Array.from({ length: 8 }, (_, i) => ({ id: String(i + 20), url: `https://picsum.photos/400/300?random=${i + 200}`, selected: false })) },
];

export default async function GaleriePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return <GalerieClient galleries={demoGalleries} />;
}
