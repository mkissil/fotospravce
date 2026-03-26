'use client';
import { stagger, staggerItem, fadeIn } from '@/lib/animations';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];
const DAYS = ['Po','Út','St','Čt','Pá','So','Ne'];
const TYPE_COLORS: Record<string, string> = {
  svatba: 'bg-pink-400', portret: 'bg-green-400', produkt: 'bg-blue-400', firemni: 'bg-yellow-500', jine: 'bg-purple-400',
};

interface Job { id: string; title: string; type: string; status: string; clientName: string; shootDate: string }

export default function KalendarClient({ jobs }: { jobs: Job[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); };
  const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth()); };

  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const days: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);

  const getJobsForDay = (d: number) => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    return jobs.filter(j => j.shootDate.startsWith(dateStr));
  };

  return (
    <motion.div initial="initial" animate="animate" variants={stagger}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Kalendář</h1>

        <div className="rounded-xl border border-[var(--border)] bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button onClick={prev} className="rounded-lg p-2 hover:bg-[var(--bg)] transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={next} className="rounded-lg p-2 hover:bg-[var(--bg)] transition-colors"><ChevronRight size={18} /></button>
              <h2 className="text-lg font-semibold ml-2">{MONTHS[month]} {year}</h2>
            </div>
            <button onClick={goToday} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg)] transition-colors">
              Dnes
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => (
              <div key={d} className="py-2 text-center text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">{d}</div>
            ))}
            {days.map((day, i) => {
              const dayJobs = day ? getJobsForDay(day) : [];
              return (
                <motion.div
                  key={i}
                  className={`min-h-[80px] rounded-lg border p-1.5 transition-colors ${
                    day === null ? 'border-transparent' :
                    isToday(day) ? 'border-[var(--accent)] bg-[var(--accent-light)]' :
                    'border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
                >
                  {day !== null && (
                    <>
                      <span className={`text-xs ${isToday(day) ? 'font-bold text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>{day}</span>
                      {dayJobs.map(j => (
                        <div key={j.id} className={`mt-0.5 rounded px-1 py-0.5 text-[9px] font-medium text-white truncate ${TYPE_COLORS[j.type] || 'bg-gray-400'}`} title={`${j.title} — ${j.clientName}`}>
                          {j.clientName.split(' ')[0]}
                        </div>
                      ))}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <span key={type} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              {{ svatba: 'Svatba', portret: 'Portrét', produkt: 'Produkt', firemni: 'Firemní', jine: 'Jiné' }[type]}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
