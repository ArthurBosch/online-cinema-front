import { NextPageAuth } from 'shared/types/auth.types'

import MovieList from '@/components/screens/admin/Movies/MoviesList'

const MovieListPage: NextPageAuth = () => {
	return (
		<div>
			<MovieList />
		</div>
	)
}

MovieListPage.isOnlyAdmin = true

export default MovieListPage
