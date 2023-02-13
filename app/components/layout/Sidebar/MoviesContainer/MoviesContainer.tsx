import dynamic from 'next/dynamic'
import { FC } from 'react'

import FavouriteMovies from './FavouriteMovies/FavouriteMovies'
import PopularMovies from './PopularMovies'

const DynamicFavs = dynamic(() => import('./FavouriteMovies/FavouriteMovies'), {
	ssr: false,
})

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<DynamicFavs />
		</div>
	)
}

export default MoviesContainer
