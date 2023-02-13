import { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { actorService } from '@/services/actror.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

import { getActorsUrl, getApiUrl, getMoviesUrl } from '@/config/api.config'
import { getActorUrl, getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const resMovies = await fetch(`${getApiUrl()}${getMoviesUrl('')}`)
		const moviesSlider = await resMovies.json()

		//@ts-ignore
		const slides: ISlide[] = moviesSlider?.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))

		const resActors = await fetch(`${getApiUrl()}${getActorsUrl('')}`)
		const dataActors = await resActors.json()

		//@ts-ignore
		const actors: IGalleryItem[] = dataActors?.slice(0, 10).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorUrl(a.slug),
			content: {
				title: a.name,
				subtitle: `+${a.countMovies} movies`,
			},
		}))

		const resPopularMovies = await fetch(`${getApiUrl()}${getMoviesUrl('')}`)
		const dataMovies = await resPopularMovies.json()
		//@ts-ignore

		const trendingMovies: IGalleryItem[] = dataMovies?.slice(0, 7).map((m) => ({
			name: m.title,
			posterPath: m.poster,
			link: getMovieUrl(m.slug),
		}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		}
	}
}

export default HomePage
