import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
    {quote:
      'Conseguí un trabajo de tiempo completo que se ajustaba perfecto a mi horario. La app es súper fácil de usar.',
    name: 'Juan C.',
    role: 'Diseñador freelance',
    initial: 'JC',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#F4F7F7] border-t border-[#D4E0E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-[#708C8E]">Miles de personas ya confían en VhoraGO.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white p-8 rounded-3xl border border-[#D4E0E1] shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-[#0F1A1B] text-lg leading-relaxed mb-8 flex-grow">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00575F]/10 flex items-center justify-center text-[#00575F] font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#0F1A1B]">{t.name}</p>
                  <p className="text-xs text-[#708C8E]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
