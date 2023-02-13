import { NextPageAuth } from 'shared/types/auth.types'

import ActorList from '@/components/screens/admin/Actors/ActorsList'

const ActorListPage: NextPageAuth = () => {
	return (
		<div>
			<ActorList />
		</div>
	)
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage
