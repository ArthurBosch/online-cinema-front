import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { getMovieUrl } from '@/config/url.config'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
}

const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()
	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					fill
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
				/>
			)}
			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<button
					onClick={() => {
						push(slide.link)
					}}
					className={styles.button}
				>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SlideItem
