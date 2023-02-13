import axios, { axiosClassic } from 'api/interceptors'
import { IGenre } from 'shared/types/movies.types'

import { IGenreEditInput } from '@/components/screens/admin/Genres/genre-edit.interface'

import { getGernesUrl } from '@/config/api.config'

export const genreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGernesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGernesUrl(`/${_id}`))
	},

	async createGenre() {
		return axios.post<string>(getGernesUrl('/'))
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGernesUrl(`/${_id}`))
	},

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGernesUrl(`/${_id}`), data)
	},
}
