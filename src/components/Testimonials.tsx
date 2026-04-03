import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconStarFilled, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const testimonials = [
  {
    quote:
      'Encontré un cuarto cerca de mi universidad en menos de 10 minutos. Antes tenía que caminar horas buscando carteles.',
    name: 'Luz D.',
    role: 'Estudiante universitaria',
    initial: 'LD',
  },
  {
    quote:
      'Publiqué un anuncio de alquiler y en el mismo día me contactaron 5 personas por WhatsApp. Es increíble el alcance.',
    name: 'Yezyon Z.',
    role: 'Propietario',
    initial: 'YZ',
  },
  {
    quote:
      'Conseguí un trabajo de medio tiempo que se ajustaba perfecto a mi horario. La app es súper fácil de usar.',
    name: 'Jhan P.',
    role: 'Programador freelance',
    initial: 'JP',
  },
  {
    quote:
      'Conseguí un trabajo de tiempo completo que se ajustaba perfecto a mi horario. La app es súper fácil de usar.',
    name: 'Juan C.',
    role: 'Diseñador freelance',
    initial: 'JC',
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const idx = ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = useCallback((dir: number) => {
    setPage(([p]) => [p + dir, dir]);
  }, []);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paused, paginate]);

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="py-24 bg-[#F4F7F7] border-t border-[#D4E0E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-[#708C8E]">Miles de personas ya confían en VhoraGO.</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-[#D4E0E1] shadow-md flex items-center justify-center text-[#00575F] hover:bg-[#00575F] hover:text-white transition-colors"
            aria-label="Anterior"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-[#D4E0E1] shadow-md flex items-center justify-center text-[#00575F] hover:bg-[#00575F] hover:text-white transition-colors"
            aria-label="Siguiente"
          >
            <IconChevronRight size={20} />
          </button>

          {/* Card */}
          <div className="overflow-hidden relative min-h-[280px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
                className="card-3d bg-white p-10 rounded-3xl border border-[#D4E0E1] shadow-lg w-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <IconStarFilled key={j} size={20} />
                  ))}
                </div>
                <p className="text-[#0F1A1B] text-lg md:text-xl leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00575F]/10 flex items-center justify-center text-[#00575F] font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F1A1B]">{t.name}</p>
                    <p className="text-sm text-[#708C8E]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > idx ? 1 : -1])}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === idx
                    ? 'w-8 bg-[#00575F]'
                    : 'w-2.5 bg-[#D4E0E1] hover:bg-[#00575F]/40'
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
