import { NextPageAuth } from 'shared/types/auth.types'

import GenreEdit from '@/components/screens/admin/Genres/GenreEdit'

const GenreEditPage: NextPageAuth = () => {
	return (
		<div>
			<GenreEdit />
		</div>
	)
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
