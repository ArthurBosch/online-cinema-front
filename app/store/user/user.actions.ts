import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

import { AuthService } from '@/services/auth/auth.service'

import { toastError } from '@/utils/toast-error'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password)
			toastr.success('Registration', 'Completed successfully')
			return response.data
		} catch (err) {
			toastError(err)
			return thunkApi.rejectWithValue(err)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password)
			toastr.success('Login', 'Completed successfully')
			return response.data
		} catch (err) {
			toastError(err)
			return thunkApi.rejectWithValue(err)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (err) {
			if (errorCatch(err) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your session has been expired, please sign in again'
				)
				thunkApi.dispatch(logout())
			}
			return thunkApi.rejectWithValue(err)
		}
	}
)
