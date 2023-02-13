import { GetStaticProps, NextPage } from 'next'
import { IMovie } from 'shared/types/movies.types'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { getApiUrl, getMoviesUrl } from '@/config/api.config'

const FreshPage: NextPage<{ movies: IMovie[] | [] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh Movies"
			description="New arrivals every week"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const res = await fetch(`${getApiUrl()}${getMoviesUrl('')}`)
		const movies = await res.json()

		return {
			props: {
				movies,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default FreshPage
