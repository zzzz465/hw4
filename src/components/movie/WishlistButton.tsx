import { ActionIcon, Tooltip } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { wishlistStorage } from '../../services/localStorage'
import { useEffect, useState } from 'react'
import { Movie } from '../../types/movie'
import { auth } from '../../services/auth'

interface WishlistButtonProps {
  movie: Movie
  styles?: Record<string, any>
}

export function WishlistButton({ movie, styles }: WishlistButtonProps) {
  const user = auth.getCurrentUser()
  const email = user?.email
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (!email) return
    const wishlist = wishlistStorage.getWishlist(email)
    setIsWishlisted(wishlist.some((m: Movie) => m.id === movie.id))
  }, [movie.id, email])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!email) return

    if (isWishlisted) {
      wishlistStorage.removeFromWishlist(email, movie.id)
    } else {
      wishlistStorage.addToWishlist(email, movie)
    }
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Tooltip label={isWishlisted ? "Remove from My List" : "Add to My List"}>
      <ActionIcon
        variant="transparent"
        onClick={handleClick}
        disabled={!email}
        size="sm"
        radius="xl"
        styles={{
          root: {
            color: isWishlisted ? 'var(--mantine-color-red-5)' : 'white',
            ...styles?.root,
          },
        }}
      >
        <IconHeart
          size={16}
          fill={isWishlisted ? 'currentColor' : 'none'}
        />
      </ActionIcon>
    </Tooltip>
  )
}
