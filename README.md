# VhoraGO — Landing Page

Landing page de **VhoraGO**, la plataforma móvil para encontrar alquileres y oportunidades de empleo en tu ciudad.

## Tecnologías

- **React 19** + TypeScript
- **Vite** — bundler ultrarrápido
- **Tailwind CSS v4** — estilos utilitarios con `@tailwindcss/vite`
- **Framer Motion** — animaciones de scroll y entrada
- **Lucide React** — iconografía
- **Supabase** — datos en tiempo real (usuarios, publicaciones, ciudades)

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LuisKinnDC/AppVoraLanding.git
   cd AppVoraLanding
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con tus credenciales de Supabase:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```
src/
├── components/       # Secciones de la landing
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── hooks/
│   └── useStats.ts   # Hook que consulta Supabase
├── lib/
│   ├── supabase.ts   # Cliente de Supabase
│   └── constants.ts  # URL de descarga y constantes
├── assets/           # Imágenes (logo, screenshots)
├── App.tsx
├── main.tsx
└── index.css         # Tailwind v4 + tema personalizado
```

## Scripts

| Comando          | Descripción                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Servidor de desarrollo con HMR     |
| `npm run build`  | Compilación para producción        |
| `npm run preview`| Vista previa del build de producción|

## Licencia

© 2026 VhoraGO. Todos los derechos reservados.

