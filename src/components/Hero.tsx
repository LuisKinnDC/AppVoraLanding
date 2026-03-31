import { motion } from 'framer-motion';
import { Play, Home, Star } from 'lucide-react';
import homeScreen from '../assets/Home.png';
import { useStats } from '../hooks/useStats';
import { DOWNLOAD_URL } from '../lib/constants';

export default function Hero() {
  const { stats, loading } = useStats();

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-64 -mt-32 w-[600px] h-[600px] bg-[#00575F]/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-64 -mb-32 w-[600px] h-[600px] bg-[#00A86B]/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left: copy */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4E0E1] shadow-sm mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="flex h-2 w-2 rounded-full bg-[#00A86B]" />
              <span className="text-xs font-medium text-[#526263]">Disponible ahora — descarga gratis</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-[#0F1A1B] leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Trabajo y vivienda,{' '}
              <br className="hidden lg:block" />
              en un solo lugar.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-[#708C8E] leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              La plataforma móvil que conecta a personas buscando empleo y alquiler con quienes los ofrecen. Rápido, sencillo y desde tu ciudad.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#00575F] hover:bg-[#00393F] text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <Play className="w-4 h-4" fill="currentColor" />
                Descargar App
              </a>
              <a
                href="#features"
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#F4F7F7] text-[#0F1A1B] border border-[#D4E0E1] px-8 py-4 rounded-full text-base font-medium transition-all active:scale-95"
              >
                Ver características
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-10 flex items-center gap-4 text-sm text-[#708C8E]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((l) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full border-2 border-white bg-[#00575F] flex items-center justify-center text-[10px] text-white font-medium"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p>
                {loading
                  ? 'Únete a nuestra comunidad activa'
                  : `Únete a más de ${stats.usuarios.toLocaleString('es-PE')} usuarios activos`}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div
            className="relative flex justify-center lg:justify-end items-center h-[700px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Phone */}
            <div className="phone-mockup relative z-10 bg-white">
              <div className="phone-notch" />
              <div className="phone-indicator" />
              <div className="phone-screen">
                <img
                  src={homeScreen}
                  alt="Vora App - Pantalla principal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute top-28 -left-10 z-20 animate-float bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 border border-[#D4E0E1]">
              <div className="w-9 h-9 rounded-full bg-[#E6F7F1] flex items-center justify-center text-[#00A86B]">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F1A1B]">Cuarto encontrado</p>
                <p className="text-[10px] text-[#708C8E]">Hace 2 minutos</p>
              </div>
            </div>

            <div className="absolute bottom-44 -right-8 z-20 animate-float-delayed bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-1.5 border border-[#D4E0E1] min-w-[130px]">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-medium text-[#708C8E]">Valoración</p>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-[#00575F]">Proceso..<span className="text-xs text-[#708C8E] font-normal">/5</span></p>
            </div>

            <div className="absolute top-60 -right-4 z-20 animate-float-fast bg-[#00393F] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-xs font-semibold">Anuncio publicado</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
