import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import { tmdb } from '../../services/tmdb';

const pageAtom = atom(1);

const popularMoviesAtom = atomWithQuery((get) => {
  const page = get(pageAtom);
  return {
    queryKey: ['popular', page],
    queryFn: () => tmdb.getPopular(page),
  };
});

export function usePopularMovies() {
  const { data, isLoading, isError } = useAtomValue(popularMoviesAtom);
  const setPage = useSetAtom(pageAtom);

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    isLoading,
    isError,
    setPage,
  };
}
