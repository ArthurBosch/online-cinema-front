import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/Meta/Meta'

import Stats from './Stats/Stats'

const Admin: FC = () => {
	return (
		<Meta title="Admin Panel">
			<AdminNavigation />
			<Heading title="Statistics" />
			<Stats />
		</Meta>
	)
}

export default Admin
