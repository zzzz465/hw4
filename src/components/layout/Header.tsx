import { Link, useNavigate } from 'react-router-dom'
import { Button, Menu, ActionIcon } from '@mantine/core'
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
    <header className="fixed w-full bg-black/75 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            NETFLIX
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/popular" className="text-gray-300 hover:text-white">
              Popular
            </Link>
            <Link to="/search" className="text-gray-300 hover:text-white">
              Search
            </Link>
            <Link to="/wishlist" className="text-gray-300 hover:text-white">
              My List
            </Link>
          </nav>
        </div>

        {isAuthenticated ? (
          <Menu position="bottom-end" shadow="md">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconUser size={20} />
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
      </div>
    </header>
  )
}
