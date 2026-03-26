import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import NastaveniClient from './NastaveniClient';

export default async function NastaveniPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <NastaveniClient user={{
      name: user.name || '', email: user.email, phone: user.phone || '',
      businessName: user.businessName || '',
      ico: user.ico || '', dic: user.dic || '', address: user.address || '',
      vatPayer: user.vatPayer,
    }} />
  );
}
