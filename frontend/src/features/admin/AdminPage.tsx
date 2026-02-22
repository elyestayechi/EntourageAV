import { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { AdminPanel } from './AdminPanel';
import { checkAuth, logout } from '../../services/authAPI';


export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const status = await checkAuth();
        setIsAuthenticated(status.is_authenticated === true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    verifySession();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3a3a3a] via-[#4a4a4a] to-[#5a5a5a] flex items-center justify-center">
        <div className="text-white text-xl font-light tracking-widest uppercase animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}