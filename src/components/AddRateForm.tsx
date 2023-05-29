import {
	Alert,
	AlertColor,
	AlertTitle,
	Button,
	Grid,
	Paper,
	Snackbar,
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
	requiredNumberValidation,
	requiredValidation,
} from '../utils/validationRules'
import UsersStore from '../store/users/UsersStore'
import { DatePicker, LocalizationProvider, ruRU } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

interface IAddRateForm {
	rate: number
	date: string
}

interface IAlertValue {
	type: AlertColor
	text: string
}

const AddRateForm = ({ userId }: { userId: number }) => {
	const { control, handleSubmit } = useForm<IAddRateForm>()
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

	const onSubmit: SubmitHandler<IAddRateForm> = async ({ rate, date }) => {
		const formatedDate = dayjs(date).format('YYYY-MM-DD')

		const result = await UsersStore.addRate(userId, rate, formatedDate)
		if (result) {
			setAlertValue({
				type: 'error',
				text: result,
			})
		} else {
			setAlertValue({
				type: 'success',
				text: 'Почасовая ставка была успешно назначена',
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
							Установить почасовую ставку
						</Typography>
					</Grid>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='rate'
						rules={requiredNumberValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='number'
								fullWidth
								label='Введите ставку'
								placeholder='250'
								variant='outlined'
								error={!!errors.rate?.message}
								helperText={errors.rate?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='date'
						rules={requiredValidation}
						render={({ field }) => (
							<LocalizationProvider
								localeText={
									ruRU.components.MuiLocalizationProvider.defaultProps
										.localeText
								}
								dateAdapter={AdapterDayjs}
							>
								<DatePicker
									format='DD/MM/YYYY'
									label='Дата начала действия ставки'
									value={field.value}
									onChange={(e: any) => field.onChange(e)}
									slotProps={{
										textField: {
											size: 'small',
											fullWidth: true,
											variant: 'outlined',
											error: !!errors.date?.message,
											helperText: errors.date?.message,
										},
									}}
								/>
							</LocalizationProvider>
						)}
					/>
				</Grid>

				<Grid item>
					<Button size='small' type='submit' fullWidth variant='contained'>
						Установить
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
export default AddRateForm
