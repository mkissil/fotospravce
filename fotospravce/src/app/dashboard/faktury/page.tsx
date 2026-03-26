import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import FakturyClient from './FakturyClient';

export default async function FakturyPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    include: { client: true, job: true },
    orderBy: { createdAt: 'desc' },
  });

  return <FakturyClient invoices={invoices.map(i => ({
    id: i.id, invoiceNumber: i.invoiceNumber, clientName: i.client.name,
    jobTitle: i.job?.title || null, issueDate: i.issueDate.toISOString(),
    dueDate: i.dueDate.toISOString(), total: i.total, status: i.status,
    variableSymbol: i.variableSymbol,
  }))} />;
}
