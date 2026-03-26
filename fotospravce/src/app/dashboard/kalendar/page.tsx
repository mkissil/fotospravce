import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import KalendarClient from './KalendarClient';

export default async function KalendarPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const jobs = await prisma.job.findMany({
    where: { userId: user.id, shootDate: { not: null }, status: { notIn: ['archiv'] } },
    include: { client: true },
    orderBy: { shootDate: 'asc' },
  });

  return (
    <KalendarClient jobs={jobs.map(j => ({
      id: j.id, title: j.title, type: j.type, status: j.status,
      clientName: j.client.name, shootDate: j.shootDate!.toISOString(),
    }))} />
  );
}
