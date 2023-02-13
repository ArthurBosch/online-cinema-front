import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/formElements/Button'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/Meta/Meta'

import AuthFields from '../../auth/AuthFields'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'

const UserEdit: FC = () => {
	const { handleSubmit, register, formState, setValue, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit User" />
			<form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mt-10 mb-10">
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />
						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className="text-link block mb-10"
								>
									{field.value ? 'Disable Admin Rights' : 'Enable Admin Rights'}
								</button>
							)}
						/>
						<Button type="submit">Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
