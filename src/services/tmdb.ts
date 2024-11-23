const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_READ_API_ACCESS_TOKEN;

export const tmdbFetch = async (endpoint: string, options = {}) => {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const TMDB_IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'original',
  profile: 'w185',
};

export const getImageUrl = (path: string, size: string) =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
