import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IconLoader2 } from '@tabler/icons-react';

const ADMIN_EMAIL = 'admin@vhorago.com';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1A1B] flex items-center justify-center">
        <IconLoader2 className="w-8 h-8 text-[#00A86B] animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  return <>{children}</>;
}
