import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IMovie } from 'shared/types/movies.types'

import { useAuth } from '@/hooks/useAuth'

import { getMovieUrl } from '@/config/url.config'

import FavBtn from '../single-movie/fav-btn/FavBtn'

import styles from './Favourites.module.scss'

const FavouriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth()
	return (
		<div className={styles.itemWrapper}>
			{user && <FavBtn movieId={movie._id} />}
			<Link legacyBehavior href={getMovieUrl(movie.slug)}>
				<a className={styles.item}>
					<Image
						alt={movie.title}
						src={movie.bigPoster}
						fill
						draggable={false}
						priority
					/>
					<div className={styles.title}>{movie.title}</div>
				</a>
			</Link>
		</div>
	)
}

export default FavouriteItem
