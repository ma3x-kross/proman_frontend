import React from 'react'
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	gridClasses,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ProjectHours } from '../../interfaces/HoursInterface'
import { grey } from '@mui/material/colors'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

dayjs.locale('ru')

interface IReportHourDataGridProps {
	projectHours: ProjectHours[]
	selectedRange: {
		startDate: string
		endDate: string
	}
}

const ReportHourDataGrid: React.FC<IReportHourDataGridProps> = ({
	projectHours,
	selectedRange,
}) => {
	const getColumns = () => {
		const { startDate, endDate } = selectedRange
		const start = dayjs(startDate)
		const end = dayjs(endDate)

		const selectedRangeColumns: GridColDef[] = []

		let day = start
		while (day.isBefore(end) || day.isSame(end, 'day')) {
			selectedRangeColumns.push({
				field: day.format('YYYY-MM-DD'),
				headerName: day.format('dd DD').toUpperCase(),
				width: 110,
				headerAlign: 'center',
				align: 'center',
			})
			day = day.add(1, 'day')
		}

		return [
			{
				field: 'id',
				headerName: 'ID',
				width: 50,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'name',
				headerName: 'Название',
				width: 150,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) => (
					<Link
						to={`/projects/${params.rowNode.id}`}
						style={{ textDecoration: 'none', color: 'inherit' }}
						title={params.value}
					>
						{params.value}
					</Link>
				),
			},
			{
				field: 'totalHours',
				headerName: 'Всего часов',
				width: 150,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) => (
					<Typography variant='h6'>{params.value}</Typography>
				),
			},
			...selectedRangeColumns,
		] as GridColDef[]
	}

	const getRows = () => {
		const rows = projectHours.map((project) => {
			const row: any = {
				id: project.id,
				name: project.name,
			}

			project.hours.forEach((hour) => {
				const hourDate = dayjs(hour.date).format('YYYY-MM-DD')
				row[hourDate] = hour.value
			})

			const totalHours = project.hours.reduce(
				(sum, hour) => sum + hour.value,
				0,
			)
			row.totalHours = totalHours

			return row
		})

		return rows
	}

	return (
		<DataGrid
			rows={getRows()}
			columns={getColumns()}
			getRowId={(row) => row.id}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 2,
					},
				},
			}}
			pageSizeOptions={[2, 5, 10]}
			getRowSpacing={(params) => ({
				top: params.isFirstVisible ? 0 : 5,
				bottom: params.isLastVisible ? 0 : 5,
			})}
			sx={{
				[`& .${gridClasses.cell}`]: {
					bgcolor: (theme) =>
						theme.palette.mode === 'light' ? grey[200] : grey[900],
				},
				'& .MuiDataGrid-cell:focus': {
					outline: 'none',
				},
			}}
		/>
	)
}

export default ReportHourDataGrid
