import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface VoraStats {
  usuarios: number;
  publicaciones: number;
  ciudades: number;
}

const FALLBACK: VoraStats = { usuarios: 0, publicaciones: 0, ciudades: 0 };

export function useStats() {
  const [stats, setStats] = useState<VoraStats>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, pubsRes, citiesRes] = await Promise.all([
          supabase.from('usuarios').select('id', { count: 'exact', head: true }),
          supabase.from('publicaciones').select('id', { count: 'exact', head: true }).eq('estado', 'activo'),
          supabase.from('ubicaciones_publicacion').select('ciudad'),
        ]);

        const usuarios = usersRes.count ?? 0;
        const publicaciones = pubsRes.count ?? 0;

        const ciudadesUnicas = new Set(
          (citiesRes.data ?? []).map((r) => r.ciudad).filter(Boolean)
        );

        setStats({
          usuarios,
          publicaciones,
          ciudades: ciudadesUnicas.size,
        });
      } catch {
        // keep fallback
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}

export function formatStat(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `+${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return n > 0 ? `+${n}` : '0';
}
