import React from 'react'
import { Avatar, Box, Grid, Typography, Menu, MenuItem } from '@mui/material'
import { stringAvatar, trimFullName } from '../utils/stringAvatar'
import { User } from '../interfaces/UsersInterfaces'
import { Link } from 'react-router-dom'
import ProjectStore from '../store/projects/ProjectStore'
import { observer } from 'mobx-react-lite'

interface IUserBadgeProps {
	user: User
	role: string
	projectId: number
}

const UserBadge: React.FC<IUserBadgeProps> = ({ user, role, projectId }) => {

	const access =
		localStorage.getItem('roles')?.includes('ADMIN') ||
		localStorage.getItem('roles')?.includes('MANAGER')



	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const deleteUser = async () => {
		console.log(user.id, projectId)
		await ProjectStore.deleteUserFromProject(user.id, projectId, role)
		handleClose()
	}

	return (
		user.profile && (
			<Grid item sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
				<Avatar {...stringAvatar(trimFullName(user.profile.fullName))} />
				<Box>
					<Typography
						onClick={handleClick}
						sx={{
							cursor: `${access ? 'pointer' : 'auto'}`,
							fontSize: 18,
							width: '150px',
						}}
					>
						{trimFullName(user.profile.fullName)}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						{role}
					</Typography>
					{access && (
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={handleClose}>
								<Link
									to={`/people/${user.id}`}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									Перейти в профиль
								</Link>
							</MenuItem>
							<MenuItem onClick={deleteUser}>Удалить из проекта</MenuItem>
						</Menu>
					)}
				</Box>
			</Grid>
		)
	)
}

export default observer(UserBadge)
