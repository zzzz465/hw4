import { kakaoAuth } from './kakaoAuth'
import axios from 'axios'

type SearchParams = {
  query: string;
  page?: number;
  genres?: number[];
  year?: number | null;
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const tmdbFetch = async (endpoint: string, options = {}) => {
  const apiKey = kakaoAuth.getApiKey()
  if (!apiKey) {
    throw new Error('No API key found')
  }

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${apiKey}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB')
  }

  return response.json()
}

export const TMDB_IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'original',
  profile: 'w185',
}

export const getImageUrl = (path: string, size: string) =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`

export const tmdb = {
  getTrending: async () => {
    return tmdbFetch('/trending/movie/week')
  },

  getTopRated: async () => {
    return tmdbFetch('/movie/top_rated')
  },

  getNowPlaying: async () => {
    return tmdbFetch('/movie/now_playing')
  },

  getUpcoming: async () => {
    return tmdbFetch('/movie/upcoming')
  },

  getMovie: async (movieId: string) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${kakaoAuth.getApiKey()}`
    )
    return response.json()
  },

  getSimilarMovies: async (movieId: string) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${kakaoAuth.getApiKey()}`
    )
    return response.json()
  },

  getPopular: async (page: number = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${kakaoAuth.getApiKey()}&page=${page}`
    )
    return response.json()
  },

  searchMovies: async ({ query, page = 1, genres = [], year = null }: SearchParams) => {
    const params = new URLSearchParams({
      api_key: kakaoAuth.getApiKey(),
      query,
      page: String(page),
      include_adult: 'false',
      ...(year && { year: String(year) }),
      ...(genres.length > 0 && { with_genres: genres.join(',') }),
    })

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?${params}`
    )
    return response.json()
  },

  addToWishlist: async (movieId: number, sessionId: string) => {
    const response = await axios.post(
      `${TMDB_BASE_URL}/account/{account_id}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: true
      },
      {
        params: {
          api_key: kakaoAuth.getApiKey(),
          session_id: sessionId
        }
      }
    )
    return response.data
  },

  removeFromWishlist: async (movieId: number, sessionId: string) => {
    const response = await axios.post(
      `${TMDB_BASE_URL}/account/{account_id}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: false
      },
      {
        params: {
          api_key: kakaoAuth.getApiKey(),
          session_id: sessionId
        }
      }
    )
    return response.data
  },

  getWishlist: async (sessionId: string) => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/account/{account_id}/favorite/movies`,
      {
        params: {
          api_key: kakaoAuth.getApiKey(),
          session_id: sessionId
        }
      }
    )
    return response.data.results
  }
}
