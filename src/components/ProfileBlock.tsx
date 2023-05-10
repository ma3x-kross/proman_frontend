import * as React from 'react'
import Stack from '@mui/material/Stack'

import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import TelegramIcon from '@mui/icons-material/Telegram'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import EditIcon from '@mui/icons-material/Edit'
import Modal from './Modal'
import ModalDelete from './ModalDelete'
import { Context } from '..'
import { useLocation, useNavigate } from 'react-router-dom'
import UsersStore from '../store/users/UsersStore'
import { stringAvatar, trimFullName } from '../utils/stringAvatar'
import EditUserForm from './EditUserForm'
import AddRoleForm from './AddRoleForm'
import { Rate } from '../interfaces/UsersInterfaces'
import AddRateForm from './AddRateForm'

interface IProfileBlockProps {
	id: number
	fullName: string
	role: string
	email: string
	phone: string
	telegramUsername: string
	rate?: Rate[]
}

const ProfileBlock: React.FC<IProfileBlockProps> = ({
	id,
	fullName,
	role,
	email,
	phone,
	telegramUsername,
	rate,
}) => {
	const { store } = React.useContext(Context)
	const location = useLocation()
	const isProfile = location.pathname === '/profile' ? true : false
	const adminAccess = store.roles.includes('ADMIN')
	const navigate = useNavigate()

	const [openEdit, setOpenEdit] = React.useState(false)
	const [openRate, setOpenRate] = React.useState(false)
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
						{fullName && (
							<>
								<Avatar {...stringAvatar(trimFullName(fullName))} />
								<Typography variant='h6' component='h6'>
									{fullName}
								</Typography>
							</>
						)}
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
						{role === 'разработчик' && (
							<>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 1,
									}}
								>
									<Typography variant='h6' component='h6'>
										Ставка в час
									</Typography>

									{adminAccess && (
										<IconButton
											onClick={() => setOpenRate(true)}
											color='warning'
										>
											<EditIcon
												sx={{
													width: '20px',
													height: '20px',
												}}
											/>
										</IconButton>
									)}
								</Box>

								{rate && (
									<Stack>
										{rate.map((r) => (
											<Box
												sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
											>
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Typography
														color='primary'
														fontSize='20px'
														fontWeight='bold'
													>
														{r.value}{' '}
													</Typography>
													<CurrencyRubleIcon color='primary' />
												</Box>

												<Typography color='text.secondary'>
													{`действ. с ${r.date.split('-').reverse().join('.')}`}
												</Typography>
											</Box>
										))}
									</Stack>
								)}
							</>
						)}
					</CardContent>
					{(adminAccess || isProfile) && (
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
			<Modal
				open={openRate}
				handleClose={() => setOpenRate(false)}
				Component={<AddRateForm userId={id} />}
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
