import { GroupAdd } from '@mui/icons-material'
import {
	Avatar,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material'

import React from 'react'
import { Context } from '../index'

const InviteForm = () => {
	const [email, setEmail] = React.useState('')
	const [role, setRole] = React.useState('')


	const handleChangeSelect = (event: SelectChangeEvent) => {
		setRole(event.target.value as string)
	}

	const { store } = React.useContext(Context)

	return (
		<Paper elevation={5} sx={{ padding: 5 }}>
			<Grid container spacing={2} direction='column'>
				<Grid item>
					<Grid container direction='column' alignItems='center'>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<GroupAdd />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Пригласить пользователя
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						fullWidth
						label='Введите email'
						placeholder='example@mail.ru'
						variant='outlined'
					/>
				</Grid>

				<Grid item>
					<FormControl fullWidth>
						<InputLabel id='role-select-label'>Роль</InputLabel>
						<Select
							labelId='role-select-label'
							id='role-select-label'
							value={role}
							label='Роль'
							onChange={handleChangeSelect}
						>
							<MenuItem value={'ADMIN'}>Администратор</MenuItem>
							<MenuItem value={'MANAGER'}>Менеджер</MenuItem>
							<MenuItem value={'DEVELOPER'}>Разработчик</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item>
					<Button
						onClick={() =>
							store.invite(
								
								email,
							
								role,
							)
						}
						fullWidth
						variant='contained'
					>
						Пригласить пользователя
					</Button>
				</Grid>
			</Grid>
		</Paper>
	)
}
export default InviteForm
