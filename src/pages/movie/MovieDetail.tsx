import { useParams } from 'react-router-dom'
import { Box, Container, Image, Text, Title, Group, Badge, Stack, Skeleton } from '@mantine/core'
import { useMovieDetail } from '../../hooks/queries/movieDetailQueries'
import { MovieSlider } from '../../components/movie/MovieSlider'

export default function MovieDetail() {
  const { id = '' } = useParams()
  const { isLoading, isError, movie, similar } = useMovieDetail(id)

  if (isLoading) {
    return <Skeleton height="100vh" />
  }

  if (isError || !movie) {
    return <Box p="xl">Error loading movie details</Box>
  }

  return (
    <Box>
      <Box
        pos="relative"
        h="80vh"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          pos="absolute"
          inset={0}
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 20%, transparent 60%)',
          }}
        />
        <Container size="lg" pos="relative" h="100%">
          <Group align="flex-end" h="100%" pb="xl" gap="xl">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              h={400}
              w="auto"
              radius="md"
            />
            <Stack gap="md" maw={600}>
              <Title c="white">{movie.title}</Title>
              <Group gap="xs">
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <Badge key={genre.id} size="lg">
                    {genre.name}
                  </Badge>
                ))}
              </Group>
              <Group>
                <Text c="white">{new Date(movie.release_date).getFullYear()}</Text>
                <Text c="white">•</Text>
                <Text c="white">{movie.runtime} minutes</Text>
                <Text c="white">•</Text>
                <Text c="white">{Math.round(movie.vote_average * 10)}% Rating</Text>
              </Group>
              <Text c="white" size="lg">
                {movie.overview}
              </Text>
            </Stack>
          </Group>
        </Container>
      </Box>

      <Container size="lg" py="xl">
        <MovieSlider title="Similar Movies" movies={similar} />
      </Container>
    </Box>
  )
}
