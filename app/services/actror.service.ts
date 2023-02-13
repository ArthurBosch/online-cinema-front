import axios, { axiosClassic } from 'api/interceptors'
import { IActor } from 'shared/types/movies.types'

import { IActorEditInput } from '@/components/screens/admin/Actors/actor-edit.interface'

import { getActorsUrl } from '@/config/api.config'

export const actorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async createActor() {
		return axios.post<string>(getActorsUrl('/'))
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
