import { GroupAdd, Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Avatar,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	TextField,
	Typography,
} from '@mui/material'

import React from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import {
	updateEmailValidation,
	updatePasswordValidation,
	updatePhoneValidation,
	updateTelegramLoginValidation,
} from '../utils/validationRules'
import { UpdateUserDto } from '../interfaces/UsersInterfaces'
import UsersStore from '../store/users/UsersStore'

const EditUserForm: React.FC = () => {
	const [showPassword, setShowPassword] = React.useState<Boolean>(false)

	const { control, handleSubmit } = useForm<UpdateUserDto>({ mode: 'all' })
	const { errors } = useFormState({
		control,
	})

	const onSubmit: SubmitHandler<UpdateUserDto> = async (data) => {
		for (let key in data) {
			if (data[key as keyof UpdateUserDto] === '')
				delete data[key as keyof UpdateUserDto]
		}
		await UsersStore.updateSelf(data)
	}

	return (
		<Paper elevation={5} sx={{ padding: 5 }}>
			<Grid
				component='form'
				container
				spacing={2}
				direction='column'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid item>
					<Grid container direction='column' alignItems='center'>
						<Typography component='h1' variant='h5'>
							Редактировать информацию
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='email'
						rules={updateEmailValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='email'
								fullWidth
								label='Введите email'
								placeholder='example@mail.ru'
								variant='outlined'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='password'
						rules={updatePasswordValidation}
						render={({ field }) => (
							<FormControl fullWidth size='small'>
								<InputLabel
									htmlFor='outlined-adornment-password'
									error={!!errors.password?.message}
								>
									Придумайте пароль
								</InputLabel>
								<OutlinedInput
									size='small'
									value={field.value}
									onChange={(e) => field.onChange(e)}
									id='outlined-adornment-password'
									type={showPassword ? 'text' : 'password'}
									placeholder='Пароль'
									label='Введите пароль'
									error={!!errors.password?.message}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={() => setShowPassword((show) => !show)}
												edge='end'
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								></OutlinedInput>
								{!!errors.password?.message && (
									<FormHelperText error id='outlined-adornment-password'>
										{errors.password.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='fullName'
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='text'
								fullWidth
								label='Введите ФИО'
								placeholder='Семенов Петр Иванович'
								variant='outlined'
								error={!!errors.fullName?.message}
								helperText={errors.fullName?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='phone'
						rules={updatePhoneValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='text'
								fullWidth
								label='Введите номер телефона'
								placeholder='89001002030'
								variant='outlined'
								error={!!errors.phone?.message}
								helperText={errors.phone?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='telegramUsername'
						rules={updateTelegramLoginValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='text'
								fullWidth
								label='Введите логин в телеграм'
								placeholder='telegram'
								variant='outlined'
								error={!!errors.telegramUsername?.message}
								helperText={errors.telegramUsername?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item></Grid>

				<Grid item>
					<Button size='small' type='submit' fullWidth variant='contained'>
						Редактировать
					</Button>
				</Grid>
			</Grid>
		</Paper>
	)
}
export default EditUserForm
