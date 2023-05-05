import { GroupAdd } from '@mui/icons-material'
import {
	Alert,
	AlertColor,
	AlertTitle,
	Avatar,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material'

import React from 'react'
import { Context } from '../../index'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import {
	emailValidation,
	requiredValidation,
} from '../../utils/validationRules'

interface IInviteForm {
	email: string
	role: string
}

interface IAlertValue {
	type: AlertColor
	text: string
}

const InviteForm = () => {
	const { store } = React.useContext(Context)

	const { control, handleSubmit } = useForm<IInviteForm>({ mode: 'all' })
	const { errors } = useFormState({
		control,
	})

	const [alertValue, setAlertValue] = React.useState<IAlertValue>(
		{} as IAlertValue,
	)
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

	const onSubmit: SubmitHandler<IInviteForm> = async (data) => {
		const result = await store.invite(data.email, data.role)
		if (!result) {
			setAlertValue({
				type: 'error',
				text: 'Пользователь с таким email уже существует',
			})
		} else {
			setAlertValue({
				type: 'success',
				text: 'Приглашение отправлено на указанную почту',
			})
		}
		setOpen(true)
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
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<GroupAdd />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Пригласить пользователя
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='email'
						rules={emailValidation}
						render={({ field }) => (
							<TextField size='small'
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
						name='role'
						rules={requiredValidation}
						render={({ field }) => (
							<FormControl fullWidth size='small'>
								<InputLabel
									id='role-select-label'
									error={!!errors.role?.message}
								>
									Роль
								</InputLabel>
								<Select
									size='small'
									labelId='role-select-label'
									id='role-select-label'
									defaultValue=''
									value={field.value}
									label='Роль'
									onChange={(e) => field.onChange(e)}
									error={!!errors.role?.message}
								>
									<MenuItem value={'ADMIN'}>Администратор</MenuItem>
									<MenuItem value={'MANAGER'}>Менеджер</MenuItem>
									<MenuItem value={'DEVELOPER'}>Разработчик</MenuItem>
								</Select>
								{!!errors.role?.message && (
									<FormHelperText error id='outlined-adornment-password'>
										{errors.role.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item>
					<Button size='small' type='submit' fullWidth variant='contained'>
						Пригласить пользователя
					</Button>
				</Grid>
			</Grid>
			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert
					severity={alertValue.type}
					onClose={handleClose}
					sx={{ width: '100%' }}
				>
					<AlertTitle>
						{alertValue.type === 'success' ? 'УСПЕШНО' : 'ОШИБКА'}
					</AlertTitle>
					{alertValue.text}
				</Alert>
			</Snackbar>
		</Paper>
	)
}
export default InviteForm
