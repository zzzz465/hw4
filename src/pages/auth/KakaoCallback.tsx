import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuth } from '../../services/kakaoAuth';
import { LoadingOverlay } from '@mantine/core';

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
      navigate('/signin');
      return;
    }

    kakaoAuth.handleCallback(code)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Kakao login failed:', error);
        navigate('/signin');
      });
  }, [navigate]);

  return <LoadingOverlay visible={true} />;
}
