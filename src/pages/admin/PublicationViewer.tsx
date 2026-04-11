import { useState } from 'react';
import {
  IconX,
  IconMapPin,
  IconCurrencyDollar,
  IconPhoto,
} from '@tabler/icons-react';

interface Publication {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  departamento?: string;
  provincia?: string;
  distrito?: string;
  tipo?: string;
  estado?: string;
  created_at?: string;
}

interface Props {
  publication: Publication;
  onClose: () => void;
}

export default function PublicationViewer({ publication: pub, onClose }: Props) {
  const [imgIdx, setImgIdx] = useState(0);

  const images = pub.imagenes?.length ? pub.imagenes : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D4A4C] sticky top-0 bg-[#1A2E2F] z-10">
          <div>
            <h2 className="text-lg font-bold text-white">Publicación</h2>
            <p className="text-xs text-[#708C8E] font-mono">ID: {pub.id}</p>
          </div>
          <button onClick={onClose} className="text-[#708C8E] hover:text-white transition-colors p-1">
            <IconX size={20} />
          </button>
        </div>

        {/* Images */}
        {images.length > 0 ? (
          <div className="relative">
            <img
              src={images[imgIdx]}
              alt={pub.titulo}
              className="w-full h-64 object-cover"
            />
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === imgIdx ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-[#0F1A1B] flex items-center justify-center text-[#526263]">
            <IconPhoto size={48} strokeWidth={1} />
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Title + Status */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-white">{pub.titulo || 'Sin título'}</h3>
            {pub.estado && (
              <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                pub.estado === 'activo'
                  ? 'bg-[#00A86B]/10 text-[#00A86B]'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {pub.estado}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#708C8E] leading-relaxed whitespace-pre-wrap">
            {pub.descripcion || 'Sin descripción'}
          </p>

          {/* Price + Location */}
          <div className="flex flex-wrap gap-3">
            {pub.precio != null && (
              <div className="flex items-center gap-1.5 bg-[#00575F]/10 text-[#00A86B] px-3 py-1.5 rounded-lg text-sm font-medium">
                <IconCurrencyDollar size={16} />
                S/ {pub.precio.toLocaleString('es-PE')}
              </div>
            )}
            {(pub.departamento || pub.provincia || pub.distrito) && (
              <div className="flex items-center gap-1.5 bg-[#0F1A1B] text-[#708C8E] px-3 py-1.5 rounded-lg text-sm">
                <IconMapPin size={16} />
                {[pub.distrito, pub.provincia, pub.departamento].filter(Boolean).join(', ')}
              </div>
            )}
          </div>

          {pub.tipo && (
            <div className="text-xs text-[#526263]">
              Tipo: <span className="text-[#708C8E] font-medium">{pub.tipo}</span>
            </div>
          )}

          {pub.created_at && (
            <div className="text-xs text-[#526263]">
              Creada: <span className="text-[#708C8E]">{new Date(pub.created_at).toLocaleDateString('es-PE')}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[#2D4A4C] flex justify-end">
          <button
            onClick={onClose}
            className="text-[#708C8E] hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
