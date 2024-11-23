import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { tmdb } from '../../services/tmdb'
import { Movie } from './movieQueries'
import { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'

const searchQueryAtom = atom('')
const pageAtom = atom(1)
const genreFilterAtom = atom<number[]>([])
const yearFilterAtom = atom<number | null>(null)
const moviesAtom = atom<Movie[]>([])

const searchResultsAtom = atomWithQuery((get) => {
  const query = get(searchQueryAtom)
  const page = get(pageAtom)
  const genres = get(genreFilterAtom)
  const year = get(yearFilterAtom)

  return {
    queryKey: ['search', query, page, genres, year],
    queryFn: () => tmdb.searchMovies({ query, page, genres, year }),
    enabled: query.length > 0,
  }
})

export function useSearch() {
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [genres, setGenres] = useAtom(genreFilterAtom)
  const [year, setYear] = useAtom(yearFilterAtom)
  const [movies, setMovies] = useAtom(moviesAtom)
  const { data, isLoading, isError } = useAtomValue(searchResultsAtom)

  const { ref, entry } = useIntersection({
    threshold: 0.5,
  })

  // Reset page and movies when search criteria changes
  useEffect(() => {
    setPage(1)
    setMovies([])
  }, [query, genres, year, setPage, setMovies])

  // Append new movies when data changes
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setMovies(data.results)
      } else {
        setMovies((prev) => [...prev, ...data.results])
      }
    }
  }, [data?.results, page, setMovies])

  // Load more when reaching the bottom
  useEffect(() => {
    if (entry?.isIntersecting && data?.total_pages && page < data.total_pages && !isLoading) {
      setPage((p) => p + 1)
    }
  }, [entry?.isIntersecting, data?.total_pages, page, isLoading, setPage])

  return {
    query,
    setQuery,
    genres,
    setGenres,
    year,
    setYear,
    movies,
    totalResults: data?.total_results || 0,
    isLoading,
    isError,
    loadMoreRef: ref,
  }
}
