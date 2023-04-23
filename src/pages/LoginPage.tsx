import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
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
import { observer } from 'mobx-react-lite'

import React from 'react'
import { Context } from '../index'

const LoginPage = () => {
	const [showPassword, setShowPassword] = React.useState<Boolean>(false)

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const { store } = React.useContext(Context)

	// const navigate = useNavigate()

	// const {isAuth} = store
	// React.useEffect(() => {
	// 	if (isAuth) navigate('/invite')
	// }, [isAuth])


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
											<AccountCircle />
										</Avatar>
										<Typography component='h1' variant='h5'>
											Войти в систему
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
										<InputLabel htmlFor='outlined-adornment-password'>
											Введите пароль
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
									<Button
										onClick={() => store.login(email, password)}
										fullWidth
										variant='contained'
									>
										Войти в систему
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Container>
			</div>
		)
}
export default observer(LoginPage)
