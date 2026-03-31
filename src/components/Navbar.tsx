import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoVora from '../assets/LogoVora.png';
import { DOWNLOAD_URL } from '../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logoVora} alt="Vora" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold tracking-tight text-[#0F1A1B]">Vora</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-[#526263] hover:text-[#00575F] transition-colors">
            Características
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-[#526263] hover:text-[#00575F] transition-colors">
            ¿Cómo funciona?
          </a>
          <a href="#testimonials" className="text-sm font-medium text-[#526263] hover:text-[#00575F] transition-colors">
            Testimonios
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00575F] hover:bg-[#00393F] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Descargar App
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#0F1A1B]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#D4E0E1] px-6 py-4 flex flex-col gap-4">
          {['#features', '#how-it-works', '#testimonials'].map((href, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#526263] hover:text-[#00575F] transition-colors"
            >
              {['Características', '¿Cómo funciona?', 'Testimonios'][i]}
            </a>
          ))}
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-[#00575F] text-white px-6 py-2.5 rounded-full text-sm font-medium text-center"
          >
            Descargar App
          </a>
        </div>
      )}
    </nav>
  );
}
