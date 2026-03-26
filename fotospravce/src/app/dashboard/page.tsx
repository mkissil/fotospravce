import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const [clientCount, monthJobs, unpaidInvoices, upcomingJobs, recentJobs] = await Promise.all([
    prisma.client.count({ where: { userId: user.id } }),
    prisma.job.findMany({
      where: { userId: user.id, shootDate: { gte: startOfMonth, lte: endOfMonth }, status: { not: 'archiv' } },
      include: { client: true },
    }),
    prisma.invoice.findMany({
      where: { userId: user.id, status: { in: ['sent', 'overdue'] } },
      include: { client: true },
    }),
    prisma.job.findMany({
      where: { userId: user.id, shootDate: { gte: now }, status: { notIn: ['odevzdano', 'archiv'] } },
      orderBy: { shootDate: 'asc' },
      take: 5,
      include: { client: true },
    }),
    prisma.job.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { client: true },
    }),
  ]);

  const monthRevenue = monthJobs.reduce((s, j) => s + (j.price || 0), 0);
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Dobré ráno' : hour < 18 ? 'Dobré odpoledne' : 'Dobrý večer';
  const today = format(now, "EEEE, d. MMMM yyyy", { locale: cs });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <DashboardClient
      userName={user.name?.split(' ')[0] || 'fotografe'}
      greeting={greeting}
      today={todayCapitalized}
      stats={{
        monthJobsCount: monthJobs.length,
        monthRevenue,
        unpaidCount: unpaidInvoices.length,
        unpaidTotal: unpaidInvoices.reduce((s, i) => s + i.total, 0),
        clientCount,
      }}
      upcomingJobs={upcomingJobs.map(j => ({
        id: j.id, title: j.title, clientName: j.client.name, type: j.type,
        shootDate: j.shootDate?.toISOString() || null, status: j.status, location: j.location,
      }))}
      recentJobs={recentJobs.map(j => ({
        id: j.id, title: j.title, clientName: j.client.name, status: j.status,
        createdAt: j.createdAt.toISOString(),
      }))}
    />
  );
}
