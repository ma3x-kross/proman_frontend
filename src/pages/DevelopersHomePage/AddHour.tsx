import {
	Alert,
	AlertColor,
	AlertTitle,
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import React from 'react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormState,
} from 'react-hook-form'
import {
	hourValidation,
	hoursDateValidation,
	requiredValidation,
} from '../../utils/validationRules'
import { Project } from '../../interfaces/ProjectsInterfaces'
import { ruRU } from '@mui/x-date-pickers/locales'

import HourStore from '../../store/HourStore/HourStore'
import { AddHourDto } from '../../interfaces/HoursInterface'
import dayjs from 'dayjs'

interface IAlertValue {
	type: AlertColor
	text: string
}

interface IAddHourProps {
	projects: Project[]
}

const AddHour: React.FC<IAddHourProps> = ({ projects }) => {
	React.useEffect(() => {}, [])

	const { control, handleSubmit } = useForm<AddHourDto>({ mode: 'all' })
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

	const onSubmit: SubmitHandler<AddHourDto> = async (data) => {
		console.log(data)
		const formattedDate = dayjs(data.date).format('YYYY-MM-DD')
		const result = await HourStore.addHour({
			...data,
			date: formattedDate,
		})
		if (result) {
			setAlertValue({
				type: 'error',
				text: result,
			})
		} else {
			setAlertValue({
				type: 'success',
				text: 'Время отмечено',
			})
		}
		setOpen(true)
	}

	if (projects.length === 0)
		return (
			<Paper elevation={5} sx={{ padding: 5 }}>
				<Typography component='h1' variant='h5'>
					Вас еще не назначил ни в один из проектов
				</Typography>
			</Paper>
		)

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
					<Typography component='h1' variant='h5'>
						Добавить отработанное время
					</Typography>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='projectId'
						rules={requiredValidation}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel
									size='small'
									id='project-select-label'
									error={!!errors.projectId?.message}
								>
									Проект
								</InputLabel>
								<Select
									size='small'
									labelId='project-select-label'
									id='project-select-label'
									value={field.value}
									label='Проект'
									onChange={(e) => field.onChange(e)}
									error={!!errors.projectId?.message}
								>
									{projects.map((project) => (
										<MenuItem key={project.name} value={project.id}>
											{project.name}
										</MenuItem>
									))}
								</Select>
								{!!errors.projectId?.message && (
									<FormHelperText error>
										{errors.projectId.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='date'
						rules={hoursDateValidation}
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
									label='Дата'
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
					<Controller
						control={control}
						name='value'
						rules={hourValidation}
						render={({ field }) => (
							<TextField
								size='small'
								value={field.value}
								onChange={(e) => field.onChange(e)}
								type='number'
								fullWidth
								label='Часы'
								placeholder='48'
								variant='outlined'
								error={!!errors.value?.message}
								helperText={errors.value?.message}
							/>
						)}
					/>
				</Grid>

				<Grid item>
					<Button type='submit' fullWidth variant='contained'>
						Отметить время
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
export default AddHour
