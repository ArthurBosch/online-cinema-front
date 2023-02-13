import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.interface'

import { getApiUrl, getGernesUrl } from '@/config/api.config'

import Error404 from './404'

const GenresPage: NextPage<{ collections: ICollection[] | [] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const query = getGernesUrl('/collections')
		const response = await fetch(`${getApiUrl()}${query}`)
		const data: ICollection[] | null = await response.json()

		return {
			props: {
				collections: data,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenresPage
