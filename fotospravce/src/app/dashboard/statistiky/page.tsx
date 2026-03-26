import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import StatistikyClient from './StatistikyClient';

export default async function StatistikyPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const [jobs, invoices] = await Promise.all([
    prisma.job.findMany({ where: { userId: user.id, status: { not: 'archiv' } } }),
    prisma.invoice.findMany({ where: { userId: user.id, status: 'paid' } }),
  ]);

  const totalRevenue = invoices.reduce((s, i) => s + i.total, 0);
  const avgJobPrice = jobs.filter(j => j.price).length > 0
    ? jobs.filter(j => j.price).reduce((s, j) => s + (j.price || 0), 0) / jobs.filter(j => j.price).length
    : 0;
  const poptavky = jobs.filter(j => true).length;
  const potvrzeno = jobs.filter(j => !['poptavka', 'nabidka'].includes(j.status)).length;
  const conversionRate = poptavky > 0 ? Math.round((potvrzeno / poptavky) * 100) : 0;

  const typeCounts: Record<string, number> = {};
  jobs.forEach(j => { typeCounts[j.type] = (typeCounts[j.type] || 0) + 1; });

  // Monthly revenue
  const monthlyData: { month: string; revenue: number }[] = [];
  for (let m = 0; m < 12; m++) {
    const monthInvoices = invoices.filter(i => {
      const d = new Date(i.issueDate);
      return d.getMonth() === m && d.getFullYear() === new Date().getFullYear();
    });
    monthlyData.push({
      month: ['Led','Úno','Bře','Dub','Kvě','Čvn','Čvc','Srp','Zář','Říj','Lis','Pro'][m],
      revenue: monthInvoices.reduce((s, i) => s + i.total, 0),
    });
  }

  return (
    <StatistikyClient
      totalRevenue={totalRevenue}
      avgJobPrice={avgJobPrice}
      conversionRate={conversionRate}
      jobCount={jobs.length}
      typeCounts={typeCounts}
      monthlyData={monthlyData}
    />
  );
}
