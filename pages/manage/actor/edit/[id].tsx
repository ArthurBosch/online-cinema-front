import { NextPageAuth } from 'shared/types/auth.types'

import ActorEdit from '@/components/screens/admin/Actors/ActorEdit'

const ActorEditPage: NextPageAuth = () => {
	return (
		<div>
			<ActorEdit />
		</div>
	)
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
