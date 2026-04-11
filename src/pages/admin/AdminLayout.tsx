import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  IconFlag,
  IconLogout,
  IconHome,
  IconLoader2,
} from '@tabler/icons-react';
import logoVora from '../../assets/VhoraGO_Logo.png';

const navItems = [
  { to: '/admin', icon: <IconFlag size={20} />, label: 'Reportes' },
];

export default function AdminLayout() {
  const { user, signOut, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1A1B] flex items-center justify-center">
        <IconLoader2 className="w-8 h-8 text-[#00A86B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1A1B] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1A2E2F] border-r border-[#2D4A4C]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-[#2D4A4C]">
          <img src={logoVora} alt="VhoraGO" className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold text-white tracking-tight">VhoraGO</span>
          <span className="text-[10px] font-semibold text-[#00A86B] bg-[#00A86B]/10 px-1.5 py-0.5 rounded-full ml-auto">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#00575F] text-white'
                    : 'text-[#708C8E] hover:text-white hover:bg-[#0F1A1B]'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#2D4A4C] px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#00575F] flex items-center justify-center text-white text-xs font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#708C8E] hover:text-white bg-[#0F1A1B] rounded-lg py-2 transition-colors"
            >
              <IconHome size={14} />
              Landing
            </Link>
            <button
              onClick={signOut}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-[#708C8E] hover:text-red-400 bg-[#0F1A1B] rounded-lg py-2 transition-colors"
            >
              <IconLogout size={14} />
              Salir
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A2E2F] border-b border-[#2D4A4C] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoVora} alt="VhoraGO" className="w-7 h-7" />
          <span className="font-bold text-white text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-[#708C8E] hover:text-white p-1.5">
            <IconHome size={18} />
          </Link>
          <button onClick={signOut} className="text-[#708C8E] hover:text-red-400 p-1.5">
            <IconLogout size={18} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="pt-16 md:pt-0 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
