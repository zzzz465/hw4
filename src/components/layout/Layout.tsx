import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box, Stack } from '@mantine/core';

export function Layout() {
  return (
    <Stack justify="flex-start" mih="100vh" gap={0}>
      <Box
        component="main"
        style={{ flex: 1 }}
        pt="var(--header-height, 60px)"
      >
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
