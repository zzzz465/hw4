import { useEffect, useState } from 'react'
import { Button, Text, Skeleton, List, Box, Title, Stack, Container } from '@mantine/core'
import { IconPlayerPlay } from '@tabler/icons-react'
import { tmdb } from '../../services/tmdb'
import { Link } from 'react-router-dom'
import { MovieSlider } from '../../components/movie/MovieSlider'

interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  poster_path: string
}

interface MovieSection {
  title: string
  movies: Movie[]
}

export default function Home() {
  const [featured, setFeatured] = useState<Movie | null>(null)
  const [sections, setSections] = useState<MovieSection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingData, topRatedData, nowPlayingData, upcomingData] = await Promise.all([
          tmdb.getTrending(),
          tmdb.getTopRated(),
          tmdb.getNowPlaying(),
          tmdb.getUpcoming()
        ])

        setSections([
          { title: 'Trending Now', movies: trendingData.results },
          { title: 'Now Playing', movies: nowPlayingData.results },
          { title: 'Top Rated', movies: topRatedData.results },
          { title: 'Upcoming', movies: upcomingData.results }
        ])
        setFeatured(trendingData.results[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <Skeleton height="100vh" />
  }

  return (
    <Box bg="dark.9" miw="100vw" mih="100vh">
      {featured && (
        <Box
          pos="relative"
          h="80vh"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            pos="absolute"
            inset={0}
            style={{
              background: 'linear-gradient(to top, var(--mantine-color-dark-9), transparent)',
            }}
          />
          <Box pos="absolute" bottom={0} left={0} p="xl" w={{ base: '100%', md: '50%' }}>
            <Title order={1} c="white" size="h1" fw="bold" mb="md">
              {featured.title}
            </Title>
            <Text c="white" mb="xl" lineClamp={3}>
              {featured.overview}
            </Text>
            <Button
              component={Link}
              to={`/movies/${featured.id}`}
              leftSection={<IconPlayerPlay size={20} />}
              size="lg"
              color="red"
            >
              Play Now
            </Button>
          </Box>
        </Box>
      )}

      <Stack py="xl" mt="-4rem" pos="relative" style={{ zIndex: 1 }}>
        {sections.map((section) => (
          <MovieSlider key={section.title} title={section.title} movies={section.movies} />
        ))}
      </Stack>
    </Box>
  )
}
