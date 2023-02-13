import { NextPageAuth } from 'shared/types/auth.types'

import MovieEdit from '@/components/screens/admin/Movies/MovieEdit'

const MovieEditPage: NextPageAuth = () => {
	return (
		<div>
			<MovieEdit />
		</div>
	)
}

MovieEditPage.isOnlyAdmin = true

export default MovieEditPage
