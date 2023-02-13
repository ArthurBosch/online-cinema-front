import { IS_PRODUCTION } from './constants'

export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `https://online-cinema.herokuapp.com/api`

export const getApiUrl = () => {
	if (IS_PRODUCTION) {
		return API_SERVER_URL
	} else {
		return API_URL
	}
}

export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getMoviesUrl = (string: string) => `/movies${string}`
export const getGernesUrl = (string: string) => `/genres${string}`
export const getActorsUrl = (string: string) => `/actors${string}`
export const getRatingsUrl = (string: string) => `/ratings${string}`
