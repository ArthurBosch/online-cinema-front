import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.scss'

interface IBanner {
	image: string
	Detail?: FC | null
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				alt="Movie bunner"
				src={image}
				draggable={false}
				unoptimized
				className="image-like-bg object-top"
				priority
				fill
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
