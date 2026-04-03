import { useRef, useState, useEffect } from 'react';
import { useStats } from '../hooks/useStats';
import { useCountUp } from '../hooks/useCountUp';
import { motion } from 'framer-motion';

function AnimatedStat({ end, suffix = '', prefix = '+', label, delay }: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useCountUp(visible ? end : 0, 2200);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 150 }}
    >
      <span className="text-2xl font-bold text-[#00575F] stat-glow tabular-nums">
        {prefix}{value.toLocaleString('es-PE')}{suffix}
      </span>
      <span className="text-sm text-[#708C8E]">{label}</span>
    </motion.div>
  );
}

export default function Stats() {
  const { stats, loading } = useStats();

  return (
    <section className="py-10 border-y border-[#D4E0E1] bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[#708C8E] mb-8">
          Miles de personas ya encontraron trabajo o vivienda con VhoraGO
        </p>
        {loading ? (
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
            {['Usuarios activos', 'Anuncios publicados', 'Ciudades'].map((label) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-[#00575F] animate-pulse">—</span>
                <span className="text-sm text-[#708C8E]">{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
            <AnimatedStat end={stats.usuarios} label="Usuarios activos" delay={0} />
            <AnimatedStat end={stats.publicaciones} label="Anuncios publicados" delay={0.1} />
            <AnimatedStat end={stats.ciudades} label="Ciudades" delay={0.2} />
          </div>
        )}
      </div>
    </section>
  );
}
