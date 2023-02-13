import { FC } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/components/ui/player/AuthPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'

interface IRateMovie {
	movieId: string
	slug: string
}

const RateMovie: FC<IRateMovie> = ({ movieId, slug }) => {
	const { user } = useAuth()
	const { handleClick, isSended, rating } = useRateMovie(movieId)
	return (
		<div className={styles.wrapper}>
			<h3>Rate this title</h3>
			<p>Your opinion matters</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating!</div>
					) : (
						<StarRating
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
