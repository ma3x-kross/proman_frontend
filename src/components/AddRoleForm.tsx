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
import { Context } from '../index'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import { emailValidation, requiredValidation } from '../utils/validationRules'
import UsersStore from '../store/users/UsersStore'

interface IAddRoleForm {
	role: string
}

interface IAlertValue {
	type: AlertColor
	text: string
}

const AddRoleForm = ({ userId }: { userId: number }) => {
	const { control, handleSubmit } = useForm<IAddRoleForm>()
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

	const onSubmit: SubmitHandler<IAddRoleForm> = async (data) => {
		const result = await UsersStore.addRole(data.role, userId)
		if (!result) {
			setAlertValue({
				type: 'error',
				text: 'Не удалось выдать роль пользователю',
			})
		} else {
			setAlertValue({
				type: 'success',
				text: 'Роль была успешно выдана',
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
						<Typography component='h1' variant='h5'>
							Выдать роль пользователю
						</Typography>
					</Grid>
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
						Выдать роль
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
export default AddRoleForm
