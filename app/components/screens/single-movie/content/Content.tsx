import { FC } from 'react'
import { IMovie } from 'shared/types/movies.types'

import { MaterialIcon } from '@/components/ui/MaterailIcon'

import { useAuth } from '@/hooks/useAuth'

import { getActorUrl, getGenreUrl } from '@/config/url.config'

import FavBtn from '../fav-btn/FavBtn'

import styles from './Content.module.scss'
import ContentList from './content-list/ContentList'

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	const { user } = useAuth()
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min </span>
			</div>
			<ContentList
				links={movie.genres.slice(0, 3).map((g) => ({
					_id: g._id,
					link: getGenreUrl(g.slug),
					title: g.name,
				}))}
				name="Genres"
			/>
			<ContentList
				links={movie.actors.slice(0, 3).map((a) => ({
					_id: a._id,
					link: getActorUrl(a.slug),
					title: a.name,
				}))}
				name="Actors"
			/>
			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
			{user && <FavBtn movieId={movie._id} />}
		</div>
	)
}

export default Content
