import { Link, useNavigate } from 'react-router-dom'
import { Button, Menu, ActionIcon, Group, Box, Text, Container, Burger } from '@mantine/core'
import { IconUser, IconHome, IconSearch, IconHeart, IconTrendingUp } from '@tabler/icons-react'
import { auth } from '../../services/auth'
import { useState } from 'react'

export function Header() {
  const navigate = useNavigate()
  const isAuthenticated = auth.isLoggedIn()
  const currentUser = auth.getCurrentUser()
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

  const handleLogout = () => {
    auth.logout()
    navigate('/signin')
  }

  const navigationLinks = [
    { to: '/', label: 'Home', icon: IconHome },
    { to: '/popular', label: 'Popular', icon: IconTrendingUp },
    { to: '/search', label: 'Search', icon: IconSearch },
    { to: '/wishlist', label: 'My List', icon: IconHeart },
  ]

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
            {/* Desktop Navigation */}
            <Group gap="md" visibleFrom="md">
              {navigationLinks.map(({ to, label }) => (
                <Text
                  key={to}
                  component={Link}
                  to={to}
                  c="gray.3"
                  style={{
                    textDecoration: 'none',
                    '&:hover': { color: 'var(--mantine-color-white)' },
                  }}
                >
                  {label}
                </Text>
              ))}
            </Group>
          </Group>

          <Group gap="sm">
            {/* Mobile Navigation */}
            <Menu
              opened={mobileMenuOpened}
              onChange={setMobileMenuOpened}
              position="bottom-end"
              shadow="md"
            >
              <Menu.Target>
                <Burger
                  opened={mobileMenuOpened}
                  onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
                  color="white"
                  size="sm"
                />
              </Menu.Target>

              <Menu.Dropdown>
                {navigationLinks.map(({ to, label, icon: Icon }) => (
                  <Menu.Item
                    key={to}
                    component={Link}
                    to={to}
                    leftSection={<Icon size={16} />}
                    onClick={() => setMobileMenuOpened(false)}
                  >
                    {label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            {/* User Menu */}
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
                  <Menu.Item disabled>{currentUser?.email}</Menu.Item>
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
        </Group>
      </Container>
    </Box>
  )
}
