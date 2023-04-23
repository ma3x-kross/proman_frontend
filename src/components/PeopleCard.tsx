import React from 'react'
import { User } from '../interfaces/UsersInterfaces'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Paper,
	Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const PeopleCard: React.FC<User> = ({ id, email, roles, profile }) => {
	return (
		<Paper
			elevation={3}
			sx={{
				borderRadius: '10px',
			}}
		>
			<Card
				sx={{
					height: 330,
					width: 360,
					position: 'relative',
					borderRadius: '10px',
				}}
			>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						ФИО
					</Typography>
					<Typography variant='h6' component='div'>
						{` ${profile.fullName}`}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						должность
					</Typography>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5 }}>
						{roles.some((role) => role.value === 'ADMIN')
							? 'Администратор'
							: roles.some((role) => role.value === 'MANAGER')
							? 'Менеджер'
							: 'Разработчик'}
						{/* {roles.map((role) => role.description)} */}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						электронная почта
					</Typography>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5 }}>
						{email}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						номер телефона
					</Typography>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
						{profile.phone}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color='text.secondary'>
						телеграмм
					</Typography>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5 }}>
						{profile.telegramUsername}
					</Typography>
				</CardContent>
				<CardActions sx={{ position: 'absolute', bottom: '10px' }}>
					<Button size='small'>Подробнее</Button>
				</CardActions>
			</Card>
		</Paper>
	)
}

export default PeopleCard
