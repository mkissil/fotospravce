import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import ClientDetailClient from './ClientDetailClient';

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const client = await prisma.client.findFirst({
    where: { id: params.id, userId: user.id },
    include: {
      jobs: { orderBy: { createdAt: 'desc' }, take: 10 },
      invoices: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  });

  if (!client) notFound();

  return (
    <ClientDetailClient
      client={{
        id: client.id, name: client.name, email: client.email, phone: client.phone,
        companyName: client.companyName, ico: client.ico, notes: client.notes, source: client.source,
      }}
      jobs={client.jobs.map(j => ({
        id: j.id, title: j.title, type: j.type, status: j.status,
        shootDate: j.shootDate?.toISOString() || null, price: j.price,
      }))}
      invoices={client.invoices.map(i => ({
        id: i.id, invoiceNumber: i.invoiceNumber, total: i.total, status: i.status,
        dueDate: i.dueDate.toISOString(),
      }))}
    />
  );
}
