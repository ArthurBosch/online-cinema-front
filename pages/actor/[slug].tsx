import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IActor, IMovie } from 'shared/types/movies.types'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { getActorsUrl, getApiUrl, getMoviesUrl } from '@/config/api.config'

import Error404 from '../404'

interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}
const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog title={actor.name} movies={movies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const res = await fetch(`${getApiUrl()}${getActorsUrl('')}`)
		const actors: IActor[] = await res.json()
		const paths = actors?.map((a) => ({
			params: {
				slug: a.slug,
			},
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			fallback: false,
			paths: [],
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const query = getActorsUrl(`/by-slug/${String(params?.slug)}`)
		const resActor = await fetch(`${getApiUrl()}${query}`)
		const actor = await resActor.json()

		const resMovies = await fetch(
			`${getApiUrl()}${getMoviesUrl(`/by-actor/${actor?._id}`)}`
		)
		const movies = await resMovies.json()

		return {
			props: {
				actor,
				movies,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default ActorPage
