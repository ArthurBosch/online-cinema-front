import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { getGenreUrl } from '@/config/url.config'

import styles from './Collections.module.scss'
import CollectionsImage from './CollectionsImage'
import { ICollection } from './collections.interface'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link legacyBehavior href={getGenreUrl(collection?.slug)}>
			<a className={styles.collection}>
				<CollectionsImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection?.title}</div>
				</div>

				<div className={cn(styles.behind, styles.second)}>
					<CollectionsImage collection={collection} />
				</div>

				<div className={cn(styles.behind, styles.third)}>
					<CollectionsImage collection={collection} />
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
