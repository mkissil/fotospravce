import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import KlientiClient from './KlientiClient';

export default async function KlientiPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    include: {
      _count: { select: { jobs: true } },
      invoices: { where: { status: 'paid' }, select: { total: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const data = clients.map(c => ({
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    companyName: c.companyName, ico: c.ico,
    notes: c.notes, source: c.source,
    jobCount: c._count.jobs,
    totalPaid: c.invoices.reduce((s, i) => s + i.total, 0),
  }));

  return <KlientiClient clients={data} />;
}
