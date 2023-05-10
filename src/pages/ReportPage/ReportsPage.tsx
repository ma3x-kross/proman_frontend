import React from 'react'
import HourStore from '../../store/HourStore/HourStore'
import { observer } from 'mobx-react-lite'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Switch,
	Typography,
} from '@mui/material'

import CustomDateRangePicker from '../../components/CustomDateRangePicker'
import dayjs from 'dayjs'
import UsersStore from '../../store/users/UsersStore'
import DeveloperDataGrid from '../DevelopersHomePage/DeveloperDataGrid'
import PayrollStore from '../../store/PayrollStore/PayrollStore'
import ReportHourDataGrid from './ReportHourDataGrid'
import { stringAvatar, trimFullName } from '../../utils/stringAvatar'
import { Link } from 'react-router-dom'
import ReportPayrollDataGrid from './ReportPayrollDataGrid'

const ReportsPage = () => {
	const [checked, setChecked] = React.useState(false)
	console.log(`checked ${checked}`)

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

	React.useEffect(() => {
		const getHours = async () => {
			await PayrollStore.getAllHours({
				start: selectedRange.startDate,
				end: selectedRange.endDate,
			})
		}
		const getPayroll = async () => {
			await PayrollStore.getPayrolls({
				start: selectedRange.startDate,
				end: selectedRange.endDate,
			})
		}
		getHours()
		getPayroll()
	}, [selectedRange])

	if (PayrollStore.loading)
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
				width: '100%',
			}}
		>
			<Typography variant='h4' component='h4' sx={{ mt: 3, mb: 3 }}>
				Отчетность
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
				<Box>
					Время
					<Switch
						checked={checked}
						onChange={(event) => {
							setChecked(event.target.checked)
						}}
					/>
					Зарплата
				</Box>
			</Box>
			{!checked &&
				PayrollStore.hours.map((user) => (
					<Box key={user.id}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Avatar {...stringAvatar(trimFullName(user.fullName))} />

							<Typography variant='h6' component='h6'>
								<Link
									to={`/people/${user.id}`}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									{user.fullName}
								</Link>
							</Typography>
						</Box>
						<Box sx={{ mt: 2, mb: 2 }}>
							<ReportHourDataGrid
								projectHours={user.projects}
								selectedRange={selectedRange}
							/>
						</Box>
					</Box>
				))}
			{checked && (
				<Box sx={{height: '410px'}}>
					<ReportPayrollDataGrid payrolls={PayrollStore.payrolls} />
				</Box>
			)}
		</Box>
	)
}

export default observer(ReportsPage)
