import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper, Stack, Title } from '@mantine/core';
import { kakaoAuth } from '../../services/kakaoAuth';

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (kakaoAuth.isLoggedIn()) {
      console.log('logged in, redirecting to home')
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    const authUrl = kakaoAuth.login();
    window.location.href = authUrl;
  };

  return (
    <Container size="xs" mt="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mt="md" mb="md">
          Welcome to Netflix Clone
        </Title>

        <Stack>
          <Button
            fullWidth
            size="lg"
            onClick={handleKakaoLogin}
            style={{ backgroundColor: '#FEE500', color: '#000000' }}
          >
            Continue with Kakao
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
