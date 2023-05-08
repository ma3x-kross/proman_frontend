import { observer } from 'mobx-react-lite'
import React from 'react'
import {
	Box,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import ProjectStore from '../../store/projects/ProjectStore'
import MenuStatus from '../../components/MenuStatus'
import UserBadge from '../../components/UserBadge'
import AddUserToProject from '../../components/AddUserToProject'
import AddSubproject from '../../components/AddSubproject'
import ProjectBadge from '../../components/ProjectBadge'
import ProjectGeneralInfo from '../../components/ProjectGeneralInfo'

const ProjectInfoPage = () => {
	const access =
		localStorage.getItem('roles')?.includes('ADMIN') ||
		localStorage.getItem('roles')?.includes('MANAGER')

	const { project } = ProjectStore
	const { id } = useParams()

	React.useEffect(() => {
		const getProject = async (id: number) => {
			await ProjectStore.getOneProject(id)
		}

		if (id) getProject(parseInt(id))
	}, [id])

	if (ProjectStore.loading)
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)
	return (
		<>
			<Box sx={{ mt: 5, mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
				<Typography variant='h4' component='h4'>
					{project.name}
				</Typography>
				<MenuStatus
					status={project.status}
					projectId={parseInt(id as string)}
				/>
			</Box>

			<Container
				maxWidth='md'
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Stack spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
					<ProjectGeneralInfo project={project} />

					{project.id && (
						<>
							<Paper sx={{ borderRadius: '20px' }}>
								<Typography variant='h5' component='h5' sx={{ m: 3 }}>
									Участники проекта
								</Typography>
								<Grid container spacing={5} p={4} pt={0}>
									{access && (
										<AddUserToProject
											includedManager={project.manager}
											includedDevelopers={project.developers}
											projectId={parseInt(id as string)}
										/>
									)}

									{project.manager && (
										<UserBadge
											user={project.manager}
											role='Менеджер'
											projectId={parseInt(id as string)}
										/>
									)}

									{project.developers.map((developer) => (
										<UserBadge
											key={developer.email}
											user={developer}
											role='Разработчик'
											projectId={parseInt(id as string)}
										/>
									))}
								</Grid>
							</Paper>

							<Paper sx={{ borderRadius: '20px' }}>
								<Typography variant='h5' component='h5' sx={{ m: 3 }}>
									Подпроекты
								</Typography>
								<Grid container spacing={5} p={4} pt={0}>
									{access && (
										<AddSubproject
											includedSubprojects={project.relatedProjects}
											projectId={parseInt(id as string)}
										/>
									)}

									{project.relatedProjects.map((project) => (
										<ProjectBadge
											key={project.id}
											subproject={project}
											projectId={parseInt(id as string)}
										/>
									))}
								</Grid>
							</Paper>
						</>
					)}
				</Stack>
			</Container>
		</>
	)
}

export default observer(ProjectInfoPage)
