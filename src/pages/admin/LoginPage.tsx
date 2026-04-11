import { useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { IconLock, IconMail, IconLoader2 } from '@tabler/icons-react';
import logoVora from '../../assets/VhoraGO_Logo.png';

export default function LoginPage() {
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F1A1B] flex items-center justify-center">
        <IconLoader2 className="w-8 h-8 text-[#00A86B] animate-spin" />
      </div>
    );
  }

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const err = await signIn(email, password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1A1B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src={logoVora} alt="VhoraGO" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-white tracking-tight">VhoraGO</span>
          <span className="text-xs font-medium text-[#00A86B] bg-[#00A86B]/10 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1A2E2F] rounded-2xl border border-[#2D4A4C] p-8 shadow-2xl"
        >
          <h1 className="text-xl font-bold text-white mb-1">Iniciar sesión</h1>
          <p className="text-sm text-[#708C8E] mb-8">Panel de administración</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {/* Email */}
          <label className="block mb-4">
            <span className="text-sm font-medium text-[#708C8E] mb-1.5 block">Correo electrónico</span>
            <div className="relative">
              <IconMail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#526263]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@vhorago.com"
                className="w-full bg-[#0F1A1B] border border-[#2D4A4C] text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-[#526263] focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]/30 transition-colors"
              />
            </div>
          </label>

          {/* Password */}
          <label className="block mb-8">
            <span className="text-sm font-medium text-[#708C8E] mb-1.5 block">Contraseña</span>
            <div className="relative">
              <IconLock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#526263]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0F1A1B] border border-[#2D4A4C] text-white rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-[#526263] focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B]/30 transition-colors"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00575F] hover:bg-[#00393F] disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <IconLoader2 size={18} className="animate-spin" />
            ) : (
              <IconLock size={16} />
            )}
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-xs text-[#526263] mt-6">
          Solo administradores autorizados
        </p>
      </div>
    </div>
  );
}
