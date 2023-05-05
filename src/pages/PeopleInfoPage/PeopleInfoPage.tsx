import React from 'react'
import UsersStore from '../../store/users/UsersStore'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { CircularProgress, Container, Grid } from '@mui/material'
import ProfileBlock from '../../components/ProfileBlock'
import MyProjects from '../../components/MyProjects'

const PeopleInfoPage = () => {
	const { user, userProjects } = UsersStore

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
		<Container sx={{ m: 5, display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
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
			<MyProjects projects={userProjects} />
		</Container>
	)
}

export default observer(PeopleInfoPage)
