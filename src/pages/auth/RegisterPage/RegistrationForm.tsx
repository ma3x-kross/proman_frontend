import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Alert,
	AlertTitle,
	Avatar,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material'

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../../index'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import {
	passwordValidation,
	phoneValidation,
	requiredValidation,
} from '../../../utils/validationRules'

interface IRegistrationForm {
	fullName: string
	password: string
	phone: string
	telegramUsername: string
}

const RegistrationForm: React.FC = () => {
	const { store } = React.useContext(Context)

	const { link } = useParams()
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = React.useState<Boolean>(false)

	const { control, handleSubmit } = useForm<IRegistrationForm>()

	const { errors } = useFormState({
		control,
	})

	const [open, setOpen] = React.useState(false)
	const [alertMessage, setAlertMessage] = React.useState('')

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
		const result = await store.register(data, link as string)
		if (result) {
			setAlertMessage(result as string)
			setOpen(true)
		} else navigate('/')
	}

	return (
		<>
			<Grid
				component='form'
				container
				spacing={2}
				direction='column'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid item>
					<Grid container direction='column' alignItems='center'>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<Lock />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Регистрация
						</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='fullName'
						rules={requiredValidation}
						render={({ field }) => (
							<TextField
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
						name='password'
						rules={passwordValidation}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel
									htmlFor='outlined-adornment-password'
									error={!!errors.password?.message}
								>
									Придумайте пароль
								</InputLabel>
								<OutlinedInput
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
						name='phone'
						rules={phoneValidation}
						render={({ field }) => (
							<TextField
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
						rules={{ required: 'Обязательное поле' }}
						render={({ field }) => (
							<TextField
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
				<Grid item>
					<Button
						type='submit'
						// onClick={handleClick}
						fullWidth
						variant='contained'
					>
						Подтвердить регистрацию
					</Button>
				</Grid>
			</Grid>
			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					<AlertTitle>ОШИБКА</AlertTitle>
					{alertMessage}
				</Alert>
			</Snackbar>
		</>
	)
}
export default RegistrationForm
