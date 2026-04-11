-- ═══════════════════════════════════════════════════════════════
-- VhoraGO — Políticas RLS + FK Fix para Admin Panel
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query → Run
-- Admin: admin@vhorago.com
-- ═══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- PASO 0: CORREGIR FK — Cambiar ON DELETE CASCADE a SET NULL
--   Esto evita que al borrar una publicación se borren los reportes.
--   El reporte se mantiene intacto, solo publicacion_id queda NULL.
-- ──────────────────────────────────────────────────────────────

-- 0a. Permitir NULL en publicacion_id (por si no lo permite aún)
ALTER TABLE public.reportes ALTER COLUMN publicacion_id DROP NOT NULL;

-- 0b. Buscar y reemplazar la FK existente
DO $$
DECLARE
    fk_name TEXT;
BEGIN
    -- Encontrar el nombre de la FK que referencia publicaciones
    SELECT tc.constraint_name INTO fk_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'reportes'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'publicacion_id'
    LIMIT 1;

    IF fk_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE public.reportes DROP CONSTRAINT %I', fk_name);
        RAISE NOTICE 'FK eliminada: %', fk_name;
    ELSE
        RAISE NOTICE 'No se encontró FK de publicacion_id en reportes.';
    END IF;
END $$;

-- Recrear FK con ON DELETE SET NULL
ALTER TABLE public.reportes
    ADD CONSTRAINT reportes_publicacion_id_fkey
    FOREIGN KEY (publicacion_id)
    REFERENCES public.publicaciones(id)
    ON DELETE SET NULL;

-- 0c. Eliminar triggers que puedan borrar reportes al eliminar publicaciones
DO $$
DECLARE
    trig RECORD;
BEGIN
    FOR trig IN
        SELECT trigger_name
        FROM information_schema.triggers
        WHERE event_object_table = 'publicaciones'
          AND action_timing = 'AFTER'
          AND event_manipulation = 'DELETE'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON public.publicaciones', trig.trigger_name);
        RAISE NOTICE 'Trigger eliminado de publicaciones: %', trig.trigger_name;
    END LOOP;

    FOR trig IN
        SELECT trigger_name
        FROM information_schema.triggers
        WHERE event_object_table = 'reportes'
          AND action_timing IN ('BEFORE', 'AFTER')
          AND event_manipulation = 'DELETE'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON public.reportes', trig.trigger_name);
        RAISE NOTICE 'Trigger eliminado de reportes: %', trig.trigger_name;
    END LOOP;
END $$;

-- ──────────────────────────────────────────────────────────────
-- PASO 1: Políticas RLS para Admin
-- ──────────────────────────────────────────────────────────────

-- 1. Admin puede VER todos los reportes (no solo los suyos)
DROP POLICY IF EXISTS "Admin ve todos los reportes" ON public.reportes;
CREATE POLICY "Admin ve todos los reportes"
    ON public.reportes FOR SELECT
    USING (auth.jwt() ->> 'email' = 'admin@vhorago.com');

-- 2. Admin puede ACTUALIZAR reportes (cambiar estado a revisado/atendido_sin_accion)
DROP POLICY IF EXISTS "Admin actualiza reportes" ON public.reportes;
CREATE POLICY "Admin actualiza reportes"
    ON public.reportes FOR UPDATE
    USING (auth.jwt() ->> 'email' = 'admin@vhorago.com');

-- 3. Admin puede ELIMINAR cualquier publicación
DROP POLICY IF EXISTS "Admin elimina publicaciones" ON public.publicaciones;
CREATE POLICY "Admin elimina publicaciones"
    ON public.publicaciones FOR DELETE
    USING (auth.jwt() ->> 'email' = 'admin@vhorago.com');

-- ──────────────────────────────────────────────────────────────
-- PASO 2: Permitir estados válidos en reportes
-- ──────────────────────────────────────────────────────────────
DO $$
BEGIN
    ALTER TABLE public.reportes DROP CONSTRAINT IF EXISTS reportes_estado_check;
    ALTER TABLE public.reportes ADD CONSTRAINT reportes_estado_check
        CHECK (estado IN ('pendiente', 'revisado', 'resuelto', 'descartado', 'atendido_sin_accion'));
EXCEPTION WHEN others THEN
    RAISE NOTICE 'No se pudo actualizar constraint de reportes.estado: %', SQLERRM;
END $$;
