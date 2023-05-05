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
import { numberValidation } from '../../utils/validationRules'

import { UpdateProjectDto } from '../../interfaces/ProjectsInterfaces'
import dayjs from 'dayjs'
import ProjectStore from '../../store/projects/ProjectStore'
import { DatePicker, LocalizationProvider, ruRU } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useParams } from 'react-router-dom'

interface IAlertValue {
	type: AlertColor
	text: string
}

const EditProjectForm: React.FC = () => {
	const { id } = useParams()

	const { control, handleSubmit } = useForm<UpdateProjectDto>({ mode: 'all' })
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

	const onSubmit: SubmitHandler<UpdateProjectDto> = async (data) => {
		if (Object.values(data).every((value) => value === undefined)) {
			return
		}
		const formattedDeadline = dayjs(data.deadline).format('YYYY-MM-DD')
		console.log(data)
		const result = await ProjectStore.updateProject(parseInt(id as string), {
			...data,
			deadline: formattedDeadline,
		})
		if (result) {
			setAlertValue({
				type: 'success',
				text: 'Информация изменена',
			})
		} else {
			setAlertValue({
				type: 'error',
				text: result,
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
							Редактировать информацию
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='text'
								fullWidth
								label='Введите название проекта'
								placeholder='example@mail.ru'
								variant='outlined'
								error={!!errors.name?.message}
								helperText={errors.name?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='deadline'
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
									label='Дедлайн проекта'
									value={field.value}
									onChange={(e: any) => field.onChange(e)}
									slotProps={{
										textField: {
											size: 'small',
											fullWidth: true,
											variant: 'outlined',
											error: !!errors.deadline?.message,
											helperText: errors.deadline?.message,
										},
									}}
								/>
							</LocalizationProvider>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='plannedHours'
						rules={numberValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='number'
								fullWidth
								label='Введите оценку в часах'
								placeholder='48'
								variant='outlined'
								error={!!errors.plannedHours?.message}
								helperText={errors.plannedHours?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='rate'
						rules={numberValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='number'
								fullWidth
								label='Введите ставку проекта'
								placeholder='250'
								variant='outlined'
								error={!!errors.rate?.message}
								helperText={errors.rate?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Button size='small' type='submit' fullWidth variant='contained'>
						Редактировать
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
export default EditProjectForm
