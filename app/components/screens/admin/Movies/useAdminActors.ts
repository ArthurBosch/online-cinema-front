import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { actorService } from '@/services/actror.service'

import { toastError } from '@/utils/toast-error'

export const useAdminActors = () => {
	const queryData = useQuery(
		'actor genres select',
		() => actorService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(actor): IOption => ({
						label: actor.name,
						value: actor._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Admin actors select')
			},
		}
	)

	return queryData
}
