import { NextPageAuth } from 'shared/types/auth.types'

import UserEdit from '@/components/screens/admin/Users/UserEdit'

const UserEditPage: NextPageAuth = () => {
	return (
		<div>
			<UserEdit />
		</div>
	)
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
