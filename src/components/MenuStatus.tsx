import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import {
	PROJECT_STATUSES,
	Project,
	UpdateProjectDto,
} from '../interfaces/ProjectsInterfaces'
import {
	Alert,
	AlertTitle,
	IconButton,
	MenuList,
	Snackbar,
	Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProjectStore from '../store/projects/ProjectStore'
import { useParams } from 'react-router-dom'

interface IMenuStatusProps {
	status: string
	projectId: number
}

const MenuStatus: React.FC<IMenuStatusProps> = ({ status, projectId }) => {
	const access =
		localStorage.getItem('roles')?.includes('ADMIN') ||
		localStorage.getItem('roles')?.includes('MANAGER')

	const initialIndex = PROJECT_STATUSES.findIndex((el) => el === status)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [selectedIndex, setSelectedIndex] = React.useState(initialIndex)
	const open = Boolean(anchorEl)

	const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuItemClick = async (
		event: React.MouseEvent<HTMLElement>,
		index: number,
	) => {
		if (projectId) {
			const result = await ProjectStore.updateProject(projectId, {
				status: PROJECT_STATUSES[index],
			} as UpdateProjectDto)
			if (result) {
				setSelectedIndex(index)
				setAnchorEl(null)
				setOpenSnackbar(true)
			}
		}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const [openSnackbar, setOpenSnackbar] = React.useState(false)

	const handleCloseSnackbar = (
		event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenSnackbar(false)
	}

	return (
		<div>
			<Typography
				color='text.secondary'
				display='flex'
				gap='1px'
				alignItems='center'
			>
				{PROJECT_STATUSES[selectedIndex]}
				{access && (
					<IconButton size='small' onClick={handleClickListItem}>
						<ExpandMoreIcon />
					</IconButton>
				)}
			</Typography>

			<Menu
				id='lock-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'lock-button',
					role: 'listbox',
				}}
			>
				<MenuList dense>
					{PROJECT_STATUSES.map((status, index) => (
						<MenuItem
							key={status}
							selected={index === selectedIndex}
							onClick={(event) => handleMenuItemClick(event, index)}
						>
							{status}
						</MenuItem>
					))}
				</MenuList>
			</Menu>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					severity='success'
					onClose={handleCloseSnackbar}
					sx={{ width: '100%' }}
				>
					<AlertTitle>УСПЕШНО</AlertTitle>
					Обновление статуса проекта завершено
				</Alert>
			</Snackbar>
		</div>
	)
}

export default MenuStatus
