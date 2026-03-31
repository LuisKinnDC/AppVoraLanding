import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { DOWNLOAD_URL } from '../lib/constants';

export default function CTA() {
  return (
    <section id="download" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          className="bg-[#00575F] rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/5 rounded-full blur-3xl transform rotate-12" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-[#00A86B]/20 rounded-full blur-3xl transform -rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
              Descarga Vora y accede a cientos de ofertas de empleo y opciones de alquiler en tu ciudad. Gratis y sin complicaciones.
            </p>
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#00575F] hover:bg-[#F4F7F7] px-10 py-5 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3 mx-auto"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Descargar App
            </a>
            <p className="text-sm text-white/60 mt-6">Disponible para Android. Gratis con todas las funciones.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
