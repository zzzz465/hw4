import { Carousel } from '@mantine/carousel'
import { Title, Card, Image, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'
import { WishlistButton } from './WishlistButton'
import { Movie } from '../../types/movie'

interface MovieSliderProps {
  title: string
  movies: Movie[]
}

export function MovieSlider({ title, movies }: MovieSliderProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const getSlideSize = () => {
    if (isMobile) return '33.333333%'
    if (isTablet) return '25%'
    return '16.666667%'
  }

  const getSlidesToScroll = () => {
    if (isMobile) return 3
    if (isTablet) return 4
    return 6
  }

  const getSlideHeight = () => {
    if (isMobile) return 150
    if (isTablet) return 180
    return 220
  }

  return (
    <div className="mb-8" style={{ height: getSlideHeight() + 50 }}>
      <Title order={2} className="text-white mb-4 px-4">
        {title}
      </Title>
      <Carousel
        slideSize={getSlideSize()}
        slideGap="md"
        align="start"
        slidesToScroll={getSlidesToScroll()}
        controlsOffset="xs"
        loop
        dragFree
        classNames={{
          root: 'px-4',
          control: 'bg-white/30 hover:bg-white/50 transition-colors',
          indicators: 'hidden',
        }}
        styles={{
          slide: {
            flex: '0 0 auto',
            height: getSlideHeight(),
          },
        }}
      >
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <Card p={0} radius="md" className="relative group h-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full h-full object-cover"
                />
              </Card>
              <Box className="absolute bottom-2 right-2 z-10">
                <WishlistButton movie={movie} />
              </Box>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}
