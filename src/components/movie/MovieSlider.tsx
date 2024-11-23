import { Carousel } from '@mantine/carousel'
import { Title } from '@mantine/core'
import { Link } from 'react-router-dom'

interface Movie {
  id: number
  title: string
  poster_path: string
}

interface MovieSliderProps {
  title: string
  movies: Movie[]
}

export function MovieSlider({ title, movies }: MovieSliderProps) {
  return (
    <div className="mb-8">
      <Title order={2} className="text-white mb-4 px-4">
        {title}
      </Title>
      <Carousel
        slideSize="16.666667%"
        slideGap="md"
        align="start"
        slidesToScroll={6}
        controlsOffset="xs"
        containScroll="keepSnaps"
        classNames={{
          root: 'px-4',
          control: 'bg-white/30 hover:bg-white/50 transition-colors',
        }}
      >
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              className="block transition-transform hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md w-full"
                loading="lazy"
              />
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}
