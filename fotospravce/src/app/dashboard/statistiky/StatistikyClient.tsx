'use client';
import { motion } from 'framer-motion';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { formatMoney } from '@/lib/utils';
import { JOB_TYPES } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PIE_COLORS = ['#D4763A', '#7C5CFC', '#2D8A4E', '#D4A72C', '#D44A4A'];

interface Props {
  totalRevenue: number; avgJobPrice: number; conversionRate: number; jobCount: number;
  typeCounts: Record<string, number>;
  monthlyData: { month: string; revenue: number }[];
}

export default function StatistikyClient({ totalRevenue, avgJobPrice, conversionRate, jobCount, typeCounts, monthlyData }: Props) {
  const pieData = Object.entries(typeCounts).map(([type, count]) => ({
    name: (JOB_TYPES as any)[type] || type,
    value: count,
  }));

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Statistiky</h1>

        <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Celkový příjem za rok', value: formatMoney(totalRevenue), color: 'text-[var(--success)]' },
            { label: 'Průměrná cena zakázky', value: formatMoney(avgJobPrice), color: 'text-[var(--accent)]' },
            { label: 'Konverzní poměr', value: `${conversionRate} %`, color: 'text-[var(--purple)]' },
            { label: 'Zakázek celkem', value: String(jobCount), color: 'text-[var(--text)]' },
          ].map(stat => (
            <motion.div variants={staggerItem} key={stat.label}>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">{stat.label}</p>
                <p className={`mt-2 text-2xl font-bold ${stat.color}`} style={{ fontFamily: 'JetBrains Mono' }}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-white p-6">
            <h2 className="font-semibold text-[var(--text)] mb-4">Příjmy po měsících</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip formatter={(value) => formatMoney(Number(value))} />
                <Bar dataKey="revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-6">
            <h2 className="font-semibold text-[var(--text)] mb-4">Zakázky podle typu</h2>
            {pieData.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)] text-center py-8">Žádná data</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <span className="text-[var(--text-secondary)]">{d.name}</span>
                      </div>
                      <span className="font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
