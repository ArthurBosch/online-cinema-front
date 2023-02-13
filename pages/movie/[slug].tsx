import { getContentType } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { IMovie } from 'shared/types/movies.types'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { getApiUrl, getMoviesUrl } from '@/config/api.config'
import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}
const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie similarMovies={similarMovies || []} movie={movie} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const res = await fetch(`${getApiUrl()}${getMoviesUrl('')}`)
		const movies: IMovie[] = await res.json()
		const paths = movies?.map((a) => ({
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
		const query = getMoviesUrl(`/by-slug/${String(params?.slug)}`)
		const resMovie = await fetch(`${getApiUrl()}${query}`)
		const movie: IMovie = await resMovie.json()

		const similarMoviesQuery = getMoviesUrl('/by-genres/')
		const similarMoviesPost = {
			method: 'POST',
			headers: getContentType(),
			body: JSON.stringify(movie.genres.map((g) => g._id)),
		}
		const resMovies = await fetch(
			`${getApiUrl()}${similarMoviesQuery}`,
			similarMoviesPost
		)

		const dataSimilarMovies: IMovie[] = await resMovies.json()

		const similarMovies = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}))

		return {
			props: {
				movie,
				similarMovies,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default MoviePage
