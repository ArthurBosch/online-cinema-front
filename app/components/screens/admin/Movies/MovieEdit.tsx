import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/formElements/Button'
import Field from '@/components/ui/formElements/Field'
import SlugField from '@/components/ui/formElements/SlugField/SlugField'
import UploadField from '@/components/ui/formElements/UploadField/uploadFile'
import Heading from '@/components/ui/heading/Heading'

import formStyles from '@/ui/formElements/admin-form.module.scss'

import Meta from '@/utils/Meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit Movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder="Title"
								error={errors.title}
							/>
							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('title')))
								}}
							/>
							<Field
								{...register('parameters.country', {
									required: 'Country is required',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required',
								})}
								placeholder="Duration(MIN.)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
						</div>

						<Controller
							control={control}
							name="genres"
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									field={field}
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
									placeholder="Genres"
									error={error}
								/>
							)}
							rules={{
								required: 'At least one genre is required!',
							}}
						/>

						<Controller
							control={control}
							name="actors"
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									field={field}
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
									placeholder="Actors"
									error={error}
								/>
							)}
							rules={{
								required: 'At least one actor is required!',
							}}
						/>

						<Controller
							control={control}
							name="poster"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Poster"
									isNoImage={false}
									style={{ marginTop: '25px' }}
								/>
							)}
							rules={{
								required: 'Poster is required!',
							}}
						/>

						<Controller
							control={control}
							name="bigPoster"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Big Poster"
									isNoImage={false}
									style={{ marginTop: '25px' }}
								/>
							)}
							rules={{
								required: 'Big poster is required!',
							}}
						/>

						<Controller
							control={control}
							name="videoURL"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="movies"
									placeholder="Video"
									style={{ marginTop: '25px' }}
									isNoImage
								/>
							)}
							rules={{
								required: 'Video is required!',
							}}
						/>
						<Button style={{ marginTop: '55px' }} type="submit">
							Update
						</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default MovieEdit
