import { FC } from 'react'

import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/Meta/Meta'

import styles from './Collections.module.scss'
import CollectionItem from './CollectionsItem'
import { ICollection } from './collections.interface'

const title = 'Discovery'
const description = 'Every genre we have'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />
			<section className={styles.collections}>
				{collections.map(
					(collection) =>
						collection && (
							<CollectionItem key={collection?._id} collection={collection} />
						)
				)}
			</section>
		</Meta>
	)
}

export default Collections
