import { ActionIcon, Tooltip } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { wishlistStorage } from '../../services/localStorage'
import { useEffect, useState } from 'react'
import { Movie } from '../../types/movie'
import { kakaoAuth } from '../../services/kakaoAuth'

interface WishlistButtonProps {
  movie: Movie
  styles?: Record<string, any>
}

export function WishlistButton({ movie, styles }: WishlistButtonProps) {
  const user = kakaoAuth.getCurrentUser()
  const nickname = user?.kakao_account.profile.nickname
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (!nickname) return
    const wishlist = wishlistStorage.getWishlist(nickname)
    setIsWishlisted(wishlist.some((m: Movie) => m.id === movie.id))
  }, [movie.id, nickname])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!nickname) return

    if (isWishlisted) {
      wishlistStorage.removeFromWishlist(nickname, movie.id)
    } else {
      wishlistStorage.addToWishlist(nickname, movie)
    }
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Tooltip label={isWishlisted ? "Remove from My List" : "Add to My List"}>
      <ActionIcon
        variant="transparent"
        onClick={handleClick}
        disabled={!nickname}
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
