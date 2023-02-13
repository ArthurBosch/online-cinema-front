import { NextPageAuth } from 'shared/types/auth.types'

import UserList from '@/components/screens/admin/Users/UserList'

const UserListPage: NextPageAuth = () => {
	return (
		<div>
			<UserList />
		</div>
	)
}

UserListPage.isOnlyAdmin = true

export default UserListPage
