import logoVora from '../assets/LogoVora.png';

export default function Footer() {
  return (
    <footer className="bg-[#F4F7F7] py-16 border-t border-[#D4E0E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={logoVora} alt="Vora" className="w-9 h-9 object-contain" />
            <span className="font-bold text-xl text-[#0F1A1B]">Vora</span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap gap-8 text-sm font-medium text-[#526263]">
            <a href="#features" className="hover:text-[#00575F] transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="hover:text-[#00575F] transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#testimonials" className="hover:text-[#00575F] transition-colors">
              Testimonios
            </a>
            <a href="#download" className="hover:text-[#00575F] transition-colors">
              Descargar
            </a>
          </div>
        </div>

        {/* Misión y visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-bold text-[#0F1A1B] mb-2">Nuestra misión</h4>
            <p className="text-sm text-[#708C8E] leading-relaxed">
              Facilitar el acceso a oportunidades de vivienda y empleo, conectando a las personas de forma directa, práctica y confiable a través de la tecnología.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F1A1B] mb-2">Nuestra visión</h4>
            <p className="text-sm text-[#708C8E] leading-relaxed">
              Convertirnos en la plataforma principal de anuncios locales, ayudando a digitalizar el acceso a oportunidades y mejorando la forma en que las personas encuentran trabajo y vivienda en su comunidad.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[#D4E0E1] text-sm text-[#708C8E]">
          <p>© {new Date().getFullYear()} Vora. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#0F1A1B] transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-[#0F1A1B] transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
