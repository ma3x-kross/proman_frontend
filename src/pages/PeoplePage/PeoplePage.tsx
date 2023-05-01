import React from 'react'
import { Box, Fab, Stack, Typography } from '@mui/material'
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	gridClasses,
} from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'

import UsersStore from '../../store/users/UsersStore'
import { observer } from 'mobx-react-lite'

import AddIcon from '@mui/icons-material/Add'
import Modal from '../../components/Modal'
import InviteForm from './InviteForm'
import PeopleActions from './PeopleActions'

const PeoplePage = () => {
	const { users } = UsersStore
	const [open, setOpen] = React.useState(false)

	const handleClickInviteNewUser = () => {
		setOpen(true)
	}

	const handleCloseModal = () => {
		setOpen(false)
	}

	React.useEffect(() => {
		UsersStore.getUsers()
	}, [open])

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
				field: 'fullName',
				headerName: 'ФИО',
				width: 250,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'role',
				headerName: 'Должность',
				width: 150,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'email',
				headerName: 'Электронная почта',
				width: 200,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'phone',
				headerName: 'Телефон',
				width: 150,
				sortable: false,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params: GridRenderCellParams) =>
					params.value ? params.value : <em>null</em>,
			},
			{
				field: 'telegramUsername',
				headerName: 'Логин в телеграм',
				width: 200,
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
					<PeopleActions {...{ params }} />
				),
			},
		],
		[],
	)

	return (
		<Box
			sx={{
				height: 410,
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant='h4' component='h4' sx={{ mt: 3, mb: 3 }}>
					Персонал
				</Typography>
				{localStorage.getItem('roles')?.includes('ADMIN') && (
					<Stack direction='row' spacing={2} alignItems='center'>
						<Typography
							variant='h5'
							sx={{
								fontStyle: 'italic',
							}}
						>
							пригласить пользователя
						</Typography>
						<Fab
							color='primary'
							aria-label='add'
							onClick={handleClickInviteNewUser}
						>
							<AddIcon />
						</Fab>
						<Modal
							open={open}
							handleClose={handleCloseModal}
							Component={<InviteForm />}
						/>
					</Stack>
				)}
			</Box>

			<DataGrid
				columns={columns}
				rows={users}
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
		</Box>
	)
}

export default observer(PeoplePage)
