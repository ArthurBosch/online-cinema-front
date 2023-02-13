import Image from 'next/image'
import { FC } from 'react'

import { ICollection } from './collections.interface'

const CollectionsImage: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Image
			alt={collection?.title}
			src={collection?.image}
			fill
			draggable={false}
		/>
	)
}
export default CollectionsImage
