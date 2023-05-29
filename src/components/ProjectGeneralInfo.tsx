import React from 'react'
import {
	Box,
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Project } from '../interfaces/ProjectsInterfaces'
import ModalDelete from './ModalDelete'
import { useNavigate } from 'react-router-dom'
import ProjectStore from '../store/projects/ProjectStore'
import Modal from './Modal'
import EditProjectForm from '../pages/ProjectInfoPage/EditProjectForm'

interface IProjectGeneralInfoProps {
	project: Project
}

interface IGenInfo {
	name: string
	value: string | number
}

const ProjectGeneralInfo: React.FC<IProjectGeneralInfoProps> = ({
	project,
}) => {
	const access =
		localStorage.getItem('roles')?.includes('ADMIN') ||
		localStorage.getItem('roles')?.includes('MANAGER')

	const navigate = useNavigate()

	const [openEdit, setOpenEdit] = React.useState(false)
	const [openDelete, setOpenDelete] = React.useState(false)
	const [deleteResult, setDeleteResult] = React.useState(false)

	React.useEffect(() => {
		const deleteProject = async (id: number) => {
			await ProjectStore.deleteProject(id)
		}
		if (deleteResult) {
			deleteProject(project.id)
			navigate('/projects')
		}
	}, [deleteResult])

	const [generalInfo, setGeneralInfo] = React.useState<IGenInfo[]>([])

	React.useMemo(() => {
		const genInfo = access
			? [
					{
						name: 'Срок окончания',
						value: project.deadline
							? project.deadline.split('-').reverse().join('.')
							: '',
					},
					{ name: 'Ставка проекта', value: project.rate },
					{ name: 'Оценка(часы)', value: project.plannedHours },
					{ name: 'Потраченные часы', value: project.workedHours },
					{ name: 'Стоимость', value: project.cost },
					{ name: 'Прибыль', value: project.profit },
			  ]
			: [
					{
						name: 'Срок окончания',
						value: project.deadline
							? project.deadline.split('-').reverse().join('.')
							: '',
					},
					{ name: 'Оценка(часы)', value: project.plannedHours },
					{ name: 'Потраченные часы', value: project.workedHours },
			  ]
		setGeneralInfo(genInfo)
	}, [project])

	return (
		<Paper sx={{ borderRadius: '20px' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					m: 3,
					mb: 2,
				}}
			>
				<Typography
					variant='h5'
					component='h5'
					display='flex'
					alignItems='center'
				>
					Общая информация
				</Typography>
				{access && (
					<Box>
						<IconButton size='small' onClick={() => setOpenEdit(true)}>
							<EditIcon color='warning' />
						</IconButton>
						<IconButton size='small' onClick={() => setOpenDelete(true)}>
							<DeleteIcon color='error' />
						</IconButton>
					</Box>
				)}
			</Box>

			<Divider sx={{ mt: '5px', mb: '10px' }} />
			<Grid container spacing={5} p={4} pt={0}>
				{generalInfo.map((item) => (
					<Grid item key={item.name}>
						<Typography
							sx={{ fontSize: 14, textAlign: 'center' }}
							color='text.secondary'
							gutterBottom
						>
							{item.name}
						</Typography>

						<Typography sx={{ fontSize: 18, textAlign: 'center' }}>
							{item.value}
						</Typography>
					</Grid>
				))}
			</Grid>

			<Modal
				open={openEdit}
				handleClose={() => setOpenEdit(false)}
				Component={<EditProjectForm />}
			/>
			<ModalDelete
				open={openDelete}
				name={project.name}
				onClose={() => setOpenDelete(false)}
				setDeleteResult={() => setDeleteResult(true)}
			/>
		</Paper>
	)
}

export default ProjectGeneralInfo
