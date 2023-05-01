import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
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
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from '../../../index'
import {
	SubmitHandler,
	useForm,
	Controller,
	useFormState,
} from 'react-hook-form'
import {
	emailValidation,
	passwordValidation,
} from '../../../utils/validationRules'

interface ILoginForm {
	email: string
	password: string
}

const LoginForm: React.FC = () => {
	const { store } = React.useContext(Context)

	const [showPassword, setShowPassword] = React.useState<Boolean>(false)

	const { control, handleSubmit } = useForm<ILoginForm>({ mode: 'all' })
	const { errors } = useFormState({
		control,
	})

	const [open, setOpen] = React.useState(false)

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
		const result = await store.login(data.email, data.password)
		if (!result) setOpen(true)
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
							<AccountCircle />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Войти в систему
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='email'
						rules={emailValidation}
						render={({ field }) => (
							<TextField
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
						rules={passwordValidation}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel
									htmlFor='outlined-adornment-password'
									error={!!errors.password?.message}
								>
									Введите пароль
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
					<Button type='submit' fullWidth variant='contained'>
						Войти в систему
					</Button>
				</Grid>
			</Grid>
			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					<AlertTitle>ОШИБКА</AlertTitle>
					Неверный логин или пароль
				</Alert>
			</Snackbar>
		</>
	)
}
export default observer(LoginForm)
