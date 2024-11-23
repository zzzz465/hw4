import { auth } from './auth'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const tmdbFetch = async (endpoint: string, options = {}) => {
  const apiKey = auth.getApiKey()
  if (!apiKey) {
    throw new Error('No API key found')
  }

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${apiKey}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
  }
}
