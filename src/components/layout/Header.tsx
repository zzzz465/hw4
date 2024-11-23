import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Group justify="space-between">
          <Link to="/" className="text-red-600 text-2xl font-bold">
            NETFLIX
          </Link>

          <Group gap="lg">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/popular" className="text-white hover:text-gray-300">Popular</Link>
            <Link to="/search" className="text-white hover:text-gray-300">Search</Link>
            <Link to="/wishlist" className="text-white hover:text-gray-300">My List</Link>
            <Button component={Link} to="/signin" variant="filled" color="red">
              Sign In
            </Button>
          </Group>
        </Group>
      </div>
    </header>
  );
} 
