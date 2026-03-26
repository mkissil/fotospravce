'use client';

import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { stagger, staggerItem } from '@/lib/animations';
import { formatMoney, JOB_TYPES } from '@/lib/utils';

const PIE_COLORS = ['#D4763A', '#7C5CFC', '#2D8A4E', '#D4A72C', '#D44A4A'];

interface Props {
  totalRevenue: number;
  avgJobPrice: number;
  conversionRate: number;
  jobCount: number;
  typeCounts: Record<string, number>;
  monthlyData: { month: string; revenue: number }[];
}

export default function StatistikyClient({
  totalRevenue,
  avgJobPrice,
  conversionRate,
  jobCount,
  typeCounts,
  monthlyData,
}: Props) {
  const pieData = Object.entries(typeCounts).map(([type, count]) => ({
    name: JOB_TYPES[type] ?? type,
    value: count,
  }));

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
          Statistiky
        </h1>

        <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Celkový příjem za rok', value: formatMoney(totalRevenue), color: 'text-[var(--success)]' },
            { label: 'Průměrná cena zakázky', value: formatMoney(avgJobPrice), color: 'text-[var(--accent)]' },
            { label: 'Konverzní poměr', value: `${conversionRate} %`, color: 'text-[var(--purple)]' },
            { label: 'Zakázek celkem', value: String(jobCount), color: 'text-[var(--text)]' },
          ].map(stat => (
            <motion.div variants={staggerItem} key={stat.label}>
              <div className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{stat.label}</p>
                <p className={`mt-2 text-2xl font-bold ${stat.color}`} style={{ fontFamily: 'JetBrains Mono' }}>
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-white p-6 lg:col-span-2">
            <h2 className="mb-4 font-semibold text-[var(--text)]">Příjmy po měsících</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip formatter={value => formatMoney(Number(value))} />
                <Bar dataKey="revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-6">
            <h2 className="mb-4 font-semibold text-[var(--text)]">Zakázky podle typu</h2>
            {pieData.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--text-secondary)]">Žádná data</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                        />
                        <span className="text-[var(--text-secondary)]">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
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
