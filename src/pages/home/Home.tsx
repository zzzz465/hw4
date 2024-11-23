import { useEffect, useState } from 'react'
import { Button, Text, Skeleton } from '@mantine/core'
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

export default function Home() {
  const [featured, setFeatured] = useState<Movie | null>(null)
  const [trending, setTrending] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [upcoming, setUpcoming] = useState<Movie[]>([])
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

        setTrending(trendingData.results)
        setTopRated(topRatedData.results)
        setNowPlaying(nowPlayingData.results)
        setUpcoming(upcomingData.results)
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
    return <Skeleton height={400} />
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {featured && (
        <div
          className="relative h-[80vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl text-white mb-4 font-bold">
              {featured.title}
            </h1>
            <Text className="text-white mb-6 line-clamp-3">
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
          </div>
        </div>
      )}

      <div className="py-8 space-y-8 -mt-16 relative z-10">
        <MovieSlider title="Trending Now" movies={trending} />
        <MovieSlider title="Now Playing" movies={nowPlaying} />
        <MovieSlider title="Top Rated" movies={topRated} />
        <MovieSlider title="Upcoming" movies={upcoming} />
      </div>
    </div>
  )
}
