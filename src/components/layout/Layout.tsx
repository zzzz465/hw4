import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box, Stack } from '@mantine/core';

export function Layout() {
  return (
    <Stack justify="flex-start" mih="100vh" gap={0}>
      <Header />
      <Box component="main" style={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
