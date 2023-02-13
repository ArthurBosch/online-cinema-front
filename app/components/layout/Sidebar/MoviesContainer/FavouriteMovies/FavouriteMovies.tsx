import { FC } from 'react'

import { useFavourites } from '@/components/screens/favourites/useFavourites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NoAuthFavourite from './NoAuthFavourites'

const FavouriteMovies: FC = () => {
	const { favouriteMovies, isLoading } = useFavourites()
	const { user } = useAuth()

	if (!user) return <NoAuthFavourite />
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/favourites"
			movies={favouriteMovies?.slice(0, 3) || []}
			title="Favourites"
		/>
	)
}

export default FavouriteMovies
