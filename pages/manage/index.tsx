import { NextPageAuth } from 'shared/types/auth.types'

import Admin from '@/screens/admin/Home/Admin'

const AdminPage: NextPageAuth = () => {
	return <Admin />
}

AdminPage.isOnlyAdmin = true

export default AdminPage
