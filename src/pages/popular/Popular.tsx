import { Container, SimpleGrid, Title, Box, Skeleton, Pagination, Stack, Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import { usePopularMovies } from '../../hooks/queries/popularQueries'

export default function Popular() {
  const { movies, totalPages, currentPage, isLoading, isError, setPage } = usePopularMovies()

  if (isLoading) {
    return <Skeleton height="100vh" />
  }

  if (isError) {
    return <Box p="xl">Error loading popular movies</Box>
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title c="white">Popular Movies</Title>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
          {movies.map((movie: any) => (
            <Box
              key={movie.id}
              component={Link}
              to={`/movies/${movie.id}`}
              style={{
                textDecoration: 'none',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                radius="md"
                h={300}
                fit="cover"
              />
            </Box>
          ))}
        </SimpleGrid>

        <Pagination
          total={Math.min(totalPages, 500)}
          value={currentPage}
          onChange={setPage}
          color="red"
          style={{ alignSelf: 'center' }}
        />
      </Stack>
    </Container>
  )
}
