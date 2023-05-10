// import React from 'react'

// const ReportPayrollDataGrid = () => {
//   return (
// 	<div>ReportPayrollDataGrid</div>
//   )
// }

// export default ReportPayrollDataGrid

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
import { Avatar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Payroll } from '../../interfaces/PayrollInterface'
import { stringAvatar, trimFullName } from '../../utils/stringAvatar'

dayjs.locale('ru')

interface IReportPayrollDataGridProps {
	payrolls: Payroll[]
}

const ReportPayrollDataGrid: React.FC<IReportPayrollDataGridProps> = ({
	payrolls,
}) => {
	const columns: GridColDef[] = React.useMemo(
		() => [
			{
				field: 'id',
				headerName: 'Id',
				width: 100,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'fullName',
				headerName: 'Фио',
				width: 250,
				headerAlign: 'center',

				renderCell: (params: GridRenderCellParams) => (
					<Link
						to={`/people/${params.id}`}
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						{params.value}
					</Link>
				),
			},
			{
				field: 'rate',
				headerName: 'Текущая ставка',
				width: 250,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'hours',
				headerName: 'Отработанные часы',
				width: 250,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'salary',
				headerName: 'Заработная плата',
				width: 250,
				headerAlign: 'center',
				align: 'center',
			},
		],
		[],
	)

	return (
		<DataGrid
			rows={payrolls}
			columns={columns}
			getRowId={(row) => row.id}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[5, 10, 20]}
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

export default ReportPayrollDataGrid
