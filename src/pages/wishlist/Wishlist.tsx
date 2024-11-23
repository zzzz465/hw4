import { Container, SimpleGrid, Title, Table, SegmentedControl, Box } from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WishlistButton } from '../../components/movie/WishlistButton'
import { wishlistStorage } from '../../services/localStorage'
import { useIntersection } from '@mantine/hooks'
import { Movie } from '../../types/movie'
import { auth } from '../../services/auth'

export default function Wishlist() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  const user = auth.getCurrentUser()
  const email = user?.email

  const movies = email ? wishlistStorage.getWishlist(email) : []
  const paginatedMovies = movies.slice(0, page * ITEMS_PER_PAGE)

  const { ref, entry } = useIntersection({
    threshold: 0.5,
  })

  if (entry?.isIntersecting && paginatedMovies.length < movies.length) {
    setPage(page + 1)
  }

  if (!email) {
    return (
      <Container size="xl" className="py-8">
        <Title order={1} className="text-white mb-8">Please log in to see your wishlist</Title>
      </Container>
    )
  }

  return (
    <Container size="xl" className="py-8">
      <div className="flex justify-between items-center mb-8">
        <Title order={1} className="text-white">My List</Title>
        <SegmentedControl
          value={viewMode}
          onChange={(value) => setViewMode(value as 'grid' | 'table')}
          data={[
            { label: 'Grid', value: 'grid' },
            { label: 'Table', value: 'table' },
          ]}
        />
      </div>

      {viewMode === 'grid' ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing="lg">
          {paginatedMovies.map((movie: Movie) => (
            <div key={movie.id} className="relative group">
              <Link
                to={`/movies/${movie.id}`}
                className="block transition-transform group-hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full object-cover"
                  loading="lazy"
                />
              </Link>
              <Box className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <WishlistButton movie={movie} />
              </Box>
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie: Movie) => (
              <tr key={movie.id}>
                <td style={{ width: 100 }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 rounded"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.vote_average?.toFixed(1)}</td>
                <td>
                  <WishlistButton movie={movie} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div ref={ref} style={{ height: '20px' }} />
    </Container>
  )
}
