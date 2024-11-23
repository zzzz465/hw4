import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { tmdb } from '../../services/tmdb'
import { Movie } from './movieQueries'
import { useEffect } from 'react'

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[]
  runtime: number
  vote_average: number
  release_date: string
  status: string
}

const movieIdAtom = atom<string | null>(null)

const movieDetailAtom = atomWithQuery((get) => {
  const movieId = get(movieIdAtom)
  return {
    queryKey: ['movie', movieId],
    queryFn: () => tmdb.getMovie(movieId!),
    enabled: !!movieId,
  }
})

const similarMoviesAtom = atomWithQuery((get) => {
  const movieId = get(movieIdAtom)
  return {
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => tmdb.getSimilarMovies(movieId!),
    enabled: !!movieId,
  }
})

export function useMovieDetail(id: string) {
  const setMovieId = useSetAtom(movieIdAtom)

  useEffect(() => {
    setMovieId(id)
  }, [id, setMovieId])

  const movieQuery = useAtomValue(movieDetailAtom)
  const similarQuery = useAtomValue(similarMoviesAtom)

  return {
    isLoading: movieQuery.isLoading || similarQuery.isLoading,
    isError: movieQuery.isError || similarQuery.isError,
    movie: movieQuery.data,
    similar: similarQuery.data?.results || [],
  }
}
