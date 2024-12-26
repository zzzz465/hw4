import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { kakaoAuth } from '../../services/kakaoAuth';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!kakaoAuth.isLoggedIn()) {
      console.log('not logged in')
      navigate('/signin')
    } else {
      console.log('user: ', kakaoAuth.getCurrentUser())
    }
  }, [navigate])

  useEffect(() => {
    console.log(kakaoAuth.isLoggedIn())
  }, [])

  return <>{children}</>
}
