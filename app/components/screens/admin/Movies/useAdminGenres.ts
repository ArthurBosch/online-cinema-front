import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { genreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

export const useAdminGenres = () => {
	const queryData = useQuery(
		'admin genres select',
		() => genreService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(genre): IOption => ({
						label: genre.name,
						value: genre._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Admin genres select')
			},
		}
	)

	return queryData
}
