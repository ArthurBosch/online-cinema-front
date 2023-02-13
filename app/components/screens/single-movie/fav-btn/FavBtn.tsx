import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { useFavourites } from '../../favourites/useFavourites'

import styles from './FavBtn.module.scss'
import Heart from './heart-animation.png'

const FavBtn: FC<{ movieId: string }> = ({ movieId }) => {
	const [isActive, setIsActive] = useState(false)
	const { favouriteMovies, refetch } = useFavourites()
	useEffect(() => {
		if (!favouriteMovies) return

		const isHasMovie = favouriteMovies.some((f) => f._id === movieId)
		if (isActive !== isHasMovie) setIsActive(isHasMovie)
	}, [favouriteMovies, isActive, movieId])

	const { mutateAsync } = useMutation(
		'toggle fav',
		() => UserService.toggleFavourites(movieId),
		{
			onError: (error) => {
				toastError(error, 'Toggle fav')
			},
			onSuccess() {
				setIsActive(!isActive)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, { [styles.animate]: isActive })}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavBtn
