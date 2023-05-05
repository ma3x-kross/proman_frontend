import React from 'react'
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridValueGetterParams,
	gridClasses,
} from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { Project } from '../../interfaces/ProjectsInterfaces'
import ProjectActions from './ProjectActions'
import { useLocation } from 'react-router-dom'

interface IProjectsDataGridProps {
	projects: Project[]
}

const ProjectsDataGrid: React.FC<IProjectsDataGridProps> = ({ projects }) => {
	const location = useLocation()

	const columns: GridColDef[] = React.useMemo(
		() => [
			{
				field: 'id',
				headerName: 'Id',
				width: 80,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'name',
				headerName: 'Название',
				width: 200,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'manager',
				headerName: 'Менеджер',
				width: 250,
				valueGetter: (params: GridValueGetterParams<Project>) =>
					params?.row?.manager?.profile?.fullName,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'status',
				headerName: 'Статус',
				width: 150,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'deadline',
				headerName: 'Срок',
				width: 150,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'plannedHours',
				headerName: 'Оценка проекта в часах',
				width: 100,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'workedHours',
				headerName: 'Потраченные часы',
				width: 100,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'actions',
				headerName: 'Подробнее',
				type: 'actions',
				width: 100,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) => (
					<ProjectActions {...{ params }} />
				),
			},
		],
		[],
	)

	const columnsForUserProjects: GridColDef[] = React.useMemo(
		() => [
			{
				field: 'id',
				headerName: 'Id',
				width: 80,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'name',
				headerName: 'Название',
				width: 200,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'status',
				headerName: 'Статус',
				width: 150,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'deadline',
				headerName: 'Срок',
				width: 150,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'actions',
				headerName: 'Подробнее',
				type: 'actions',
				width: 100,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) => (
					<ProjectActions {...{ params }} />
				),
			},
		],
		[],
	)

	return (
		<DataGrid
			columns={
				location.pathname === '/projects' ? columns : columnsForUserProjects
			}
			rows={projects}
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
				[`& .${gridClasses.row}`]: {
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

export default ProjectsDataGrid
