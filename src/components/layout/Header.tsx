import { Link, useNavigate } from 'react-router-dom'
import { Button, Menu, ActionIcon, Group, Box, Text, Container } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { auth } from '../../services/auth'

export function Header() {
  const navigate = useNavigate()
  const isAuthenticated = auth.isLoggedIn()

  const handleLogout = () => {
    auth.logout()
    navigate('/signin')
  }

  return (
    <Box
      component="header"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      h="var(--header-height, 60px)"
      bg="rgba(0, 0, 0, 0.75)"
      style={{
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container size="xl">
        <Group justify="space-between" p="md">
          <Group gap="md">
            <Text
              component={Link}
              to="/"
              c="red"
              size="xl"
              fw="bold"
              style={{ textDecoration: 'none' }}
            >
              NETFLIX
            </Text>
            <Group gap="md" visibleFrom="md">
              <Text
                component={Link}
                to="/"
                c="gray.3"
                style={{
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--mantine-color-white)' },
                }}
              >
                Home
              </Text>
              <Text
                component={Link}
                to="/popular"
                c="gray.3"
                style={{
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--mantine-color-white)' },
                }}
              >
                Popular
              </Text>
              <Text
                component={Link}
                to="/search"
                c="gray.3"
                style={{
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--mantine-color-white)' },
                }}
              >
                Search
              </Text>
              <Text
                component={Link}
                to="/wishlist"
                c="gray.3"
                style={{
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--mantine-color-white)' },
                }}
              >
                My List
              </Text>
            </Group>
          </Group>

          {isAuthenticated ? (
            <Menu position="bottom-end" shadow="md">
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  size="lg"
                  c="gray.3"
                  style={{ '&:hover': { color: 'var(--mantine-color-white)' } }}
                >
                  <IconUser size={24} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item onClick={handleLogout} color="red">
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              component={Link}
              to="/signin"
              variant="filled"
              color="red"
              size="sm"
            >
              Sign In
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  )
}
