import React from 'react'
import ProjectStore from '../../store/projects/ProjectStore'
import { observer } from 'mobx-react-lite'

import { Box, Button, Fab, Stack, Typography } from '@mui/material'

import Modal from '../../components/Modal'
import AddIcon from '@mui/icons-material/Add'
import CreateProjectForm from './CreateProjectForm'
import ProjectsDataGrid from './ProjectsDataGrid'

function ProjectsPage() {
	const { projects } = ProjectStore

	const [open, setOpen] = React.useState(false)

	const handleClickCreateNewProject = () => {
		setOpen(true)
	}

	const handleCloseModal = () => {
		setOpen(false)
	}

	React.useEffect(() => {
		ProjectStore.getProjects()
	}, [open])

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
					Проекты
				</Typography>

				<Stack direction='row' spacing={2} alignItems='center'>
					<Button
						color='primary'
						onClick={handleClickCreateNewProject}
						sx={{ mt: 2 }}
					>
						Создать новый проект
					</Button>
					<Modal
						open={open}
						handleClose={handleCloseModal}
						Component={<CreateProjectForm />}
					/>
				</Stack>
			</Box>
			<ProjectsDataGrid projects={projects} />
		</Box>
	)
}

export default observer(ProjectsPage)
