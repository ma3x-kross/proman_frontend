
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
	Box,
	Chip,
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
	numberValidation,
	requiredValidation,
} from '../../utils/validationRules'
import {
	CreateProjectDto,
	PROJECT_STATUSES,
} from '../../interfaces/ProjectsInterfaces'
import { ruRU } from '@mui/x-date-pickers/locales'
import dayjs from 'dayjs'
import { User } from '../../interfaces/UsersInterfaces'
import UsersStore from '../../store/users/UsersStore'
import ProjectStore from '../../store/projects/ProjectStore'

interface IAlertValue {
	type: AlertColor
	text: string
}

interface IUsers {
	id: number
	email: string
	fullName: string
	role: string
	phone: string
	telegramUsername: string
}

const CreateProjectForm: React.FC = () => {
	const [managers, setManagers] = React.useState<IUsers[]>([])
	const [developers, setDevelopers] = React.useState<IUsers[]>([])

	React.useEffect(() => {
		const getUsers = async (role: string) => {
			await UsersStore.getUsers(role)
			role === 'MANAGER'
				? setManagers((prevState) => (prevState = UsersStore.users))
				: setDevelopers((prevState) => (prevState = UsersStore.users))
		}
		getUsers('MANAGER')
		getUsers('DEVELOPER')
	}, [])

	const { control, handleSubmit } = useForm<CreateProjectDto>({ mode: 'all' })
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

	const onSubmit: SubmitHandler<CreateProjectDto> = async (data) => {
		const formattedDeadline = dayjs(data.deadline).format('YYYY-MM-DD')
		const result = await ProjectStore.createProject({
			...data,
			deadline: formattedDeadline,
		})
		if (!result) {
			setAlertValue({
				type: 'error',
				text: 'Проект с таким именем уже существует',
			})
		} else {
			setAlertValue({
				type: 'success',
				text: 'Проект успешно создан',
			})
		}
		setOpen(true) // снэкбар
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
							Создать новый проект
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Controller
						control={control}
						name='name'
						rules={requiredValidation}
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
						name='status'
						rules={requiredValidation}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel
									size='small'
									id='status-select-label'
									error={!!errors.status?.message}
								>
									Статус
								</InputLabel>
								<Select
									size='small'
									labelId='status-select-label'
									id='status-select-label'
									defaultValue=''
									value={field.value}
									label='Статус'
									onChange={(e) => field.onChange(e)}
									error={!!errors.status?.message}
								>
									{PROJECT_STATUSES.map((status) => (
										<MenuItem key={status} value={status}>
											{status}
										</MenuItem>
									))}
								</Select>
								{!!errors.status?.message && (
									<FormHelperText error>{errors.status.message}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Grid>

				<Grid item>
					<Controller
						control={control}
						name='deadline'
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

				{managers.length !== 0 && (
					<Grid item>
						<Controller
							control={control}
							name='managerId'
							rules={requiredValidation}
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel
										size='small'
										id='manager-select-label'
										error={!!errors.managerId?.message}
									>
										Менеджер
									</InputLabel>
									<Select
										size='small'
										labelId='manager-select-label'
										id='manager-select-label'
										value={field.value}
										label='Менеджер'
										onChange={(e) => field.onChange(e)}
										error={!!errors.managerId?.message}
									>
										{managers.map((manager) => (
											<MenuItem key={manager.email} value={manager.id}>
												{manager.fullName}
											</MenuItem>
										))}
									</Select>
									{!!errors.managerId?.message && (
										<FormHelperText error>
											{errors.managerId.message}
										</FormHelperText>
									)}
								</FormControl>
							)}
						/>
					</Grid>
				)}
				{developers.length !== 0 && (
					<Grid item>
						<Controller
							control={control}
							name='developersIds'
							rules={requiredValidation}
							render={({ field }) => (
								<FormControl fullWidth sx={{ maxWidth: '255px' }}>
									<InputLabel
										size='small'
										id='developer-select-label'
										error={!!errors.developersIds?.message}
									>
										Разработчики
									</InputLabel>
									<Select
										size='small'
										labelId='developer-select-label'
										id='developer-select-label'
										multiple
										label='Разработчики'
										defaultValue={[]}
										value={field.value}
										onChange={(e) => field.onChange(e)}
										error={!!errors.developersIds?.message}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
									>
										{developers
											.sort((a, b) => a.id - b.id)
											.map((developer) => (
												<MenuItem key={developer.email} value={developer.id}>
													{`${developer.id} ${developer.fullName}`}
												</MenuItem>
											))}
									</Select>
									{!!errors.developersIds?.message && (
										<FormHelperText error>
											{errors.developersIds.message}
										</FormHelperText>
									)}
								</FormControl>
							)}
						/>
					</Grid>
				)}

				<Grid item>
					<Button type='submit' fullWidth variant='contained'>
						Создать новый проект
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
export default CreateProjectForm
