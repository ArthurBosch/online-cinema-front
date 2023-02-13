import axios from 'api/interceptors'
import { IMovie } from 'shared/types/movies.types'
import { IUser } from 'shared/types/user.types'

import { IProfileInput } from '@/components/screens/profile/profile.interface'

import { getUsersUrl } from '@/config/api.config'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},

	async update(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},

	async getFavourites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favourites'))
	},

	async toggleFavourites(movieId: string) {
		return axios.put(getUsersUrl('/profile/favourites'), { movieId })
	},
}
