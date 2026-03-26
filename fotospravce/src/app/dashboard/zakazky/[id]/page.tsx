import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import JobDetailClient from './JobDetailClient';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const [job, clients, invoices] = await Promise.all([
    prisma.job.findFirst({
      where: { id: params.id, userId: user.id },
      include: { client: true },
    }),
    prisma.client.findMany({
      where: { userId: user.id },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.invoice.findMany({
      where: { userId: user.id, jobId: params.id },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  if (!job) notFound();

  return (
    <JobDetailClient
      job={{
        id: job.id,
        title: job.title,
        type: job.type,
        status: job.status,
        clientId: job.clientId,
        clientName: job.client.name,
        shootDate: job.shootDate?.toISOString() || null,
        location: job.location,
        price: job.price,
        deposit: job.deposit,
        description: job.description,
        createdAt: job.createdAt.toISOString(),
      }}
      clients={clients}
      invoices={invoices.map(invoice => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        total: invoice.total,
        status: invoice.status,
        dueDate: invoice.dueDate.toISOString(),
      }))}
    />
  );
}
