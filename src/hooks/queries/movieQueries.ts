import { useQueries, useQuery } from '@tanstack/react-query'
import { tmdb } from '../../services/tmdb'

export interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  poster_path: string
  release_date: string
}

export function useMovieQueries() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['movies', 'trending'],
        queryFn: () => tmdb.getTrending(),
        retry: false
      },
      {
        queryKey: ['movies', 'topRated'],
        queryFn: () => tmdb.getTopRated(),
        retry: false,
      },
      {
        queryKey: ['movies', 'nowPlaying'],
        queryFn: () => tmdb.getNowPlaying(),
        retry: false,
      },
      {
        queryKey: ['movies', 'upcoming'],
        queryFn: () => tmdb.getUpcoming(),
        retry: false,
      },
    ],
  })

  const isLoading = queries.some(query => query.isLoading)
  const isError = queries.some(query => query.isError)
  const data = queries.map(query => query.data)

  return {
    isLoading,
    isError,
    data,
  }
}

// Individual query hooks if needed
export function useTrendingMovies() {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: () => tmdb.getTrending(),
  })
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ['movies', 'topRated'],
    queryFn: () => tmdb.getTopRated(),
  })
}

export function useNowPlayingMovies() {
  return useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: () => tmdb.getNowPlaying(),
  })
}

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => tmdb.getUpcoming(),
  })
}
