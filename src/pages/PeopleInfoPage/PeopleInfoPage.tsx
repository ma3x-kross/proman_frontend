import React from 'react'
import UsersStore from '../../store/users/UsersStore'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Card, CardContent, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import ProfileBlock from '../../components/ProfileBlock'

const PeopleInfoPage = () => {
	const { user } = UsersStore

	const { id } = useParams()

	React.useEffect(() => {
		if (id) {
			const fetchUser = async () => {
				await UsersStore.getOneUser(parseInt(id))
			}
			fetchUser()
		}
	}, [])

	if (UsersStore.loading)
		return (
			<Grid mt={5} container direction='column' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)
	return (
		<>
			<Typography variant='h4' component='h4' sx={{ m: 3 }}>
				Личный кабинет
			</Typography>
			<Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
				{user && (
					<ProfileBlock
						id={user.id}
						fullName={user.fullName}
						email={user.email}
						role={user.role}
						phone={user.phone}
						telegramUsername={user.telegramUsername}
					/>
				)}
				<Stack spacing={5}>
					<Card>
						<CardContent>
							<Typography variant='h5' component='h5'>
								Проекты в работе
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
							<Typography>
								Мобильное приложение «Менеджер по продажам»
							</Typography>
						</CardContent>
					</Card>
				</Stack>
			</Container>
		</>
	)
}

export default observer(PeopleInfoPage)
