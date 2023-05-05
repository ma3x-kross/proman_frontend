import { Box, Typography } from '@mui/material'
import React from 'react'
import { Project } from '../interfaces/ProjectsInterfaces'
import ProjectsDataGrid from '../pages/ProjectPage/ProjectsDataGrid'

interface IMyProjectsProps {
	projects: Project[]
}

const MyProjects: React.FC<IMyProjectsProps> = ({ projects }) => {
	return (
		<Box
			sx={{
				height: 410,
			}}
		>
			<Typography variant='h4' component='h4' sx={{ mb: 2 }}>
				Проекты в работе
			</Typography>
			<ProjectsDataGrid projects={projects} />
		</Box>
	)
}

export default MyProjects
