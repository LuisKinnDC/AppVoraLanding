import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import PublicationViewer from './PublicationViewer';
import {
  IconFlag,
  IconSearch,
  IconCopy,
  IconCheck,
  IconTrash,
  IconEyeOff,
  IconLoader2,
  IconRefresh,
  IconAlertTriangle,
  IconInbox,
  IconExclamationCircle,
  IconHistory,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
} from '@tabler/icons-react';

interface Report {
  id: string;
  publicacion_id: string;
  reportante_id: string;
  motivo: string;
  estado: string;
  created_at: string;
}

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

/* ─── Confirmation Modal ─── */
interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ open, title, message, confirmLabel = 'Sí, eliminar', loading, onConfirm, onCancel }: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl w-full max-w-md shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <IconExclamationCircle size={22} className="text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-[#708C8E] leading-relaxed mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#708C8E] hover:text-white transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconTrash size={16} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // Reports state
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search state
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<Publication | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Viewer state
  const [viewPub, setViewPub] = useState<Publication | null>(null);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    report: Report | null;
    type: 'revisado' | 'ignore';
  }>({ open: false, report: null, type: 'revisado' });
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Action loading (for table row spinners)
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Delete publication state
  const [deletePubId, setDeletePubId] = useState('');
  const [deletePubLoading, setDeletePubLoading] = useState(false);
  const [deletePubMsg, setDeletePubMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // History state
  const [historyReports, setHistoryReports] = useState<Report[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyError, setHistoryError] = useState('');

  /* ─── Fetch reports ─── */
  const fetchReports = useCallback(async () => {
    setLoadingReports(true);
    setFetchError('');
    console.log('[Admin] Fetching reportes con estado = pendiente...');

    const { data, error, status } = await supabase
      .from('reportes')
      .select('*')
      .eq('estado', 'pendiente')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin] Error al cargar reportes:', { status, code: error.code, message: error.message, details: error.details });
      if (error.code === 'PGRST301' || status === 403) {
        setFetchError('Sin permisos (403). Ejecuta las políticas RLS de admin en Supabase SQL Editor.');
      } else {
        setFetchError(`Error ${status}: ${error.message}`);
      }
      setReports([]);
    } else {
      console.log(`[Admin] Reportes cargados: ${data?.length ?? 0}`, data);
      if (data && data.length === 0) {
        console.warn('[Admin] ⚠️ 0 reportes devueltos. Si hay datos en tu BD, probablemente RLS está bloqueando. Ejecuta supabase-admin-policies.sql en Supabase Dashboard → SQL Editor.');
      }
      setReports(data ?? []);
    }
    setLoadingReports(false);
  }, []);

  /* ─── Fetch history (non-pending reports) ─── */
  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    setHistoryError('');
    const { data, error } = await supabase
      .from('reportes')
      .select('*')
      .neq('estado', 'pendiente')
      .order('created_at', { ascending: false });

    if (error) {
      setHistoryError(error.message);
      setHistoryReports([]);
    } else {
      setHistoryReports(data ?? []);
    }
    setLoadingHistory(false);
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  /* ─── Copy publication ID ─── */
  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  /* ─── Fetch publication with images + location ─── */
  const fetchFullPublication = async (id: string): Promise<Publication | null> => {
    console.log('[Admin] Buscando publicación:', id);
    const { data, error, status } = await supabase
      .from('publicaciones')
      .select('*, imagenes_publicacion(url, orden), ubicaciones_publicacion(direccion, distrito, ciudad)')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('[Admin] Error al buscar publicación:', { status, error });
      return null;
    }

    console.log('[Admin] Publicación encontrada:', data);

    const imgs = (data.imagenes_publicacion as { url: string; orden: number }[] | null) ?? [];
    imgs.sort((a, b) => a.orden - b.orden);
    const ubicacion = Array.isArray(data.ubicaciones_publicacion)
      ? data.ubicaciones_publicacion[0]
      : data.ubicaciones_publicacion;

    return {
      id: data.id,
      titulo: data.titulo,
      descripcion: data.descripcion,
      precio: data.precio,
      tipo: data.tipo,
      estado: data.estado,
      created_at: data.created_at,
      imagenes: imgs.map((i) => i.url),
      departamento: ubicacion?.ciudad ?? '',
      provincia: '',
      distrito: ubicacion?.distrito ?? '',
    };
  };

  /* ─── Search by ID ─── */
  const handleSearch = async () => {
    const trimmed = searchId.trim();
    if (!trimmed) return;
    setSearchLoading(true);
    setSearchError('');
    setSearchResult(null);

    const pub = await fetchFullPublication(trimmed);

    if (!pub) {
      setSearchError('Publicación no encontrada o ya eliminada.');
    } else {
      setSearchResult(pub);
    }
    setSearchLoading(false);
  };

  /* ─── View publication from report row ─── */
  const viewFromReport = async (report: Report) => {
    const pub = await fetchFullPublication(report.publicacion_id);
    if (pub) {
      setViewPub(pub);
    } else {
      setSearchError('La publicación ya no existe o fue eliminada.');
    }
  };

  /* ─── Open confirm modal for "Cambiar estado" (revisado) ─── */
  const askMarkRevisado = (report: Report) => {
    setConfirmModal({ open: true, report, type: 'revisado' });
  };

  /* ─── Open confirm modal for "Ignorar" ─── */
  const askIgnoreReport = (report: Report) => {
    setConfirmModal({ open: true, report, type: 'ignore' });
  };

  /* ─── Execute confirmed action: only updates report estado ─── */
  const executeConfirmedAction = async () => {
    const { report, type } = confirmModal;
    if (!report) return;

    setConfirmLoading(true);
    setActionLoading(report.id);

    const newEstado = type === 'revisado' ? 'revisado' : 'atendido_sin_accion';

    try {
      const { data, error } = await supabase
        .from('reportes')
        .update({ estado: newEstado })
        .eq('id', report.id)
        .select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('RLS bloqueó la actualización del reporte.');

      setConfirmModal({ open: false, report: null, type: 'revisado' });
      await fetchReports();
      if (historyOpen) await fetchHistory();
    } catch (err: any) {
      alert('Error al cambiar estado: ' + (err.message || err));
    }
    setConfirmLoading(false);
    setActionLoading(null);
  };

  /* ─── Delete publication by ID (separate action) ─── */
  const handleDeletePublication = async () => {
    const trimmed = deletePubId.trim();
    if (!trimmed) return;
    setDeletePubLoading(true);
    setDeletePubMsg(null);

    const { data, error } = await supabase
      .from('publicaciones')
      .delete()
      .eq('id', trimmed)
      .select();

    if (error) {
      setDeletePubMsg({ type: 'err', text: error.code === 'PGRST301' || error.message.includes('403') ? 'Sin permisos (403). Verifica las políticas RLS.' : error.message });
    } else if (!data || data.length === 0) {
      setDeletePubMsg({ type: 'err', text: 'No se encontró la publicación o RLS bloqueó la eliminación.' });
    } else {
      setDeletePubMsg({ type: 'ok', text: 'Publicación eliminada correctamente.' });
      setDeletePubId('');
      setSearchResult(null);
    }
    setDeletePubLoading(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <IconFlag size={24} className="text-[#00A86B]" />
            Gestión de Reportes
          </h1>
          <p className="text-sm text-[#708C8E] mt-1">
            Revisa reportes pendientes y modera publicaciones
          </p>
        </div>
        <button
          onClick={fetchReports}
          disabled={loadingReports}
          className="flex items-center gap-2 bg-[#1A2E2F] hover:bg-[#2D4A4C] text-[#708C8E] hover:text-white border border-[#2D4A4C] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
        >
          <IconRefresh size={16} className={loadingReports ? 'animate-spin' : ''} />
          Actualizar
        </button>
      </div>

      {/* Search bar */}
      <div className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <IconSearch size={16} className="text-[#00A86B]" />
          Buscar publicación por ID
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Pega el ID de la publicación aquí..."
            className="flex-1 bg-[#0F1A1B] border border-[#2D4A4C] text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-[#526263] focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]/30 transition-colors font-mono"
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="bg-[#00575F] hover:bg-[#00393F] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {searchLoading ? <IconLoader2 size={16} className="animate-spin" /> : <IconSearch size={16} />}
            Buscar
          </button>
        </div>

        {searchError && (
          <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
            <IconAlertTriangle size={14} /> {searchError}
          </p>
        )}

        {searchResult && (
          <div className="mt-4 bg-[#0F1A1B] border border-[#2D4A4C] rounded-xl p-4 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-white font-medium truncate">{searchResult.titulo || 'Sin título'}</p>
              <p className="text-xs text-[#708C8E] font-mono truncate">ID: {searchResult.id}</p>
            </div>
            <button
              onClick={() => { setViewPub(searchResult); }}
              className="shrink-0 bg-[#00575F] hover:bg-[#00393F] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Ver detalle
            </button>
          </div>
        )}
      </div>

            {/* ─── Delete Publication by ID ─── */}
      <div className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <IconTrash size={16} className="text-red-400" />
          Borrar publicación por ID
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={deletePubId}
            onChange={(e) => { setDeletePubId(e.target.value); setDeletePubMsg(null); }}
            onKeyDown={(e) => e.key === 'Enter' && handleDeletePublication()}
            placeholder="Pega el ID de la publicación a eliminar..."
            className="flex-1 bg-[#0F1A1B] border border-[#2D4A4C] text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-[#526263] focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30 transition-colors font-mono"
          />
          <button
            onClick={handleDeletePublication}
            disabled={deletePubLoading || !deletePubId.trim()}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {deletePubLoading ? <IconLoader2 size={16} className="animate-spin" /> : <IconTrash size={16} />}
            Eliminar
          </button>
        </div>
        {deletePubMsg && (
          <p className={`mt-3 text-sm flex items-center gap-2 ${
            deletePubMsg.type === 'ok' ? 'text-[#00A86B]' : 'text-red-400'
          }`}>
            {deletePubMsg.type === 'ok' ? <IconCheck size={14} /> : <IconAlertTriangle size={14} />}
            {deletePubMsg.text}
          </p>
        )}
      </div>

      {/* Reports table */}
      <div className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2D4A4C] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Reportes pendientes
            {!loadingReports && (
              <span className="ml-2 text-xs font-normal text-[#708C8E]">({reports.length})</span>
            )}
          </h2>
        </div>

        {/* RLS / fetch error banner */}
        {fetchError && (
          <div className="mx-5 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
            <IconAlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-400 font-medium">{fetchError}</p>
              <p className="text-xs text-red-400/70 mt-1">
                Revisa la consola del navegador (F12) para más detalles.
              </p>
            </div>
          </div>
        )}

        {loadingReports ? (
          <div className="flex items-center justify-center py-16 text-[#708C8E]">
            <IconLoader2 size={24} className="animate-spin mr-3" />
            Cargando reportes...
          </div>
        ) : reports.length === 0 && !fetchError ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#526263]">
            <IconInbox size={48} strokeWidth={1} className="mb-3" />
            <p className="text-sm font-medium">No hay reportes pendientes</p>
            <p className="text-xs mt-1">¡Todo está en orden!</p>
          </div>
        ) : reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#708C8E] text-xs uppercase tracking-wider border-b border-[#2D4A4C]">
                  <th className="px-5 py-3 text-left font-medium">Reporte</th>
                  <th className="px-5 py-3 text-left font-medium">Publicación</th>
                  <th className="px-5 py-3 text-left font-medium">Reportante</th>
                  <th className="px-5 py-3 text-left font-medium">Motivo</th>
                  <th className="px-5 py-3 text-left font-medium">Fecha</th>
                  <th className="px-5 py-3 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D4A4C]">
                {reports.filter(r => r.estado === 'pendiente').map((report) => (
                  <tr key={report.id} className="hover:bg-[#0F1A1B]/50 transition-colors">
                    {/* Report ID */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#708C8E] font-mono">{report.id.slice(0, 8)}...</span>
                    </td>

                    {/* Publication ID + Copy */}
                    <td className="px-5 py-4">
                      {report.publicacion_id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewFromReport(report)}
                            className="text-xs text-[#00A86B] hover:text-white font-mono transition-colors hover:underline"
                          >
                            {report.publicacion_id.slice(0, 8)}...
                          </button>
                          <button
                            onClick={() => copyId(report.publicacion_id)}
                            className="text-[#526263] hover:text-[#00A86B] transition-colors"
                            title="Copiar ID"
                          >
                            {copiedId === report.publicacion_id ? (
                              <IconCheck size={14} className="text-[#00A86B]" />
                            ) : (
                              <IconCopy size={14} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[#526263] italic">Eliminada</span>
                      )}
                    </td>

                    {/* Reportante ID */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#708C8E] font-mono">{report.reportante_id?.slice(0, 8) ?? '—'}...</span>
                    </td>

                    {/* Motivo */}
                    <td className="px-5 py-4">
                      <span className="text-white text-sm">{report.motivo}</span>
                    </td>

                    {/* Fecha */}
                    <td className="px-5 py-4 text-[#708C8E] text-xs whitespace-nowrap">
                      {new Date(report.created_at).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {actionLoading === report.id ? (
                          <IconLoader2 size={16} className="text-[#708C8E] animate-spin" />
                        ) : (
                          <>
                            <button
                              onClick={() => askMarkRevisado(report)}
                              className="flex items-center gap-1.5 text-xs font-medium text-[#00A86B] hover:text-white bg-[#00A86B]/10 hover:bg-[#00A86B]/20 px-3 py-1.5 rounded-lg transition-colors"
                              title="Marcar como revisado"
                            >
                              <IconCircleCheck size={14} />
                              Cambiar estado
                            </button>
                            <button
                              onClick={() => askIgnoreReport(report)}
                              className="flex items-center gap-1.5 text-xs font-medium text-[#708C8E] hover:text-white bg-[#0F1A1B] hover:bg-[#2D4A4C] px-3 py-1.5 rounded-lg transition-colors"
                              title="Ignorar reporte"
                            >
                              <IconEyeOff size={14} />
                              Ignorar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>


      {/* ─── Audit History Section ─── */}
      <div className="bg-[#1A2E2F] border border-[#2D4A4C] rounded-2xl overflow-hidden">
        <button
          onClick={() => {
            const next = !historyOpen;
            setHistoryOpen(next);
            if (next && historyReports.length === 0) fetchHistory();
          }}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#0F1A1B]/30 transition-colors"
        >
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <IconHistory size={16} className="text-[#00A86B]" />
            Historial de Auditoría
            {historyReports.length > 0 && (
              <span className="text-xs font-normal text-[#708C8E]">({historyReports.length})</span>
            )}
          </h2>
          {historyOpen ? (
            <IconChevronUp size={16} className="text-[#708C8E]" />
          ) : (
            <IconChevronDown size={16} className="text-[#708C8E]" />
          )}
        </button>

        {historyOpen && (
          <>
            {/* Refresh button */}
            <div className="px-5 pb-3 flex justify-end">
              <button
                onClick={fetchHistory}
                disabled={loadingHistory}
                className="flex items-center gap-1.5 text-xs text-[#708C8E] hover:text-white transition-colors disabled:opacity-50"
              >
                <IconRefresh size={14} className={loadingHistory ? 'animate-spin' : ''} />
                Actualizar
              </button>
            </div>

            {historyError && (
              <div className="mx-5 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
                <IconAlertTriangle size={14} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-400">{historyError}</p>
              </div>
            )}

            {loadingHistory ? (
              <div className="flex items-center justify-center py-12 text-[#708C8E]">
                <IconLoader2 size={20} className="animate-spin mr-2" />
                Cargando historial...
              </div>
            ) : historyReports.length === 0 && !historyError ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#526263]">
                <IconInbox size={36} strokeWidth={1} className="mb-2" />
                <p className="text-xs">Sin registros en el historial</p>
              </div>
            ) : historyReports.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#708C8E] text-xs uppercase tracking-wider border-t border-b border-[#2D4A4C]">
                      <th className="px-5 py-3 text-left font-medium">Reporte</th>
                      <th className="px-5 py-3 text-left font-medium">Publicación</th>
                      <th className="px-5 py-3 text-left font-medium">Reportante</th>
                      <th className="px-5 py-3 text-left font-medium">Motivo</th>
                      <th className="px-5 py-3 text-left font-medium">Estado</th>
                      <th className="px-5 py-3 text-left font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D4A4C]">
                    {historyReports.map((report) => (
                      <tr key={report.id} className="hover:bg-[#0F1A1B]/50 transition-colors">
                        <td className="px-5 py-3">
                          <span className="text-xs text-[#708C8E] font-mono">{report.id.slice(0, 8)}...</span>
                        </td>
                        <td className="px-5 py-3">
                          {report.publicacion_id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#708C8E] font-mono">
                                {report.publicacion_id.slice(0, 8)}...
                              </span>
                              <button
                                onClick={() => copyId(report.publicacion_id)}
                                className="text-[#526263] hover:text-[#00A86B] transition-colors"
                                title="Copiar ID"
                              >
                                {copiedId === report.publicacion_id ? (
                                  <IconCheck size={12} className="text-[#00A86B]" />
                                ) : (
                                  <IconCopy size={12} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-[#526263] italic">Eliminada</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-xs text-[#708C8E] font-mono">{report.reportante_id?.slice(0, 8) ?? '—'}...</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-white text-xs">{report.motivo}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            report.estado === 'revisado'
                              ? 'bg-red-500/10 text-red-400'
                              : report.estado === 'atendido_sin_accion'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-[#00A86B]/10 text-[#00A86B]'
                          }`}>
                            {report.estado === 'revisado'
                              ? 'Eliminado'
                              : report.estado === 'atendido_sin_accion'
                              ? 'Ignorado'
                              : report.estado}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[#708C8E] text-xs whitespace-nowrap">
                          {new Date(report.created_at).toLocaleDateString('es-PE', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Publication Viewer Modal */}
      {viewPub && (
        <PublicationViewer
          publication={viewPub}
          onClose={() => setViewPub(null)}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.type === 'revisado' ? 'Cambiar estado a revisado' : 'Descartar reporte'}
        message={
          confirmModal.type === 'revisado'
            ? `¿Marcar el reporte como revisado? Motivo: ${confirmModal.report?.motivo || ''}`
            : '¿Descartar este reporte? Se marcará como ignorado y desaparecerá de la lista.'
        }
        confirmLabel={confirmModal.type === 'revisado' ? 'Sí, cambiar estado' : 'Sí, descartar'}
        loading={confirmLoading}
        onConfirm={executeConfirmedAction}
        onCancel={() => setConfirmModal({ open: false, report: null, type: 'revisado' })}
      />
    </div>
  );
}
