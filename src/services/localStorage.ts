import { Movie } from '../types/movie'

export const getWishlistKey = (username: string) => `netflix_clone_wishlist_${username}`

export const wishlistStorage = {
  getWishlist: (username: string): Movie[] => {
    const data = localStorage.getItem(getWishlistKey(username))
    return data ? JSON.parse(data) : []
  },

  addToWishlist: (username: string, movie: Movie) => {
    const wishlist = wishlistStorage.getWishlist(username)
    if (!wishlist.some(m => m.id === movie.id)) {
      wishlist.push(movie)
      localStorage.setItem(getWishlistKey(username), JSON.stringify(wishlist))
    }
  },

  removeFromWishlist: (username: string, movieId: number) => {
    const wishlist = wishlistStorage.getWishlist(username)
    const filtered = wishlist.filter(m => m.id !== movieId)
    localStorage.setItem(getWishlistKey(username), JSON.stringify(filtered))
  }
}
