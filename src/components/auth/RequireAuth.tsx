import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../services/auth';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate('/signin', {
        replace: true,
        state: { from: location }
      });
    }
  }, [navigate, location]);

  if (!auth.isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
}
