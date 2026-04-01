import { motion } from 'framer-motion';
import { Home, Briefcase, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: <Home className="w-6 h-6" />,
    title: 'Alquileres',
    description:
      'Encuentra habitaciones, cuartos, departamentos y minidepartamentos en alquiler cerca de ti. Filtra por precio, distrito y tipo de inmueble.',
    color: 'text-[#00575F]',
    bg: 'bg-white',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Oportunidades de empleo',
    description:
      'Accede a ofertas de trabajo: medio tiempo, tiempo completo y empleos temporales. Contacta directamente al empleador con un solo toque.',
    color: 'text-[#00A86B]',
    bg: 'bg-white',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Contacto directo',
    description:
      'Cada publicación incluye teléfono y WhatsApp del anunciante. Sin intermediarios, sin demoras: comunícate de inmediato.',
    color: 'text-[#00575F]',
    bg: 'bg-white',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-4">
            Todo lo que necesitas, en un solo lugar
          </h2>
          <p className="text-lg text-[#708C8E]">
            Diseñamos VhoraGO para que encontrar trabajo o vivienda sea tan simple como abrir la app.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-[#F4F7F7] rounded-3xl p-8 border border-[#D4E0E1] hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} shadow-sm flex items-center justify-center ${f.color} mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F1A1B] mb-3">{f.title}</h3>
              <p className="text-[#708C8E] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Extra feature pills */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            'Publicación rápida',
            'Búsqueda por ubicación',
            'Sistema de favoritos',
            'Perfil de usuario',
            'Sin registro para explorar',
            'Filtros por precio',
          ].map((pill) => (
            <span
              key={pill}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-[#D4E0E1] text-[#526263] hover:border-[#00575F] hover:text-[#00575F] transition-colors cursor-default"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
