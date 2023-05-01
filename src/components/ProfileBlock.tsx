import * as React from 'react'
import Stack from '@mui/material/Stack'

import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import TelegramIcon from '@mui/icons-material/Telegram'
import Modal from './Modal'
import ModalDelete from './ModalDelete'
import { Context } from '..'
import { useLocation, useNavigate } from 'react-router-dom'
import UsersStore from '../store/users/UsersStore'
import { stringAvatar } from '../utils/stringAvatar'
import EditUserForm from './EditUserForm'
import AddRoleForm from './AddRoleForm'

interface IProfileBlockProps {
	id: number
	fullName: string
	role: string
	email: string
	phone: string
	telegramUsername: string
}

const ProfileBlock: React.FC<IProfileBlockProps> = ({
	id,
	fullName,
	role,
	email,
	phone,
	telegramUsername,
}) => {
	const { store } = React.useContext(Context)
	const location = useLocation()
	const isProfile = location.pathname === '/profile' ? true : false
	console.log(isProfile)
	const navigate = useNavigate()

	const [openEdit, setOpenEdit] = React.useState(false)
	const [openDelete, setOpenDelete] = React.useState(false)
	const [deleteResult, setDeleteResult] = React.useState(false)

	React.useEffect(() => {
		const deleteSelf = async () => {
			await UsersStore.delete()
		}
		const deleteUser = async (id: number) => {
			await UsersStore.delete(id)
		}
		if (deleteResult) {
			if (isProfile) {
				deleteSelf()
				store.setAuth(false)
				navigate('/')
			} else {
				deleteUser(id)
				navigate('/people')
			}
		}
	}, [deleteResult])

	return (
		<>
			<Stack maxWidth='300px' spacing={4}>
				<Card>
					<CardContent
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '15px',
						}}
					>
						<Avatar {...stringAvatar(fullName as string)} />
						<Typography variant='h6' component='h6'>
							{fullName}
						</Typography>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Typography variant='h6' component='h6' sx={{ mb: '10px' }}>
							Информация профиля
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								mb: '10px',
							}}
						>
							<BadgeIcon color='primary' />
							<Typography color='text.secondary'>{role}</Typography>
						</Box>
						<Typography variant='h6' component='h6' sx={{ mb: '10px' }}>
							Контактная информация
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								mb: '10px',
							}}
						>
							<EmailIcon color='primary' />
							<Typography color='text.secondary'>{email}</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								mb: '10px',
							}}
						>
							<PhoneIcon color='primary' />
							<Typography color='text.secondary'>{phone}</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								mb: '10px',
							}}
						>
							<TelegramIcon color='primary' />
							<Typography color='text.secondary'>{telegramUsername}</Typography>
						</Box>
					</CardContent>
					{(store.roles.includes('ADMIN') || isProfile) && (
						<CardActions sx={{ display: 'flex', gap: '10px' }}>
							<Button onClick={() => setOpenEdit(true)} size='small'>
								{isProfile ? 'Редактировать' : 'Выдать роль'}
							</Button>
							<Button
								onClick={() => setOpenDelete(true)}
								size='small'
								color='error'
							>
								Удалить
							</Button>
						</CardActions>
					)}
				</Card>
			</Stack>

			<Modal
				open={openEdit}
				handleClose={() => setOpenEdit(false)}
				Component={isProfile ? <EditUserForm /> : <AddRoleForm userId={id} />}
			/>
			<ModalDelete
				open={openDelete}
				name={fullName}
				onClose={() => setOpenDelete(false)}
				setDeleteResult={() => setDeleteResult(true)}
				isProfile={isProfile}
			/>
		</>
	)
}
export default ProfileBlock
