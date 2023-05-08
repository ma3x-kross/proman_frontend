import React from 'react'
import HourStore from '../../store/HourStore/HourStore'
import { observer } from 'mobx-react-lite'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import Modal from '../../components/Modal'

import DeveloperDataGrid from './DeveloperDataGrid'
import CustomDateRangePicker from '../../components/CustomDateRangePicker'
import dayjs from 'dayjs'
import UsersStore from '../../store/users/UsersStore'
import AddHour from './AddHour'

const DevelopersHomePage = () => {
	const [selectedRange, setSelectedRange] = React.useState<{
		startDate: string
		endDate: string
	}>({
		startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
		endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
	})

	const handleDateChange = (date: Date, type: string) => {
		const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''

		if (type === 'startDate') {
			setSelectedRange((prevSelectedRange) => ({
				startDate: formattedDate,
				endDate:
					prevSelectedRange.endDate && prevSelectedRange.endDate < formattedDate
						? formattedDate
						: prevSelectedRange.endDate,
			}))
		} else if (type === 'endDate') {
			setSelectedRange((prevSelectedRange) => ({
				startDate:
					prevSelectedRange.startDate &&
					prevSelectedRange.startDate > formattedDate
						? formattedDate
						: prevSelectedRange.startDate,
				endDate: formattedDate,
			}))
		}
	}
	const [open, setOpen] = React.useState(false)
	const handleClickAddHour = () => {
		setOpen(true)
	}

	const handleCloseModal = () => {
		setOpen(false)
	}

	React.useEffect(() => {
		const getProjects = async () => {
			await UsersStore.getOneUser()
			console.log(UsersStore.userProjects)
		}
		getProjects()
	}, [])

	React.useEffect(() => {
		const getHours = async () => {
			await HourStore.getDeveloperHours({
				start: selectedRange.startDate,
				end: selectedRange.endDate,
			})
		}
		if (open) return
		getHours()
	}, [selectedRange, open])

	if (HourStore.loading)
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)

	return (
		<Box
			sx={{
				height: 430,
				width: '100%',
			}}
		>
			<Typography variant='h4' component='h4' sx={{ mt: 3, mb: 3 }}>
				Мои проекты
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<CustomDateRangePicker
					dateRange={selectedRange}
					onDateChange={handleDateChange}
				/>
				<Button color='primary' aria-label='add' onClick={handleClickAddHour}>
					Отметить время
				</Button>
				<Modal
					open={open}
					handleClose={handleCloseModal}
					Component={<AddHour projects={UsersStore.userProjects} />}
				/>
			</Box>
			<DeveloperDataGrid
				projectHours={HourStore.hours}
				selectedRange={selectedRange}
			/>
		</Box>
	)
}

export default observer(DevelopersHomePage)
