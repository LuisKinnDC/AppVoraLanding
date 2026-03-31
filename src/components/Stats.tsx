import { useStats, formatStat } from '../hooks/useStats';

export default function Stats() {
  const { stats, loading } = useStats();

  const items = [
    { value: formatStat(stats.usuarios), label: 'Usuarios activos' },
    { value: formatStat(stats.publicaciones), label: 'Anuncios publicados' },
    { value: formatStat(stats.ciudades), label: 'Ciudades' },
    { value: '4.8★', label: 'Valoración en Play Store' },
  ];

  return (
    <section className="py-10 border-y border-[#D4E0E1] bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[#708C8E] mb-8">
          Miles de personas ya encontraron trabajo o vivienda con Vora
        </p>
        <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
          {items.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className={`text-2xl font-bold text-[#00575F] ${loading ? 'animate-pulse' : ''}`}>
                {loading ? '—' : value}
              </span>
              <span className="text-sm text-[#708C8E]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
