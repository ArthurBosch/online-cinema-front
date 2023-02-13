import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'
import { MaterialIconName } from 'shared/types/icons.types'

import { useRenderClient } from '@/hooks/useRenderClient'

export const MaterialIcon: FC<{ name: MaterialIconName }> = ({ name }) => {
	const { isRenderClient } = useRenderClient()
	const IconComponent = MaterialIcons[name]
	if (isRenderClient) {
		return <IconComponent /> || <MaterialIcons.MdDragIndicator />
	} else return null
}
