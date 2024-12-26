export const tmdbConfig = {
  getApiKey: () => {
    return process.env.REACT_APP_TMDB_API_KEY || '';
  }
};
