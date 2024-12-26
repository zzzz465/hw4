import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuth } from '../../services/kakaoAuth';
import { LoadingOverlay } from '@mantine/core';

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
      console.log('No code found');
      navigate('/signin', { replace: true });
      return;
    }

    kakaoAuth.handleCallback(code)
      .then((userinfo) => {
        console.log('Kakao login successful. userinfo: ', userinfo);
        localStorage.setItem('currentUser', JSON.stringify(userinfo));
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error('Kakao login failed:', error);
        navigate('/signin', { replace: true });
      });
  }, [navigate]);

  return <LoadingOverlay visible={true} />;
}
