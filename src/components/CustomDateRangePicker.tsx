import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ruRU } from '@mui/x-date-pickers/locales'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

interface CustomDateRangePickerProps {
	dateRange: {
		startDate: string
		endDate: string
	}
	onDateChange: (date: Date, type: string) => void
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
	dateRange,
	onDateChange,
}) => {
	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			localeText={
				ruRU.components.MuiLocalizationProvider.defaultProps.localeText
			}
		>
			<Box sx={{ mb: 3, display: 'flex', gap: 3 }}>
				<DatePicker
					format='DD/MM/YYYY'
					label='Начало периода'
					value={dayjs(dateRange.startDate)}
					onChange={(value) => {
						const date = dayjs(value).toDate()
						console.log(date)
						onDateChange(date, 'startDate')
					}}
				/>
				<DatePicker
					format='DD/MM/YYYY'
					label='Конец периода'
					value={dayjs(dateRange.endDate)}
					onChange={(value) => {
						const date = dayjs(value).toDate()
						console.log(date)
						onDateChange(date, 'endDate')
					}}
				/>
			</Box>
		</LocalizationProvider>
	)
}

export default CustomDateRangePicker
