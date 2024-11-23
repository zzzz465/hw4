import { atom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { tmdb } from '../../services/tmdb'

export interface Movie {
  id: number
  title: string
  backdrop_path: string
  overview: string
  poster_path: string
  release_date: string
}

const trendingAtom = atomWithQuery(() => ({
  queryKey: ['movies', 'trending'],
  queryFn: () => tmdb.getTrending(),
}))

const topRatedAtom = atomWithQuery(() => ({
    queryKey: ['movies', 'topRated'],
  queryFn: () => tmdb.getTopRated(),
}))

const nowPlayingAtom = atomWithQuery(() => ({
  queryKey: ['movies', 'nowPlaying'],
    queryFn: () => tmdb.getNowPlaying(),
}))

const upcomingAtom = atomWithQuery(() => ({
  queryKey: ['movies', 'upcoming'],
  queryFn: () => tmdb.getUpcoming(),
}))

const loadingAtom = atom((get) => {
  const trending = get(trendingAtom)
  const topRated = get(topRatedAtom)
  const nowPlaying = get(nowPlayingAtom)
  const upcoming = get(upcomingAtom)

  return trending.isLoading || topRated.isLoading || nowPlaying.isLoading || upcoming.isLoading
})

const errorAtom = atom((get) => {
  const trending = get(trendingAtom)
  const topRated = get(topRatedAtom)
  const nowPlaying = get(nowPlayingAtom)
  const upcoming = get(upcomingAtom)

  return trending.isError || topRated.isError || nowPlaying.isError || upcoming.isError
})

const moviesAtom = atom((get) => {
  const trending = get(trendingAtom)
  const topRated = get(topRatedAtom)
  const nowPlaying = get(nowPlayingAtom)
  const upcoming = get(upcomingAtom)

  return [
    trending.data,
    topRated.data,
    nowPlaying.data,
    upcoming.data,
  ]
})

export function useMovieQueries() {
  const isLoading = useAtomValue(loadingAtom)
  const isError = useAtomValue(errorAtom)
  const data = useAtomValue(moviesAtom)

  return {
    isLoading,
    isError,
    data,
  }
}
