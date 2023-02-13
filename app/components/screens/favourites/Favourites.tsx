import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Heading from '@/components/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/Meta/Meta'

import Error404 from '../../../../pages/500'

import FavouriteItem from './FavouriteItem'
import styles from './Favourites.module.scss'
import { useFavourites } from './useFavourites'

const Favourites: FC = () => {
	const { isLoading, favouriteMovies } = useFavourites()
	const { user } = useAuth()
	if (user) {
		return (
			<Meta title="Favorites">
				<Heading title="Favorites" />
				<section className={styles.favourites}>
					{isLoading ? (
						<SkeletonLoader
							count={3}
							className={styles.skeletonLoader}
							containerClassName={styles.containerLoader}
						/>
					) : (
						favouriteMovies?.map((movie) => (
							<FavouriteItem key={movie._id} movie={movie} />
						))
					)}
				</section>
			</Meta>
		)
	} else {
		return <Error404 />
	}
}

export default Favourites
