import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import SmlouvyClient from './SmlouvyClient';

const demoTemplates = [
  { id: '1', name: 'Smlouva o dílo — svatba', type: 'svatba', contractCount: 2 },
  { id: '2', name: 'Smlouva o dílo — portrét', type: 'portret', contractCount: 1 },
];

const demoContracts = [
  { id: '1', jobTitle: 'Svatba Petra & Jan', clientName: 'Petra Dvořáková', status: 'signed', signToken: 'x1', signedAt: new Date().toISOString() },
  { id: '2', jobTitle: 'Rodinné focení Svobodovi', clientName: 'Lucie Svobodová', status: 'sent', signToken: 'x2', signedAt: null },
];

export default async function SmlouvyPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return <SmlouvyClient templates={demoTemplates} contracts={demoContracts} />;
}
