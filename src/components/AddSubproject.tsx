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
import AddchartIcon from '@mui/icons-material/Addchart'
import ProjectStore from '../store/projects/ProjectStore'

interface IAddSubprojectProps {
	includedSubprojects: { id: number; name: string }[]
	projectId: number
}

interface IProjectList {
	id: number
	name: string
}

const AddSubproject: React.FC<IAddSubprojectProps> = ({
	includedSubprojects,
	projectId,
}) => {
	console.log(includedSubprojects)
	const [projectList, setProjectList] = React.useState<IProjectList[]>([])

	React.useEffect(() => {
		const getProjects = async () => {
			await ProjectStore.getProjectsNamesAndIds()
			const projects = ProjectStore.projectsNamesAndIds.filter(
				(project) =>
					!includedSubprojects.some(
						(includedProject) =>
							includedProject.id === project.id || projectId === project.id,
					),
			)
			setProjectList(projects)
		}
		getProjects()
	}, [includedSubprojects])

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const onClickProject = async (
		event: React.MouseEvent<HTMLElement>,
		subprojectId: number,
	) => {
		await ProjectStore.addSubproject(projectId, subprojectId)
		handleClose()
	}

	return (
		<Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<IconButton size='large' onClick={handleClick}>
				<AddchartIcon color='success' />
			</IconButton>
			<Box sx={{ width: '150px' }}>
				<Typography sx={{ fontSize: 18 }}>Добавить</Typography>
				<Typography sx={{ fontSize: 18 }}>подпроект</Typography>
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
					<MenuItem disabled>Проекты</MenuItem>
					{projectList.length !== 0 ? (
						projectList.map((project) => (
							<MenuItem
								key={project.id}
								onClick={(event) => onClickProject(event, project.id)}
							>
								<ListItemText inset>{project.name}</ListItemText>
							</MenuItem>
						))
					) : (
						<ListItemText sx={{ pl: 2, pr: 2 }}>
							Проекты отсутствуют
						</ListItemText>
					)}
				</MenuList>
			</Menu>
		</Grid>
	)
}

export default AddSubproject
