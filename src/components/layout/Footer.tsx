import { Group, Text } from '@mantine/core';

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <Group justify="space-between" align="start">
          <div>
            <Text size="sm" className="mb-2">Questions? Contact us.</Text>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Text size="sm" component="a" href="#" className="hover:underline">FAQ</Text>
              <Text size="sm" component="a" href="#" className="hover:underline">Help Center</Text>
              <Text size="sm" component="a" href="#" className="hover:underline">Terms of Use</Text>
              <Text size="sm" component="a" href="#" className="hover:underline">Privacy</Text>
            </div>
          </div>

          <div className="text-right">
            <Text size="sm" className="mb-2">Follow Us</Text>
            <div className="space-x-4">
              <Text size="sm" component="a" href="#" className="hover:underline">Facebook</Text>
              <Text size="sm" component="a" href="#" className="hover:underline">Twitter</Text>
              <Text size="sm" component="a" href="#" className="hover:underline">Instagram</Text>
            </div>
          </div>
        </Group>

        <Text size="xs" className="text-center mt-8">
          © {new Date().getFullYear()} Netflix Clone. All rights reserved.
        </Text>
      </div>
    </footer>
  );
} 
