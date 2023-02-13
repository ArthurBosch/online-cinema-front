import axios, { axiosClassic } from 'api/interceptors'
import { IMovie } from 'shared/types/movies.types'

import { IMovieEditInput } from '@/components/screens/admin/Movies/movie-edit.interface'

import { getMoviesUrl } from '@/config/api.config'
import { getMovieUrl } from '@/config/url.config'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async createMovie() {
		return axios.post<string>(getMoviesUrl('/'))
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMovieUrl(`/${_id}`))
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},
}
