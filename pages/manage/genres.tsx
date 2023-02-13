import { NextPageAuth } from 'shared/types/auth.types'

import GenreList from '@/components/screens/admin/Genres/GenreList'

const GenreListPage: NextPageAuth = () => {
	return (
		<div>
			<GenreList />
		</div>
	)
}

GenreListPage.isOnlyAdmin = true

export default GenreListPage
