import dynamic from 'next/dynamic'
import { FC } from 'react'

import Banner from '@/components/ui/banner/Banner'
import Gallery from '@/components/ui/gallery/Gallery'
import SubHeading from '@/components/ui/heading/SubHeading'

import Meta from '@/utils/Meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './content/Content'
import { useUpdateCountOpened } from './rate-movie/useUpdateCountOpened'

const DynamicPlayer = dynamic(() => import('@/components/ui/player/Player'), {
	ssr: false,
})

const DynamicRaing = dynamic(() => import('./rate-movie/RateMovie'), {
	ssr: false,
})
const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	return (
		<Meta title={movie.title} description={`Watch ${movie.title} online`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			<DynamicPlayer slug={movie.slug} videoSrc={movie.videoURL} />
			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>
			<DynamicRaing movieId={movie._id} slug={movie.slug} />
		</Meta>
	)
}

export default SingleMovie
