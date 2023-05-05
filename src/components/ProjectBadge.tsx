import React from 'react'
import { Avatar, Box, Grid, Typography, Menu, MenuItem } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link } from 'react-router-dom'
import ProjectStore from '../store/projects/ProjectStore'
import { observer } from 'mobx-react-lite'
import { stringToColor } from '../utils/stringAvatar'

interface IProjectBadgeProps {
	subproject: { id: number; name: string }
	projectId: number
}

const ProjectBadge: React.FC<IProjectBadgeProps> = ({
	subproject,
	projectId,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const deleteProject = async () => {
		console.log(subproject.id, projectId)
		await ProjectStore.deleteSubproject(projectId, subproject.id)
		handleClose()
	}

	return (
		<Grid item sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Avatar sx={{ bgcolor: stringToColor(subproject.name) }}>
				<AssignmentIcon />
			</Avatar>
			<Box>
				<Typography
					onClick={handleClick}
					sx={{ cursor: 'pointer', fontSize: 18, width: '150px' }}
				>
					{subproject.name}
				</Typography>
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
							to={`/projects/${subproject.id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							Перейти к проекту
						</Link>
					</MenuItem>
					<MenuItem onClick={deleteProject}>Удалить подпроект</MenuItem>
				</Menu>
			</Box>
		</Grid>
	)
}

export default observer(ProjectBadge)
