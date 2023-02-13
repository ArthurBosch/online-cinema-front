import { FC } from 'react'

import styles from '../Admin.module.scss'

import CountUsers from './CountUsers'
import PopularMovie from './PopularMovie'

const Stats: FC = () => {
	return (
		<div className={styles.stats}>
			<CountUsers />
			<PopularMovie />
		</div>
	)
}

export default Stats
