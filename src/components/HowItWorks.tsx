import { motion } from 'framer-motion';
import {
  CheckCircle2,
  LayoutDashboard,
  BarChart3,
  ArrowRight,
  Search,
  Upload,
  Eye,
  Heart,
  MapPin,
} from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F4F7F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* SECTION 1: For seekers */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Visual */}
          <motion.div
            className="order-2 lg:order-1 relative h-[500px] rounded-[40px] bg-white border border-[#D4E0E1] shadow-xl overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00575F]/5 to-transparent" />
            <div className="relative z-10 w-3/4 flex flex-col gap-4">
              {/* Search bar */}
              <div className="h-12 w-full bg-[#F4F7F7] rounded-2xl border border-[#D4E0E1] flex items-center px-4 gap-3">
                <Search className="w-4 h-4 text-[#00575F]" />
                <div className="h-2 w-1/3 bg-[#D4E0E1] rounded-full" />
              </div>
              {/* Active result */}
              <div className="h-16 w-full bg-[#00575F]/5 rounded-2xl border border-[#00575F]/20 flex items-center px-4 gap-3 transform -translate-y-2 translate-x-4 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-[#00575F] flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <div className="h-2 w-1/2 bg-[#00575F]/40 rounded-full" />
                <div className="ml-auto flex items-center gap-1 px-3 py-1 bg-white rounded-full">
                  <MapPin className="w-2.5 h-2.5 text-[#00575F]" />
                  <span className="text-[10px] font-bold text-[#00575F]">Cerca de ti</span>
                </div>
              </div>
              {/* Ghost results */}
              <div className="h-12 w-full bg-[#F4F7F7] rounded-2xl border border-[#D4E0E1] flex items-center px-4 gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D4E0E1]" />
                <div className="h-2 w-1/4 bg-[#D4E0E1] rounded-full" />
              </div>
              <div className="h-12 w-full bg-[#F4F7F7] rounded-2xl border border-[#D4E0E1] flex items-center px-4 gap-3 opacity-60">
                <div className="w-4 h-4 rounded-full border-2 border-[#D4E0E1]" />
                <div className="h-2 w-1/5 bg-[#D4E0E1] rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#00575F]/10 flex items-center justify-center text-[#00575F] mb-6">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-6">Para quienes buscan</h2>
            <p className="text-lg text-[#708C8E] mb-8 leading-relaxed">
              Deja de recorrer la ciudad viendo anuncios en postes. Toda la información de alquileres y trabajos está
              centralizada y organizada para que la encuentres en segundos.
            </p>
            <ul className="space-y-4">
              {[
                'Explora anuncios sin necesidad de registrarte',
                'Filtra por tipo, precio, distrito y ciudad',
                'Contacta directo por WhatsApp o teléfono',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00575F] shrink-0 mt-0.5" />
                  <span className="text-[#2D4A4C]">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* SECTION 2: For publishers */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#00A86B]/10 flex items-center justify-center text-[#00A86B] mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-6">Para quienes publican</h2>
            <p className="text-lg text-[#708C8E] mb-8 leading-relaxed">
              ¿Tienes una habitación disponible o una oferta de empleo? Publica tu anuncio en minutos y llega a miles de personas buscando exactamente lo que ofreces.
            </p>
            <ul className="space-y-4">
              {[
                'Publicación rápida con fotos y detalles',
                'Mayor alcance que un anuncio físico',
                'Gestiona tus publicaciones desde tu perfil',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5" />
                  <span className="text-[#2D4A4C]">{text}</span>
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className="mt-10 inline-flex items-center gap-2 text-[#00575F] font-bold hover:text-[#00393F] transition-colors group"
            >
              Empieza a publicar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Visual — chart / stats */}
          <motion.div
            className="relative h-[500px] rounded-[40px] bg-[#00575F] border border-[#00393F] shadow-2xl overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 w-3/4 h-3/4 flex flex-col justify-end gap-2 pb-8">
              <div className="absolute top-8 left-0">
                <p className="text-white/60 text-sm font-medium mb-1">Visitas esta semana</p>
                <p className="text-white text-3xl font-bold">1,240</p>
              </div>
              {/* Bar chart */}
              <div className="flex items-end justify-between h-48 gap-3">
                {[40, 70, 45, 90, 65, 30, 55].map((h, i) => (
                  <div key={i} className="w-full bg-white/20 rounded-t-lg relative">
                    <div
                      className="absolute bottom-0 w-full bg-white rounded-t-lg transition-all duration-1000 ease-out"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-white/50 text-xs font-medium mt-2">
                {['L', 'M', 'Mi', 'J', 'V', 'S', 'D'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: bento grid */}
        <div className="mt-32">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A1B] mb-4">
              Una experiencia diseñada para ti
            </h2>
            <p className="text-lg text-[#708C8E]">
              Simple, rápida y eficiente — así es como debería ser buscar oportunidades.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Big card */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#D4E0E1] relative overflow-hidden flex flex-col justify-end min-h-[200px]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Eye className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <p className="text-[#00575F] font-medium text-sm mb-2">Sin registro</p>
                <h3 className="text-[#0F1A1B] text-2xl md:text-3xl font-bold">
                  Explora libremente. Sin barreras.
                </h3>
              </div>
            </div>
            {/* Small cards */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4E0E1] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-[#00A86B]/10 flex items-center justify-center text-[#00A86B] mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F1A1B] text-lg">Favoritos</h4>
                <p className="text-sm text-[#708C8E] mt-1">Guarda anuncios para verlos después</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4E0E1] flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-[#00575F]/10 flex items-center justify-center text-[#00575F] mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F1A1B] text-lg">Publica rápido</h4>
                <p className="text-sm text-[#708C8E] mt-1">Con fotos, precio y ubicación</p>
              </div>
            </div>
            <div className="bg-[#00575F] rounded-3xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 bg-white/10 w-24 h-24 rounded-full blur-xl" />
              <p className="text-5xl font-bold tracking-tighter">24/7</p>
              <p className="text-sm font-medium opacity-90">Accede en cualquier momento</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
