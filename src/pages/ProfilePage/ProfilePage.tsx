import * as React from 'react'
import UsersStore from '../../store/users/UsersStore'
import {
	Stack,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material'

import { observer } from 'mobx-react-lite'
import ProfileBlock from '../../components/ProfileBlock'
import MyProjects from '../../components/MyProjects'

const ProfilePage: React.FC = () => {
	const { user, userProjects } = UsersStore

	React.useEffect(() => {
		const getUser = async () => {
			await UsersStore.getOneUser()
		}
		getUser()
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
		<Container sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
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

export default observer(ProfilePage)
