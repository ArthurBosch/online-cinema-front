import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { MaterialIcon } from '@/components/ui/MaterailIcon'

import styles from './Menu.module.scss'
import { IMenuItem } from './menu.interface'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()
	return (
		<li
			className={cn({
				[styles.active]: asPath === item.link,
			})}
		>
			<Link legacyBehavior href={item.link}>
				<a>
					<MaterialIcon name={item.icon} />
					<span>{item.title}</span>
				</a>
			</Link>
		</li>
	)
}

export default MenuItem
