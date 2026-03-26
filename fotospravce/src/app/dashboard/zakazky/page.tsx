import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import ZakazkyClient from './ZakazkyClient';

export default async function ZakazkyPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const [jobs, clients] = await Promise.all([
    prisma.job.findMany({
      where: { userId: user.id },
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.client.findMany({ where: { userId: user.id }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ]);

  return (
    <ZakazkyClient
      jobs={jobs.map(j => ({
        id: j.id, title: j.title, type: j.type, status: j.status,
        clientId: j.clientId, clientName: j.client.name,
        shootDate: j.shootDate?.toISOString() || null,
        location: j.location, price: j.price, deposit: j.deposit,
        description: j.description,
      }))}
      clients={clients}
    />
  );
}
