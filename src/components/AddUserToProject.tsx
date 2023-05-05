import React from 'react'
import {
	Box,
	Grid,
	IconButton,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Typography,
} from '@mui/material'
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp'
import { User } from '../interfaces/UsersInterfaces'
import UsersStore, { IUsers } from '../store/users/UsersStore'
import ProjectStore from '../store/projects/ProjectStore'

interface IAddUserToProjectProps {
	includedManager?: User
	includedDevelopers: User[]
	projectId: number
}

const AddUserToProject: React.FC<IAddUserToProjectProps> = ({
	includedManager,
	includedDevelopers,
	projectId,
}) => {
	const [developerList, setDeveloperList] = React.useState<IUsers[]>([])
	const [managerList, setManagerList] = React.useState<IUsers[]>([])

	React.useEffect(() => {
		const getUsers = async () => {
			if (!includedManager) {
				await UsersStore.getUsers('MANAGER')
				const managers = UsersStore.users.filter((manager) => manager.fullName)
				setManagerList(managers)
			}

			await UsersStore.getUsers('DEVELOPER')
			let developers = UsersStore.users.filter(
				(developer) =>
					!includedDevelopers.some(
						(includedDeveloper) => includedDeveloper.id === developer.id,
					),
			)
			developers = developers.filter((developer) => developer.fullName)
			setDeveloperList(developers)
		}
		getUsers()
	}, [includedDevelopers, includedManager])

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const onClickDeveloper = async (
		event: React.MouseEvent<HTMLElement>,
		developerId: number,
	) => {
		await ProjectStore.addUserToProject(developerId, projectId, 'Разработчик')
		handleClose()
	}

	const onClickManager = async (
		event: React.MouseEvent<HTMLElement>,
		managerId: number,
	) => {
		await ProjectStore.addUserToProject(managerId, projectId)
		handleClose()
	}

	return (
		<Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<IconButton size='large' onClick={handleClick}>
				<PersonAddAltSharpIcon color='success' />
			</IconButton>
			<Box sx={{ width: '150px' }}>
				<Typography sx={{ fontSize: 18 }}>Добавить</Typography>
				<Typography sx={{ fontSize: 18 }}>участника</Typography>
			</Box>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuList dense>
					{!includedManager && (
						<Box>
							<MenuItem disabled>Менеджер</MenuItem>
							{managerList.map((user) => (
								<MenuItem
									key={user.email}
									onClick={(event) => onClickManager(event, user.id)}
								>
									<ListItemText inset>{user.fullName}</ListItemText>
								</MenuItem>
							))}
						</Box>
					)}

					{developerList.length !== 0 ? (
						<Box>
							<MenuItem disabled>Разработчики</MenuItem>
							{developerList.map((user) => (
								<MenuItem
									key={user.email}
									onClick={(event) => onClickDeveloper(event, user.id)}
								>
									<ListItemText inset>{user.fullName}</ListItemText>
								</MenuItem>
							))}
						</Box>
					) : (
						<ListItemText sx={{ pl: 2, pr: 2 }}>
							Разработчики отсутствуют
						</ListItemText>
					)}
				</MenuList>
			</Menu>
		</Grid>
	)
}

export default AddUserToProject
