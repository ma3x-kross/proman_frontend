import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	TextField,
	Typography,
} from '@mui/material'

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../index'

const RegistrationPage = () => {
	const [showPassword, setShowPassword] = React.useState<Boolean>(false)

	const [fullName, setFullName] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [phone, setPhone] = React.useState('')
	const [telegramUsername, setTelegramUsername] = React.useState('')
	const [verifyPassword, setVerifyPassword] = React.useState('')

	const { link } = useParams()
	const navigate = useNavigate()

	const { store } = React.useContext(Context)

	const handleClick = () => {
		store.register(
			{ fullName, password, phone, telegramUsername },
			link as string,
		)
		navigate('/')
	}

	return (
		<div>
			<Container maxWidth='xs'>
				<Grid
					container
					spacing={2}
					direction='column'
					justifyContent='center'
					sx={{ minHeight: '100vh' }}
				>
					<Paper elevation={5} sx={{ padding: 5 }}>
						<Grid container spacing={2} direction='column'>
							<Grid item>
								<Grid container direction='column' alignItems='center'>
									<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
										<Lock />
									</Avatar>
									<Typography component='h1' variant='h5'>
										Регистрация
									</Typography>
								</Grid>
							</Grid>

							<Grid item>
								<TextField
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									type='text'
									fullWidth
									label='Введите ФИО'
									placeholder='Семенов Петр Иванович'
									variant='outlined'
								/>
							</Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel htmlFor='outlined-adornment-password'>
										Придумайте пароль
									</InputLabel>
									<OutlinedInput
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										id='outlined-adornment-password'
										type={showPassword ? 'text' : 'password'}
										placeholder='Пароль'
										label='Введите пароль'
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={() => setShowPassword((show) => !show)}
													edge='end'
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
									></OutlinedInput>
								</FormControl>
							</Grid>
							<Grid item>
								<TextField
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									type='text'
									fullWidth
									label='Введите номер телефона'
									placeholder='89001002030'
									variant='outlined'
								/>
							</Grid>
							<Grid item>
								<TextField
									value={telegramUsername}
									onChange={(e) => setTelegramUsername(e.target.value)}
									type='text'
									fullWidth
									label='Введите логин в телеграм'
									placeholder='telegram'
									variant='outlined'
								/>
							</Grid>
							<Grid item>
								<Button onClick={handleClick} fullWidth variant='contained'>
									Зарегистрироваться
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Container>
		</div>
	)
}
export default RegistrationPage
