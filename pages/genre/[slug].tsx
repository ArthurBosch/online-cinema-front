import { getContentType } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IGenre, IMovie } from 'shared/types/movies.types'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { getApiUrl, getGernesUrl, getMoviesUrl } from '@/config/api.config'

import Error404 from '../404'

interface IGenrePage {
	movies: IMovie[]
	genre: IGenre | undefined
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? (
		<Catalog
			title={genre.name}
			description={genre.description}
			movies={movies || []}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const res = await fetch(`${getApiUrl()}${getGernesUrl('')}`)
		console.log(getApiUrl())
		const genres: IGenre[] = await res.json()
		const paths = genres?.map((g) => ({
			params: {
				slug: g.slug,
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
		const query = getGernesUrl(`/by-slug/${String(params?.slug)}`)
		const resGenre = await fetch(`${getApiUrl()}${query}`)
		const genre = await resGenre.json()

		const resMovies = await fetch(
			`${getApiUrl()}${getMoviesUrl('/by-genres')}`,
			{
				method: 'POST',
				headers: getContentType(),
				body: JSON.stringify([genre?._id]),
			}
		)
		const movies = await resMovies.json()

		return {
			props: {
				genre,
				movies,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenrePage
