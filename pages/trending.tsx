import { GetStaticProps, NextPage } from 'next'
import { IMovie } from 'shared/types/movies.types'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { getApiUrl, getMoviesUrl } from '@/config/api.config'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			title="Trending now"
			description="Top of this week"
			movies={movies}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const res = await fetch(`${getApiUrl()}${getMoviesUrl('/most-popular')}`)
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

export default TrendingPage
